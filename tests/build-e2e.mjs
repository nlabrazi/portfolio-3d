import { execFileSync } from "node:child_process"

// Prerendered HTML embeds public config at build time. Never bake a real form
// destination into automated tests; HTTP requests are mocked in contact.spec.ts.
execFileSync(process.execPath, ["node_modules/nuxt/bin/nuxt.mjs", "build"], {
	stdio: "inherit",
	env: {
		...process.env,
		NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY: "00000000-0000-4000-8000-000000000000",
	},
})
