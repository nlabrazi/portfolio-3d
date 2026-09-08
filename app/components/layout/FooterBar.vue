<script setup lang="ts">
import { getSocialLinks, isHttpUrl } from "~/utils/social-links"
import { footer } from "../../../data/footer"
import { site } from "../../../data/site"

const socialLinks = getSocialLinks(["email", "github", "linkedin", "x"])

const { t } = useI18n()
</script>

<template>
  <!-- <footer class="mt-24 border-t border-white/10"> -->
  <footer class="relative z-10 mt-24 border-t border-white/10 bg-neutral-950/70 backdrop-blur">
    <div class="container py-16">
      <div class="grid gap-10 md:grid-cols-3">
        <!-- Brand -->
        <div>
          <div class="text-lg font-semibold tracking-tight text-white/90">
            {{ site.name }}
          </div>
          <p class="mt-3 text-sm text-white/60">
            {{ t('site.tagline') }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <a v-for="s in socialLinks" :key="s.href" :href="s.href"
              :target="isHttpUrl(s.href) ? '_blank' : undefined"
              :rel="isHttpUrl(s.href) ? 'noopener noreferrer' : undefined" class="pill hover:text-white">
              {{ t(`social.${s.key}`) }}
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <div class="text-sm font-semibold text-white/80">{{ t('footer.navigation') }}</div>
          <ul class="mt-4 space-y-2">
            <li v-for="n in footer.navigation" :key="n.href">
              <a :href="n.href" class="text-sm text-white/60 hover:text-white">
                {{ t(n.label) }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <div class="text-sm font-semibold text-white/80">{{ t('footer.services') }}</div>
          <ul class="mt-4 space-y-2">
            <li v-for="s in footer.services" :key="s" class="text-sm text-white/60">
              {{ t(s) }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div
        class="container flex flex-col gap-3 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <div>© {{ new Date().getFullYear() }} — {{ site.name }}</div>
        <div class="text-white/40">
          {{ t('footer.builtWith') }}
        </div>
      </div>
    </div>
  </footer>
</template>
