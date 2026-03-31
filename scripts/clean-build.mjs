import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const buildArtifacts = ['dist', '.ssr']

await Promise.all(
  buildArtifacts.map((target) =>
    fs.rm(path.join(rootDir, target), { recursive: true, force: true })
  )
)
