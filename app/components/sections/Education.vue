<script setup lang="ts">
import { educationItems } from "../../../data/education"

const { t } = useI18n()
</script>

<template>
  <section id="education" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">{{ t('nav.education') }}</h2>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <article v-for="edu in educationItems" :key="edu.title" class="card glow-hover edu-card">
          <div class="edu-card__head">
            <div class="edu-card__logo">
              <img :src="edu.img" :alt="t('common.logo', { name: edu.title })" loading="lazy" decoding="async" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white/95">{{ t(edu.licence) }}</h3>
              <p class="text-sm text-white/70">{{ edu.title }}</p>
            </div>
          </div>

          <div class="edu-card__content">
            <ul class="edu-card__meta">
              <li class="edu-card__meta-item">
                <span class="edu-card__meta-label">{{ t('education.dates') }}</span>
                <bdi>{{ edu.dateStart }} - {{ edu.dateEnd }}</bdi>
              </li>
              <li class="edu-card__meta-item">
                <span class="edu-card__meta-label">{{ t('education.location') }}</span>
                <span>{{ t(edu.location) }}</span>
              </li>
            </ul>

            <div class="edu-card__summary">
              <p>{{ t(edu.description) }}</p>
              <p class="mt-3">
                {{ t('education.languages') }} <strong>{{ edu.skills }}</strong>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
