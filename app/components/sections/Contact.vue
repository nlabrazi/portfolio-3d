<script setup lang="ts">
import { site } from "../../../data/site"
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
			`Nom: ${form.name.trim()}`,
			`Email: ${form.email.trim()}`,
			"",
			form.message.trim(),
		].join("\n"),
	)

	return `mailto:${recipient}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section id="contact" class="section" v-reveal>
    <div class="container">
      <div class="section-title">
        <div>
          <h2 class="h2">Get In Touch</h2>
          <p class="mt-2 text-sm text-white/60">
            Let’s build something great together.
          </p>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <!-- Left Card: Contact Information -->
        <article class="card glow-hover p-6 contact-card">
          <h3 class="text-2xl font-semibold text-white">Contact Information</h3>

          <ul class="contact-list">
            <li v-for="item in contactItems" :key="item.key" class="contact-item">
              <span class="contact-icon">
                <FontAwesomeIcon :icon="item.icon" />
              </span>
              <div>
                <p class="contact-label">{{ item.label }}</p>
                <a :href="item.href" :target="isHttpUrl(item.href) ? '_blank' : undefined"
                  :rel="isHttpUrl(item.href) ? 'noopener noreferrer' : undefined" class="contact-link">
                  {{ item.value }}
                </a>
              </div>
            </li>
          </ul>

          <div class="contact-status">
            <div class="status-dot"></div>
            <p class="text-sm text-white/70">
              {{ site.status ?? "Available for opportunities" }}
            </p>
          </div>
        </article>

        <!-- Right Card: Send Message -->
        <article class="card glow-hover p-6">
          <h3 class="text-lg font-semibold text-white/90">Send Me a Message</h3>

          <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="text-sm text-white/60">Full Name *</label>
                <input v-model="form.name" required type="text"
                  class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                  placeholder="Your name" />
              </div>

              <div>
                <label class="text-sm text-white/60">Email Address *</label>
                <input v-model="form.email" required type="email"
                  class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                  placeholder="you@email.com" />
              </div>
            </div>

            <div>
              <label class="text-sm text-white/60">Subject *</label>
              <input v-model="form.subject" required type="text"
                class="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                placeholder="Project / Job / Question…" />
            </div>

            <div>
              <label class="text-sm text-white/60">Message *</label>
              <textarea v-model="form.message" required rows="5"
                class="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                placeholder="Tell me a bit about what you need…" />
            </div>

            <!-- Honeypot (comme la démo) -->
            <div class="hidden">
              <label>Do not fill this if you are human</label>
              <input v-model="form.botField" type="text" />
            </div>

            <div class="flex items-center gap-3">
              <button type="submit" :disabled="isSubmitting"
                class="btn btn-lg btn-primary disabled:cursor-not-allowed disabled:opacity-70">
                {{ isSubmitting ? "Opening..." : "Send Message" }}
              </button>

              <span class="text-sm text-white/60">
                Opens your email client with a prefilled draft.
              </span>
            </div>
          </form>
        </article>
      </div>
    </div>
  </section>
</template>
