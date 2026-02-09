export type SocialLink = {
	label: string
	href: string
}

export type ExperienceItem = {
	company: string
	companyUrl?: string
	role: string
	location: string
	start: string
	end: string
	summary: string
	tasks: string[]
	stack: string[]
	logo?: string
}

export type ProjectItem = {
	slug: string
	title: string
	description: string
	context: string
	tech: string[]
	media?: {
		type: "video" | "image"
		src: string
	}
	links?: {
		live?: string
		repo?: string
	}
}

export type EducationItem = {
	title: string
	licence: string
	location: string
	dateStart: string
	dateEnd: string
	description: string
	skills: string
	img: string
}

export type MiscItem = {
	title: string
	backContent: string
	footer: string
	img: string
	imageFit?: "cover" | "contain"
}

export type SkillGroup = {
	title: string
	items: { label: string; icon?: string }[]
}
