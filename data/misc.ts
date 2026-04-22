import type { MiscItem } from "./types"

import wow from "~/assets/images/wow.webp"
import travel from "~/assets/images/travel.webp"
import movies from "~/assets/images/movies.jpg"
import labagar from "~/assets/images/labagar.webp"

export const miscItems: MiscItem[] = [
	{
		title: "Muay Thai Fan",
		backContent: "Pratiquant de boxe thaïlandaise",
		footer: "Entraînement au Sutai MuayThai Gym - Thaïlande (2019)",
		img: labagar,
		imageFit: "cover",
	},
	{
		title: "Glob Trotters",
		backContent: "Passionné par les voyages",
		footer: "Voyages sur les 5 continents",
		img: travel,
		imageFit: "cover",
	},
	{
		title: "Video Games Fan",
		backContent: "Grand passionné de jeux vidéo",
		footer: "Tryharder, compétiteur de l'extrême et streamer",
		img: wow,
		imageFit: "contain",
	},
	{
		title: "Cinema Fan",
		backContent: "Merci Netflix et cie",
		footer: "Du classique et du plus récent",
		img: movies,
		imageFit: "contain",
	},
]
