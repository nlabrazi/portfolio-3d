import type { ProjectItem } from "./types"

import arganImage from "~/assets/images/argan.png"
import devtoolsImage from "~/assets/images/devtools.png"
import gamesImage from "~/assets/images/games.webp"
import lazarusImage from "~/assets/images/lazarus.webp"
import lescaleImage from "~/assets/images/lescale.webp"
import mediumArticleImage from "~/assets/images/medium-article.webp"
import sawtaiImage from "~/assets/images/sawtai.webp"
import sjvtdmImage from "~/assets/images/sjvtdm.webp"

export const projects: ProjectItem[] = [
  {
    slug: "lazarus-exchange",
    title: "Lazarus Exchange",
    tech: ["NestJS", "TypeScript", "Node.js", "Vanilla JS"],
    description:
      "Plateforme d'echange de fichiers securisee avec validation mutuelle avant telechargement.",
    context: "Projet perso securite et collaboration",
    media: {
      type: "image",
      src: lazarusImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/lazarus-exchange",
      live: "https://lazarus-exchange.nabster.dev",
    },
  },
  {
    slug: "lescale-gourmande",
    title: "L'Escale Gourmande",
    tech: ["Nuxt 3", "Vue 3", "Tailwind CSS", "TypeScript"],
    description:
      "Vitrine web pour un service traiteur evenementiel avec formulaires de demande sur mesure.",
    context: "Projet client vitrine",
    media: {
      type: "image",
      src: lescaleImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/lescale-gourmande",
      live: "https://lescale-gourmande.nabster.dev",
    },
  },
  {
    slug: "argandici",
    title: "Argan d'ici",
    tech: ["Nuxt 3", "Vue 3", "Tailwind CSS", "TypeScript", "Prisma", "Stripe"],
    description:
      "Site de marque e-commerce pour une huile d'argan marocaine: storytelling, catalogue et tunnel de commande.",
    context: "Projet business personnel",
    media: {
      type: "image",
      src: arganImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/argandici",
      live: "https://argandici.com",
    },
  },
  {
    slug: "dev-tools",
    title: "Dev Tools",
    tech: ["Python", "Git", "Automation"],
    description:
      "Suite de scripts pour automatiser les commits, la generation de changelog et les workflows Git.",
    context: "Boite a outils developpeur",
    media: {
      type: "image",
      src: devtoolsImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/dev-tools",
    },
  },
  {
    slug: "sjvtdm",
    title: "SJVTDM",
    tech: ["Python", "Telegram Bot", "RSS", "PostgreSQL"],
    description:
      "Bot Telegram qui agrege des sources d'actualite, genere des resumes et publie automatiquement.",
    context: "Projet d'automatisation contenu",
    media: {
      type: "image",
      src: sjvtdmImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/sjvtdm",
    },
  },
  {
    slug: "sawt-ai",
    title: "Sawt AI",
    tech: ["Python", "TensorFlow", "Whisper", "Docker"],
    description:
      "Outil d'analyse audio et de classification de versets, base sur des modeles de machine learning.",
    context: "Projet IA / traitement audio",
    media: {
      type: "image",
      src: sawtaiImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/sawt-ai",
    },
  },
  {
    slug: "games",
    title: "Games",
    tech: ["React", "JavaScript", "Styled Components"],
    description:
      "Collection de mini-jeux web interactifs orientee front-end et logique gameplay.",
    context: "Projet perso jeux et UX",
    media: {
      type: "image",
      src: gamesImage,
    },
    links: {
      repo: "https://github.com/nlabrazi/games",
      live: "https://nabster.online",
    },
  },
  {
    slug: "medium-article",
    title: "Article Medium",
    tech: ["Medium"],
    description:
      "Article sur Medium qui retranscrit mon experience a l'ecole THP.",
    context: "Mon premier article Medium (validation de mission THP)",
    media: {
      type: "image",
      src: mediumArticleImage,
    },
    links: {
      live: "https://medium.com/@na-labrazi/op%C3%A9ration-corsaire-95b1d7bd632e",
    },
  },
]
