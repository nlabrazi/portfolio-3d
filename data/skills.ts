import type { SkillGroup } from "./types"

export const skillGroups: SkillGroup[] = [
	{
		title: "HTML",
		items: [{ label: "HTML5" }, { label: "JSX" }, { label: "Jekyll" }],
	},
	{
		title: "CSS",
		items: [{ label: "CSS3" }, { label: "SASS" }, { label: "Bootstrap" }],
	},
	{
		title: "Javascript",
		items: [
			{ label: "React" },
			{ label: "Javascript" },
			{ label: "Redux" },
			{ label: "Node" },
		],
	},
	{
		title: "Back-End",
		items: [
			{ label: "Ruby" },
			{ label: "Rails" },
			{ label: "PostgreSQL" },
			{ label: "SQL Server" },
		],
	},
	{
		title: "CMS",
		items: [{ label: "Wordpress" }, { label: "Tumblr" }, { label: "Joomla" }],
	},
	{
		title: "Tools",
		items: [{ label: "Webpack" }, { label: "GitHub" }, { label: "Heroku" }],
	},
	{
		title: "Other",
		items: [{ label: "Photoshop" }, { label: "OBS" }],
	},
]
