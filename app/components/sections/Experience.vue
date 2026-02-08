<script setup lang="ts">
import { experiences } from "../../../data/experience"
</script>

<template>
  <section id="experience" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">Experience</h2>

      <div class="mt-8 grid gap-4">
        <article v-for="exp in experiences" :key="`${exp.company}-${exp.role}-${exp.start}`"
          class="card glow-hover p-6">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <div class="text-lg font-semibold text-white/90">
              <a v-if="exp.companyUrl" :href="exp.companyUrl" target="_blank" class="hover:underline">
                {{ exp.company }}
              </a>
              <span v-else>{{ exp.company }}</span>
              <span class="text-white/60"> — {{ exp.role }}</span>
            </div>

            <div class="text-sm text-white/60">
              {{ exp.start }} - {{ exp.end }} · {{ exp.location }}
            </div>
          </div>

          <p class="mt-3 text-sm text-white/70">
            {{ exp.summary }}
          </p>

          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div class="text-sm font-semibold text-white/80">Tâches</div>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                <li v-for="t in exp.tasks" :key="t">{{ t }}</li>
              </ul>
            </div>

            <div>
              <div class="text-sm font-semibold text-white/80">Outils / Langages</div>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                <li v-for="s in exp.stack" :key="s">{{ s }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
