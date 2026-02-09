import type { MiscItem } from "./types"

import wow from "~/assets/images/wow.png"
import travel from "~/assets/images/travel.jpg"
import movies from "~/assets/images/movies.jpg"
import labagar from "~/assets/images/labagar.jpg"

export const miscItems: MiscItem[] = [
	{
		title: "Muay Thai Fan",
		backContent: "Pratiquant de boxe thailandaise",
		footer: "Entrainement au Sutai MuayThai Gym - Thailande (2019)",
		img: labagar,
		imageFit: "cover",
	},
	{
		title: "Glob Trotters",
		backContent: "Passionne par les voyages",
		footer: "Voyages sur les 5 continents",
		img: travel,
		imageFit: "cover",
	},
	{
		title: "Video Games Fan",
		backContent: "Grand passionne de jeux videos",
		footer: "Tryharder, competiteur de l'extreme et streamer",
		img: wow,
		imageFit: "contain",
	},
	{
		title: "Cinema Fan",
		backContent: "Merci Netflix et cie",
		footer: "Du classique et du plus recent",
		img: movies,
		imageFit: "contain",
	},
]
