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

onMounted(() => {
	const ids = links.map((l) => l.href.replace("#", ""))
	const elements = ids
		.map((id) => document.getElementById(id))
		.filter(Boolean) as HTMLElement[]

	const obs = new IntersectionObserver(
		(entries) => {
			// on garde l’entrée la plus visible
			const visible = entries
				.filter((e) => e.isIntersecting)
				.sort(
					(a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
				)[0]

			if (!visible?.target?.id) return
			activeHash.value = `#${visible.target.id}`
		},
		{
			root: null,
			threshold: [0.2, 0.35, 0.5, 0.65],
			rootMargin: "-20% 0px -70% 0px",
		},
	)

	for (const el of elements) obs.observe(el)

	onBeforeUnmount(() => obs.disconnect())
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
    <div class="container flex items-center justify-between py-4">
      <a href="#home" class="font-semibold tracking-tight text-white" @click.prevent="scrollTo('#home')">
        portfolio-3d
      </a>

      <nav class="hidden items-center gap-2 md:flex">
        <a v-for="l in links" :key="l.href" :href="l.href" class="rounded-full px-3 py-1 text-sm transition" :class="activeHash === l.href
          ? 'bg-white/10 text-white'
          : 'text-white/70 hover:text-white'" @click.prevent="scrollTo(l.href)">
          {{ l.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
