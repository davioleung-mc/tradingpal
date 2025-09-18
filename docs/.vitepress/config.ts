import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const base = process.env.VP_BASE || '/'

export default defineConfig({
  title: "TradingPal",
  description: "Comprehensive FAQ and educational resources for contract trading, futures, and derivatives",
  
  // Dynamic base: "/" for custom domain, "/<repo>/" for project pages
  base,
  
  // SEO and meta configuration
  head: [
    // Favicon: only .ico and base-aware
    ['link', { rel: 'icon', type: 'image/x-icon', href: `${base}favicon.ico` }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `${base}favicon.ico` }],
    // Enforce HTTPS for any accidental http:// requests in content
    ['meta', { httpEquiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests; block-all-mixed-content' }],
    // Additional HTTPS enforcement
    ['meta', { httpEquiv: 'Strict-Transport-Security', content: 'max-age=31536000; includeSubDomains' }],
    // Canonical (will be updated client-side for dynamic paths)
    ['link', { rel: 'canonical', href: 'https://thetradingpal.com' }],
    // Hreflang alternates for main locales
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://thetradingpal.com/' }],
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: 'https://thetradingpal.com/zh/' }],
    ['link', { rel: 'alternate', hreflang: 'es', href: 'https://thetradingpal.com/es/' }],
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

  // Internationalization
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: "TradingPal",
      description: "Comprehensive FAQ and educational resources for contract trading, futures, and derivatives"
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: "TradingPal",
      description: "全面的合约交易、期货和衍生品常见问题和教育资源"
    },
    es: {
      label: 'Español',
      lang: 'es',
      title: "TradingPal",
      description: "FAQ integral y recursos educativos para trading de contratos, futuros y derivados"
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    nav: [
      // { text: 'Home', link: '/' }, // temporarily removed per request
      { 
        text: 'Insights', 
        items: [
          { text: 'Market Analysis', link: '/insights/market-analysis/' },
          { text: 'Trading Strategies', link: '/insights/trading-strategies/' }
        ]
      },
      { 
        text: 'Resources', 
        items: [
          { text: 'Personal Finance Tips', link: '/resources/personal-finance-tips/' },
          { text: 'Guides & Tutorials', link: '/resources/guides-tutorials/' },
          { text: 'Useful Links', link: '/resources/useful-links/' }
        ]
      }
    ],

    sidebar: {
      // English sidebars
      '/insights/': [
        {
          text: 'Market Analysis',
          items: [
            { text: 'Overview', link: '/insights/market-analysis/' },
            { text: 'Exploring Energy Markets', link: '/insights/market-analysis/exploring-energy-markets' }
          ]
        },
        {
          text: 'Trading Strategies',
          items: [
            { text: 'Overview', link: '/insights/trading-strategies/' }
          ]
        }
      ],
      '/resources/': [
        {
          text: 'Learning Resources',
          items: [
            { text: 'Personal Finance Tips', link: '/resources/personal-finance-tips/' },
            { text: 'Guides & Tutorials', link: '/resources/guides-tutorials/' },
            { text: 'Useful Links', link: '/resources/useful-links/' }
          ]
        }
      ],
      '/basics/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is Contract Trading?', link: '/basics/what-is-contract-trading' },
            { text: 'Types of Contracts', link: '/basics/contract-types' },
            { text: 'Leverage and Margin', link: '/basics/leverage-and-margin' }
          ]
        },
        {
          text: 'Platform Basics',
          items: [
            { text: 'Choosing a Platform', link: '/basics/choosing-platform' }
          ]
        }
      ],
      '/risk-management/': [
        {
          text: 'Risk Management Fundamentals',
          items: [
            { text: 'Risk Management Basics', link: '/risk-management/basics' },
            { text: 'Stop Loss Strategies', link: '/risk-management/stop-loss' },
            { text: 'Position Sizing', link: '/risk-management/position-sizing' },
            { text: 'Risk-Reward Ratio', link: '/risk-management/risk-reward' }
          ]
        },
      ],
      '/advanced-strategies/': [
        {
          text: 'Trading Strategies',
          items: [
            { text: 'Overview', link: '/advanced-strategies/' }
          ]
        }
      ],
      '/faq/': [
        {
          text: 'Frequently Asked Questions',
          items: [
            { text: 'General Questions', link: '/faq/general' },
            { text: 'Technical Questions', link: '/faq/technical' },
            { text: 'Trading Questions', link: '/faq/trading' },
            { text: 'Platform Questions', link: '/faq/platform' }
          ]
        }
      ],
      
      // Chinese sidebars
      '/zh/basics/': [
        {
          text: '基础知识',
          items: [
            { text: '什么是合约交易', link: '/zh/basics/what-is-contract-trading' },
            { text: '合约类型', link: '/zh/basics/contract-types' },
            { text: '理解杠杆', link: '/zh/basics/understanding-leverage' },
            { text: '杠杆和保证金', link: '/zh/basics/leverage-and-margin' },
            { text: '保证金概念', link: '/zh/basics/margin-concepts' },
            { text: '交易术语', link: '/zh/basics/trading-terminology' }
          ]
        }
      ],
      '/zh/risk-management/': [
        {
          text: '风险管理',
          items: [
            { text: '风险管理基础', link: '/zh/risk-management/' },
            { text: '止损策略', link: '/zh/risk-management/stop-loss' },
            { text: '仓位管理', link: '/zh/risk-management/position-sizing' },
            { text: '风险回报比', link: '/zh/risk-management/risk-reward' }
          ]
        }
      ],
      '/zh/tools/': [
        {
          text: '交易工具',
          items: [
            { text: '工具概览', link: '/zh/tools/' },
            { text: '计算器', link: '/zh/tools/calculator' }
          ]
        }
      ],
      '/zh/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '常见问题', link: '/zh/faq/' },
            { text: '一般问题', link: '/zh/faq/general' },
            { text: '技术问题', link: '/zh/faq/technical' },
            { text: '交易问题', link: '/zh/faq/trading' },
            { text: '平台问题', link: '/zh/faq/platform' },
            { text: '策略问题', link: '/zh/faq/strategies' }
          ]
        }
      ],
      
      // Spanish sidebars
      '/es/basics/': [
        {
          text: 'Fundamentos',
          items: [
            { text: '¿Qué es el Trading de Contratos?', link: '/es/basics/what-is-contract-trading' },
            { text: 'Tipos de Contratos', link: '/es/basics/contract-types' },
            { text: 'Apalancamiento y Margen', link: '/es/basics/leverage-and-margin' }
          ]
        }
      ],
      '/es/risk-management/': [
        {
          text: 'Gestión de Riesgos',
          items: [
            { text: 'Fundamentos', link: '/es/risk-management/' },
            { text: 'Estrategias de Stop Loss', link: '/es/risk-management/stop-loss' },
            { text: 'Dimensionamiento de Posiciones', link: '/es/risk-management/position-sizing' }
          ]
        }
      ],
      '/es/tools/': [
        {
          text: 'Herramientas',
          items: [
            { text: 'Herramientas Avanzadas', link: '/es/tools/advanced' }
          ]
        }
      ],
      '/es/faq/': [
        {
          text: 'Preguntas Frecuentes',
          items: [
            { text: 'Preguntas Generales', link: '/es/faq/general' },
            { text: 'Preguntas Avanzadas', link: '/es/faq/advanced' },
            { text: 'Plataformas', link: '/es/faq/platforms' },
            { text: 'Estrategias', link: '/es/faq/strategies' },
            { text: 'Regulación', link: '/es/faq/regulation' },
            { text: 'Análisis Técnico', link: '/es/faq/technical' }
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
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'description', content: description }]
    ]
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
