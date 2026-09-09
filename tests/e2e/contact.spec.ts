import { expect, type Page, test } from "@playwright/test"

const endpoint = "https://api.web3forms.com/submit"
// Emulate the documented SDK contract; never solve a real CAPTCHA or send email.
const captchaScript = `
let options, widget;
window.hcaptcha = {
 render(element, config) {
  options = config;
  widget = element;
  const solve = document.createElement('button');
  solve.type = 'button'; solve.textContent = 'Verify test captcha';
  solve.onclick = () => config.callback('test-captcha-token');
  const expire = document.createElement('button');
  expire.type = 'button'; expire.textContent = 'Expire test captcha';
  expire.onclick = () => config['expired-callback']();
  element.append(solve, expire);
  element.dataset.language = config.hl;
  return 'test-widget';
 },
 reset() { options['expired-callback'](); },
 remove() { widget.replaceChildren(); }
};
window.portfolioCaptchaReady();
`

async function fill(page: Page) {
	// Wait for hydration before filling SSR inputs, otherwise Vue may replace values.
	await expect(page.locator("html")).toHaveAttribute(
		"style",
		/--header-height:/,
	)
	await page.locator("#contact-name").fill("Test Portfolio")
	await page.locator("#contact-email").fill("visitor@example.com")
	await page.locator("#contact-subject").fill("Test contact")
	await page.locator("#contact-message").fill("Message de test — مرحبا")
}
const submit = (page: Page) => page.locator('#contact button[type="submit"]')
const status = (page: Page) => page.locator('#contact [role="status"]')

test.beforeEach(async ({ page }) => {
	await page.route(/^https:\/\//, (route) => route.abort())
	await page.route("https://js.hcaptcha.com/1/api.js?*", (route) =>
		route.fulfill({
			contentType: "application/javascript",
			body: captchaScript,
		}),
	)
})

for (const [path, language, success] of [
	["/", "fr", "Votre message a bien été envoyé. Merci !"],
	["/en/", "en", "Your message has been sent. Thank you!"],
	["/ar/", "ar", "تم إرسال رسالتك بنجاح. شكرًا لك!"],
]) {
	test(`${language}: sends the documented payload once and clears only on success`, async ({
		page,
	}) => {
		let requests = 0
		let release: () => void = () => {}
		const pending = new Promise<void>((resolve) => {
			release = resolve
		})
		await page.route(endpoint, async (route) => {
			requests++
			expect(route.request().method()).toBe("POST")
			expect(route.request().postDataJSON()).toMatchObject({
				name: "Test Portfolio",
				email: "visitor@example.com",
				subject: "Test contact",
				message: "Message de test — مرحبا",
				"h-captcha-response": "test-captcha-token",
			})
			expect(route.request().postDataJSON().access_key).toBeTruthy()
			await pending
			await route.fulfill({ json: { success: true } })
		})
		await page.goto(path)
		await fill(page)
		await expect(page.locator(".contact-captcha")).toHaveAttribute(
			"data-language",
			language,
		)
		await page.getByRole("button", { name: "Verify test captcha" }).click()
		await submit(page).click()
		await expect(submit(page)).toBeDisabled()
		await expect(page.locator("#contact-message")).toBeDisabled()
		await page
			.locator("#contact form")
			.evaluate((form: HTMLFormElement) => form.requestSubmit())
		release()
		await expect(status(page)).toHaveText(success)
		await expect(page.locator("#contact-message")).toHaveValue("")
		await expect(submit(page)).toBeEnabled()
		expect(requests).toBe(1)
	})
}

for (const failure of ["network", "429", "500", "rejected", "invalid-json"]) {
	test(`${failure}: keeps the message and permits a new verified attempt`, async ({
		page,
	}) => {
		await page.route(endpoint, (route) =>
			failure === "network"
				? route.abort()
				: route.fulfill({
						status: failure === "429" ? 429 : failure === "500" ? 500 : 200,
						contentType: "application/json",
						body:
							failure === "invalid-json"
								? "unavailable"
								: JSON.stringify({ success: false }),
					}),
		)
		await page.goto("/")
		await fill(page)
		await page.getByRole("button", { name: "Verify test captcha" }).click()
		await submit(page).click()
		await expect(status(page)).toContainText(
			failure === "429" ? "temporairement indisponible" : "L’envoi a échoué",
		)
		await expect(page.locator("#contact-message")).toHaveValue(
			"Message de test — مرحبا",
		)
		await expect(submit(page)).toBeEnabled()
		await submit(page).click()
		await expect(status(page)).toHaveText(
			"Veuillez compléter la vérification antispam.",
		)
		await page.route(endpoint, (route) =>
			route.fulfill({ json: { success: true } }),
		)
		await page.getByRole("button", { name: "Verify test captcha" }).click()
		await submit(page).click()
		await expect(status(page)).toContainText("bien été envoyé")
	})
}

test("required fields, missing and expired captcha prevent network submissions", async ({
	page,
}) => {
	let requests = 0
	await page.route(endpoint, (route) => {
		requests++
		return route.abort()
	})
	await page.goto("/")
	await submit(page).click()
	await expect(page.locator("#contact-name")).toBeFocused()
	await fill(page)
	await submit(page).click()
	await expect(status(page)).toContainText("vérification antispam")
	await page.getByRole("button", { name: "Verify test captcha" }).click()
	await page.getByRole("button", { name: "Expire test captcha" }).click()
	await submit(page).click()
	await expect(status(page)).toContainText("vérification antispam")
	expect(requests).toBe(0)
})

test("blocked captcha reports a recoverable error", async ({ page }) => {
	await page.route("https://js.hcaptcha.com/1/api.js?*", (route) =>
		route.abort(),
	)
	await page.goto("/")
	await fill(page)
	await expect(page.locator('#contact [role="alert"]')).toContainText(
		"indisponible",
	)
	await page.route("https://js.hcaptcha.com/1/api.js?*", (route) =>
		route.fulfill({
			contentType: "application/javascript",
			body: captchaScript,
		}),
	)
	await page.getByRole("button", { name: "Réessayer", exact: true }).click()
	await expect(
		page.getByRole("button", { name: "Verify test captcha" }),
	).toBeVisible()
})

test("captcha loads on interaction and follows language changes without duplicate scripts", async ({
	page,
}) => {
	let scripts = 0
	page.on("request", (request) => {
		if (request.url().startsWith("https://js.hcaptcha.com/")) scripts++
	})
	await page.goto("/")
	await expect(page.locator("html")).toHaveAttribute(
		"style",
		/--header-height:/,
	)
	expect(scripts).toBe(0)
	await fill(page)
	await expect(page.locator(".contact-captcha")).toHaveAttribute(
		"data-language",
		"fr",
	)
	await page.locator('.language-switcher a[lang="ar"]').click()
	await fill(page)
	await expect(page.locator(".contact-captcha")).toHaveAttribute(
		"data-language",
		"ar",
	)
	expect(scripts).toBe(1)
})

test("timeout keeps the message and releases the submit button", async ({
	page,
}) => {
	await page.route(endpoint, () => {})
	await page.goto("/")
	await fill(page)
	await page.getByRole("button", { name: "Verify test captcha" }).click()
	await page.clock.install()
	const request = page.waitForRequest(endpoint)
	await submit(page).click()
	await request
	await page.clock.fastForward(16_000)
	await expect(status(page)).toContainText("n’a pas répondu à temps")
	await expect(page.locator("#contact-message")).toHaveValue(
		"Message de test — مرحبا",
	)
	await expect(submit(page)).toBeEnabled()
})
