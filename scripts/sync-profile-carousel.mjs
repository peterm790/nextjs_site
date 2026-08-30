import { copyFileSync, readFileSync } from 'node:fs'
import { copyFile, mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import os from 'node:os'
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

const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'profile-carousel-'))

try {
  const images = sourceFiles.map((sourceFile, index) => {
    const sequence = String(index + 1).padStart(3, '0')
    const outputFile = `profile-${sequence}.jpg`
    const outputPath = path.join(temporaryDirectory, outputFile)
    const temporarySource = path.join(temporaryDirectory, `source-${sequence}${path.extname(sourceFile)}`)
    const validationPath = path.join(temporaryDirectory, `validation-${sequence}.bmp`)
    const sourcePath = path.join(sourceDirectory, sourceFile)

    copyFileSync(sourcePath, temporarySource)
    spawnOrThrow('sips', ['--deleteProperty', 'profile', temporarySource], sourceFile)
    spawnOrThrow(
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
        temporarySource,
        '--out',
        outputPath,
      ],
      sourceFile
    )

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

    spawnOrThrow(
      'sips',
      ['--resampleHeightWidth', '1', '1', '--setProperty', 'format', 'bmp', outputPath, '--out', validationPath],
      sourceFile
    )
    const validationBytes = readFileSync(validationPath)
    const averagePixel = validationBytes.subarray(validationBytes.length - 4, validationBytes.length - 1)
    if (averagePixel.every((value) => value === 0)) {
      throw new Error(`Prepared image is entirely black: ${sourceFile}`)
    }

    return {
      outputFile,
      outputPath,
      src: `/profile-carousel/${outputFile}`,
      width,
      height,
    }
  })

  for (const image of images) {
    await copyFile(image.outputPath, path.join(outputDirectory, image.outputFile))
  }

  await writeFile(
    manifestPath,
    `${JSON.stringify(images.map(({ src, width, height }) => ({ src, width, height })), null, 2)}\n`
  )
  console.log(`Prepared ${images.length} carousel images from ${sourceDirectory}`)
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true })
}

function spawnOrThrow(command, args, sourceFile) {
  const result = spawnSync(command, args, { stdio: 'pipe' })
  if (result.status !== 0) {
    throw new Error(`Could not prepare ${sourceFile}: ${result.stderr.toString()}`)
  }
}
