import * as THREE from "three"

export type StarfieldLayerOptions = {
	count: number
	size: number
	opacity: number
	color: string
	spread: number
	// Radians per second, matching the original animation at 244 Hz.
	speedX: number
	speedY: number
	additive: boolean
	twinkleSpeed: number
	twinkleAmount: number
}

export const starfieldLayers: readonly StarfieldLayerOptions[] = [
	{
		count: 1400,
		size: 0.018,
		opacity: 0.35,
		color: "#bcdcff",
		spread: 50,
		speedX: 0.0244,
		speedY: 0.0732,
		additive: false,
		twinkleSpeed: 0,
		twinkleAmount: 0,
	},
	{
		count: 800,
		size: 0.05,
		opacity: 0.25,
		color: "#ffd3a3",
		spread: 35,
		speedX: -0.061,
		speedY: 0.1342,
		additive: true,
		twinkleSpeed: 1.3,
		twinkleAmount: 0.15,
	},
]

export function createStarfieldLayer(
	options: StarfieldLayerOptions,
	renderOrder: number,
) {
	const positions = new Float32Array(options.count * 3)
	for (let i = 0; i < positions.length; i++) {
		positions[i] = (Math.random() - 0.5) * options.spread
	}
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
	const material = new THREE.PointsMaterial({
		color: options.color,
		size: options.size,
		transparent: true,
		opacity: options.opacity,
		depthWrite: false,
		depthTest: false,
		blending: options.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
	})
	const points = new THREE.Points(geometry, material)
	points.renderOrder = renderOrder
	return {
		points,
		options,
		elapsed: 0,
		twinkleSeed: Math.random() * Math.PI * 2,
	}
}

export type StarfieldLayer = ReturnType<typeof createStarfieldLayer>

export function advanceStarfieldLayer(
	layer: StarfieldLayer,
	deltaSeconds: number,
) {
	// Avoid catching up an entire background-tab pause in one frame.
	layer.elapsed += Math.max(0, Math.min(deltaSeconds, 0.1))
	layer.points.rotation.x = layer.options.speedX * layer.elapsed
	layer.points.rotation.y = layer.options.speedY * layer.elapsed
	if (layer.options.twinkleAmount) {
		const phase = layer.elapsed * layer.options.twinkleSpeed + layer.twinkleSeed
		layer.points.material.opacity = THREE.MathUtils.clamp(
			layer.options.opacity + Math.sin(phase) * layer.options.twinkleAmount,
			0.05,
			1,
		)
	}
}

export function disposeStarfieldLayer(layer: StarfieldLayer) {
	layer.points.removeFromParent()
	layer.points.geometry.dispose()
	layer.points.material.dispose()
}
