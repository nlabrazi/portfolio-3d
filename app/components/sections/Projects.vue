<script setup lang="ts">
import { projects } from "../../../data/projects"
</script>

<template>
  <section id="projects" class="py-20">
    <h2 class="text-2xl font-semibold tracking-tight">Projects</h2>

    <div class="mt-8 grid gap-4 md:grid-cols-2">
      <article v-for="p in projects" :key="p.slug" class="rounded-2xl border border-white/10 p-6">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-lg font-semibold text-white/90">
              {{ p.title }}
            </h3>
            <p class="mt-2 text-sm text-white/60">
              {{ p.description }}
            </p>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="t in p.tech" :key="t"
            class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {{ t }}
          </span>
        </div>

        <p class="mt-4 text-sm text-white/70">
          <span class="font-semibold text-white/80">Contexte :</span>
          {{ p.context }}
        </p>

        <div v-if="p.media?.type === 'video'" class="mt-4 overflow-hidden rounded-xl border border-white/10">
          <video :src="p.media.src" muted autoplay loop playsinline class="h-48 w-full object-cover" />
        </div>
      </article>
    </div>
  </section>
</template>
