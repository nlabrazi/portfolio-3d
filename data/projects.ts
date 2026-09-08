import arganImage from "~/assets/images/argan.png"
import devtoolsImage from "~/assets/images/devtools.png"
import gamesImage from "~/assets/images/games-lab.webp"
import lazarusImage from "~/assets/images/lazarus.webp"
import lescaleImage from "~/assets/images/lescale.webp"
import mediumArticleImage from "~/assets/images/medium-article.webp"
import sawtaiImage from "~/assets/images/sawt-ai.webp"
import sjvtdmImage from "~/assets/images/sjvtdm.webp"
import type { ProjectItem } from "./types"

export const projects: ProjectItem[] = [
	{
		slug: "lazarus-exchange",
		title: "content.projects.0.title",
		tech: ["NestJS", "TypeScript", "Node.js", "JavaScript"],
		description: "content.projects.0.description",
		context: "content.projects.0.context",
		media: {
			type: "image",
			src: lazarusImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/lazarus-exchange",
			live: "https://lazarus-exchange.nabster.dev",
		},
	},
	{
		slug: "lescale-gourmande",
		title: "content.projects.1.title",
		tech: ["Nuxt 3", "Vue 3", "Tailwind CSS", "TypeScript"],
		description: "content.projects.1.description",
		context: "content.projects.1.context",
		media: {
			type: "image",
			src: lescaleImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/lescale-gourmande",
			live: "https://lescale-gourmande.nabster.dev",
		},
	},
	{
		slug: "argandici",
		title: "content.projects.2.title",
		tech: ["Nuxt 3", "Vue 3", "Tailwind CSS", "TypeScript", "Prisma"],
		description: "content.projects.2.description",
		context: "content.projects.2.context",
		media: {
			type: "image",
			src: arganImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/argandici",
			live: "https://argandici.com",
		},
	},
	{
		slug: "dev-tools",
		title: "content.projects.3.title",
		tech: ["Python"],
		description: "content.projects.3.description",
		context: "content.projects.3.context",
		media: {
			type: "image",
			src: devtoolsImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/dev-tools",
		},
	},
	{
		slug: "sjvtdm",
		title: "content.projects.4.title",
		tech: ["Python", "Telegram Bot", "PostgreSQL"],
		description: "content.projects.4.description",
		context: "content.projects.4.context",
		media: {
			type: "image",
			src: sjvtdmImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/sjvtdm",
		},
	},
	{
		slug: "sawt-ai",
		title: "content.projects.5.title",
		tech: ["Python", "Whisper", "Docker"],
		description: "content.projects.5.description",
		context: "content.projects.5.context",
		media: {
			type: "image",
			src: sawtaiImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/sawt-ai",
			live: "https://sawt-ai.nabster.dev",
		},
	},
	{
		slug: "games",
		title: "content.projects.6.title",
		tech: ["React", "JavaScript"],
		description: "content.projects.6.description",
		context: "content.projects.6.context",
		media: {
			type: "image",
			src: gamesImage,
		},
		links: {
			repo: "https://github.com/nlabrazi/games-lab",
			live: "https://games-lab.nabster.dev",
		},
	},
	{
		slug: "medium-article",
		title: "content.projects.7.title",
		tech: ["Medium"],
		description: "content.projects.7.description",
		context: "content.projects.7.context",
		media: {
			type: "image",
			src: mediumArticleImage,
		},
		links: {
			live: "https://medium.com/@na-labrazi/op%C3%A9ration-corsaire-95b1d7bd632e",
		},
	},
]
