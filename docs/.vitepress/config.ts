import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const base = process.env.VP_BASE || '/'

export default defineConfig({
  title: "TradingPal",
  description: "Market analysis, trading strategies, Finance 101, and curated links for traders and investors.",
  
  // Dynamic base: "/" for custom domain, "/<repo>/" for project pages
  base,
  
  // Exclude legacy/unused content from build and sitemap
  srcExclude: [
    '**/advanced-strategies/**',
    '**/basics/**',
    '**/faq/**',
    '**/insights/**',
    '**/resources/**',
    '**/risk-management/**',
    '**/tools/**',
    '**/es/**',
    '**/zh/**'
  ],
  
  // SEO and meta configuration
  head: [
    // Favicon: only .ico and base-aware
    ['link', { rel: 'icon', type: 'image/x-icon', href: `${base}favicon.ico` }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `${base}favicon.ico` }],
    // Enforce HTTPS for any accidental http:// requests in content
    ['meta', { httpEquiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests; block-all-mixed-content' }],
    // Additional HTTPS enforcement
    ['meta', { httpEquiv: 'Strict-Transport-Security', content: 'max-age=31536000; includeSubDomains' }],
  // Canonical (will be updated per page by transformHead)
  ['link', { rel: 'canonical', href: 'https://thetradingpal.com' }],
  // Hreflang alternate for English
  ['link', { rel: 'alternate', hreflang: 'en', href: 'https://thetradingpal.com/' }],
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'TradingPal' }],
    ['meta', { name: 'og:image', content: 'https://thetradingpal.com/hero-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://thetradingpal.com/hero-image.png' }],
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }],
    ['meta', { name: 'author', content: 'TradingPal Editorial Team' }],
    ['meta', { name: 'publisher', content: 'TradingPal' }],
    // Preconnects
    ['link', { rel: 'preconnect', href: 'https://images.unsplash.com' }],
    // Base WebSite schema
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TradingPal",
      "description": "Your trusted companion for contract trading and financial education",
      "url": "https://thetradingpal.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://thetradingpal.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })],
    // BreadcrumbList (homepage only; deeper pages can augment in enhanceApp)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thetradingpal.com/" }
      ]
    })]
  ],

  // Clean URLs
  cleanUrls: true,
  
  // Sitemap generation
  sitemap: {
    hostname: 'https://thetradingpal.com'
  },

  // Internationalization: consolidate to a single English site
  locales: undefined as any,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    nav: [
      { text: 'Market Analysis', link: '/market-analysis/' },
      { text: 'Trading Strategies', link: '/trading-strategies/' },
      { text: 'Finance 101', link: '/finance-101/' },
      { text: 'Useful Links', link: '/useful-links/' }
    ],

    sidebar: {
      '/market-analysis/': [
        {
          text: 'Market Analysis',
          items: [
            { text: 'Overview', link: '/market-analysis/' },
            { text: 'Exploring Energy Markets', link: '/market-analysis/exploring-energy-markets' }
          ]
        }
      ],
      '/trading-strategies/': [
        {
          text: 'Trading Strategies',
          items: [
            { text: 'Overview', link: '/trading-strategies/' }
          ]
        }
      ],
      '/finance-101/': [
        {
          text: 'Finance 101',
          items: [
            { text: 'Overview', link: '/finance-101/' },
            { text: 'Personal Finance Basics', link: '/finance-101/personal-finance-basics' },
            { text: 'Guides & Tutorials', link: '/finance-101/guides-and-tutorials' }
          ]
        }
      ],
      '/useful-links/': [
        {
          text: 'Useful Links',
          items: [
            { text: 'Curated Resources', link: '/useful-links/' }
          ]
        }
      ]
    },

    // Remove social links to hide social media icons
    // socialLinks: [],

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    // Remove edit links
    // editLink: {
    //   pattern: 'https://github.com/your-repo/contract-faq/edit/main/docs/:path'
    // },

    // Remove footer to eliminate license and copyright info
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2025 Contract Trading Ultimate Guide'
    // }
  },

  // Performance optimizations
  vite: {
    optimizeDeps: {
      include: ['vue', '@vueuse/core']
    }
  },
  // Runtime hook to adjust canonical & meta per page for generative engines
  transformHead: (ctx) => {
    const page = ctx.page
    const siteConfig = ctx.siteConfig?.site || ctx.siteConfig || {} as any
    // Access pageData (VitePress 1.x) for title/description/frontmatter
    const pageData: any = (ctx as any).pageData || {}
    const frontmatter = pageData.frontmatter || {}
    const baseTitle = siteConfig.title || 'TradingPal'
    const fmTitle = frontmatter.title || pageData.title || ''
    const title = fmTitle ? `${fmTitle} | ${baseTitle}` : baseTitle
    const description = frontmatter.description || pageData.description || siteConfig.description || 'Contract trading education and insights.'
    const url = `https://thetradingpal.com${page}`
    const head = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'description', content: description }]
    ] as any[]

    // If this is a post page (non-index under our 4 sections), add Article JSON-LD
    const path: string = (page || '')
    const segments = path.split('/').filter(Boolean)
    const top = segments[0] || ''
    const isIndex = path.endsWith('/') || path.endsWith('/index')
    const inSection = ['market-analysis','trading-strategies','finance-101','useful-links'].includes(top)
    const isPost = inSection && !isIndex
    if (isPost) {
      const authorName = frontmatter.author || 'TradingPal Editorial Team'
      const authorUrl = frontmatter.authorUrl || undefined
      const datePublished = frontmatter.date || undefined
      const articleSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fmTitle || baseTitle,
        description,
        author: authorName ? {
          '@type': 'Person',
          name: authorName,
          url: authorUrl,
          sameAs: authorUrl ? [authorUrl] : undefined
        } : undefined,
        publisher: { '@type': 'Organization', name: 'TradingPal' },
        mainEntityOfPage: url,
        url,
        datePublished,
        dateModified: datePublished,
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(articleSchema)])
    }

    return head
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    html: true,
    config: (_md) => {
      // Add custom markdown plugins if needed
    }
  }
})
