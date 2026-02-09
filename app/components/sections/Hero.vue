<script setup lang="ts">
import { site } from "../../../data/site"
</script>

<template>
  <section id="home" class="section hero-section relative overflow-hidden" v-reveal>
    <div class="hero-ambient" aria-hidden="true"></div>
    <div class="container relative z-10">
      <div class="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div
          class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span class="size-1.5 rounded-full bg-emerald-400/80"></span>
          Available 🚀
        </div>

        <p class="text-lg font-semibold text-white/80 sm:text-xl">
          Créateur d'expériences web modernes
        </p>

        <h1 class="h1 text-5xl md:text-7xl">
          {{ site.name }}
        </h1>

        <p class="mt-5 lead text-xl sm:text-2xl">
          {{ site.tagline }}
        </p>

        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#projects" class="btn btn-lg btn-primary">
            Mes projets
          </a>

          <a href="#contact" class="btn btn-lg btn-outline">
            Contact
          </a>

          <a :href="site.socials.find(s => s.label === 'GitHub')?.href" target="_blank" class="btn btn-lg btn-soft">
            GitHub
          </a>
        </div>

        <div class="mt-10 flex flex-wrap justify-center gap-2">
          <span class="pill">Nuxt</span>
          <span class="pill">Angular</span>
          <span class="pill">Ruby</span>
          <span class="pill">TypeScript</span>
        </div>
      </div>
    </div>
  </section>
</template>
