<script setup lang="ts">
import { about } from "../../../data/about"
</script>

<template>
  <section id="about" class="section" v-reveal>
    <div class="container">
      <div class="grid gap-8 lg:grid-cols-[280px,1fr] lg:items-start">
        <div class="card p-3">
          <img src="~/assets/images/home-bg.jpg" alt="Portrait" class="h-64 w-full rounded-xl object-cover" />
        </div>

        <div>
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
      </div>
    </div>
  </section>
</template>
