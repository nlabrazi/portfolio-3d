<script setup lang="ts">
import { site } from "../../../data/site"

type SocialLinksProps = {
	orientation?: "row" | "column"
	size?: "sm" | "md"
}

const props = withDefaults(defineProps<SocialLinksProps>(), {
	orientation: "row",
	size: "md",
})

const socials = computed(() => {
	const map = new Map(site.socials.map((s) => [s.label.toLowerCase(), s.href]))
	const links = [
		{
			key: "github",
			label: "GitHub",
			href: map.get("github") ?? "",
			icon: ["fab", "github"],
		},
		{
			key: "linkedin",
			label: "LinkedIn",
			href: map.get("linkedin") ?? "",
			icon: ["fab", "linkedin"],
		},
		{
			key: "email",
			label: "Email",
			href: map.get("email") ?? "",
			icon: ["fas", "envelope"],
		},
		{
			key: "x",
			label: "X",
			href: map.get("x") ?? map.get("twitter") ?? "",
			icon: ["fab", "x-twitter"],
		},
	]
	return links.filter((l) => l.href)
})
</script>

<template>
  <ul :class="[
    'social-links',
    props.orientation === 'column' ? 'social-links--column' : 'social-links--row',
    props.size === 'sm' ? 'social-links--sm' : 'social-links--md',
  ]">
    <li v-for="l in socials" :key="l.key">
      <a :href="l.href" :aria-label="l.label" class="social-link"
        :target="l.href.startsWith('http') ? '_blank' : undefined"
        :rel="l.href.startsWith('http') ? 'noreferrer' : undefined">
        <FontAwesomeIcon :icon="l.icon" />
      </a>
    </li>
  </ul>
</template>
