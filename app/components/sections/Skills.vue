<script setup lang="ts">
import { skillGroups } from "../../../data/skills"
</script>

<template>
  <section id="skills" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">Skills</h2>

      <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="g in skillGroups" :key="g.title" class="card glow-hover p-7 sm:p-8">
          <h3 class="text-base font-semibold text-white/90">{{ g.title }}</h3>

          <div class="mt-5 flex flex-wrap gap-3">
            <span v-for="it in g.items" :key="it.label" class="pill pill-lg inline-flex items-center gap-2">
              <img v-if="it.icon" :src="it.icon" :alt="`${it.label} logo`" class="h-5 w-5 rounded-sm"
                loading="lazy" decoding="async" />
              {{ it.label }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
