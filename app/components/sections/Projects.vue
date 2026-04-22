<script setup lang="ts">
import { projects } from "../../../data/projects"

const selectedTech = ref<string | null>(null)
const currentPage = ref(1)
const PAGE_SIZE = 4
const activeImage = ref<string | null>(null)
const activeTitle = ref<string | null>(null)

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

function openImage(src: string, title: string) {
	activeImage.value = src
	activeTitle.value = title
}

function closeImage() {
	activeImage.value = null
	activeTitle.value = null
}

function onVideoReady(e: Event) {
	const video = e.target as HTMLVideoElement | null
	if (!video) return
	video.muted = true
	const attempt = video.play()
	if (attempt && typeof attempt.catch === "function") {
		attempt.catch(() => {
			// Autoplay can be blocked in some browsers; ignore silently.
		})
	}
}
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

          <div v-if="p.media" class="media-frame mt-5 media-wrap"
            :class="p.media.type === 'image' ? 'cursor-zoom-in' : ''"
            @click="p.media.type === 'image' && p.media.src ? openImage(p.media.src, p.title) : undefined">
            <video v-if="p.media.type === 'video'" muted autoplay loop playsinline preload="metadata"
              @canplay="onVideoReady" class="project-media opacity-90 transition">
              <template v-if="p.media.sources?.length">
                <source v-for="s in p.media.sources" :key="s.src" :src="s.src" :type="s.type" />
              </template>
              <source v-else-if="p.media.src" :src="p.media.src" type="video/mp4" />
            </video>

            <img v-else-if="p.media.src" :src="p.media.src" :alt="`Apercu ${p.title}`" loading="lazy"
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

    <div v-if="activeImage" class="misc-modal" @click.self="closeImage">
      <button type="button" class="misc-modal__close" aria-label="Close image" @click="closeImage">
        ✕
      </button>
      <img :src="activeImage" :alt="activeTitle ?? 'Project image'" class="misc-modal__img" />
    </div>
  </section>
</template>
