import assert from "node:assert/strict"
import { test } from "node:test"
import * as THREE from "three"
import {
	advanceStarfieldLayer,
	createStarfieldLayer,
	disposeStarfieldLayer,
	starfieldLayers,
} from "../../app/utils/starfield.ts"

function createLayers() {
	return starfieldLayers.map(createStarfieldLayer)
}

test("both star layers retain their density, color and blending", () => {
	const layers = createLayers()
	try {
		assert.deepEqual(
			layers.map(
				(layer) => layer.points.geometry.getAttribute("position").count,
			),
			[1400, 800],
		)
		assert.deepEqual(
			layers.map((layer) => layer.points.material.color.getHexString()),
			["bcdcff", "ffd3a3"],
		)
		assert.deepEqual(
			layers.map((layer) => layer.points.material.size),
			[0.018, 0.05],
		)
		assert.deepEqual(
			layers.map((layer) => layer.points.material.blending),
			[THREE.NormalBlending, THREE.AdditiveBlending],
		)
		assert.ok(layers[0].points.renderOrder < layers[1].points.renderOrder)
	} finally {
		layers.forEach(disposeStarfieldLayer)
	}
})

test("30 to 244 Hz preserve the original 244 Hz rotation speed and twinkle", () => {
	for (const fps of [30, 60, 120, 144, 240, 244]) {
		const layers = createLayers()
		try {
			for (const layer of layers) layer.twinkleSeed = 0
			for (let frame = 0; frame < fps * 10; frame++) {
				for (const layer of layers) advanceStarfieldLayer(layer, 1 / fps)
			}
			for (const [index, [x, y]] of [
				[0.244, 0.732],
				[-0.61, 1.342],
			].entries()) {
				assert.ok(Math.abs(layers[index].points.rotation.x - x) < 1e-10)
				assert.ok(Math.abs(layers[index].points.rotation.y - y) < 1e-10)
			}
			assert.equal(layers[0].points.material.opacity, 0.35)
			assert.ok(
				Math.abs(
					layers[1].points.material.opacity - (0.25 + Math.sin(13) * 0.15),
				) < 1e-10,
			)
		} finally {
			layers.forEach(disposeStarfieldLayer)
		}
	}
})

test("resuming after a long pause does not cause a large rotation jump", () => {
	const layers = createLayers()
	try {
		for (const layer of layers) {
			advanceStarfieldLayer(layer, 60)
			assert.ok(Math.abs(layer.points.rotation.y) < 0.014)
		}
	} finally {
		layers.forEach(disposeStarfieldLayer)
	}
})

test("cleanup removes both layers and disposes their GPU resources", () => {
	const scene = new THREE.Scene()
	const layers = createLayers()
	let geometriesDisposed = 0
	let materialsDisposed = 0
	for (const layer of layers) {
		scene.add(layer.points)
		layer.points.geometry.addEventListener(
			"dispose",
			() => geometriesDisposed++,
		)
		layer.points.material.addEventListener("dispose", () => materialsDisposed++)
	}
	layers.forEach(disposeStarfieldLayer)
	assert.equal(scene.children.length, 0)
	assert.equal(geometriesDisposed, 2)
	assert.equal(materialsDisposed, 2)
})
