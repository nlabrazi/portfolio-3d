import type { SkillGroup } from "./types"

export const skillGroups: SkillGroup[] = [
	{
		title: "Frontend Development",
		items: [
			{ label: "Angular", icon: "devicon-angularjs-plain colored" },
			{ label: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
			{ label: "JavaScript", icon: "devicon-javascript-plain colored" },
			{ label: "Nuxt", icon: "devicon-nuxtjs-plain colored" },
			{ label: "React", icon: "devicon-react-original colored" },
			{ label: "Redux", icon: "devicon-redux-original colored" },
			{ label: "Tailwind", icon: "devicon-tailwindcss-plain colored" },
			{ label: "TypeScript", icon: "devicon-typescript-plain colored" },
			{ label: "Vue", icon: "devicon-vuejs-plain colored" },
		],
	},
	{
		title: "Backend & Database",
		items: [
			{ label: "Node", icon: "devicon-nodejs-plain colored" },
			{ label: "Nest", icon: "devicon-nestjs-plain colored" },
			{ label: "Rails", icon: "devicon-rails-plain colored" },
			{ label: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
			{ label: "Ruby", icon: "devicon-ruby-plain colored" },
			{ label: "SQL Server", icon: "devicon-microsoftsqlserver-plain colored" },
			{ label: "Supabase", icon: "devicon-supabase-plain colored" },
		],
	},
	{
		title: "Tools & Infra",
		items: [
			{ label: "Datadog", icon: "devicon-datadog-plain colored" },
			{ label: "Docker", icon: "devicon-docker-plain colored" },
			{ label: "Grafana", icon: "devicon-grafana-plain colored" },
			{ label: "GitHub", icon: "devicon-github-original colored" },
			{ label: "Heroku", icon: "devicon-heroku-plain colored" },
			{ label: "Kibana", icon: "devicon-kibana-plain colored" },
			{ label: "NewRelic", icon: "devicon-newrelic-plain colored" },
			{ label: "Netlify", icon: "devicon-netlify-plain colored" },
			{ label: "Railway", icon: "devicon-devicon-plain colored" },
		],
	},
]
