export default defineNuxtPlugin((nuxtApp) => {
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

  nuxtApp.hooks.hook("app:beforeUnmount", () => {
    document.removeEventListener("pointerdown", onDown)
  })
})
