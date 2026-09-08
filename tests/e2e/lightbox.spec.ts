import { expect, test } from "@playwright/test"

for (const section of ["projects", "misc"]) {
	test(`${section}: lightbox covers the viewport and closes correctly`, async ({
		page,
	}, testInfo) => {
		const errors: string[] = []
		const hydrationWarnings: string[] = []
		page.on("pageerror", (error) => errors.push(error.message))
		page.on("console", (message) => {
			if (/teleport/i.test(message.text())) errors.push(message.text())
			if (/hydration/i.test(message.text()))
				hydrationWarnings.push(message.text())
		})
		// Keep these local UI tests independent of analytics and the icon CDN.
		await page.route(/^https:\/\//, (route) => route.abort())
		await page.goto("/")
		const modal = page.locator(".misc-modal")
		await expect(modal).toHaveCount(0)

		const thumbnail = page
			.locator(
				`#${section} .${section === "projects" ? "media-wrap" : "misc-card__media"}`,
			)
			.first()
		const source = await thumbnail
			.locator("img")
			.evaluate((img: HTMLImageElement) => img.src)
		await thumbnail.click()
		await expect(modal).toBeVisible()
		await expect(modal.locator("img")).toHaveJSProperty("src", source)
		await expect
			.poll(() => page.evaluate(() => window.scrollY))
			.toBeGreaterThan(0)
		await expect
			.poll(async () => {
				const box = await modal.boundingBox()
				const viewport = page.viewportSize()
				return (
					box &&
					viewport &&
					Math.abs(box.x) < 1 &&
					Math.abs(box.y) < 1 &&
					Math.abs(box.width - viewport.width) < 1 &&
					Math.abs(box.height - viewport.height) < 1
				)
			})
			.toBe(true)

		await modal.locator("img").click()
		await expect(modal).toBeVisible()
		await modal.locator("button").click()
		await expect(modal).toHaveCount(0)
		await thumbnail.click()
		await expect(modal).toBeVisible()
		await modal.click({ position: { x: 5, y: 5 } })
		await expect(modal).toHaveCount(0)
		// Existing page-wide image/icon hydration warnings are outside this fix.
		if (hydrationWarnings.length) {
			await testInfo.attach("page-hydration-warnings", {
				body: hydrationWarnings.join("\n\n"),
				contentType: "text/plain",
			})
		}
		expect(errors).toEqual([])
	})
}
