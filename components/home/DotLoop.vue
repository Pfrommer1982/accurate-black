<script setup lang="ts">
const MAX_PIXEL_WIDTH = 1600
const MAX_PIXEL_HEIGHT = 1400
const FRAME_INTERVAL = 1000 / 30
const LOOP_DURATION = 24000

const host = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

let context: CanvasRenderingContext2D | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let animationFrame = 0
let previousFrame = 0
let logicalWidth = 1
let logicalHeight = 1
let columns = 32
let rows = 20
let isIntersecting = false
let pageVisible = true
let reduceMotion = false
let pointerX = .5
let pointerY = .5
let pointerStrength = 0
let targetPointerX = .5
let targetPointerY = .5
let targetPointerStrength = 0
let rippleX = .5
let rippleY = .5
let rippleStartedAt = -1e12

const clamp = (value: number, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value))
const smoothstep = (edgeA: number, edgeB: number, value: number) => {
  const position = clamp((value - edgeA) / (edgeB - edgeA))
  return position * position * (3 - 2 * position)
}

const drawDot = (x: number, y: number, radius: number, alpha: number, signal: boolean) => {
  if (!context || alpha <= .006 || x < -4 || x > logicalWidth + 4 || y < -4 || y > logicalHeight + 4) return
  context.beginPath()
  context.fillStyle = signal
    ? `rgb(154 164 157 / ${alpha})`
    : `rgb(241 239 233 / ${alpha})`
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

const draw = (timestamp = 0) => {
  if (!context) return
  context.clearRect(0, 0, logicalWidth, logicalHeight)

  pointerX += (targetPointerX - pointerX) * .055
  pointerY += (targetPointerY - pointerY) * .055
  pointerStrength += (targetPointerStrength - pointerStrength) * .07

  const mobile = logicalWidth < 600
  const phase = reduceMotion
    ? Math.PI * .68
    : ((timestamp % LOOP_DURATION) / LOOP_DURATION) * Math.PI * 2
  const fieldTop = logicalHeight * .22
  const fieldDepth = logicalHeight * .62
  const amplitude = mobile ? 15 : Math.min(40, logicalWidth * .029)
  const pressAge = (timestamp - rippleStartedAt) / 1000
  const rippleActive = !reduceMotion && pressAge >= 0 && pressAge < 3.2

  for (let row = 0; row < rows; row += 1) {
    const depth = row / Math.max(1, rows - 1)
    const perspective = .28 + depth * .98
    const baseY = fieldTop + Math.pow(depth, .84) * fieldDepth

    for (let column = 0; column < columns; column += 1) {
      const across = column / Math.max(1, columns - 1)
      const centeredX = across * 2 - 1
      const projectedX = logicalWidth * .51 + centeredX * logicalWidth * .53 * perspective

      const waveA = Math.sin(centeredX * Math.PI * 2.15 + phase)
      const waveB = Math.sin(depth * Math.PI * 3.2 - phase * 2) * .48
      const waveC = Math.cos((centeredX * .72 + depth) * Math.PI * 2.35 + phase) * .3
      let lift = (waveA + waveB + waveC) * amplitude * (.35 + depth * .65)

      const pointerDistanceX = (projectedX / logicalWidth - pointerX) * 1.25
      const pointerDistanceY = (baseY / logicalHeight - pointerY) * 1.75
      const pointerDistanceSquared = pointerDistanceX ** 2 + pointerDistanceY ** 2
      lift += Math.exp(-pointerDistanceSquared / .028) * amplitude * 1.25 * pointerStrength

      if (rippleActive) {
        const rippleDistanceX = (projectedX / logicalWidth - rippleX) * logicalWidth
        const rippleDistanceY = (baseY / logicalHeight - rippleY) * logicalHeight
        const rippleDistance = Math.hypot(rippleDistanceX, rippleDistanceY)
        const rippleEnvelope = Math.exp(-pressAge * 1.35) * Math.exp(-rippleDistance / 460)
        lift += Math.sin(rippleDistance * .035 - pressAge * 5.2) * amplitude * .55 * rippleEnvelope
      }

      const y = baseY - lift
      const normalizedY = y / logicalHeight
      const sideFade = smoothstep(0, .08, across) * (1 - smoothstep(.92, 1, across))
      const verticalFade = smoothstep(.18, .3, normalizedY) * (1 - smoothstep(.68, .88, normalizedY))
      const thesisTextFade = normalizedY < .43 && projectedX < logicalWidth * .62 ? .58 : 1
      const catalogueFade = normalizedY > .57 ? .76 : 1
      const combinedWave = waveA + waveB + waveC
      const crestBoost = 1 + smoothstep(.68, 1.34, combinedWave) * .52
      const alpha = (.065 + depth * .19) * sideFade * verticalFade * thesisTextFade * catalogueFade * crestBoost

      const ridgeValue = Math.sin(centeredX * Math.PI * 1.8 + depth * Math.PI * 2.1 - phase)
      const signalRidge = ridgeValue > .86 && normalizedY > .38 && normalizedY < .62
      const radius = (mobile ? .54 : .66) + depth * (mobile ? .62 : 1.02)
      drawDot(projectedX, y, radius, signalRidge ? alpha * 1.22 : alpha, signalRidge)
    }
  }
}

const animate = (timestamp: number) => {
  animationFrame = 0
  if (!isIntersecting || !pageVisible || reduceMotion) return

  if (timestamp - previousFrame >= FRAME_INTERVAL) {
    previousFrame = timestamp
    draw(timestamp)
  }

  animationFrame = requestAnimationFrame(animate)
}

const start = () => {
  if (animationFrame || !isIntersecting || !pageVisible || reduceMotion) return
  animationFrame = requestAnimationFrame(animate)
}

const stop = () => {
  if (!animationFrame) return
  cancelAnimationFrame(animationFrame)
  animationFrame = 0
}

const resize = () => {
  if (!host.value || !canvas.value) return
  const bounds = host.value.getBoundingClientRect()
  logicalWidth = Math.max(1, bounds.width)
  logicalHeight = Math.max(1, bounds.height)

  if (logicalWidth < 600) {
    columns = 24
    rows = 14
  } else if (logicalWidth < 1100) {
    columns = 28
    rows = 18
  } else {
    columns = 32
    rows = 20
  }

  const scale = Math.max(.25, Math.min(
    window.devicePixelRatio || 1,
    1.35,
    MAX_PIXEL_WIDTH / logicalWidth,
    MAX_PIXEL_HEIGHT / logicalHeight,
  ))

  canvas.value.width = Math.round(logicalWidth * scale)
  canvas.value.height = Math.round(logicalHeight * scale)
  context = canvas.value.getContext('2d', { alpha: true })
  context?.setTransform(scale, 0, 0, scale, 0, 0)
  draw(previousFrame)
}

const pointerPosition = (event: PointerEvent): { x: number, y: number, inside: boolean } => {
  const bounds = host.value?.getBoundingClientRect()
  if (!bounds) return { x: .5, y: .5, inside: false }

  const x = (event.clientX - bounds.left) / Math.max(1, bounds.width)
  const y = (event.clientY - bounds.top) / Math.max(1, bounds.height)
  return { x, y, inside: x >= 0 && x <= 1 && y >= 0 && y <= 1 }
}

const handlePointerMove = (event: PointerEvent) => {
  if (!isIntersecting || reduceMotion || event.pointerType === 'touch') return
  const position = pointerPosition(event)
  targetPointerStrength = position.inside ? 1 : 0
  if (!position.inside) return
  targetPointerX = position.x
  targetPointerY = position.y
}

const handlePointerDown = (event: PointerEvent) => {
  if (!isIntersecting || reduceMotion) return
  const position = pointerPosition(event)
  if (!position.inside) return
  rippleX = position.x
  rippleY = position.y
  rippleStartedAt = performance.now()
}

const handleVisibility = () => {
  pageVisible = document.visibilityState === 'visible'
  if (pageVisible) start()
  else stop()
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resizeObserver = new ResizeObserver(resize)
  if (host.value) resizeObserver.observe(host.value)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    isIntersecting = entry?.isIntersecting ?? false
    if (isIntersecting) start()
    else stop()
  }, { rootMargin: '240px 0px', threshold: 0 })
  if (host.value) intersectionObserver.observe(host.value)

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerdown', handlePointerDown, { passive: true })
  document.addEventListener('visibilitychange', handleVisibility)
  resize()
  if (reduceMotion) draw()
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerdown', handlePointerDown)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <div ref="host" class="signal-topography" aria-hidden="true">
    <canvas ref="canvas" class="signal-topography__canvas" />
  </div>
</template>

<style scoped>
.signal-topography {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.signal-topography__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

@media (width < 768px) {
  .signal-topography__canvas { opacity: .76; }
}

@media (prefers-reduced-motion: reduce) {
  .signal-topography__canvas { opacity: .74; }
}
</style>
