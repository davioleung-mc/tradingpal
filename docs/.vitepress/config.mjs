import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Contract Trading Guide",
  description: "The Ultimate Guide to Contract Trading",
  base: '/contract-faq/',
  outDir: './dist',
  srcDir: './docs',
  cleanUrls: true,
  appearance: true,
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
