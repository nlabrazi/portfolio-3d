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
  <header class="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#home" class="font-semibold tracking-tight" @click.prevent="scrollToHash('#home')">
        portfolio-3d
      </a>

      <nav class="hidden gap-6 md:flex">
        <a v-for="l in links" :key="l.href" :href="l.href" class="text-sm text-white/80 hover:text-white"
          @click.prevent="scrollToHash(l.href)">
          {{ l.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
