import labagar from "~/assets/images/labagar.webp"
import movies from "~/assets/images/movies.jpg"
import travel from "~/assets/images/travel.webp"
import wow from "~/assets/images/wow.webp"
import type { MiscItem } from "./types"

export const miscItems: MiscItem[] = [
	{
		title: "content.misc.0.title",
		backContent: "content.misc.0.backContent",
		footer: "content.misc.0.footer",
		img: labagar,
		imageFit: "cover",
	},
	{
		title: "content.misc.1.title",
		backContent: "content.misc.1.backContent",
		footer: "content.misc.1.footer",
		img: travel,
		imageFit: "cover",
	},
	{
		title: "content.misc.2.title",
		backContent: "content.misc.2.backContent",
		footer: "content.misc.2.footer",
		img: wow,
		imageFit: "contain",
	},
	{
		title: "content.misc.3.title",
		backContent: "content.misc.3.backContent",
		footer: "content.misc.3.footer",
		img: movies,
		imageFit: "contain",
	},
]
