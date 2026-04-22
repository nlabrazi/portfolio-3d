import type { ExperienceItem } from "./types"

import ubisoft from "~/assets/images/ubisoft.png"
import doctolib from "~/assets/images/doctolib.jpeg"
import dominos from "~/assets/images/dominos.png"

export const experiences: ExperienceItem[] = [
	{
		company: "Ubisoft",
		companyUrl: "https://www.ubisoft.com/",
		logo: ubisoft,
		role: "Data Tools Programmer",
		location: "Paris (75)",
		start: "Juillet 2025",
		end: "Aujourd'hui",
		tasks: [
			"Développement de nouvelles fonctionnalités",
			"Mise à jour des guides et de la documentation",
			"Suivi et support aux utilisateurs",
		],
		stack: ["TypeScript", "Angular", "Tailwind CSS", "PostgreSQL"],
	},
	{
		company: "Ubisoft",
		companyUrl: "https://www.ubisoft.com/",
		logo: ubisoft,
		role: "Tools Specialist - Support",
		location: "Paris (75)",
		start: "Sept 2021",
		end: "Juin 2025",
		tasks: [
			"Monitoring des environnements",
			"Résolution d'incidents",
			"Suivi des nouvelles fonctionnalités avec les PM",
			"Développement de nouvelles fonctionnalités",
			"Mise à jour des guides et de la documentation",
		],
		stack: ["JIRA", "Grafana, Kibana, Datadog", "Node.js, Angular, PostgreSQL"],
	},
	{
		company: "Doctolib",
		companyUrl: "https://www.doctolib.fr/",
		logo: doctolib,
		role: "Monitoring - Support",
		location: "Paris (75)",
		start: "Octobre 2017",
		end: "Janvier 2020",
		tasks: [
			"Monitoring des environnements (proxy, tunnel VPN, Raspberry Pi...)",
			"Résolution d'incidents (niveau 3)",
			"Suivi des nouvelles fonctionnalités avec les PO / PM / dev",
			"Mise en place de procédures de contrôle et d'automatisation des tâches",
		],
		stack: [
			"JIRA, Zendesk",
			"Grafana, Kibana, Datadog, NewRelic",
			"Ruby, JavaScript, PostgreSQL",
		],
	},
	{
		company: "Domino’s",
		companyUrl: "https://www.dominos.fr/",
		logo: dominos,
		role: "Technical Analyst",
		location: "Gennevilliers (92)",
		start: "Janvier 2015",
		end: "Octobre 2017",
		tasks: [
			"Résolution d'incidents (niveau 3)",
			"Analyse, insertions et maintenance de base de données",
			"Développement SQL (stored procedures...)",
			"Création et mise en place d'outils d'amélioration des tâches opératoires",
		],
		stack: [
			"ETL / web app / web server (AWS / Azure)",
			"NewRelic, Active Directory, Exchange...",
			"SQL Server 2016",
		],
	},
	{
		company: "Domino’s",
		companyUrl: "https://www.dominos.fr/",
		logo: dominos,
		role: "IT Support",
		location: "Issy-les-Moulineaux (92)",
		start: "Décembre 2012",
		end: "Décembre 2014",
		tasks: [
			"Résolution d'incidents (niveau 1 & 2)",
			"Préparation, intégration & installation de postes utilisateurs",
			"Administration système",
			"SQL queries pour extractions de données",
		],
		stack: [
			"Active Directory, Exchange...",
			"BlackBerry Server",
			"SQL Server 2012",
		],
	},
]
