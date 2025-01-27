export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils/module'
  ],
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      baseURL: '',
    }
  }
})
