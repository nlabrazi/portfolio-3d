<script setup lang="ts">
import {
	formatContactValue,
	getSocialHref,
	getSocialLinks,
	isHttpUrl,
} from "~/utils/social-links"

type FormState = {
	name: string
	email: string
	subject: string
	message: string
	botField: string
}

const form = reactive<FormState>({
	name: "",
	email: "",
	subject: "",
	message: "",
	botField: "",
})

const contactEmailHref = getSocialHref("email")

const contactItems = getSocialLinks(["email", "linkedin", "github", "x"]).map(
	(item) => ({
		...item,
		value: formatContactValue(item.href),
	}),
)

const isSubmitting = ref(false)

function onSubmit() {
	if (isSubmitting.value || form.botField) return

	if (!contactEmailHref.startsWith("mailto:")) return

	isSubmitting.value = true

	const mailtoTarget = buildMailtoTarget()
	isSubmitting.value = false
	window.location.href = mailtoTarget
}

function buildMailtoTarget() {
	const recipient = contactEmailHref.replace("mailto:", "")
	const subject = encodeURIComponent(form.subject.trim())
	const body = encodeURIComponent(
		[
			`${t("contact.name")}: ${form.name.trim()}`,
			`${t("contact.email")}: ${form.email.trim()}`,
			"",
			form.message.trim(),
		].join("\n"),
	)

	return `mailto:${recipient}?subject=${subject}&body=${body}`
}

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="section" v-reveal>
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

          <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
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

            <!-- Honeypot (comme la démo) -->
            <div class="hidden">
              <label for="contact-bot-field">{{ t('contact.honeypot') }}</label>
              <input id="contact-bot-field" v-model="form.botField" name="botField" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <div class="flex items-center gap-3">
              <button type="submit" :disabled="isSubmitting"
                aria-describedby="contact-mailto-help"
                class="btn btn-lg btn-primary disabled:cursor-not-allowed disabled:opacity-70">
                {{ isSubmitting ? t('contact.opening') : t('contact.send') }}
              </button>

              <span id="contact-mailto-help" class="text-sm text-white/60">
                {{ t('contact.mailtoHelp') }}
              </span>
            </div>
          </form>
        </article>
      </div>
    </div>
  </section>
</template>
