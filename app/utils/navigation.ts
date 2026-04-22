export function scrollToTop() {
	if (import.meta.server) return

	window.scrollTo({ top: 0, behavior: "smooth" })
}

export function scrollToHash(hash: string) {
	if (import.meta.server) return

	const id = hash.replace("#", "")
	if (!id || id === "home") {
		scrollToTop()
		return
	}

	const element = document.getElementById(id)
	if (!element) return

	element.scrollIntoView({ behavior: "smooth", block: "start" })
}
