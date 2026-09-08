<script setup lang="ts">
import Starfield from "~/components/hero/Starfield.vue"
import CursorGlow from "~/components/ui/CursorGlow.vue"
import SocialLinks from "~/components/ui/SocialLinks.vue"

const { t } = useI18n()
</script>

<template>
  <div class="min-h-dvh text-white relative">
    <div class="page-bg" aria-hidden="true"></div>

    <Starfield class="fixed inset-0 z-[1] mix-blend-screen" />

    <CursorGlow />

    <SocialLinks class="social-dock-left" orientation="column" size="sm" />

    <a href="#home" class="to-top">
      <span class="sr-only">{{ t('common.top') }}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor"
          d="M12 4.5c.4 0 .78.16 1.06.44l6 6a1.5 1.5 0 1 1-2.12 2.12L13.5 9.62V20a1.5 1.5 0 0 1-3 0V9.62l-3.44 3.44a1.5 1.5 0 1 1-2.12-2.12l6-6c.28-.28.66-.44 1.06-.44z" />
      </svg>
    </a>

    <div class="relative z-10">
      <LayoutHeader />

      <main class="relative">
        <slot />
      </main>

      <LayoutFooterBar />
    </div>
  </div>
</template>
