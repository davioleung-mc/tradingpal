import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The Ultimate Guide to Contract Trading",
  description: "Comprehensive FAQ and educational resources for contract trading, futures, and derivatives",
  
  // GitHub Pages base URL
  base: '/contract-faq/',
  
  // SEO and meta configuration
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/contract-faq/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/contract-faq/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Contract Trading Ultimate Guide' }],
    ['meta', { name: 'og:image', content: 'https://your-domain.com/hero-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://your-domain.com/hero-image.png' }],
    // Schema.org markup for SEO
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "The Ultimate Guide to Contract Trading",
      "description": "Comprehensive FAQ and educational resources for contract trading",
      "url": "https://your-domain.com"
    })]
  ],

  // Clean URLs
  cleanUrls: true,
  
  // Sitemap generation
  sitemap: {
    hostname: 'https://your-domain.com'
  },

  // Internationalization
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: "The Ultimate Guide to Contract Trading",
      description: "Comprehensive FAQ and educational resources for contract trading, futures, and derivatives"
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: "合约交易终极指南",
      description: "全面的合约交易、期货和衍生品常见问题和教育资源"
    },
    es: {
      label: 'Español',
      lang: 'es',
      title: "La Guía Definitiva del Trading de Contratos",
      description: "FAQ integral y recursos educativos para trading de contratos, futuros y derivados"
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Basics', link: '/basics/' },
      { text: 'Risk Management', link: '/risk-management/' },
      { text: 'Advanced Strategies', link: '/advanced-strategies/' },
      { text: 'FAQ', link: '/faq/' },
      { 
        text: 'Tools', 
        items: [
          { text: 'Calculator', link: '/tools/calculator' },
          { text: 'Risk Calculator', link: '/tools/risk-calculator' },
          { text: 'Glossary', link: '/tools/glossary' }
        ]
      }
    ],

    sidebar: {
      // English sidebars
      '/basics/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is Contract Trading?', link: '/basics/what-is-contract-trading' },
            { text: 'Types of Contracts', link: '/basics/contract-types' },
            { text: 'Leverage and Margin', link: '/basics/leverage-and-margin' },
            { text: 'Key Terminology', link: '/basics/terminology' }
          ]
        },
        {
          text: 'Platform Basics',
          items: [
            { text: 'Choosing a Platform', link: '/basics/choosing-platform' },
            { text: 'Account Setup', link: '/basics/account-setup' },
            { text: 'Interface Overview', link: '/basics/interface' }
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
        {
          text: 'Advanced Risk Control',
          items: [
            { text: 'Portfolio Diversification', link: '/risk-management/diversification' },
            { text: 'Hedging Strategies', link: '/risk-management/hedging' },
            { text: 'Market Risk Assessment', link: '/risk-management/market-risk' }
          ]
        }
      ],
      '/advanced-strategies/': [
        {
          text: 'Trading Strategies',
          items: [
            { text: 'Scalping', link: '/advanced-strategies/scalping' },
            { text: 'Swing Trading', link: '/advanced-strategies/swing-trading' },
            { text: 'Arbitrage', link: '/advanced-strategies/arbitrage' }
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/contract-faq' },
      { icon: 'twitter', link: 'https://twitter.com/your-handle' },
      { icon: 'discord', link: 'https://discord.gg/your-server' }
    ],

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

    editLink: {
      pattern: 'https://github.com/your-repo/contract-faq/edit/main/docs/:path'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Contract Trading Ultimate Guide'
    }
  },

  // Performance optimizations
  vite: {
    optimizeDeps: {
      include: ['vue', '@vueuse/core']
    }
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      // Add custom markdown plugins if needed
    }
  }
})
