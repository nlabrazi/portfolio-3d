<script setup lang="ts">
import { site } from "../../../data/site"
</script>

<template>
  <section id="home" class="section">
    <div class="container">
      <div class="max-w-4xl">
        <div
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span class="size-1.5 rounded-full bg-emerald-400/80"></span>
          Available for opportunities
        </div>

        <h1 class="h1">
          {{ site.name }}
        </h1>

        <p class="mt-4 lead">
          {{ site.tagline }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#projects" class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90">
            View projects
          </a>

          <a href="#contact"
            class="rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-sm font-semibold text-white hover:border-white/30">
            Contact
          </a>

          <a :href="site.socials.find(s => s.label === 'GitHub')?.href" target="_blank"
            class="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white">
            GitHub
          </a>
        </div>

        <div class="mt-10 flex flex-wrap gap-2">
          <span class="pill">Nuxt</span>
          <span class="pill">TypeScript</span>
          <span class="pill">Tailwind</span>
          <span class="pill">Docker</span>
        </div>
      </div>
    </div>
  </section>
</template>
