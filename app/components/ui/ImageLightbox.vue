<script setup lang="ts">
defineProps<{
	src: string | null
	alt?: string
}>()

const emit = defineEmits<{
	close: []
}>()

const dialog = ref<HTMLDialogElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null
let previousOverflow: string | null = null

function restorePage() {
	if (previousOverflow !== null) {
		document.documentElement.style.overflow = previousOverflow
		previousOverflow = null
	}
	if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
	previousFocus = null
}

watch(dialog, (element, previous) => {
	previous?.close()
	restorePage()
	if (!element) return
	previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
	previousOverflow = document.documentElement.style.overflow
	document.documentElement.style.overflow = "hidden"
	element.showModal()
	closeButton.value?.focus({ preventScroll: true })
}, { flush: "post" })

onBeforeUnmount(() => {
	dialog.value?.close()
	restorePage()
})
</script>

<template>
  <Teleport to="#teleports">
    <!-- The close button is the lightbox's only focusable control. -->
    <dialog v-if="src" ref="dialog" class="misc-modal" :aria-label="alt ? `Agrandissement : ${alt}` : 'Image agrandie'"
      @cancel.prevent="emit('close')" @click.self="emit('close')"
      @keydown.tab.prevent="closeButton?.focus()">
      <button ref="closeButton" type="button" class="misc-modal__close" aria-label="Fermer l’image" @click="emit('close')">
        <span aria-hidden="true">✕</span>
      </button>
      <img :src="src" :alt="alt ?? 'Image agrandie'" class="misc-modal__img" />
    </dialog>
  </Teleport>
</template>
