import type { ProjectItem } from "./types"

export const projects: ProjectItem[] = [
  {
    slug: "coach-me",
    title: "Coach Me",
    tech: ["Ruby on Rails", "Javascript", "PostgreSQL", "Heroku"],
    description: "Application pour trouver le meilleur coach sportif près de chez soi.",
    context: "Projet de fin de batch au Wagon",
    media: { type: "video", src: "/videos/coach.mp4" },
    links: {
      live: "",
      repo: ""
    }
  },
  {
    slug: "telephone-ose",
    title: "Le Téléphone Ose",
    tech: ["Ruby on Rails", "Javascript", "PostgreSQL", "Heroku"],
    description:
      "Offrez-vous votre chanson préférée chantée au téléphone par un artiste, pour un moment unique et plein d'émotions.",
    context: "Projet de fin de session (fullstack) à THP",
    media: { type: "video", src: "/videos/telephone.mp4" }
  },
  {
    slug: "snake-game",
    title: "Snake Game",
    tech: ["Javascript", "HTML", "CSS", "GitHub Pages"],
    description: "Le célèbre jeu du SNAKE revisité par mes soins.",
    context: "Projet perso pour apprendre Javascript",
    media: { type: "video", src: "/videos/snake.mp4" }
  },
  {
    slug: "batiment-travaux",
    title: "Bâtiment & Travaux",
    tech: ["Ruby on Rails", "Javascript", "PostgreSQL", "Heroku"],
    description: "Application destinée aux entrepreneurs souhaitant mieux gérer leurs partenaires.",
    context: "Projet perso en cours",
    media: { type: "video", src: "/videos/batiment.mp4" }
  },
  {
    slug: "medium-article",
    title: "Article Medium",
    tech: ["Medium"],
    description: "Article sur Medium qui retranscrit mon expérience à l'école THP.",
    context: "Mon premier article Medium (validation de mission THP)",
    media: { type: "video", src: "/videos/medium.mp4" }
  }
]
