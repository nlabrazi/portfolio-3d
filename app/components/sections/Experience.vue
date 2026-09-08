<script setup lang="ts">
import { experiences } from "../../../data/experience"

const { t } = useI18n()
</script>

<template>
  <section id="experience" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">{{ t('nav.experience') }}</h2>

      <div class="mt-8 grid gap-4">
        <article v-for="exp in experiences" :key="`${exp.company}-${exp.role}-${exp.start}`"
          class="card glow-hover p-6">
          <div class="exp-card__head">
            <div v-if="exp.logo" class="exp-card__logo">
              <img :src="exp.logo" :alt="t('common.logo', { name: exp.company })" loading="lazy" decoding="async" />
            </div>

            <div class="flex flex-1 flex-wrap items-baseline justify-between gap-2">
              <div class="text-lg font-semibold text-white/90">
                <a v-if="exp.companyUrl" :href="exp.companyUrl" target="_blank" rel="noopener noreferrer"
                  class="hover:underline">
                  {{ exp.company }}
                </a>
                <span v-else>{{ exp.company }}</span>
                <span class="text-white/60"> — {{ t(exp.role) }}</span>
              </div>

              <div class="text-sm text-white/60">
                {{ t(exp.start) }} - {{ t(exp.end) }} · {{ t(exp.location) }}
              </div>
            </div>
          </div>

          <p v-if="exp.summary" class="mt-3 text-sm text-white/70">
            {{ t(exp.summary) }}
          </p>

          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div class="text-sm font-semibold text-white/80">{{ t('experience.tasks') }}</div>
              <ul class="mt-2 list-disc space-y-1 ps-5 text-sm text-white/70">
                <li v-for="t in exp.tasks" :key="t">{{ $t(t) }}</li>
              </ul>
            </div>

            <div>
              <div class="text-sm font-semibold text-white/80">{{ t('experience.tools') }}</div>
              <ul class="mt-2 list-disc space-y-1 ps-5 text-sm text-white/70">
                <li v-for="s in exp.stack" :key="s">{{ t(s) }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
