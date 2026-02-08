<script setup lang="ts">
import CursorGlow from "~/components/ui/CursorGlow.vue"
</script>

<template>
  <div class="min-h-dvh bg-neutral-950 text-white">
    <LayoutHeader />

    <CursorGlow />

    <main class="relative z-10">
      <slot />
    </main>

    <LayoutFooterBar />
  </div>
</template>
