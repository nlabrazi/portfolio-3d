<script setup lang="ts">
import homeBgImage from "~/assets/images/home-bg.webp"
import { about } from "../../../data/about"

const { t } = useI18n()
</script>

<template>
  <section tabindex="-1" id="about" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">{{ t('nav.about') }}</h2>

      <div class="card glow-hover mt-8 p-6 sm:p-8">
        <div class="grid gap-8 lg:grid-cols-[280px,1fr] lg:items-start">
          <img :src="homeBgImage" :alt="t('common.portrait')" class="h-64 w-full rounded-2xl object-cover" />

          <div>
            <h3 class="text-lg font-semibold text-white/90">
              {{ t(about.heading) }}
            </h3>

            <div class="mt-4 space-y-4 text-white/70">
              <p v-for="(p, i) in about.paragraphs" :key="i">
                {{ t(p) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
