<script setup lang="ts">
import * as THREE from "three"

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let points: THREE.Points | null = null
let frameId = 0

const container = ref<HTMLDivElement | null>(null)

function init() {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  // ⭐ Stars
  const geometry = new THREE.BufferGeometry()
  const starCount = 1500
  const positions = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 40
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    transparent: true,
    opacity: 0.6
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)

  animate()
}

function animate() {
  if (!renderer || !scene || !camera || !points) return

  points.rotation.y += 0.0005
  points.rotation.x += 0.0002

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
}

onMounted(() => {
  init()
  window.addEventListener("resize", onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize)
  cancelAnimationFrame(frameId)
  renderer?.dispose()
  renderer = null
})
</script>

<template>
  <div ref="container" class="absolute inset-0 z-0 pointer-events-none" />
</template>
