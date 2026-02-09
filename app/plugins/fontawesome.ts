import { config, library } from "@fortawesome/fontawesome-svg-core"
import {
	faGithub,
	faLinkedin,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false

library.add(faGithub, faLinkedin, faXTwitter, faEnvelope)

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon)
})
