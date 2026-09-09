import { defineConfig, devices } from "@playwright/test"

const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	use: {
		baseURL: externalBaseURL || "http://127.0.0.1:3100",
		trace: "retain-on-failure",
	},
	projects: [
		{ name: "desktop", use: { ...devices["Desktop Chrome"] } },
		{ name: "mobile", use: { ...devices["Pixel 7"] } },
	],
	webServer: externalBaseURL
		? undefined
		: {
				command: "node .output/server/index.mjs",
				url: "http://127.0.0.1:3100",
				env: {
					PORT: "3100",
					HOST: "127.0.0.1",
					NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
						"00000000-0000-4000-8000-000000000000",
				},
			},
})
