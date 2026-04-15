<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
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
    titleChunk ? `${titleChunk} · Nabil` : 'Nabil · Développeur web',
  description: 'Portfolio de Nabil, développeur web full-stack.',
  ogSiteName: 'Nabil',
  ogType: 'website'
})
</script>
