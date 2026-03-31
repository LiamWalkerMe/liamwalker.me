import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const ssrDir = path.join(rootDir, '.ssr')

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function replaceTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
}

function replaceMetaTag(html, attribute, key, content) {
  const escapedContent = escapeHtml(content)
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i')

  if (pattern.test(html)) {
    return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapedContent}" />`)
  }

  return html.replace('</head>', `  <meta ${attribute}="${key}" content="${escapedContent}" />\n</head>`)
}

function replaceCanonicalLink(html, href) {
  const escapedHref = escapeHtml(href)
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i

  if (pattern.test(html)) {
    return html.replace(pattern, `<link rel="canonical" href="${escapedHref}" />`)
  }

  return html.replace('</head>', `  <link rel="canonical" href="${escapedHref}" />\n</head>`)
}

function extractLeadingHeadLinks(appHtml) {
  const headLinks = []
  let remainingHtml = appHtml
  const linkPattern = /^<link\s+rel="(?:preload|modulepreload)"[^>]*\/>/i

  while (true) {
    const match = remainingHtml.match(linkPattern)

    if (!match) {
      break
    }

    headLinks.push(match[0])
    remainingHtml = remainingHtml.slice(match[0].length)
  }

  return { headLinks, appHtml: remainingHtml }
}

function injectHeadLinks(html, links) {
  if (links.length === 0) {
    return html
  }

  return html.replace('</head>', `  ${links.join('\n  ')}\n</head>`)
}

function injectAppHtml(html, appHtml, route) {
  const escapedRoute = escapeHtml(route)

  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root" data-prerendered-path="${escapedRoute}">${appHtml}</div>`
  )
}

function renderDocument(template, appHtml, metadata) {
  const { headLinks, appHtml: bodyHtml } = extractLeadingHeadLinks(appHtml)
  let html = injectHeadLinks(template, headLinks)
  html = injectAppHtml(html, bodyHtml, metadata.path)

  html = replaceTitle(html, metadata.title)
  html = replaceMetaTag(html, 'name', 'description', metadata.description)
  html = replaceMetaTag(html, 'name', 'robots', metadata.robots)
  html = replaceMetaTag(html, 'name', 'theme-color', metadata.themeColor)
  html = replaceMetaTag(html, 'property', 'og:type', 'website')
  html = replaceMetaTag(html, 'property', 'og:site_name', "Liam's Digital Portfolio")
  html = replaceMetaTag(html, 'property', 'og:title', metadata.title)
  html = replaceMetaTag(html, 'property', 'og:description', metadata.description)
  html = replaceMetaTag(html, 'property', 'og:url', metadata.canonicalUrl)
  html = replaceMetaTag(html, 'property', 'og:image', metadata.imageUrl)
  html = replaceMetaTag(html, 'property', 'og:image:alt', metadata.imageAlt)
  html = replaceMetaTag(html, 'name', 'twitter:card', 'summary_large_image')
  html = replaceMetaTag(html, 'name', 'twitter:title', metadata.title)
  html = replaceMetaTag(html, 'name', 'twitter:description', metadata.description)
  html = replaceMetaTag(html, 'name', 'twitter:image', metadata.imageUrl)
  html = replaceMetaTag(html, 'name', 'twitter:image:alt', metadata.imageAlt)
  html = replaceCanonicalLink(html, metadata.canonicalUrl)

  return html
}

function getOutputPath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html')
  }

  const routeDir = path.join(distDir, route.replace(/^\//, ''))
  return path.join(routeDir, 'index.html')
}

function createSitemap(routes, getRouteMetadata) {
  const urlEntries = routes
    .map((route) => getRouteMetadata(route))
    .filter((metadata) => !metadata.robots.startsWith('noindex'))
    .map((metadata) => `  <url>\n    <loc>${escapeXml(metadata.canonicalUrl)}</loc>\n  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`
}

async function loadSsrEntry() {
  const ssrFiles = await fs.readdir(ssrDir)
  const entryFile = ssrFiles.find((file) => /^entry-server\.(js|mjs|cjs)$/.test(file))

  if (!entryFile) {
    throw new Error('Unable to find the SSR entry file in .ssr.')
  }

  return import(pathToFileURL(path.join(ssrDir, entryFile)).href)
}

async function prerender() {
  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
  const { render, getPrerenderRoutes, getRouteMetadata } = await loadSsrEntry()
  const routes = getPrerenderRoutes()

  await Promise.all(
    routes.map(async (route) => {
      const [appHtml, metadata] = await Promise.all([render(route), Promise.resolve(getRouteMetadata(route))])
      const outputPath = getOutputPath(route)
      const outputHtml = renderDocument(template, appHtml, metadata)

      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, outputHtml)
    })
  )

  await fs.writeFile(path.join(distDir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://liamwalker.me/sitemap.xml\n')
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), createSitemap(routes, getRouteMetadata))
  await fs.rm(ssrDir, { recursive: true, force: true })
}

prerender().catch(async (error) => {
  console.error(error)
  await fs.rm(ssrDir, { recursive: true, force: true })
  process.exitCode = 1
})
