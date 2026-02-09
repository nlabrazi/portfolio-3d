import type { ExperienceItem } from "./types"

import ubisoft from "~/assets/images/ubisoft.png"
import doctolib from "~/assets/images/doctolib.jpeg"
import dominos from "~/assets/images/dominos.png"

export const experiences: ExperienceItem[] = [
	{
		company: "Ubisoft",
		companyUrl: "https://www.ubisoft.com/",
		logo: ubisoft,
		role: "Tools Specialist - Support",
		location: "Paris (75)",
		start: "Sept 2021",
		end: "Today",
		summary: "",
		tasks: [
			"Monitoring des environements",
			"Résolution incidents",
			"Suivis des nouvelles features avec PM",
			"Développement de nouvelles fonctionnalités",
			"Mise à jour guides et documentations",
		],
		stack: ["JIRA", "Grafana, Kibana, Datadog", "NodeJs, Angular, PostgreSQL"],
	},
	{
		company: "Doctolib",
		companyUrl: "https://www.doctolib.fr/",
		logo: doctolib,
		role: "Monitoring - Support",
		location: "Paris (75)",
		start: "Oct 2017",
		end: "Jan 2020",
		summary: "",
		tasks: [
			"Monitoring des environements (Proxy, Tunnel VPN, Raspberry...)",
			"Résolution incidents (niveau 3)",
			"Suivis des nouvelles features avec PO / PM / Dev",
			"Mise en place de procédures de check & automatisations de tasks",
		],
		stack: [
			"JIRA, Zendesk",
			"Grafana, Kibana, Datadog, NewRelic",
			"Ruby, Javascript, PostgreSQL",
		],
	},
	{
		company: "Domino’s",
		companyUrl: "https://www.dominos.fr/",
		logo: dominos,
		role: "Technical Analyst",
		location: "Gennevilliers (92)",
		start: "Jan 2015",
		end: "Oct 2017",
		summary: "",
		tasks: [
			"Résolution incidents (niveau 3)",
			"Analyse, insertions et maintenance de base de données",
			"Développement SQL (Stored Proc, data)",
			"Création & mise en place d'outils d'amélioration des tâches opératoires",
		],
		stack: [
			"ETL / Web-App / Web-Server (Aws / Azure)",
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
		start: "Dec 2012",
		end: "Dec 2014",
		summary: "",
		tasks: [
			"Résolution incidents (niveau 1 & 2)",
			"Préparation, intégration & installation de postes utilisateurs",
			"Administration système",
			"Développement SQL",
		],
		stack: [
			"Active Directory, Exchange...",
			"BlackBerry Server",
			"SQL Server 2012",
		],
	},
]
