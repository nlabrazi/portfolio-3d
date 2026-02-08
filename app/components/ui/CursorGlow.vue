<script setup lang="ts">
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let raf = 0

const mouse = { x: 0, y: 0 }
const pos = { x: 0, y: 0 }

function resize() {
	if (!canvas) return
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

function draw() {
	if (!ctx || !canvas) return

	// fade out (trail)
	ctx.fillStyle = "rgba(0,0,0,0.15)"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// smooth follow
	pos.x += (mouse.x - pos.x) * 0.12
	pos.y += (mouse.y - pos.y) * 0.12

	const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 120)

	gradient.addColorStop(0, "rgba(255,255,255,0.18)")
	gradient.addColorStop(0.4, "rgba(255,255,255,0.08)")
	gradient.addColorStop(1, "rgba(255,255,255,0)")

	ctx.beginPath()
	ctx.fillStyle = gradient
	ctx.arc(pos.x, pos.y, 120, 0, Math.PI * 2)
	ctx.fill()

	raf = requestAnimationFrame(draw)
}

function onMove(e: MouseEvent) {
	mouse.x = e.clientX
	mouse.y = e.clientY
}

onMounted(() => {
	canvas = document.getElementById("cursor-glow") as HTMLCanvasElement
	ctx = canvas.getContext("2d")

	resize()
	window.addEventListener("resize", resize)
	window.addEventListener("mousemove", onMove)

	draw()
})

onBeforeUnmount(() => {
	window.removeEventListener("resize", resize)
	window.removeEventListener("mousemove", onMove)
	cancelAnimationFrame(raf)
})
</script>

<template>
  <canvas id="cursor-glow" class="pointer-events-none fixed inset-0 z-[1]" />
</template>
