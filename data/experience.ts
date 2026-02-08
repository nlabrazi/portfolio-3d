import type { ExperienceItem } from "./types"

export const experiences: ExperienceItem[] = [
	{
		company: "Ubisoft",
		companyUrl: "https://www.ubisoft.com/",
		role: "Tools Specialist - Support",
		location: "Paris (75)",
		start: "Sept 2021",
		end: "Today",
		summary:
			"Entreprise française de développement, d'édition et de distribution de jeux vidéo (Rayman, Assassin's Creed, Far Cry, etc.).",
		tasks: [
			"Monitoring des environements de production et staging",
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
		role: "Monitoring - Support",
		location: "Paris (75)",
		start: "Oct 2017",
		end: "Jan 2020",
		summary:
			"Entreprise franco-allemande proposant un service de gestion des consultations pour les professionnels de santé et la prise de rendez-vous en ligne.",
		tasks: [
			"Monitoring des environements de production et testing (Proxy, Tunnel VPN, Raspberry...)",
			"Résolution incidents (niveau 3)",
			"Suivis des nouvelles features avec PO / PM / Dev",
			"Mise en place de procédures de check & automatisations des monkeys tasks",
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
		role: "Technical Analyst",
		location: "Gennevilliers (92)",
		start: "Jan 2015",
		end: "Oct 2017",
		summary: "Franchise internationale de restauration rapide (pizza).",
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
		role: "IT Support",
		location: "Issy-les-Moulineaux (92)",
		start: "Dec 2012",
		end: "Dec 2014",
		summary: "Franchise internationale de restauration rapide (pizza).",
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
