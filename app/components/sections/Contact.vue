<script setup lang="ts">
import { site } from "../../../data/site"
</script>

<template>
  <section id="contact" class="section">
    <h2 class="text-2xl font-semibold tracking-tight">Contact</h2>

    <div class="mt-6 flex flex-col gap-2 text-white/70">
      <a v-for="s in site.socials" :key="s.href" class="hover:text-white" :href="s.href" target="_blank"
        rel="noreferrer">
        {{ s.label }}
      </a>
    </div>
  </section>
</template>
