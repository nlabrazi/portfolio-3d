import type { ProjectItem } from "./types"

import batimentMp4 from "~/assets/videos/batiment.mp4"
import batimentWebm from "~/assets/videos/batiment.webm"
import coachMp4 from "~/assets/videos/coach.mp4"
import coachWebm from "~/assets/videos/coach.webm"
import mediumMp4 from "~/assets/videos/medium.mp4"
import mediumWebm from "~/assets/videos/medium.webm"
import snakeMp4 from "~/assets/videos/snake.mp4"
import snakeWebm from "~/assets/videos/snake.webm"
import telephoneMp4 from "~/assets/videos/telephone.mp4"
import telephoneWebm from "~/assets/videos/telephone.webm"

export const projects: ProjectItem[] = [
	{
		slug: "coach-me",
		title: "Coach Me",
		tech: ["Ruby on Rails", "Javascript", "PostgreSQL", "Heroku"],
		description:
			"Application pour trouver le meilleur coach sportif près de chez soi.",
		context: "Projet de fin de batch au Wagon",
		media: {
			type: "video",
			sources: [
				{ src: coachWebm, type: "video/webm" },
				{ src: coachMp4, type: "video/mp4" },
			],
		},
		links: {
			live: "",
			repo: "",
		},
	},
	{
		slug: "telephone-ose",
		title: "Le Téléphone Ose",
		tech: ["Ruby on Rails", "Javascript", "PostgreSQL", "Heroku"],
		description:
			"Offrez-vous votre chanson préférée chantée au téléphone par un artiste, pour un moment unique et plein d'émotions.",
		context: "Projet de fin de session (fullstack) à THP",
		media: {
			type: "video",
			sources: [
				{ src: telephoneWebm, type: "video/webm" },
				{ src: telephoneMp4, type: "video/mp4" },
			],
		},
	},
	{
		slug: "snake-game",
		title: "Snake Game",
		tech: ["Javascript", "HTML", "CSS", "GitHub Pages"],
		description: "Le célèbre jeu du SNAKE revisité par mes soins.",
		context: "Projet perso pour apprendre Javascript",
		media: {
			type: "video",
			sources: [
				{ src: snakeWebm, type: "video/webm" },
				{ src: snakeMp4, type: "video/mp4" },
			],
		},
	},
	{
		slug: "batiment-travaux",
		title: "Bâtiment & Travaux",
		tech: ["Ruby on Rails", "Javascript", "PostgreSQL", "Heroku"],
		description:
			"Application destinée aux entrepreneurs souhaitant mieux gérer leurs partenaires.",
		context: "Projet perso en cours",
		media: {
			type: "video",
			sources: [
				{ src: batimentWebm, type: "video/webm" },
				{ src: batimentMp4, type: "video/mp4" },
			],
		},
	},
	{
		slug: "medium-article",
		title: "Article Medium",
		tech: ["Medium"],
		description:
			"Article sur Medium qui retranscrit mon expérience à l'école THP.",
		context: "Mon premier article Medium (validation de mission THP)",
		media: {
			type: "video",
			sources: [
				{ src: mediumWebm, type: "video/webm" },
				{ src: mediumMp4, type: "video/mp4" },
			],
		},
	},
]
