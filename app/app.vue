<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { site } from "../data/site"

useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate icon', href: '/favicon.ico' }
  ]
})

useSeoMeta({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} · ${site.name}` : `${site.name} · ${site.title}`,
  description: `Portfolio de ${site.name}, ${site.title.toLowerCase()}.`,
  ogSiteName: site.name,
  ogType: 'website'
})
</script>
