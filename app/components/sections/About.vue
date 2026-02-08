<script setup lang="ts">
import { about } from "../../../data/about"
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="h2">About</h2>

      <h3 class="mt-6 text-lg font-semibold text-white/90">
        {{ about.heading }}
      </h3>

      <div class="mt-4 space-y-4 text-white/70">
        <p v-for="(p, i) in about.paragraphs" :key="i">
          {{ p }}
        </p>
      </div>
    </div>
  </section>
</template>
