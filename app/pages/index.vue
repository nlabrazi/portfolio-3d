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

<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio',
  description: 'Développeur web full-stack en France. Projets Angular, Vue, Nuxt et outils orientés produit.',
  ogTitle: 'Nabil · Portfolio',
  ogDescription: 'Développeur web full-stack en France. Projets Angular, Vue, Nuxt et outils orientés produit.',
  ogImage: 'https://nabster.dev/og-image.jpg',
  ogUrl: 'https://nabster.dev/',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nabil · Portfolio',
  twitterDescription: 'Développeur web full-stack en France. Projets Angular, Vue, Nuxt et outils orientés produit.',
  twitterImage: 'https://nabster.dev/og-image.jpg'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://nabster.dev/' }
  ]
})
</script>
