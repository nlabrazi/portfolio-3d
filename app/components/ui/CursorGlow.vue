<script setup lang="ts">
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let raf = 0

const mouse = { x: 0, y: 0 }
const pos = { x: 0, y: 0 }

let last = { x: 0, y: 0, t: 0 }
let hue = 220 // base bleu
const bursts: Array<{ x: number; y: number; t: number; h: number }> = []
const burstDuration = 520

function resize() {
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function onMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onClick(e: PointerEvent) {
  bursts.push({
    x: e.clientX,
    y: e.clientY,
    t: performance.now(),
    h: Math.floor(Math.random() * 360),
  })
  if (bursts.length > 8) bursts.shift()
}

function draw() {
  if (!ctx || !canvas) return

  // 1) légère traînée (on garde un fond noir très transparent)
  ctx.globalCompositeOperation = "source-over"
  ctx.fillStyle = "rgba(0,0,0,0.10)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 2) smooth follow
  pos.x += (mouse.x - pos.x) * 0.12
  pos.y += (mouse.y - pos.y) * 0.12

  // 3) spped & variation de teinte (effet vivant)
  const now = performance.now()
  const dt = Math.max(16, now - (last.t || now))
  const vx = (pos.x - last.x) / dt
  const vy = (pos.y - last.y) / dt
  const speed = Math.min(1, Math.sqrt(vx * vx + vy * vy) * 35)

  // Hue se balade entre ~210 (bleu) et ~270 (violet)
  hue += (210 + speed * 60 - hue) * 0.06

  last = { x: pos.x, y: pos.y, t: now }

  // 4) glow en 2 couches (outer + inner)
  ctx.globalCompositeOperation = "lighter"

  const outer = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 90)
  outer.addColorStop(0, `hsla(${hue}, 95%, 65%, ${0.12 + speed * 0.1})`)
  outer.addColorStop(0.45, `hsla(${hue + 10}, 95%, 60%, 0.05)`)
  outer.addColorStop(1, "rgba(0,0,0,0)")

  ctx.fillStyle = outer
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 90, 0, Math.PI * 2)
  ctx.fill()

  const inner = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 32)
  inner.addColorStop(0, `hsla(${hue + 20}, 95%, 70%, ${0.16 + speed * 0.16})`)
  inner.addColorStop(1, "rgba(0,0,0,0)")

  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 32, 0, Math.PI * 2)
  ctx.fill()

  const nowBurst = performance.now()
  for (let i = bursts.length - 1; i >= 0; i--) {
    const burst = bursts[i]
    const age = (nowBurst - burst.t) / burstDuration
    if (age >= 1) {
      bursts.splice(i, 1)
      continue
    }

    const life = 1 - age
    const radius = 18 + age * 130
    const glow = ctx.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, radius * 0.8)
    glow.addColorStop(0, `hsla(${burst.h}, 95%, 70%, ${life * 0.7})`)
    glow.addColorStop(1, `hsla(${burst.h}, 95%, 70%, 0)`)

    ctx.beginPath()
    ctx.fillStyle = glow
    ctx.arc(burst.x, burst.y, radius * 0.35, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.strokeStyle = `hsla(${burst.h}, 95%, 70%, ${life * 0.95})`
    ctx.lineWidth = 3 * life
    ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2)
    ctx.stroke()
  }

  raf = requestAnimationFrame(draw)
}

onMounted(() => {
  // Désactiver sur mobile/touch
  if (window.matchMedia("(pointer: coarse)").matches) return

  canvas = document.getElementById("cursor-glow") as HTMLCanvasElement | null
  if (!canvas) return

  ctx = canvas.getContext("2d")
  if (!ctx) return

  resize()
  window.addEventListener("resize", resize)
  window.addEventListener("mousemove", onMove)
  window.addEventListener("pointerdown", onClick, { passive: true })

  // init position pour éviter un glow au coin (0,0)
  mouse.x = window.innerWidth / 2
  mouse.y = window.innerHeight / 2
  pos.x = mouse.x
  pos.y = mouse.y

  draw()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize)
  window.removeEventListener("mousemove", onMove)
  window.removeEventListener("pointerdown", onClick)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <canvas id="cursor-glow" class="pointer-events-none fixed inset-0 z-[1] opacity-80 mix-blend-screen" />
</template>
