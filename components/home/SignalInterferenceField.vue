<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)

let context: CanvasRenderingContext2D | null = null
let frameId: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null
let isIntersecting = false

interface PhaseLine {
  y: number
  amplitude: number
  frequency: number
  phase: number
  speed: number
  opacity: number
}

const phaseLines: PhaseLine[] = [
  { y: .2, amplitude: .032, frequency: 7.2, phase: .3, speed: .00034, opacity: .11 },
  { y: .34, amplitude: .055, frequency: 4.6, phase: 2.4, speed: -.00025, opacity: .16 },
  { y: .5, amplitude: .025, frequency: 10.8, phase: 4.1, speed: .00018, opacity: .09 },
  { y: .65, amplitude: .048, frequency: 5.7, phase: 1.2, speed: -.00031, opacity: .14 },
  { y: .8, amplitude: .03, frequency: 8.4, phase: 5.2, speed: .00022, opacity: .1 },
]

const stopAnimation = () => {
  if (frameId !== null) cancelAnimationFrame(frameId)
  frameId = null
}

const draw = (time = 0) => {
  const element = canvas.value
  if (!element || !context) return

  const width = element.clientWidth
  const height = element.clientHeight
  const mobile = width < 768
  const elapsed = motionQuery?.matches ? 16000 : time
  const visibleLines = mobile ? phaseLines.slice(1, 4) : phaseLines

  context.clearRect(0, 0, width, height)
  context.lineCap = 'butt'

  for (const line of visibleLines) {
    context.beginPath()
    for (let x = 0; x <= width + 6; x += mobile ? 7 : 5) {
      const position = x / Math.max(width, 1)
      const primary = Math.sin(position * Math.PI * line.frequency + line.phase + elapsed * line.speed)
      const interference = Math.sin(position * Math.PI * (line.frequency * 2.35) - elapsed * line.speed * .62 + line.phase) * .32
      const y = height * line.y + (primary + interference) * height * line.amplitude
      if (x === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.strokeStyle = `rgba(241, 239, 233, ${line.opacity})`
    context.lineWidth = 1
    context.stroke()
  }

  const scanX = ((elapsed * .000018) % 1) * width
  context.fillStyle = 'rgba(241, 239, 233, .055)'
  context.fillRect(scanX, height * .08, 1, height * .84)
}

const animate = (time: number) => {
  frameId = null
  draw(time)
  if (isIntersecting && !document.hidden && !motionQuery?.matches) frameId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  stopAnimation()
  if (motionQuery?.matches) {
    draw()
    return
  }
  if (isIntersecting && !document.hidden) frameId = requestAnimationFrame(animate)
}

const resize = () => {
  const element = canvas.value
  if (!element) return
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
  const width = Math.max(1, Math.round(element.clientWidth))
  const height = Math.max(1, Math.round(element.clientHeight))
  element.width = Math.round(width * ratio)
  element.height = Math.round(height * ratio)
  context = element.getContext('2d')
  context?.setTransform(ratio, 0, 0, ratio, 0, 0)
  draw()
}

const handleVisibility = () => {
  if (document.hidden) stopAnimation()
  else startAnimation()
}

onMounted(() => {
  const element = canvas.value
  if (!element) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(element)
  intersectionObserver = new IntersectionObserver(([entry]) => {
    isIntersecting = Boolean(entry?.isIntersecting)
    if (isIntersecting) startAnimation()
    else stopAnimation()
  }, { rootMargin: '160px 0px' })
  intersectionObserver.observe(element)
  motionQuery.addEventListener('change', startAnimation)
  document.addEventListener('visibilitychange', handleVisibility)
  resize()
})

onBeforeUnmount(() => {
  stopAnimation()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  motionQuery?.removeEventListener('change', startAnimation)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <canvas ref="canvas" class="signal-interference-field" aria-hidden="true" />
</template>

<style scoped>
.signal-interference-field {
  width: 100%;
  height: 100%;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%);
  opacity: .88;
}

@media (width < 768px) {
  .signal-interference-field { opacity: .7; }
}

@media (prefers-reduced-motion: reduce) {
  .signal-interference-field { opacity: .58; }
}
</style>
