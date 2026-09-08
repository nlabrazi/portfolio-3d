<script setup lang="ts">
import ImageLightbox from "~/components/ui/ImageLightbox.vue"
import { miscItems } from "../../../data/misc"

const { activeImage, activeTitle, openImage, closeImage } = useImageLightbox()

const { t } = useI18n()
</script>

<template>
  <section tabindex="-1" id="misc" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">{{ t('nav.misc') }}</h2>

      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <article v-for="item in miscItems" :key="item.title"
          class="card glow-hover misc-card"
          :class="item.imageFit === 'cover' ? 'misc-card--landscape' : 'misc-card--portrait'">
          <button type="button" class="misc-card__media" :aria-label="t('common.expandImage', { title: t(item.title) })"
            aria-haspopup="dialog" @click="openImage(item.img, t(item.title))">
            <img :src="item.img" :alt="t(item.title)" class="misc-card__img" loading="lazy" decoding="async" />
          </button>

          <div class="misc-card__body">
            <h3 class="text-lg font-semibold text-white/90">{{ t(item.title) }}</h3>
            <p class="mt-2 text-sm text-white/70">
              {{ t(item.backContent) }}
            </p>
          </div>

          <div class="misc-card__footer">
            {{ t(item.footer) }}
          </div>
        </article>
      </div>
    </div>

    <ImageLightbox :src="activeImage" :alt="activeTitle ?? t('common.expandedImage')" @close="closeImage" />
  </section>
</template>
