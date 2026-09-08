import { expect, test } from "@playwright/test"

const languages = [
	{
		code: "fr",
		path: "/",
		name: "Français",
		dir: "ltr",
		heading: "Projets",
		role: "Développeur d’outils de données",
		contact: "Échangeons",
		close: "Fermer l’image",
		expand: /^Agrandir l’image/,
		label: "Nom complet *",
	},
	{
		code: "en",
		path: "/en/",
		name: "English",
		dir: "ltr",
		heading: "Projects",
		role: "Data Tools Programmer",
		contact: "Get in touch",
		close: "Close image",
		expand: /^Enlarge image/,
		label: "Full name *",
	},
	{
		code: "ar",
		path: "/ar/",
		name: "العربية",
		dir: "rtl",
		heading: "المشاريع",
		role: "مبرمج أدوات البيانات",
		contact: "لنتواصل",
		close: "إغلاق الصورة",
		expand: /^تكبير الصورة/,
		label: "الاسم الكامل *",
	},
] as const

for (const language of languages) {
	test(`${language.code}: complete page, metadata and accessible interactions`, async ({
		page,
	}, testInfo) => {
		const errors: string[] = []
		page.on("pageerror", (error) => errors.push(error.message))
		page.on("console", (message) => {
			if (
				/Not found.*key|Cannot translate|Message compilation error/i.test(
					message.text(),
				)
			)
				errors.push(message.text())
		})
		await page.route(/^https:\/\//, (route) => route.abort())
		await page.goto(language.path)
		await expect(page.locator("html")).toHaveAttribute("lang", language.code)
		await expect(page.locator("html")).toHaveAttribute("dir", language.dir)
		await expect(page.locator("#projects h2")).toHaveText(language.heading)
		await expect(page.locator("#experience")).toContainText(language.role)
		await expect(page.locator("#contact h2")).toHaveText(language.contact)
		await expect(
			page.getByLabel(language.label, { exact: true }),
		).toBeAttached()
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			"href",
			new RegExp(
				`^https://nabster\\.dev${language.path.replace(/\/$/, "")}/?$`,
			),
		)
		for (const code of ["fr", "en", "ar"])
			await expect(page.locator(`link[hreflang="${code}"]`)).toHaveCount(1)
		await expect(page.locator("body")).not.toContainText(
			/content\.(experience|projects|about)/,
		)
		await expect
			.poll(() =>
				page.evaluate(
					() => document.documentElement.scrollWidth <= innerWidth + 1,
				),
			)
			.toBe(true)
		await page.screenshot({
			path: testInfo.outputPath(`${language.code}-header.png`),
		})
		const open = page
			.locator("#projects")
			.getByRole("button", { name: language.expand })
			.first()
		await open.press("Enter")
		const close = page
			.getByRole("dialog")
			.getByRole("button", { name: language.close })
		await expect(close).toBeFocused()
		await page.keyboard.press("Escape")
		await expect(open).toBeFocused()
		await page.reload()
		await expect(page.locator("html")).toHaveAttribute("lang", language.code)
		expect(errors).toEqual([])
	})
}

test("language controls switch the entire page and remain available on mobile", async ({
	page,
}) => {
	await page.route(/^https:\/\//, (route) => route.abort())
	await page.goto("/")
	for (const language of [languages[1], languages[2], languages[0]]) {
		const link = page
			.locator(".language-switcher")
			.getByRole("link", { name: language.name, exact: true })
		await expect(link).toBeVisible()
		await link.press("Enter")
		await expect(page.locator("html")).toHaveAttribute("lang", language.code)
		await expect(page.locator("html")).toHaveAttribute("dir", language.dir)
		await expect(page.locator("#experience")).toContainText(language.role)
		await expect(link).toHaveAttribute("aria-current", "true")
		await expect(page.locator("canvas:not(#cursor-glow)")).toHaveCount(1)
		for (const width of [320, 768, 1280]) {
			await page.setViewportSize({ width, height: 900 })
			const layout = await page.locator("header").evaluate((header) => {
				const controls = [...header.querySelectorAll("a, button")]
					.map((element) => element.getBoundingClientRect())
					.filter((rect) => rect.width > 0 && rect.height > 0)
					.sort((a, b) => a.left - b.left)
				return {
					oneRow: controls.every(
						(rect) =>
							Math.abs(
								rect.top +
									rect.height / 2 -
									(controls[0].top + controls[0].height / 2),
							) < 2,
					),
					fits: controls.every(
						(rect, index) =>
							rect.left >= 0 &&
							rect.right <= innerWidth &&
							(index === 0 || rect.left >= controls[index - 1].right),
					),
				}
			})
			expect(layout, `${language.code} navbar at ${width}px`).toEqual({
				oneRow: true,
				fits: true,
			})
		}
	}
})
