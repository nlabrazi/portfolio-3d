<script setup lang="ts">
import { projects } from "../../../data/projects"

const selectedTech = ref<string | null>(null)

const allTech = computed(() => {
  const set = new Set<string>()
  for (const p of projects) for (const t of p.tech) set.add(t)
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const filtered = computed(() => {
  if (!selectedTech.value) return projects
  return projects.filter((p) => p.tech.includes(selectedTech.value as string))
})
</script>

<template>
  <section id="projects" class="section" v-reveal>
    <div class="container">
      <div class="section-title">
        <div>
          <h2 class="h2">Projects</h2>
          <p class="mt-2 text-sm text-white/60">
            Une sélection de projets (placeholders ok si lien manquant).
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button class="pill hover:text-white" :class="!selectedTech ? 'border-white/25 text-white' : ''"
            @click="selectedTech = null">
            All
          </button>

          <button v-for="t in allTech" :key="t" class="pill hover:text-white"
            :class="selectedTech === t ? 'border-white/25 text-white' : ''" @click="selectedTech = t">
            {{ t }}
          </button>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="p in filtered" :key="p.slug" class="card-soft">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-white/90">
                {{ p.title }}
              </h3>

              <p class="mt-2 text-sm text-white/60">
                {{ p.description }}
              </p>
            </div>

            <div class="text-right text-xs text-white/50">
              {{ p.context }}
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="t in p.tech" :key="t" class="pill">
              {{ t }}
            </span>
          </div>

          <div v-if="p.media?.type === 'video'" class="media-frame mt-5 media-wrap">
            <video :src="p.media.src" muted autoplay loop playsinline
              class="h-52 w-full object-cover opacity-90 transition" />

            <div class="media-overlay flex items-end justify-between p-4">
              <div class="text-sm font-semibold text-white/90">
                {{ p.title }}
              </div>

              <div class="flex gap-2">
                <a v-if="p.links?.repo" :href="p.links.repo" target="_blank"
                  class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15">
                  Repo
                </a>

                <a v-if="p.links?.live" :href="p.links.live" target="_blank"
                  class="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-white/90">
                  Live
                </a>
              </div>
            </div>
          </div>

          <div v-if="(!p.media || p.media.type !== 'video') && (p.links?.repo || p.links?.live)"
            class="mt-5 flex flex-wrap gap-3">
            <a v-if="p.links?.repo" :href="p.links.repo" target="_blank"
              class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white">
              Repo
            </a>

            <a v-if="p.links?.live" :href="p.links.live" target="_blank"
              class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">
              Live
            </a>
          </div>

          <div class="mt-5 flex flex-wrap gap-3">
            <a v-if="p.links?.repo" :href="p.links.repo" target="_blank"
              class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white">
              Repo
            </a>

            <a v-if="p.links?.live" :href="p.links.live" target="_blank"
              class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">
              Live
            </a>

            <span v-if="!p.links?.repo && !p.links?.live" class="text-sm text-white/50">
              Links à compléter
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
