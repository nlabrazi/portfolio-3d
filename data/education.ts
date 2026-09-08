import adjutor from "~/assets/images/adjutor.png"
import globalKnowledge from "~/assets/images/globalknow.png"
import leWagon from "~/assets/images/lewagon.png"
import thp from "~/assets/images/thp.png"
import type { EducationItem } from "./types"

export const educationItems: EducationItem[] = [
	{
		title: "The Hacking Project",
		licence: "content.education.0.licence",
		location: "content.education.0.location",
		dateStart: "09/2020",
		dateEnd: "04/2021",
		description: "content.education.0.description",
		skills: "Ruby on Rails, ReactJs, Redux",
		img: thp,
	},
	{
		title: "Le Wagon",
		licence: "content.education.1.licence",
		location: "content.education.1.location",
		dateStart: "04/2020",
		dateEnd: "07/2020",
		description: "content.education.1.description",
		skills: "Ruby on Rails, JavaScript",
		img: leWagon,
	},
	{
		title: "Global Knowledge",
		licence: "content.education.2.licence",
		location: "content.education.2.location",
		dateStart: "01/2016",
		dateEnd: "02/2016",
		description: "content.education.2.description",
		skills: "SQL Server",
		img: globalKnowledge,
	},
	{
		title: "Lycee Saint Adjutor",
		licence: "content.education.3.licence",
		location: "content.education.3.location",
		dateStart: "09/2011",
		dateEnd: "06/2013",
		description: "content.education.3.description",
		skills: "C, C#, MySQL",
		img: adjutor,
	},
]
