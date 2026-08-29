import { useEffect, useRef } from 'react'
import styles from './IFSBackground.module.css'

const FRAME = {
  bounds: { west: 13.5, east: 26.5, south: -36, north: -30.5 },
  height: 23,
  imageHeight: 900,
  imageWidth: 1600,
  maximum: 64,
  minimum: -64,
  nodata: 255,
  path: '/ifs-background/ifs-wind-20260901T1500Z.bin',
  width: 53,
}

const mercator = (latitude) => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360))
const northMercator = mercator(FRAME.bounds.north)
const southMercator = mercator(FRAME.bounds.south)

export default function IFSBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame
    let componentBytes
    let columnOffset = 0
    let columnScale = 0
    let displayHeight = 0
    let displayWidth = 0
    let lastFrame = 0
    let particles = []
    let rows
    let stopped = false

    function decode(value) {
      return FRAME.minimum + value / 254 * (FRAME.maximum - FRAME.minimum)
    }

    function interpolateComponent(a, b, c, d, xWeight, yWeight) {
      const top = decode(a) * (1 - xWeight) + decode(b) * xWeight
      const bottom = decode(c) * (1 - xWeight) + decode(d) * xWeight
      return top * (1 - yWeight) + bottom * yWeight
    }

    function sampleWind(screenX, screenY, target) {
      const column = columnOffset + screenX * columnScale
      const screenRow = Math.max(0, Math.min(displayHeight, screenY))
      const screenY0 = Math.floor(screenRow)
      const row = rows[screenY0] + (rows[Math.min(displayHeight, screenY0 + 1)] - rows[screenY0])
        * (screenRow - screenY0)
      if (column < 0 || row < 0 || column > FRAME.width - 1 || row > FRAME.height - 1) return false

      const x0 = Math.floor(column)
      const y0 = Math.floor(row)
      const x1 = Math.min(x0 + 1, FRAME.width - 1)
      const y1 = Math.min(y0 + 1, FRAME.height - 1)
      const xWeight = column - x0
      const yWeight = row - y0
      const topLeft = (y0 * FRAME.width + x0) * 2
      const topRight = (y0 * FRAME.width + x1) * 2
      const bottomLeft = (y1 * FRAME.width + x0) * 2
      const bottomRight = (y1 * FRAME.width + x1) * 2
      const indexes = [topLeft, topRight, bottomLeft, bottomRight]

      if (indexes.some((index) => (
        componentBytes[index] === FRAME.nodata || componentBytes[index + 1] === FRAME.nodata
      ))) return false

      target.eastward = interpolateComponent(
        componentBytes[topLeft], componentBytes[topRight],
        componentBytes[bottomLeft], componentBytes[bottomRight], xWeight, yWeight,
      )
      target.northward = interpolateComponent(
        componentBytes[topLeft + 1], componentBytes[topRight + 1],
        componentBytes[bottomLeft + 1], componentBytes[bottomRight + 1], xWeight, yWeight,
      )
      return true
    }

    function resetParticle(particle, randomAge = false) {
      particle.x = Math.random() * displayWidth
      particle.y = Math.random() * displayHeight
      particle.age = randomAge ? Math.floor(Math.random() * 180) : 0
      particle.life = 105 + Math.floor(Math.random() * 135)
    }

    function drawArrows() {
      context.clearRect(0, 0, displayWidth, displayHeight)
      context.strokeStyle = '#6f6761'
      context.globalAlpha = 0.4
      context.lineWidth = 1
      const wind = {}

      for (let y = 30; y < displayHeight; y += 42) {
        for (let x = 30; x < displayWidth; x += 42) {
          if (!sampleWind(x, y, wind)) continue
          const speed = Math.hypot(wind.eastward, wind.northward)
          if (speed < 0.2) continue
          const length = Math.min(17, 5 + speed * 0.55)
          const angle = Math.atan2(-wind.northward, wind.eastward)
          const endX = x + Math.cos(angle) * length
          const endY = y + Math.sin(angle) * length
          context.beginPath()
          context.moveTo(x, y)
          context.lineTo(endX, endY)
          context.lineTo(endX - Math.cos(angle - 0.55) * 4, endY - Math.sin(angle - 0.55) * 4)
          context.moveTo(endX, endY)
          context.lineTo(endX - Math.cos(angle + 0.55) * 4, endY - Math.sin(angle + 0.55) * 4)
          context.stroke()
        }
      }
    }

    function resize() {
      displayWidth = window.innerWidth
      displayHeight = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(displayWidth * ratio)
      canvas.height = Math.round(displayHeight * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, displayWidth, displayHeight)

      const coverScale = Math.max(displayWidth / FRAME.imageWidth, displayHeight / FRAME.imageHeight)
      const offsetX = (displayWidth - FRAME.imageWidth * coverScale) / 2
      const offsetY = (displayHeight - FRAME.imageHeight * coverScale) / 2
      columnScale = (FRAME.width - 1) / (FRAME.imageWidth * coverScale)
      columnOffset = -offsetX * columnScale
      rows = new Float32Array(displayHeight + 1)

      for (let y = 0; y <= displayHeight; y += 1) {
        const imageY = (y - offsetY) / coverScale
        const projected = northMercator - imageY / FRAME.imageHeight * (northMercator - southMercator)
        const latitude = Math.atan(Math.sinh(projected)) * 180 / Math.PI
        rows[y] = (FRAME.bounds.north - latitude) / 0.25
      }

      const count = Math.max(125, Math.min(565, Math.round(displayWidth * displayHeight / 2756)))
      particles = Array.from({ length: count }, () => {
        const particle = {}
        resetParticle(particle, true)
        return particle
      })
      if (reducedMotion && componentBytes) drawArrows()
    }

    function animate(now) {
      if (stopped) return
      const elapsed = Math.min(32, Math.max(8, now - lastFrame || 16))
      lastFrame = now
      context.globalAlpha = 0.07
      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = '#000'
      context.fillRect(0, 0, displayWidth, displayHeight)
      context.globalCompositeOperation = 'source-over'
      context.strokeStyle = '#6f6761'
      context.lineWidth = 0.85
      context.lineCap = 'round'

      for (const particle of particles) {
        if (!sampleWind(particle.x, particle.y, particle) || particle.age++ > particle.life) {
          resetParticle(particle)
          continue
        }
        const previousX = particle.x
        const previousY = particle.y
        const movement = 0.052 * elapsed / 16
        particle.x += particle.eastward * movement
        particle.y -= particle.northward * movement
        if (particle.x < 0 || particle.x > displayWidth || particle.y < 0 || particle.y > displayHeight) {
          resetParticle(particle)
          continue
        }
        const speed = Math.hypot(particle.eastward, particle.northward)
        context.globalAlpha = Math.min(0.4, 0.16 + speed / 80)
        context.beginPath()
        context.moveTo(previousX, previousY)
        context.lineTo(particle.x, particle.y)
        context.stroke()
      }
      animationFrame = window.requestAnimationFrame(animate)
    }

    async function start() {
      const response = await fetch(FRAME.path)
      if (!response.ok) throw new Error(`Frozen wind frame returned HTTP ${response.status}`)
      const bytes = new Uint8Array(await response.arrayBuffer())
      if (bytes.byteLength !== FRAME.width * FRAME.height * 2) {
        throw new Error('Frozen wind frame has an unexpected size')
      }
      if (stopped) return
      componentBytes = bytes
      resize()
      window.addEventListener('resize', resize, { passive: true })
      if (reducedMotion) drawArrows()
      else animationFrame = window.requestAnimationFrame(animate)
    }

    start().catch((error) => {
      if (!stopped) console.error('Unable to load the IFS background:', error)
    })

    return () => {
      stopped = true
      window.removeEventListener('resize', resize)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className={styles.background} aria-hidden="true">
      <img
        className={styles.relief}
        src="/ifs-background/cape-relief.webp"
        alt=""
        decoding="async"
      />
      <canvas ref={canvasRef} className={styles.wind} />
    </div>
  )
}
