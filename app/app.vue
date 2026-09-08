<script setup lang="ts">
import { site } from "../data/site"

const { t } = useI18n()
const localeHead = useLocaleHead({ lang: true, dir: true, seo: true })
useHead(() => ({
	htmlAttrs: localeHead.value.htmlAttrs,
	link: [
		{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
		{ rel: "alternate icon", href: "/favicon.ico" },
		...(localeHead.value.link ?? []),
	],
	meta: localeHead.value.meta ?? [],
}))
useSeoMeta({
	titleTemplate: (title) => `${title || t("site.title")} · ${site.name}`,
	ogSiteName: site.name,
	ogType: "website",
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
