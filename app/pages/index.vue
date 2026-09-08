<script setup lang="ts">
import { site } from "../../data/site"

const { t, locale } = useI18n()
const localizedUrl = computed(() => `${site.url}${locale.value === "fr" ? "/" : `/${locale.value}/`}`)
useSeoMeta({
  title: () => t("seo.title"),
  description: () => t("seo.description"),
  ogTitle: () => `${site.name} · ${t("seo.title")}`,
  ogDescription: () => t("seo.description"),
  ogImage: site.ogImage,
  ogUrl: () => localizedUrl.value,
  twitterCard: "summary_large_image",
  twitterTitle: () => `${site.name} · ${t("seo.title")}`,
  twitterDescription: () => t("seo.description"),
  twitterImage: site.ogImage,
})
</script>

<template>
  <div class="py-10">
    <SectionsHero />
    <SectionsAbout />
    <SectionsExperience />
    <SectionsEducation />
    <SectionsSkills />
    <SectionsProjects />
    <SectionsMisc />
    <SectionsContact />
  </div>
</template>
