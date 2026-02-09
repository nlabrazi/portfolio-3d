<script setup lang="ts">
const links = [
	{ href: "#home", label: "Home" },
	{ href: "#about", label: "About" },
	{ href: "#experience", label: "Experience" },
	{ href: "#skills", label: "Skills" },
	{ href: "#projects", label: "Projects" },
	{ href: "#contact", label: "Contact" },
]

const activeHash = ref("#home")

function scrollTo(hash: string) {
	const id = hash.replace("#", "")
	const el = document.getElementById(id)
	if (!el) return
	el.scrollIntoView({ behavior: "smooth", block: "start" })
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
})

onBeforeUnmount(() => {
	obs?.disconnect()
	obs = null
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
    <div class="container flex items-center justify-between py-4">
      <a href="#home" class="font-semibold tracking-tight text-white" @click.prevent="scrollTo('#home')">
        Nabil Labrazi
      </a>

      <nav class="hidden items-center gap-2 md:flex">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav-link"
          :class="activeHash === l.href ? 'nav-link--active' : ''" @click.prevent="scrollTo(l.href)">
          {{ l.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
