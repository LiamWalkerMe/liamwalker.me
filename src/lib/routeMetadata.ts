import { isPageUnderConstruction } from '../config/siteFlags'

export const siteMetadata = {
  author: 'Liam Walker',
  siteName: "Liam's Digital Portfolio",
  siteUrl: 'https://liamwalker.me',
  twitterCard: 'summary_large_image',
} as const

type RouteMetadata = {
  path: string
  title: string
  description: string
  themeColor: string
  imagePath: string
  imageAlt: string
  robots?: string
  prerender?: boolean
}

export type ResolvedRouteMetadata = RouteMetadata & {
  canonicalUrl: string
  imageUrl: string
  robots: string
}

const defaultDescription =
  'Computer science student sharing software projects, robotics work, case studies, and photography.'

const routeMetadata: Record<string, RouteMetadata> = {
  '/': {
    path: '/',
    title: 'Liam Walker | Digital Portfolio',
    description: defaultDescription,
    themeColor: '#002142',
    imagePath: '/assets/Photography/Banner.jpg',
    imageAlt: "A featured photography image from Liam Walker's portfolio",
  },
  '/miracosta': {
    path: '/miracosta',
    title: 'MiraCosta | Liam Walker',
    description:
      'A look back at my MiraCosta years: the classes, campus community, graduation memories, and three associate degrees that helped shape my transfer path.',
    themeColor: '#0d3b6e',
    imagePath: '/assets/Hero/profile.png',
    imageAlt: 'Portrait of Liam Walker',
  },
  '/stovesolutions': {
    path: '/stovesolutions',
    title: 'Stove Solutions | Liam Walker',
    description:
      'An engineering design project focused on safer stove technology, prototyping, testing, and presentation.',
    themeColor: '#0f8277',
    imagePath: '/assets/StoveSolutions/teamphoto.jpg',
    imageAlt: 'The Stove Solutions student team',
  },
  '/photography': {
    path: '/photography',
    title: 'Photography | Liam Walker',
    description:
      'A curated photography collection featuring travel, landscapes, city scenes, and visual experiments.',
    themeColor: '#1b0a07',
    imagePath: '/assets/Photography/Banner.jpg',
    imageAlt: "A featured travel photograph from Liam Walker's collection",
  },
  '/socials': {
    path: '/socials',
    title: 'Socials | Liam Walker',
    description: 'Links to Liam Walker on GitHub, LinkedIn, Instagram, YouTube, and the broader portfolio site.',
    themeColor: '#607284',
    imagePath: '/assets/Hero/profile.png',
    imageAlt: 'Portrait of Liam Walker',
  },
  '/website': {
    path: '/website',
    title: 'This Website | Liam Walker',
    description:
      'A look at how this portfolio evolved through WordPress, AWS, GitHub Pages, Figma, and React.',
    themeColor: '#24317b',
    imagePath: '/assets/Website/FrontPage.png',
    imageAlt: "A preview of Liam Walker's portfolio website",
  },
  '/2022-23-season': {
    path: '/2022-23-season',
    title: 'FIRST Robotics 2022-23 Season | Liam Walker',
    description:
      'Robot design, season highlights, awards, and competition media from the 2022-23 FIRST Robotics season.',
    themeColor: '#7a0c2e',
    imagePath: '/assets/Robotics/2022/Robot.jpeg',
    imageAlt: 'The 2022-23 FIRST Robotics robot',
  },
  '/2023-24-season': {
    path: '/2023-24-season',
    title: 'FIRST Robotics 2023-24 Season | Liam Walker',
    description:
      'Robot development, modular design, competition results, and awards from the 2023-24 FIRST Robotics season.',
    themeColor: '#7a0c2e',
    imagePath: '/assets/Robotics/banner.jpeg',
    imageAlt: 'FIRST Robotics team banner image',
  },
  '/zora2024': {
    path: '/zora2024',
    title: 'ZORA 2024 | Liam Walker',
    description:
      'An archived campaign website featuring branding, issues, video, and team information for ZORA 2024.',
    themeColor: '#162466',
    imagePath: '/assets/Zora2024/Promotional/Headshot.png',
    imageAlt: 'ZORA 2024 campaign artwork',
  },
}

const notFoundMetadata: RouteMetadata = {
  path: '/',
  title: 'Page Not Found | Liam Walker',
  description: "The page you requested could not be found on Liam Walker's digital portfolio.",
  themeColor: '#0f1115',
  imagePath: '/assets/Hero/profile.png',
  imageAlt: 'Portrait of Liam Walker',
  robots: 'noindex, nofollow',
  prerender: false,
}

export function normalizePathname(pathname: string) {
  const [cleanPathname] = pathname.split(/[?#]/)
  if (!cleanPathname) {
    return '/'
  }

  if (cleanPathname.length > 1 && cleanPathname.endsWith('/')) {
    return cleanPathname.slice(0, -1)
  }

  return cleanPathname
}

function buildAbsoluteUrl(pathname: string) {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname
  }

  return `${siteMetadata.siteUrl}${pathname}`
}

function getUnderConstructionMetadata(pathname: string): RouteMetadata | null {
  if (pathname === '/miracosta' && isPageUnderConstruction('miracosta')) {
    return {
      path: '/miracosta',
      title: 'MiraCosta (Under Construction) | Liam Walker',
      description: 'This page is currently being updated and will return with more details soon.',
      themeColor: '#0d3b6e',
      imagePath: '/assets/Hero/profile.png',
      imageAlt: 'Portrait of Liam Walker',
    }
  }

  if (pathname === '/website' && isPageUnderConstruction('website')) {
    return {
      path: '/website',
      title: 'This Website (Under Construction) | Liam Walker',
      description: 'This page is currently being updated and will return with more details soon.',
      themeColor: '#24317b',
      imagePath: '/assets/Website/FrontPage.png',
      imageAlt: "A preview of Liam Walker's portfolio website",
    }
  }

  return null
}

export function getPrerenderRoutes() {
  return Object.values(routeMetadata)
    .filter((route) => route.prerender !== false)
    .map((route) => route.path)
}

export function getRouteMetadata(pathname: string): ResolvedRouteMetadata {
  const normalizedPathname = normalizePathname(pathname)
  const baseMetadata =
    getUnderConstructionMetadata(normalizedPathname) ?? routeMetadata[normalizedPathname] ?? notFoundMetadata

  return {
    ...baseMetadata,
    canonicalUrl: buildAbsoluteUrl(baseMetadata.path),
    imageUrl: buildAbsoluteUrl(baseMetadata.imagePath),
    robots: baseMetadata.robots ?? 'index,follow',
  }
}

function upsertMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.content = content
}

function upsertLinkTag(rel: string, href: string) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null

  if (!tag) {
    tag = document.createElement('link')
    tag.rel = rel
    document.head.appendChild(tag)
  }

  tag.href = href
}

export function applyRouteMetadataToDocument(pathname: string) {
  const metadata = getRouteMetadata(pathname)

  document.title = metadata.title

  upsertMetaTag('name', 'description', metadata.description)
  upsertMetaTag('name', 'robots', metadata.robots)
  upsertMetaTag('name', 'theme-color', metadata.themeColor)
  upsertMetaTag('property', 'og:type', 'website')
  upsertMetaTag('property', 'og:site_name', siteMetadata.siteName)
  upsertMetaTag('property', 'og:title', metadata.title)
  upsertMetaTag('property', 'og:description', metadata.description)
  upsertMetaTag('property', 'og:url', metadata.canonicalUrl)
  upsertMetaTag('property', 'og:image', metadata.imageUrl)
  upsertMetaTag('property', 'og:image:alt', metadata.imageAlt)
  upsertMetaTag('name', 'twitter:card', siteMetadata.twitterCard)
  upsertMetaTag('name', 'twitter:title', metadata.title)
  upsertMetaTag('name', 'twitter:description', metadata.description)
  upsertMetaTag('name', 'twitter:image', metadata.imageUrl)
  upsertMetaTag('name', 'twitter:image:alt', metadata.imageAlt)
  upsertLinkTag('canonical', metadata.canonicalUrl)
}
