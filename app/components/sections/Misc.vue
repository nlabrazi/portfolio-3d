<script setup lang="ts">
import { miscItems } from "../../../data/misc"

const activeImage = ref<string | null>(null)
const activeTitle = ref<string | null>(null)

function openImage(src: string, title: string) {
	activeImage.value = src
	activeTitle.value = title
}

function closeImage() {
	activeImage.value = null
	activeTitle.value = null
}
</script>

<template>
  <section id="misc" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">Hobbies</h2>

      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <article v-for="item in miscItems" :key="item.title"
          class="card glow-hover misc-card"
          :class="item.imageFit === 'cover' ? 'misc-card--landscape' : 'misc-card--portrait'">
          <button type="button" class="misc-card__media" @click="openImage(item.img, item.title)">
            <img :src="item.img" :alt="item.title" class="misc-card__img" loading="lazy" decoding="async" />
          </button>

          <div class="misc-card__body">
            <h3 class="text-lg font-semibold text-white/90">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-white/70">
              {{ item.backContent }}
            </p>
          </div>

          <div class="misc-card__footer">
            {{ item.footer }}
          </div>
        </article>
      </div>
    </div>

    <div v-if="activeImage" class="misc-modal" @click.self="closeImage">
      <button type="button" class="misc-modal__close" aria-label="Close image" @click="closeImage">
        ✕
      </button>
      <img :src="activeImage" :alt="activeTitle ?? 'Hobby image'" class="misc-modal__img" />
    </div>
  </section>
</template>
