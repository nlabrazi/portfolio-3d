<script setup lang="ts">
import ImageLightbox from "~/components/ui/ImageLightbox.vue"
import { projects } from "../../../data/projects"

const selectedTech = ref<string | null>(null)
const currentPage = ref(1)
const PAGE_SIZE = 4
const { activeImage, activeTitle, openImage, closeImage } = useImageLightbox()

const allTech = computed(() => {
	const set = new Set<string>()
	for (const p of projects) for (const t of p.tech) set.add(t)
	return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const filtered = computed(() => {
	if (!selectedTech.value) return projects
	return projects.filter((p) => p.tech.includes(selectedTech.value as string))
})

const totalPages = computed(() =>
	Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)),
)

const paginatedProjects = computed(() => {
	const start = (currentPage.value - 1) * PAGE_SIZE
	return filtered.value.slice(start, start + PAGE_SIZE)
})

watch(selectedTech, () => {
	currentPage.value = 1
})

watch(totalPages, (value) => {
	if (currentPage.value > value) currentPage.value = value
})
</script>

<template>
  <section id="projects" class="section" v-reveal>
    <div class="container">
      <div class="section-title">
        <div>
          <h2 class="h2">Projects</h2>
          <p class="mt-2 text-sm text-white/60">
            Une sélection de mes projets.
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
        <article v-for="p in paginatedProjects" :key="p.slug" class="card-soft">
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

          <div v-if="p.media" class="media-frame mt-5 media-wrap cursor-zoom-in"
            @click="openImage(p.media.src, p.title)">
            <img :src="p.media.src" :alt="`Apercu ${p.title}`" loading="lazy"
              class="project-media opacity-90 transition" />

            <div class="media-overlay flex items-end p-4">
              <div class="text-sm font-semibold text-white/90">
                {{ p.title }}
              </div>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap gap-3">
            <a v-if="p.links?.repo" :href="p.links.repo" target="_blank" rel="noopener noreferrer"
              class="btn btn-sm btn-soft">
              Repo
            </a>

            <a v-if="p.links?.live" :href="p.links.live" target="_blank" rel="noopener noreferrer"
              class="btn btn-sm btn-primary">
              Live
            </a>

            <span v-if="!p.links?.repo && !p.links?.live" class="text-sm text-white/50">
              Links à compléter
            </span>
          </div>
        </article>
      </div>

      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-center gap-3">
        <span class="text-xs text-white/60">
          Page {{ currentPage }} / {{ totalPages }}
        </span>

        <div class="flex items-center gap-2">
          <button v-for="page in totalPages" :key="`page-${page}`" type="button" class="btn btn-xs"
            :class="currentPage === page ? 'btn-primary' : 'btn-soft'" @click="currentPage = page">
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <ImageLightbox :src="activeImage" :alt="activeTitle ?? 'Project image'" @close="closeImage" />
  </section>
</template>
