<script setup lang="ts">
import { type CaptchaApi, loadCaptcha } from "~/utils/hcaptcha"

const { locale, t } = useI18n()
const emit = defineEmits<{ verified: [token: string] }>()
const container = ref<HTMLElement | null>(null)
const failed = ref(false)
let api: CaptchaApi | undefined
let widget: string | undefined
let mounted = false

function reset() {
	emit("verified", "")
	if (widget !== undefined) api?.reset(widget)
}
function render() {
	if (!mounted || !api || !container.value) return
	if (widget !== undefined) api.remove(widget)
	emit("verified", "")
	widget = api.render(container.value, {
		// Official shared site key for Web3Forms Free (not our form Access Key).
		sitekey: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",
		theme: "dark",
		size: "compact",
		hl: locale.value,
		callback: (token) => { failed.value = false; emit("verified", token) },
		"expired-callback": () => emit("verified", ""),
		"error-callback": () => { failed.value = true; emit("verified", "") },
	})
}
async function start() {
	failed.value = false
	try {
		api = await loadCaptcha()
		render()
	} catch {
		if (mounted) failed.value = true
	}
}
onMounted(() => { mounted = true; void start() })
watch(locale, render)
onBeforeUnmount(() => {
	mounted = false
	if (widget !== undefined) api?.remove(widget)
})
defineExpose({ reset })
</script>

<template>
  <div>
    <div ref="container" class="contact-captcha" />
    <div v-if="failed" role="alert" class="mt-2 text-sm text-white/80">
      <p>{{ t('contact.captchaError') }}</p>
      <button type="button" class="btn mt-2" @click="start">{{ t('contact.retry') }}</button>
    </div>
  </div>
</template>
