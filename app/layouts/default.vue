<script setup lang="ts">
import CursorGlow from "~/components/ui/CursorGlow.vue"
import Starfield from "~/components/hero/Starfield.vue"
import SocialLinks from "~/components/ui/SocialLinks.vue"
import { scrollToTop } from "~/utils/navigation"
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

    <SocialLinks class="social-dock-left" orientation="column" size="sm" />

    <button type="button" class="to-top" aria-label="Back to top" @click="scrollToTop">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor"
          d="M12 4.5c.4 0 .78.16 1.06.44l6 6a1.5 1.5 0 1 1-2.12 2.12L13.5 9.62V20a1.5 1.5 0 0 1-3 0V9.62l-3.44 3.44a1.5 1.5 0 1 1-2.12-2.12l6-6c.28-.28.66-.44 1.06-.44z" />
      </svg>
    </button>

    <div class="relative z-10">
      <LayoutHeader />

      <main class="relative">
        <slot />
      </main>

      <LayoutFooterBar />
    </div>
  </div>
</template>
