<script setup lang="ts">
defineProps<{
	src: string | null
	alt?: string
}>()

const emit = defineEmits<{
	close: []
}>()
</script>

<template>
  <div v-if="src" class="misc-modal" @click.self="emit('close')">
    <button type="button" class="misc-modal__close" :aria-label="alt ?? 'Close image'" @click="emit('close')">
      ✕
    </button>
    <img :src="src" :alt="alt ?? 'Expanded image'" class="misc-modal__img" />
  </div>
</template>
