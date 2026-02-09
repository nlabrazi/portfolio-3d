<script setup lang="ts">
const links = [
	{ href: "#home", label: "Home" },
	{ href: "#about", label: "About" },
	{ href: "#experience", label: "Experience" },
	{ href: "#education", label: "Education" },
	{ href: "#skills", label: "Skills" },
	{ href: "#projects", label: "Projects" },
	{ href: "#misc", label: "Hobbies" },
	{ href: "#contact", label: "Contact" },
]

const activeHash = ref("#home")
const isOpen = ref(false)
const progress = ref(0)

function scrollTo(hash: string) {
	const id = hash.replace("#", "")
	if (id === "home") {
		window.scrollTo({ top: 0, behavior: "smooth" })
		return
	}
	const el = document.getElementById(id)
	if (!el) return
	el.scrollIntoView({ behavior: "smooth", block: "start" })
}

function onNavClick(hash: string) {
	scrollTo(hash)
	isOpen.value = false
}

function updateProgress() {
	const doc = document.documentElement
	const height = doc.scrollHeight - doc.clientHeight
	const current = window.scrollY || doc.scrollTop
	progress.value =
		height > 0 ? Math.min(100, Math.max(0, (current / height) * 100)) : 0
}

let obs: IntersectionObserver | null = null

onMounted(() => {
	const ids = links.map((l) => l.href.slice(1))
	const elements = ids
		.map((id) => document.getElementById(id))
		.filter((x): x is HTMLElement => Boolean(x))

	const ratios = new Map<string, number>()
	for (const el of elements) ratios.set(el.id, 0)

	obs = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				const id = (e.target as HTMLElement).id
				ratios.set(id, e.isIntersecting ? e.intersectionRatio : 0)
			}

			let bestId: string | null = null
			let bestRatio = 0

			for (const [id, ratio] of ratios.entries()) {
				if (ratio > bestRatio) {
					bestRatio = ratio
					bestId = id
				}
			}

			if (bestId) activeHash.value = `#${bestId}`
		},
		{
			threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65],
			rootMargin: "-15% 0px -70% 0px",
		},
	)

	for (const el of elements) obs.observe(el)

	updateProgress()
	window.addEventListener("scroll", updateProgress, { passive: true })
	window.addEventListener("resize", updateProgress)
})

onBeforeUnmount(() => {
	obs?.disconnect()
	obs = null
	window.removeEventListener("scroll", updateProgress)
	window.removeEventListener("resize", updateProgress)
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur relative">
    <div class="scroll-progress">
      <span class="scroll-progress__bar" :style="{ width: `${progress}%` }"></span>
    </div>

    <div class="container flex items-center justify-between py-4">
      <a href="#home" class="font-semibold tracking-tight text-white" @click.prevent="scrollTo('#home')">
        Nabil Labrazi
      </a>

      <nav class="hidden items-center gap-2 md:flex">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav-link"
          :class="activeHash === l.href ? 'nav-link--active' : ''" @click.prevent="onNavClick(l.href)">
          {{ l.label }}
        </a>
      </nav>

      <button type="button" class="nav-toggle md:hidden" :aria-expanded="isOpen" aria-controls="mobile-menu"
        @click="isOpen = !isOpen">
        <span class="sr-only">Toggle navigation</span>
        <svg v-if="!isOpen" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor"
            d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z" />
        </svg>
      </button>
    </div>

    <div v-show="isOpen" id="mobile-menu" class="container pb-5 md:hidden">
      <nav class="mobile-nav">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav-link"
          :class="activeHash === l.href ? 'nav-link--active' : ''" @click.prevent="onNavClick(l.href)">
          {{ l.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
