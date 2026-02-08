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

export type SkillGroup = {
  title: string
  items: { label: string; icon?: string }[]
}
