<script setup lang="ts">
import { site } from "../../../data/site"
import SocialLinks from "../ui/SocialLinks.vue"

const { t } = useI18n()
</script>

<template>
  <section tabindex="-1" id="home" class="section hero-section relative overflow-hidden" v-reveal>
    <div class="hero-ambient" aria-hidden="true"></div>
    <div class="container relative z-10">
      <div class="hero-content mx-auto flex max-w-4xl flex-col items-center text-center">
        <div
          class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span class="size-1.5 rounded-full bg-emerald-400/80"></span>
          {{ t('hero.available') }}
        </div>

        <p class="text-lg font-semibold text-white/80 sm:text-xl">
          {{ t('hero.intro') }}
        </p>

        <h1 class="h1 text-5xl md:text-7xl">
          {{ site.name }}
        </h1>

        <p class="mt-5 lead text-xl sm:text-2xl">
          {{ t('site.tagline') }}
        </p>

        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#projects" class="btn btn-lg btn-primary">
            {{ t('hero.projects') }}
          </a>

          <a href="#contact" class="btn btn-lg btn-outline">
            {{ t('nav.contact') }}
          </a>
        </div>

        <SocialLinks class="mt-6 justify-center" />

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
