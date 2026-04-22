<script setup lang="ts">
import { site } from "../../data/site"

const homepageDescription =
  "Développeur web full-stack en France. Projets Angular, Vue, Nuxt et outils orientés produit."

useSeoMeta({
  title: "Portfolio",
  description: homepageDescription,
  ogTitle: `${site.name} · Portfolio`,
  ogDescription: homepageDescription,
  ogImage: site.ogImage,
  ogUrl: site.url,
  twitterCard: "summary_large_image",
  twitterTitle: `${site.name} · Portfolio`,
  twitterDescription: homepageDescription,
  twitterImage: site.ogImage
})

useHead({
  link: [
    { rel: "canonical", href: site.url }
  ]
})
</script>

<template>
  <div class="py-10">
    <SectionsHero />
    <SectionsAbout />
    <SectionsExperience />
    <SectionsEducation />
    <SectionsSkills />
    <SectionsProjects />
    <SectionsMisc />
    <SectionsContact />
  </div>
</template>
