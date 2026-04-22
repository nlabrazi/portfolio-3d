export function useImageLightbox() {
	const activeImage = ref<string | null>(null)
	const activeTitle = ref<string | null>(null)

	function openImage(src: string, title: string) {
		activeImage.value = src
		activeTitle.value = title
	}

	function closeImage() {
		activeImage.value = null
		activeTitle.value = null
	}

	return {
		activeImage,
		activeTitle,
		openImage,
		closeImage,
	}
}
