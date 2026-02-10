<script setup lang="ts">
const { public: pub } = useRuntimeConfig()

useHead({
  script: [
    {
      src: `${pub.umamiHost}/script.js`,
      defer: true,
      'data-website-id': pub.umamiId,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
