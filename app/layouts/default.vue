<script setup lang="ts">
import CursorGlow from "~/components/ui/CursorGlow.vue"
import Starfield from "~/components/hero/Starfield.vue"
</script>

<template>
  <div class="min-h-dvh text-white relative">
    <div class="page-bg" aria-hidden="true"></div>

    <Starfield class="fixed inset-0 z-0 pointer-events-none" :count="1400" :size="0.018" :opacity="0.35" color="#bcdcff"
      :spread="50" :speed-x="0.0001" :speed-y="0.0003" />

    <Starfield class="fixed inset-0 z-[1] pointer-events-none mix-blend-screen" :count="800" :size="0.05"
      :opacity="0.25" color="#ffd3a3" :spread="35" :speed-x="-0.00025" :speed-y="0.00055" :twinkle="true"
      :twinkle-speed="1.3" :twinkle-amount="0.15" :additive="true" />

    <CursorGlow />

    <div class="relative z-10">
      <LayoutHeader />

      <main class="relative">
        <slot />
      </main>

      <LayoutFooterBar />
    </div>
  </div>
</template>
