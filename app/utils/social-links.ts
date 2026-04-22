import { site } from "../../data/site"

const socialDefinitions = [
	{
		key: "email",
		label: "Email",
		lookup: ["email"],
		icon: ["fas", "envelope"] as const,
	},
	{
		key: "github",
		label: "GitHub",
		lookup: ["github"],
		icon: ["fab", "github"] as const,
	},
	{
		key: "linkedin",
		label: "LinkedIn",
		lookup: ["linkedin"],
		icon: ["fab", "linkedin"] as const,
	},
	{
		key: "x",
		label: "X",
		lookup: ["x", "twitter"],
		icon: ["fab", "x-twitter"] as const,
	},
] as const

const socialDefinitionMap = new Map(
	socialDefinitions.map((social) => [social.key, social]),
)

export type SocialLinkKey = (typeof socialDefinitions)[number]["key"]

function getSocialHrefMap() {
	return new Map(site.socials.map((social) => [social.label.toLowerCase(), social.href]))
}

export function getSocialHref(key: SocialLinkKey) {
	const social = socialDefinitionMap.get(key)
	if (!social) return ""

	const hrefMap = getSocialHrefMap()
	for (const lookupKey of social.lookup) {
		const href = hrefMap.get(lookupKey)
		if (href) return href
	}

	return ""
}

export function getSocialLinks(order: readonly SocialLinkKey[]) {
	return order.flatMap((key) => {
		const social = socialDefinitionMap.get(key)
		if (!social) return []

		const href = getSocialHref(key)
		if (!href) return []

		return [
			{
				key: social.key,
				label: social.label,
				href,
				icon: social.icon,
			},
		]
	})
}

export function formatContactValue(href: string) {
	if (href.startsWith("mailto:")) return href.replace("mailto:", "")

	try {
		const url = new URL(href)
		return `${url.host}${url.pathname}`.replace(/\/$/, "")
	} catch {
		return href
	}
}

export function isHttpUrl(href: string) {
	return href.startsWith("http://") || href.startsWith("https://")
}
