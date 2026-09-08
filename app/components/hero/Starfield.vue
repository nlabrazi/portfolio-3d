<script setup lang="ts">
import * as THREE from "three"
import {
	advanceStarfieldLayer,
	createStarfieldLayer,
	disposeStarfieldLayer,
	type StarfieldLayer,
	starfieldLayers,
} from "~/utils/starfield"

const container = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let layers: StarfieldLayer[] = []
let frameId = 0
let lastTimestamp: number | null = null

function animate(timestamp: number) {
	if (!renderer || !scene || !camera) return
	const deltaSeconds = lastTimestamp === null ? 0 : (timestamp - lastTimestamp) / 1000
	lastTimestamp = timestamp
	for (const layer of layers) advanceStarfieldLayer(layer, deltaSeconds)
	renderer.render(scene, camera)
	frameId = requestAnimationFrame(animate)
}

function onResize() {
	if (!container.value || !camera || !renderer) return
	const width = container.value.clientWidth
	const height = container.value.clientHeight
	if (!width || !height) return
	camera.aspect = width / height
	camera.updateProjectionMatrix()
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.setSize(width, height)
}

onMounted(() => {
	if (!container.value) return
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
	camera.position.z = 5
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
	renderer.setClearColor(0x000000, 0)
	layers = starfieldLayers.map(createStarfieldLayer)
	for (const layer of layers) scene.add(layer.points)
	container.value.appendChild(renderer.domElement)
	onResize()
	window.addEventListener("resize", onResize)
	frameId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
	window.removeEventListener("resize", onResize)
	cancelAnimationFrame(frameId)
	for (const layer of layers) disposeStarfieldLayer(layer)
	layers = []
	renderer?.dispose()
	renderer?.domElement.remove()
	renderer = null
	scene = null
	camera = null
	lastTimestamp = null
})
</script>

<template>
  <div ref="container" class="starfield pointer-events-none" aria-hidden="true" />
</template>
