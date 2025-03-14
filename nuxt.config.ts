// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300],
        },        
      }
    }],
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    "@hebilicious/vue-query-nuxt",
    'dayjs-nuxt',
    ['@vee-validate/nuxt', {
      autoImports: true,
    }]
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**']
  },
})