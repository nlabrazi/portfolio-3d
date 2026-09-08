import { expect, type Page, test } from "@playwright/test"

async function expectDestination(page: Page, id: string) {
	await expect(page).toHaveURL(new RegExp(`#${id}$`))
	await expect
		.poll(() =>
			page.evaluate((targetId) => {
				const heading = document.querySelector(
					`#${targetId} h1, #${targetId} h2`,
				)
				const header = document.querySelector("header")
				if (!heading || !header) return false
				const top = heading.getBoundingClientRect().top
				const headerBottom = header.getBoundingClientRect().bottom
				return top >= headerBottom && top < innerHeight
			}, id),
		)
		.toBe(true)
	// Wait for smooth scrolling to finish before the next history or focus action.
	let previousY = Number.NaN
	let stableSamples = 0
	await expect
		.poll(
			async () => {
				const y = await page.evaluate(() => scrollY)
				stableSamples = y === previousY ? stableSamples + 1 : 0
				previousY = y
				return stableSamples
			},
			{ intervals: [100] },
		)
		.toBeGreaterThanOrEqual(2)
}

for (const path of ["/", "/en/", "/ar/"]) {
	test(`${path}: all anchor entry points preserve the URL, focus and history`, async ({
		page,
	}) => {
		await page.route(/^https:\/\//, (route) => route.abort())
		await page.goto(path)
		await expect(page.locator("html")).toHaveAttribute(
			"style",
			/--header-height:/,
		)
		await expect(page.locator("#home")).toHaveCSS("opacity", "1")
		await page.locator('#home a[href="#projects"]').press("Enter")
		await expectDestination(page, "projects")
		await expect(page.locator("#projects")).toBeFocused()

		const toggle = page.locator(".nav-toggle")
		if (await toggle.isVisible()) await toggle.click()
		await page.locator('header a[href="#about"]:visible').press("Enter")
		await expectDestination(page, "about")
		await expect(page.locator("#about")).toBeFocused()
		await expect(page.locator("#mobile-menu")).toBeHidden()

		await page.goBack()
		await expectDestination(page, "projects")
		await page.goForward()
		await expectDestination(page, "about")

		await page.locator('footer a[href="#contact"]').click()
		await expectDestination(page, "contact")
		await page.locator(".to-top").press("Enter")
		await expectDestination(page, "home")
		await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
		await page.locator('#home a[href="#contact"]').click()
		await expectDestination(page, "contact")
		await page.reload()
		await expectDestination(page, "contact")
		await expect(page).toHaveURL(new RegExp(`${path}#contact$`))
	})
}

test("direct anchor links and reduced motion work before interaction", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" })
	await page.route(/^https:\/\//, (route) => route.abort())
	await page.goto("/en/#projects")
	await expectDestination(page, "projects")
	await expect
		.poll(() =>
			page.evaluate(
				() => getComputedStyle(document.documentElement).scrollBehavior,
			),
		)
		.toBe("auto")
	await page.locator(".to-top").click()
	await expectDestination(page, "home")
	await page.locator('header a[href="#home"]').first().click()
	await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
})
