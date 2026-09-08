<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const languages = [
	{ code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
	{ code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
	{ code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
] as const
</script>

<template>
  <nav :aria-label="t('common.language')" class="language-switcher">
    <NuxtLink v-for="language in languages" :key="language.code" :to="switchLocalePath(language.code)"
      :lang="language.code" :dir="language.dir" :aria-label="language.label" :title="language.label"
      :aria-current="locale === language.code ? 'true' : undefined" class="language-switcher__link">
      <span aria-hidden="true">{{ language.flag }}</span>
      <span class="sr-only">{{ language.label }}</span>
    </NuxtLink>
  </nav>
</template>
