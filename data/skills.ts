import type { SkillGroup } from "./types"

import bootstrap from "~/assets/images/bootstrap.png"
import css3 from "~/assets/images/css3.png"
import github from "~/assets/images/github.png"
import heroku from "~/assets/images/heroku.png"
import html5 from "~/assets/images/html5.png"
import javascript from "~/assets/images/javascript.png"
import jekyll from "~/assets/images/jekyll.png"
import joomla from "~/assets/images/joomla.png"
import nodejs from "~/assets/images/nodejs.png"
import obs from "~/assets/images/obs.png"
import photoshop from "~/assets/images/photoshop.png"
import postgresql from "~/assets/images/postgresql.png"
import rails from "~/assets/images/rails.png"
import react from "~/assets/images/react.png"
import redux from "~/assets/images/redux.png"
import ruby from "~/assets/images/ruby.png"
import sass from "~/assets/images/sass.png"
import sqlserver from "~/assets/images/sqlserver.png"
import tumblr from "~/assets/images/tumblr.png"
import webpack from "~/assets/images/webpack.png"
import wordpress from "~/assets/images/wordpress.png"

export const skillGroups: SkillGroup[] = [
	{
		title: "Frontend Development",
		items: [
			{ label: "HTML5", icon: html5 },
			{ label: "CSS3", icon: css3 },
			{ label: "SASS", icon: sass },
			{ label: "Bootstrap", icon: bootstrap },
			{ label: "Javascript", icon: javascript },
			{ label: "React", icon: react },
			{ label: "Redux", icon: redux },
			{ label: "JSX", icon: react },
		],
	},
	{
		title: "Backend & Database",
		items: [
			{ label: "Node", icon: nodejs },
			{ label: "Ruby", icon: ruby },
			{ label: "Rails", icon: rails },
			{ label: "PostgreSQL", icon: postgresql },
			{ label: "SQL Server", icon: sqlserver },
		],
	},
	{
		title: "Tools & Infra",
		items: [
			{ label: "Webpack", icon: webpack },
			{ label: "GitHub", icon: github },
			{ label: "Heroku", icon: heroku },
			{ label: "Wordpress", icon: wordpress },
			{ label: "Tumblr", icon: tumblr },
			{ label: "Joomla", icon: joomla },
			{ label: "Photoshop", icon: photoshop },
			{ label: "OBS", icon: obs },
		],
	},
]
