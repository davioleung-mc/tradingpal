import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Contract Trading Guide",
  description: "The Ultimate Guide to Contract Trading",
  base: '/contract-faq/',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/contract-faq/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }]
  ],
  vite: {
    build: {
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "docs/.vitepress/theme/custom.css";`
        }
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Basics', link: '/basics/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'Tools', link: '/tools/' }
    ],

    sidebar: {
      '/basics/': [
        {
          text: 'Basics',
          items: [
            { text: 'What is Contract Trading', link: '/basics/what-is-contract-trading' },
            { text: 'Contract Types', link: '/basics/contract-types' },
            { text: 'Leverage and Margin', link: '/basics/leverage-and-margin' }
          ]
        }
      ],
      '/faq/': [
        {
          text: 'FAQ',
          items: [
            { text: 'General', link: '/faq/general' },
            { text: 'Technical', link: '/faq/technical' },
            { text: 'Platform', link: '/faq/platform' },
            { text: 'Trading', link: '/faq/trading' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'Calculator', link: '/tools/calculator' },
            { text: 'Risk Calculator', link: '/tools/risk-calculator' },
            { text: 'Glossary', link: '/tools/glossary' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/klynow/contract-faq' }
    ]
  }
})
