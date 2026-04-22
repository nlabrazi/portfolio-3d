<script setup lang="ts">
import { getSocialLinks, isHttpUrl } from "~/utils/social-links"

type SocialLinksProps = {
	orientation?: "row" | "column"
	size?: "sm" | "md"
}

const props = withDefaults(defineProps<SocialLinksProps>(), {
	orientation: "row",
	size: "md",
})

const socials = getSocialLinks(["github", "linkedin", "email", "x"])
</script>

<template>
  <ul :class="[
    'social-links',
    props.orientation === 'column' ? 'social-links--column' : 'social-links--row',
    props.size === 'sm' ? 'social-links--sm' : 'social-links--md',
  ]">
    <li v-for="l in socials" :key="l.key">
      <a :href="l.href" :aria-label="l.label" class="social-link"
        :target="isHttpUrl(l.href) ? '_blank' : undefined"
        :rel="isHttpUrl(l.href) ? 'noopener noreferrer' : undefined">
        <FontAwesomeIcon :icon="l.icon" />
      </a>
    </li>
  </ul>
</template>
