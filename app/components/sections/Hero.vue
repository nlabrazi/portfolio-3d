<script setup lang="ts">
import { site } from "../../../data/site"
</script>

<template>
  <section id="home" class="section">
    <h1 class="text-4xl font-bold tracking-tight md:text-6xl">
      {{ site.name }}
    </h1>

    <p class="mt-4 max-w-2xl text-lg text-white/70">
      {{ site.tagline }}
    </p>

    <div class="mt-8 flex gap-4">
      <a href="#projects" class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90">
        View projects
      </a>
      <a href="#contact"
        class="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/30">
        Contact
      </a>
    </div>
  </section>
</template>
