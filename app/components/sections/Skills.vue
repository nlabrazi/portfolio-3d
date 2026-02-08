<script setup lang="ts">
import { skillGroups } from "../../../data/skills"
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="h2">Skills</h2>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <article v-for="g in skillGroups" :key="g.title" class="card glow-hover p-6">
          <h3 class="text-sm font-semibold text-white/80">{{ g.title }}</h3>

          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="it in g.items" :key="it.label"
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
              {{ it.label }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
