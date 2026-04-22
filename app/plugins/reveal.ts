const revealObservers = new WeakMap<HTMLElement, IntersectionObserver>()

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("reveal", {
		mounted(el: HTMLElement) {
			if (import.meta.server) return

			el.classList.add("reveal")

			const observer = new IntersectionObserver(
				([entry]) => {
					if (!entry?.isIntersecting) return
					el.classList.add("reveal--visible")
					observer.disconnect()
					revealObservers.delete(el)
				},
				{ threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
			)

			revealObservers.set(el, observer)
			observer.observe(el)
		},

		unmounted(el: HTMLElement) {
			revealObservers.get(el)?.disconnect()
			revealObservers.delete(el)
		},

		getSSRProps() {
			return {}
		},
	})
})
