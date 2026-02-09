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
		{ key: "github", label: "GitHub", href: map.get("github") ?? "" },
		{ key: "linkedin", label: "LinkedIn", href: map.get("linkedin") ?? "" },
		{ key: "email", label: "Email", href: map.get("email") ?? "" },
		{ key: "x", label: "X", href: map.get("x") ?? map.get("twitter") ?? "" },
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
        <svg v-if="l.key === 'github'" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.182 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.99 1.029-2.69-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.54 9.54 0 0 1 2.503.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.596 1.028 2.69 0 3.848-2.338 4.695-4.566 4.944.36.31.68.92.68 1.854 0 1.338-.012 2.419-.012 2.749 0 .269.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>

        <svg v-else-if="l.key === 'linkedin'" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor"
            d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.08c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 7v9.18h-5V16.5c0-2.08-.04-4.76-2.9-4.76-2.9 0-3.35 2.27-3.35 4.61V24h-5V8z" />
        </svg>

        <svg v-else-if="l.key === 'email'" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor"
            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.236-8 4.8-8-4.8V6l8 4.8L20 6v2.236z" />
        </svg>

        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.5 11.24h-6.62l-5.18-6.77-5.93 6.77H1.8l7.73-8.83L1.4 2.25h6.79l4.69 6.2 5.37-6.2z" />
        </svg>
      </a>
    </li>
  </ul>
</template>
