<script setup lang="ts">
const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
]

function scrollToHash(href: string) {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
    <div class="container flex items-center justify-between py-4">
      <a href="#home" class="font-semibold tracking-tight text-white">
        portfolio-3d
      </a>

      <nav class="hidden gap-6 md:flex">
        <a v-for="l in links" :key="l.href" :href="l.href" class="text-sm text-white/70 transition hover:text-white"
          @click.prevent="scrollToHash(l.href)">
          {{ l.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
