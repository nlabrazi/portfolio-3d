<script setup lang="ts">
import { skillGroups } from "../../../data/skills"
</script>

<template>
  <section id="skills" class="section" v-reveal>
    <div class="container">
      <h2 class="h2">Skills</h2>

      <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="g in skillGroups" :key="g.title" class="card glow-hover p-8 sm:p-9">
          <h3 class="text-lg font-semibold text-white/90">{{ g.title }}</h3>

          <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            <div v-for="it in g.items" :key="it.label" class="skill-item">
              <span class="skill-icon-wrap">
                <i v-if="it.icon" :class="['skill-icon', it.icon]" aria-hidden="true"></i>
              </span>
              <span class="skill-label">{{ it.label }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
