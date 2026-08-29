import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const sourceDirectory = path.resolve(
  process.argv[2] || '/Users/petermarsh/Local_Documents/pics'
)
const projectDirectory = path.resolve(new URL('..', import.meta.url).pathname)
const outputDirectory = path.join(projectDirectory, 'public', 'profile-carousel')
const manifestPath = path.join(projectDirectory, 'data', 'profile-images.json')
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const sourceFiles = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }))

if (sourceFiles.length === 0) {
  throw new Error(`No supported images found in ${sourceDirectory}`)
}

await mkdir(outputDirectory, { recursive: true })
await mkdir(path.dirname(manifestPath), { recursive: true })

const images = sourceFiles.map((sourceFile, index) => {
  const outputFile = `profile-${String(index + 1).padStart(3, '0')}.jpg`
  const outputPath = path.join(outputDirectory, outputFile)
  const result = spawnSync(
    'sips',
    [
      '--resampleHeightWidthMax',
      '900',
      '--setProperty',
      'format',
      'jpeg',
      '--setProperty',
      'formatOptions',
      '72',
      path.join(sourceDirectory, sourceFile),
      '--out',
      outputPath,
    ],
    { stdio: 'pipe' }
  )

  if (result.status !== 0) {
    throw new Error(`Could not prepare ${sourceFile}: ${result.stderr.toString()}`)
  }

  const properties = spawnSync(
    'sips',
    ['--getProperty', 'pixelWidth', '--getProperty', 'pixelHeight', outputPath],
    { encoding: 'utf8' }
  )
  const width = Number(properties.stdout.match(/pixelWidth: (\d+)/)?.[1])
  const height = Number(properties.stdout.match(/pixelHeight: (\d+)/)?.[1])

  if (properties.status !== 0 || !width || !height) {
    throw new Error(`Could not read dimensions for ${sourceFile}`)
  }

  return {
    src: `/profile-carousel/${outputFile}`,
    width,
    height,
  }
})

await writeFile(manifestPath, `${JSON.stringify(images, null, 2)}\n`)
console.log(`Prepared ${images.length} carousel images from ${sourceDirectory}`)
