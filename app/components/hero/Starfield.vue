<script setup lang="ts">
import * as THREE from "three"

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let points: THREE.Points | null = null
let geometry: THREE.BufferGeometry | null = null
let material: THREE.PointsMaterial | null = null
let frameId = 0
const twinkleSeed = Math.random() * Math.PI * 2

const container = ref<HTMLDivElement | null>(null)

type StarfieldProps = {
	count?: number
	size?: number
	opacity?: number
	color?: string
	spread?: number
	speedX?: number
	speedY?: number
	additive?: boolean
	twinkle?: boolean
	twinkleSpeed?: number
	twinkleAmount?: number
}

const props = withDefaults(defineProps<StarfieldProps>(), {
	count: 1200,
	size: 0.02,
	opacity: 0.5,
	color: "#ffffff",
	spread: 40,
	speedX: 0.0002,
	speedY: 0.00045,
	additive: false,
	twinkle: false,
	twinkleSpeed: 1.2,
	twinkleAmount: 0.12,
})

function shouldDisableOnMobile() {
	return window.matchMedia("(pointer: coarse)").matches
}

function init() {
	if (!container.value) return

	const width = container.value.clientWidth
	const height = container.value.clientHeight

	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
	camera.position.z = 5

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
	})
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.setSize(width, height)
	renderer.setClearColor(0x000000, 0)

	container.value.appendChild(renderer.domElement)

	// ⭐ Stars
	geometry = new THREE.BufferGeometry()
	const starCount = props.count
	const positions = new Float32Array(starCount * 3)

	for (let i = 0; i < starCount; i++) {
		const i3 = i * 3
		positions[i3] = (Math.random() - 0.5) * props.spread
		positions[i3 + 1] = (Math.random() - 0.5) * props.spread
		positions[i3 + 2] = (Math.random() - 0.5) * props.spread
	}

	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

	material = new THREE.PointsMaterial({
		color: new THREE.Color(props.color),
		size: props.size,
		transparent: true,
		opacity: props.opacity,
		depthWrite: false,
		blending: props.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
	})

	points = new THREE.Points(geometry, material)
	scene.add(points)

	animate()
}

function animate() {
	if (!renderer || !scene || !camera || !points || !material) return

	points.rotation.y += props.speedY
	points.rotation.x += props.speedX

	if (props.twinkle) {
		const t = performance.now() * 0.001 * props.twinkleSpeed
		const nextOpacity =
			props.opacity + Math.sin(t + twinkleSeed) * props.twinkleAmount
		material.opacity = Math.max(0.05, Math.min(1, nextOpacity))
	}

	renderer.render(scene, camera)
	frameId = requestAnimationFrame(animate)
}

function onResize() {
	if (!container.value || !camera || !renderer) return
	const w = container.value.clientWidth
	const h = container.value.clientHeight
	camera.aspect = w / h
	camera.updateProjectionMatrix()
	renderer.setSize(w, h)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

onMounted(() => {
	if (shouldDisableOnMobile()) return
	init()
	window.addEventListener("resize", onResize)
})

onBeforeUnmount(() => {
	window.removeEventListener("resize", onResize)
	cancelAnimationFrame(frameId)
	geometry?.dispose()
	material?.dispose()
	renderer?.dispose()
	renderer = null
	scene = null
	camera = null
	points = null
	geometry = null
	material = null
})
</script>

<template>
  <div ref="container" class="pointer-events-none" />
</template>
