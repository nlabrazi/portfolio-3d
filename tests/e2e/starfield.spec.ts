import { expect, test } from "@playwright/test"

test("both star layers animate in one full-screen canvas, including after resize", async ({
	page,
}, testInfo) => {
	const errors: string[] = []
	page.on("pageerror", (error) => errors.push(error.message))
	await page.route(/^https:\/\//, (route) => route.abort())
	await page.addInitScript(() => {
		const counts: number[] = []
		Object.defineProperty(window, "__starfieldDrawCounts", { value: counts })
		for (const context of [WebGLRenderingContext, WebGL2RenderingContext]) {
			const drawArrays = context.prototype.drawArrays
			context.prototype.drawArrays = function (mode, first, count) {
				if (mode === this.POINTS && counts.length < 100) counts.push(count)
				return drawArrays.call(this, mode, first, count)
			}
		}
	})
	await page.goto("/")
	const stars = page.locator("canvas:not(#cursor-glow)")
	await expect(stars).toHaveCount(1)
	await expect(stars).toBeVisible()
	await expect
		.poll(() =>
			page.evaluate(() => {
				const counts = (
					window as unknown as { __starfieldDrawCounts: number[] }
				).__starfieldDrawCounts
				return (
					counts.filter((count) => count === 1400).length >= 2 &&
					counts.filter((count) => count === 800).length >= 2
				)
			}),
		)
		.toBe(true)
	for (const viewport of [page.viewportSize(), { width: 844, height: 390 }]) {
		if (!viewport) continue
		await page.setViewportSize(viewport)
		await expect
			.poll(() =>
				stars.evaluate((canvas: HTMLCanvasElement) => ({
					width: canvas.width,
					height: canvas.height,
				})),
			)
			.toEqual(
				await page.evaluate(() => ({
					width: Math.floor(innerWidth * Math.min(devicePixelRatio, 2)),
					height: Math.floor(innerHeight * Math.min(devicePixelRatio, 2)),
				})),
			)
		const box = await stars.boundingBox()
		expect(box).toEqual({ x: 0, y: 0, ...viewport })
		await page.screenshot({
			path: testInfo.outputPath(`stars-${viewport.width}.png`),
		})
	}
	expect(errors).toEqual([])
})
