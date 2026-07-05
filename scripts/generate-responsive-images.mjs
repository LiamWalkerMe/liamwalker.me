import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')
const generatedDir = path.join(publicDir, 'assets/generated')
const manifestPath = path.join(rootDir, 'src/generated/responsiveImages.ts')
const photographyConfigPath = path.join(rootDir, 'src/data/photography.collections.json')
const homePhotographyOutputDir = path.join(publicDir, 'assets/generated/photography-home')
const homePhotographyManifestPath = path.join(rootDir, 'src/generated/homePhotographyImages.ts')

const imageConfigs = [
  {
    id: 'heroProfile',
    input: 'public/assets/Hero/profile.png',
    outputDir: 'public/assets/generated/hero',
    outputBaseName: 'profile',
    widths: [320, 480, 720, 960],
    fallbackFormat: 'png',
    fallbackMimeType: 'image/png',
    fallbackOptions: { compressionLevel: 9, effort: 10 },
    webpOptions: { quality: 76, effort: 4 },
    avifOptions: { quality: 52, effort: 4 },
  },
  {
    id: 'homeRoboticsBanner',
    input: 'public/assets/Robotics/banner.jpeg',
    outputDir: 'public/assets/generated/robotics',
    outputBaseName: 'banner-home',
    widths: [480, 720, 960, 1280],
    fallbackFormat: 'jpeg',
    fallbackMimeType: 'image/jpeg',
    fallbackOptions: { quality: 78, mozjpeg: true, progressive: true },
    webpOptions: { quality: 76, effort: 4 },
    avifOptions: { quality: 50, effort: 4 },
  },
  {
    id: 'ftc2023Banner',
    input: 'public/assets/Robotics/2023/banner.jpeg',
    outputDir: 'public/assets/generated/robotics',
    outputBaseName: 'banner-2023',
    widths: [480, 720, 960, 1280],
    fallbackFormat: 'jpeg',
    fallbackMimeType: 'image/jpeg',
    fallbackOptions: { quality: 78, mozjpeg: true, progressive: true },
    webpOptions: { quality: 76, effort: 4 },
    avifOptions: { quality: 50, effort: 4 },
  },
  {
    id: 'ftc2022Banner',
    input: 'public/assets/Robotics/2022/banner.jpg',
    outputDir: 'public/assets/generated/robotics',
    outputBaseName: 'banner-2022',
    widths: [480, 720, 960, 1280],
    fallbackFormat: 'jpeg',
    fallbackMimeType: 'image/jpeg',
    fallbackOptions: { quality: 78, mozjpeg: true, progressive: true },
    webpOptions: { quality: 76, effort: 4 },
    avifOptions: { quality: 50, effort: 4 },
  },
  {
    id: 'stoveTeamPhoto',
    input: 'public/assets/StoveSolutions/teamphoto.jpg',
    outputDir: 'public/assets/generated/stove',
    outputBaseName: 'teamphoto',
    widths: [640, 960, 1280, 1600],
    fallbackFormat: 'jpeg',
    fallbackMimeType: 'image/jpeg',
    fallbackOptions: { quality: 78, mozjpeg: true, progressive: true },
    webpOptions: { quality: 76, effort: 4 },
    avifOptions: { quality: 50, effort: 4 },
  },
]

function toPublicUrl(filePath) {
  const relativePath = path.relative(publicDir, filePath).split(path.sep).join('/')
  return `/${relativePath}`
}

function getOutputExtension(format) {
  return format === 'jpeg' ? 'jpg' : format
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function generateFormatVariants(config, width) {
  const inputPath = path.join(rootDir, config.input)
  const outputDir = path.join(rootDir, config.outputDir)
  const resize = sharp(inputPath).rotate().resize({ width, withoutEnlargement: true })

  const avifPath = path.join(outputDir, `${config.outputBaseName}-${width}.avif`)
  await resize.clone().avif(config.avifOptions).toFile(avifPath)

  const webpPath = path.join(outputDir, `${config.outputBaseName}-${width}.webp`)
  await resize.clone().webp(config.webpOptions).toFile(webpPath)

  const fallbackExtension = getOutputExtension(config.fallbackFormat)
  const fallbackPath = path.join(outputDir, `${config.outputBaseName}-${width}.${fallbackExtension}`)

  if (config.fallbackFormat === 'png') {
    await resize.clone().png(config.fallbackOptions).toFile(fallbackPath)
  } else {
    await resize.clone().jpeg(config.fallbackOptions).toFile(fallbackPath)
  }

  return {
    avifPath,
    webpPath,
    fallbackPath,
  }
}

async function generateResponsiveImages() {
  await fs.mkdir(generatedDir, { recursive: true })
  await fs.mkdir(path.dirname(manifestPath), { recursive: true })

  const manifestEntries = {}

  for (const config of imageConfigs) {
    const inputPath = path.join(rootDir, config.input)
    const outputDir = path.join(rootDir, config.outputDir)
    await fs.mkdir(outputDir, { recursive: true })

    const metadata = await sharp(inputPath).metadata()
    if (!metadata.width || !metadata.height) {
      throw new Error(`Unable to read dimensions for ${config.input}`)
    }

    const widths = [...new Set(config.widths.filter((width) => width <= metadata.width))].sort((a, b) => a - b)
    const sources = {
      avif: [],
      webp: [],
      fallback: [],
    }

    for (const width of widths) {
      const { avifPath, webpPath, fallbackPath } = await generateFormatVariants(config, width)
      sources.avif.push({ src: toPublicUrl(avifPath), width })
      sources.webp.push({ src: toPublicUrl(webpPath), width })
      sources.fallback.push({ src: toPublicUrl(fallbackPath), width })
    }

    manifestEntries[config.id] = {
      width: metadata.width,
      height: metadata.height,
      fallbackMimeType: config.fallbackMimeType,
      sources,
    }
  }

  const manifestFileContents = `import type { ResponsiveImageAsset } from '../lib/responsiveImages'

export const responsiveImages = ${JSON.stringify(manifestEntries, null, 2)} as const satisfies Record<string, ResponsiveImageAsset>
`

  await fs.writeFile(manifestPath, manifestFileContents)
}

async function generateHomePhotographyImages() {
  const config = JSON.parse(await fs.readFile(photographyConfigPath, 'utf8'))
  const collections = Array.isArray(config.collections) ? config.collections : []
  const photos = collections
    .filter((collection) => collection.enabled !== false)
    .flatMap((collection) =>
      (collection.images ?? []).map((src) => ({
        src,
        title: collection.title,
      }))
    )

  await fs.rm(homePhotographyOutputDir, { recursive: true, force: true })
  await fs.mkdir(homePhotographyOutputDir, { recursive: true })
  await fs.mkdir(path.dirname(homePhotographyManifestPath), { recursive: true })

  const manifestEntries = []

  for (const [index, photo] of photos.entries()) {
    const inputPath = path.join(publicDir, photo.src.replace(/^\//, ''))
    const basename = path.basename(photo.src, path.extname(photo.src))
    const outputPath = path.join(
      homePhotographyOutputDir,
      `${String(index + 1).padStart(2, '0')}-${slugify(photo.title)}-${slugify(basename)}.webp`
    )

    const outputInfo = await sharp(inputPath)
      .rotate()
      .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 76, effort: 4 })
      .toFile(outputPath)

    manifestEntries.push({
      originalSrc: photo.src,
      thumbSrc: toPublicUrl(outputPath),
      width: outputInfo.width,
      height: outputInfo.height,
      orientation: outputInfo.height > outputInfo.width ? 'portrait' : 'landscape',
    })
  }

  const manifestFileContents = `export type HomePhotographyImageAsset = {
  originalSrc: string
  thumbSrc: string
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
}

export const homePhotographyImageAssets = ${JSON.stringify(manifestEntries, null, 2)} as const satisfies readonly HomePhotographyImageAsset[]
`

  await fs.writeFile(homePhotographyManifestPath, manifestFileContents)
}

async function generateImages() {
  await generateResponsiveImages()
  await generateHomePhotographyImages()
}

generateImages().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
