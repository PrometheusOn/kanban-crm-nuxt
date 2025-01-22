// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})