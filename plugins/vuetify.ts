import 'vuetify/styles'
import { createVuetify } from "vuetify"
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"

export default defineNuxtPlugin((nuxtApp ) => {
    // Create a new Vuetify instance
    const vuetify = createVuetify({
        ssr: true,
        icons: {
            defaultSet: "mdi",
            aliases,
            sets: {
                mdi,
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})