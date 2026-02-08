export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", {
    mounted(el: HTMLElement) {
      if (import.meta.server) return

      el.classList.add("reveal")

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          el.classList.add("reveal--visible")
          obs.disconnect()
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      )

      obs.observe(el)
    },

    getSSRProps() {
      return {}
    }
  })
})
