<script setup lang="ts">
import {
	formatContactValue,
	getSocialLinks,
	isHttpUrl,
} from "~/utils/social-links"

type FormState = {
	name: string
	email: string
	subject: string
	message: string
}

const form = reactive<FormState>({
	name: "",
	email: "",
	subject: "",
	message: "",
})

const config = useRuntimeConfig()
const isConfigured = computed(() => Boolean(config.public.web3formsAccessKey))
const captcha = ref<{ reset: () => void } | null>(null)
const captchaEnabled = ref(false)
const captchaToken = ref("")
const result = ref<"success" | "error" | "captchaRequired" | "invalid" | "rateLimit" | "timeout" | "">("")
let controller: AbortController | undefined
onBeforeUnmount(() => controller?.abort())

const contactItems = getSocialLinks(["email", "linkedin", "github", "x"]).map(
	(item) => ({
		...item,
		value: formatContactValue(item.href),
	}),
)

const isSubmitting = ref(false)

async function onSubmit() {
	if (isSubmitting.value || !isConfigured.value) return
	captchaEnabled.value = true
	result.value = ""
	if (![form.name, form.email, form.subject, form.message].every((value) => value.trim())) {
		result.value = "invalid"
		return
	}
	if (!captchaToken.value) {
		result.value = "captchaRequired"
		return
	}
	isSubmitting.value = true
	controller = new AbortController()
	const timeout = window.setTimeout(() => controller?.abort(), 15_000)
	try {
		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json" },
			signal: controller.signal,
			body: JSON.stringify({
				access_key: config.public.web3formsAccessKey,
				name: form.name.trim(),
				email: form.email.trim(),
				subject: form.subject.trim(),
				message: form.message.trim(),
				"h-captcha-response": captchaToken.value,
			}),
		})
		if (response.status === 429) {
			result.value = "rateLimit"
			return
		}
		const data = await response.json()
		if (!response.ok || data?.success !== true) throw new Error("Submission rejected")
		result.value = "success"
		Object.assign(form, { name: "", email: "", subject: "", message: "" })
	} catch {
		result.value = controller.signal.aborted ? "timeout" : "error"
	} finally {
		window.clearTimeout(timeout)
		isSubmitting.value = false
		captchaToken.value = ""
		captcha.value?.reset()
	}
}

const { t } = useI18n()
</script>

<template>
  <section tabindex="-1" id="contact" class="section" v-reveal>
    <div class="container">
      <div class="section-title">
        <div>
          <h2 class="h2">{{ t('contact.heading') }}</h2>
          <p class="mt-2 text-sm text-white/60">
            {{ t('contact.intro') }}
          </p>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <!-- Left Card: Contact Information -->
        <article class="card glow-hover p-6 contact-card">
          <h3 class="text-2xl font-semibold text-white">{{ t('contact.information') }}</h3>

          <ul class="contact-list">
            <li v-for="item in contactItems" :key="item.key" class="contact-item">
              <span class="contact-icon">
                <FontAwesomeIcon :icon="item.icon" />
              </span>
              <div>
                <p class="contact-label">{{ t(`social.${item.key}`) }}</p>
                <a :href="item.href" :target="isHttpUrl(item.href) ? '_blank' : undefined"
                  :rel="isHttpUrl(item.href) ? 'noopener noreferrer' : undefined" class="contact-link" dir="ltr">
                  {{ item.value }}
                </a>
              </div>
            </li>
          </ul>

          <div class="contact-status">
            <div class="status-dot"></div>
            <p class="text-sm text-white/70">
              {{ t('site.status') }}
            </p>
          </div>
        </article>

        <!-- Right Card: Send Message -->
        <article class="card glow-hover p-6">
          <h3 class="text-lg font-semibold text-white/90">{{ t('contact.formTitle') }}</h3>

          <form class="mt-6 space-y-4" :aria-busy="isSubmitting" @focusin="captchaEnabled = true" @submit.prevent="onSubmit">
            <fieldset :disabled="isSubmitting || !isConfigured" class="space-y-4">
            <legend class="sr-only">{{ t('contact.formTitle') }}</legend>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label for="contact-name" class="text-sm text-white/60">{{ t('contact.name') }} *</label>
                <input id="contact-name" v-model="form.name" name="name" autocomplete="name" required type="text"
                  class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                  :placeholder="t('contact.namePlaceholder')" />
              </div>

              <div>
                <label for="contact-email" class="text-sm text-white/60">{{ t('contact.email') }} *</label>
                <input id="contact-email" v-model="form.email" name="email" dir="ltr" autocomplete="email" required type="email"
                  class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                  :placeholder="t('contact.emailPlaceholder')" />
              </div>
            </div>

            <div>
              <label for="contact-subject" class="text-sm text-white/60">{{ t('contact.subject') }} *</label>
              <input id="contact-subject" v-model="form.subject" name="subject" required type="text"
                class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                :placeholder="t('contact.subjectPlaceholder')" />
            </div>

            <div>
              <label for="contact-message" class="text-sm text-white/60">{{ t('contact.message') }} *</label>
              <textarea id="contact-message" v-model="form.message" name="message" required rows="5"
                class="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                :placeholder="t('contact.messagePlaceholder')" />
            </div>

            <UiContactCaptcha v-if="captchaEnabled && isConfigured" ref="captcha" @verified="captchaToken = $event" />

            <div class="flex flex-wrap items-center gap-3">
              <button type="submit" :disabled="isSubmitting"
                aria-describedby="contact-send-help"
                class="btn btn-lg btn-primary disabled:cursor-not-allowed disabled:opacity-70">
                {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
              </button>

              <span id="contact-send-help" class="text-sm text-white/60">
                {{ t('contact.sendHelp') }}
              </span>
            </div>
            </fieldset>
            <p v-if="!isConfigured" class="text-sm text-white/80">{{ t('contact.unavailable') }}</p>
            <p role="status" aria-live="polite" aria-atomic="true" class="text-sm text-white/90">{{ result ? t(`contact.${result}`) : '' }}</p>
          </form>
        </article>
      </div>
    </div>
  </section>
</template>
