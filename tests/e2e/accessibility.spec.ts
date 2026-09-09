import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
	await page.route(/^https:\/\//, (route) => route.abort())
	await page.goto("/")
})

for (const section of ["projects", "misc"]) {
	test(`${section}: keyboard opens the image, contains focus and restores it on close`, async ({
		page,
	}) => {
		const trigger = page
			.locator(`#${section}`)
			.getByRole("button", { name: /^Agrandir l’image/ })
			.first()
		await trigger.focus()
		await expect(trigger).toBeFocused()
		await page.evaluate(() => {
			document.documentElement.style.overflow = "auto"
		})
		for (const key of ["Enter", "Space"]) {
			await trigger.press(key)
			const dialog = page.getByRole("dialog", { name: /^Agrandissement :/ })
			await expect(dialog).toBeVisible()
			await expect(dialog).toHaveJSProperty("open", true)
			const close = dialog.getByRole("button", { name: "Fermer l’image" })
			await expect(close).toBeFocused()
			await page.keyboard.press("Tab")
			await expect(close).toBeFocused()
			await page.keyboard.press("Shift+Tab")
			await expect(close).toBeFocused()
			// Native modal behavior prevents even programmatic focus behind the dialog.
			await page
				.locator("header a")
				.first()
				.evaluate((link: HTMLAnchorElement) => link.focus())
			await expect(close).toBeFocused()
			await expect(page.locator("html")).toHaveCSS("overflow", "hidden")
			await expect(close).toHaveCSS("outline-style", "solid")
			await page.keyboard.press("Escape")
			await expect(dialog).toHaveCount(0)
			await expect(trigger).toBeFocused()
			await expect(page.locator("html")).toHaveCSS("overflow", "auto")
		}
	})
}

test("contact labels focus their fields and expose required inputs", async ({
	page,
}) => {
	const contact = page.locator("#contact")
	const fields = [
		["Nom complet *", "Nabil"],
		["Adresse e-mail *", "nabil@example.com"],
		["Objet *", "Projet web"],
		["Message *", "Bonjour, discutons de ce projet."],
	]
	await expect
		.poll(() =>
			contact
				.locator("form")
				.evaluate((form: HTMLFormElement) => form.checkValidity()),
		)
		.toBe(false)
	for (const [label, value] of fields) {
		const input = contact.getByLabel(label, { exact: true })
		await expect(input).toHaveJSProperty("required", true)
		await contact.locator("label").filter({ hasText: label }).click()
		await expect(input).toBeFocused()
		await input.fill(value)
	}
	await expect
		.poll(() =>
			contact
				.locator("form")
				.evaluate((form: HTMLFormElement) => form.checkValidity()),
		)
		.toBe(true)
	await expect(
		contact.getByLabel("Nom complet *", { exact: true }),
	).toHaveAttribute("autocomplete", "name")
	await expect(
		contact.getByLabel("Adresse e-mail *", { exact: true }),
	).toHaveAttribute("autocomplete", "email")
	await expect(
		contact.getByRole("button", { name: "Envoyer un message" }),
	).toHaveAccessibleDescription("Votre message est transmis via Web3Forms.")
})

test("project filters and pagination expose their selected state", async ({
	page,
}) => {
	const projects = page.locator("#projects")
	const all = projects.getByRole("button", { name: "Tous", exact: true })
	await expect(all).toHaveAttribute("aria-pressed", "true")
	const pageTwo = projects.getByRole("button", { name: "Page 2", exact: true })
	await pageTwo.press("Enter")
	await expect(pageTwo).toHaveAttribute("aria-current", "page")
	const tech = projects.getByRole("button", { name: "TypeScript", exact: true })
	await tech.press("Space")
	await expect(tech).toHaveAttribute("aria-pressed", "true")
	await expect(all).toHaveAttribute("aria-pressed", "false")
	await all.press("Enter")
	await expect(all).toHaveAttribute("aria-pressed", "true")
	await expect(
		projects.getByRole("button", { name: "Page 1", exact: true }),
	).toHaveAttribute("aria-current", "page")
})
