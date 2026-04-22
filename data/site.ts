import type { SocialLink } from "./types"

export const site = {
	brand: "portfolio-3d",
	name: "Nabil Labrazi",
	title: "Développeur Web Full-Stack",
	tagline: "Développeur Web Full-Stack — ouvert à toute opportunités.",
	location: "Île-de-France, France",
	status: "Disponible pour de nouvelles opportunités en freelance ou en CDI.",
	socials: [
		{ label: "Email", href: "mailto:na.labrazi@gmail.com" },
		{ label: "GitHub", href: "https://github.com/nlabrazi" },
		{ label: "LinkedIn", href: "https://fr.linkedin.com/in/nabil-labrazi" },
		{ label: "X", href: "https://x.com/Nabil71405502" },
	] satisfies SocialLink[],
} as const
