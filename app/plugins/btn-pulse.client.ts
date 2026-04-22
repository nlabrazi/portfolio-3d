let cleanupPulseListener: (() => void) | undefined

export default defineNuxtPlugin(() => {
	if (import.meta.server) return

	cleanupPulseListener?.()

	const onDown = (event: PointerEvent) => {
		const target = event.target as HTMLElement | null
		if (!target) return
		const btn = target.closest(".btn") as HTMLElement | null
		if (!btn) return

		btn.classList.remove("btn--pulse")
		// Force reflow to restart animation
		void btn.offsetWidth
		btn.classList.add("btn--pulse")
	}

	document.addEventListener("pointerdown", onDown, { passive: true })

	cleanupPulseListener = () => {
		document.removeEventListener("pointerdown", onDown)
	}

	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			cleanupPulseListener?.()
			cleanupPulseListener = undefined
		})
	}
})
