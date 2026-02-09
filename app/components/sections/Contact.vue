<script setup lang="ts">
import { site } from "../../../data/site"

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

const isSubmitting = ref(false)
const isSent = ref(false)

// Will plug Netlify after
// Prepare only UI, wiring will come after
async function onSubmit() {
	if (isSubmitting.value) return
	isSubmitting.value = true
	isSent.value = false

	// Placeholder UX (will plug Netlify after)
	await new Promise((r) => setTimeout(r, 500))

	isSubmitting.value = false
	isSent.value = true
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
        <article class="card glow-hover p-6">
          <h3 class="text-lg font-semibold text-white/90">Contact Information</h3>

          <dl class="mt-6 space-y-4">
            <div v-for="s in site.socials" :key="s.href" class="flex items-start justify-between gap-6">
              <dt class="text-sm text-white/60">{{ s.label }}</dt>
              <dd class="text-sm">
                <a :href="s.href" target="_blank" rel="noreferrer"
                  class="text-white/80 hover:text-white hover:underline">
                  {{ s.href.replace("mailto:", "") }}
                </a>
              </dd>
            </div>
          </dl>

          <div class="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="text-sm font-semibold text-white/80">Current Status</div>
            <div class="mt-1 text-sm text-white/70">
              {{ site.status ?? "Available for opportunities" }}
            </div>
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
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </button>

              <span v-if="isSent" class="text-sm text-emerald-300/90">
                Message UI ready ✅ (Netlify wiring next)
              </span>
            </div>
          </form>
        </article>
      </div>
    </div>
  </section>
</template>
