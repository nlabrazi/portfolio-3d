import type { EducationItem } from "./types"

import thp from "~/assets/images/thp.png"
import leWagon from "~/assets/images/lewagon.png"
import globalKnowledge from "~/assets/images/globalknow.png"
import adjutor from "~/assets/images/adjutor.png"

export const educationItems: EducationItem[] = [
	{
		title: "The Hacking Project",
		licence: "Developpeur Web",
		location: "Paris (75)",
		dateStart: "09/2020",
		dateEnd: "04/2021",
		description:
			"The Hacking Project est une formation au code, a plein temps ouverte a tous et sans pre-requis",
		skills: "Ruby on Rails, ReactJs, Redux",
		img: thp,
	},
	{
		title: "Le Wagon",
		licence: "Developpeur Web",
		location: "Paris (75)",
		dateStart: "04/2020",
		dateEnd: "07/2020",
		description:
			"Le Wagon est un bootcamp qui enseigne a ses eleves le developpement d'applications web",
		skills: "Ruby on Rails, Javascript",
		img: leWagon,
	},
	{
		title: "Global Knowledge",
		licence: "Administration BDD",
		location: "Rueil-Malmaison (92)",
		dateStart: "01/2016",
		dateEnd: "02/2016",
		description: "Formation Requetes et Administration SQL Server 2016",
		skills: "SQL Server",
		img: globalKnowledge,
	},
	{
		title: "Lycee Saint Adjutor",
		licence: "BTS SIO",
		location: "Vernon (27)",
		dateStart: "09/2011",
		dateEnd: "06/2013",
		description: "Conception et developpement d'applications",
		skills: "C, C#, MySql",
		img: adjutor,
	},
]
