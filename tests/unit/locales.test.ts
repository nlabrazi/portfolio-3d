import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

function flatten(
	value: Record<string, unknown>,
	prefix = "",
): Record<string, string> {
	return Object.fromEntries(
		Object.entries(value).flatMap(([key, child]) => {
			const path = prefix ? `${prefix}.${key}` : key
			return typeof child === "string"
				? [[path, child]]
				: Object.entries(flatten(child as Record<string, unknown>, path))
		}),
	)
}
const locales = Object.fromEntries(
	["fr", "en", "ar"].map((code) => [
		code,
		flatten(
			JSON.parse(
				readFileSync(
					new URL(`../../i18n/locales/${code}.json`, import.meta.url),
					"utf8",
				),
			),
		),
	]),
)

test("all languages have complete, non-empty translations and matching placeholders", () => {
	const keys = Object.keys(locales.fr).sort()
	const placeholders = (text: string) =>
		[...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort()
	for (const [code, messages] of Object.entries(locales)) {
		assert.deepEqual(Object.keys(messages).sort(), keys, code)
		for (const key of keys) {
			assert.ok(messages[key].trim(), `${code}: ${key}`)
			assert.deepEqual(
				placeholders(messages[key]),
				placeholders(locales.fr[key]),
				`${code}: ${key}`,
			)
		}
	}
})

test("every content key referenced by the data exists in all languages", () => {
	for (const name of [
		"about",
		"experience",
		"education",
		"projects",
		"misc",
		"skills",
		"footer",
	]) {
		const source = readFileSync(
			new URL(`../../data/${name}.ts`, import.meta.url),
			"utf8",
		)
		for (const match of source.matchAll(/"((?:content|nav|footer)\.[^"]+)"/g)) {
			for (const [code, messages] of Object.entries(locales))
				assert.ok(messages[match[1]], `${code}: ${match[1]}`)
		}
	}
})
