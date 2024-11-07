
import { Expo } from './themes/expo';


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // Nuxt Config
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
          integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
          crossorigin: ''
        }
      ],
    }
  },

  runtimeConfig: {
    public: {
      // Info
      APP_NAME: process.env.APP_NAME,

      // Config
      APP_ENV: process.env.APP_ENV,
      APP_API_URL: process.env.APP_API_URL,
      APP_API_BASE_URL: process.env.APP_API_BASE_URL,
      API_DEFAULT_VERSION: process.env.API_DEFAULT_VERSION,
    }
  },

  ssr: false,

  devtools: {
    enabled: process.env.APP_ENV === 'local'
  },

  // Imports
  imports: {
    dirs: [
      'shared/global/**/*.ts',
    ]
  },

  // Styles
  css: [
    '~/assets/css/toast.css',
    '~/assets/css/style.css',
    '~/assets/css/primevue.css'
  ],

  // Modules
  modules: [
    '@formkit/auto-animate/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-lodash',
  ],

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Expo,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, toast, primevue, primevue-styled, app-base, tailwind-utilities'
          },
          darkModeSelector: '.dark'
        }
      },
    },
    autoImport: false,
    components: {
      prefix: 'PrimeVue', /* PrimeVueComponent */
      exclude: '*'
    },
    directives: {
      prefix: 'pv-', /* v-pv-directive */
      include: ['tooltip', 'focustrap', 'ripple']
    },
  },

  lodash: {
    prefix: '_',
    prefixSkip: false,
    upperAfterPrefix: false,
  },

  colorMode: {
    classSuffix: ''
  }
});
