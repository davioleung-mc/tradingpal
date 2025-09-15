import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TradingPal",
  description: "Comprehensive FAQ and educational resources for contract trading, futures, and derivatives",
  
  // GitHub Pages base URL
  base: '/tradingpal/',
  
  // SEO and meta configuration
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/tradingpal/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/tradingpal/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'TradingPal' }],
    ['meta', { name: 'og:image', content: 'https://your-domain.com/hero-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://your-domain.com/hero-image.png' }],
    // Schema.org markup for SEO
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TradingPal",
      "description": "Comprehensive educational resources for contract trading with YMYL compliance",
      "url": "https://davioleung-mc.github.io/tradingpal/"
    })]
  ],

  // Clean URLs
  cleanUrls: true,
  
  // Sitemap generation
  sitemap: {
    hostname: 'https://davioleung-mc.github.io/tradingpal/'
  },

    // Internationalization - temporarily disabled
    // locales: {
    //   root: {
    //     label: 'English',
    //     lang: 'en',
    //     title: "TradingPal",
    //     description: "Professional contract trading education with comprehensive risk management"
    //   },
    //   zh: {
    //     label: '中文',
    //     lang: 'zh-CN',
    //     title: "TradingPal",
    //     description: "专业合约交易教育与风险管理指南"
    //   },
    //   es: {
    //     label: 'Español',
    //     lang: 'es',
    //     title: "TradingPal",
    //     description: "Educación profesional en trading de contratos con gestión de riesgos"
    //   }
    // },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    nav: [
      { text: 'Home', link: '/' },
      { 
        text: 'Insights', 
        items: [
          { text: 'Market Analysis', link: '/insights/market-analysis/' },
          { text: 'Trading Strategy', link: '/insights/trading-strategy/' }
        ]
      },
      { 
        text: 'Resources', 
        items: [
          { text: 'Personal Finance Tips', link: '/resources/personal-finance-tips/' },
          { text: 'Tutorials', link: '/resources/tutorials/' },
          { text: 'Useful Links', link: '/resources/useful-links/' }
        ]
      }
    ],

    sidebar: {
      // English sidebars - New Structure
      '/insights/': [
        {
          text: 'Market Analysis',
          items: [
            { text: 'Market Analysis Overview', link: '/insights/market-analysis/' }
          ]
        },
        {
          text: 'Trading Strategy',
          items: [
            { text: 'Trading Strategy Overview', link: '/insights/trading-strategy/' },
            { text: 'Advanced Strategies', link: '/insights/trading-strategy/advanced/' }
          ]
        }
      ],
      '/resources/': [
        {
          text: 'Personal Finance Tips',
          items: [
            { text: 'Personal Finance Overview', link: '/resources/personal-finance-tips/' },
            { text: 'Risk Management', link: '/resources/personal-finance-tips/risk-management/' }
          ]
        },
        {
          text: 'Tutorials',
          items: [
            { text: 'Tutorials Overview', link: '/resources/tutorials/' },
            { text: 'Basics', link: '/resources/tutorials/basics/' },
            { text: 'FAQ', link: '/resources/tutorials/faq/' }
          ]
        },
        {
          text: 'Useful Links',
          items: [
            { text: 'Useful Links Overview', link: '/resources/useful-links/' },
            { text: 'Tools', link: '/resources/useful-links/tools/' }
          ]
        }
      ],
      
      // Detailed sidebars for specific sections
      '/insights/market-analysis/': [
        {
          text: 'Market Analysis',
          items: [
            { text: 'Overview', link: '/insights/market-analysis/' }
          ]
        }
      ],
      '/insights/trading-strategy/': [
        {
          text: 'Trading Strategy',
          items: [
            { text: 'Overview', link: '/insights/trading-strategy/' },
            { text: 'Advanced Strategies', link: '/insights/trading-strategy/advanced/' }
          ]
        }
      ],
      '/resources/personal-finance-tips/': [
        {
          text: 'Personal Finance Tips',
          items: [
            { text: 'Overview', link: '/resources/personal-finance-tips/' },
            { text: 'Risk Management Basics', link: '/resources/personal-finance-tips/risk-management/basics' },
            { text: 'Position Sizing', link: '/resources/personal-finance-tips/risk-management/position-sizing' },
            { text: 'Risk-Reward Ratio', link: '/resources/personal-finance-tips/risk-management/risk-reward' },
            { text: 'Stop Loss Strategies', link: '/resources/personal-finance-tips/risk-management/stop-loss' }
          ]
        }
      ],
      '/resources/tutorials/': [
        {
          text: 'Tutorials',
          items: [
            { text: 'Overview', link: '/resources/tutorials/' }
          ]
        },
        {
          text: 'Basics',
          items: [
            { text: 'What is Contract Trading?', link: '/resources/tutorials/basics/what-is-contract-trading' },
            { text: 'Types of Contracts', link: '/resources/tutorials/basics/contract-types' },
            { text: 'Leverage and Margin', link: '/resources/tutorials/basics/leverage-and-margin' },
            { text: 'Choosing a Platform', link: '/resources/tutorials/basics/choosing-platform' }
          ]
        },
        {
          text: 'FAQ',
          items: [
            { text: 'General Questions', link: '/resources/tutorials/faq/general' },
            { text: 'Technical Questions', link: '/resources/tutorials/faq/technical' },
            { text: 'Trading Questions', link: '/resources/tutorials/faq/trading' },
            { text: 'Platform Questions', link: '/resources/tutorials/faq/platform' }
          ]
        }
      ],
      '/resources/useful-links/': [
        {
          text: 'Useful Links',
          items: [
            { text: 'Overview', link: '/resources/useful-links/' }
          ]
        },
        {
          text: 'Tools',
          items: [
            { text: 'Calculator', link: '/resources/useful-links/tools/calculator' },
            { text: 'Risk Calculator', link: '/resources/useful-links/tools/risk-calculator' },
            { text: 'Glossary', link: '/resources/useful-links/tools/glossary' }
          ]
        }
      ],
      
      // Chinese sidebars - New Structure
      '/zh/insights/': [
        {
          text: '市场分析',
          items: [
            { text: '市场分析概览', link: '/zh/insights/market-analysis/' }
          ]
        },
        {
          text: '交易策略',
          items: [
            { text: '交易策略概览', link: '/zh/insights/trading-strategy/' },
            { text: '高级策略', link: '/zh/insights/trading-strategy/advanced/' }
          ]
        }
      ],
      '/zh/resources/': [
        {
          text: '个人理财建议',
          items: [
            { text: '个人理财概览', link: '/zh/resources/personal-finance-tips/' },
            { text: '风险管理', link: '/zh/resources/personal-finance-tips/risk-management/' }
          ]
        },
        {
          text: '教程',
          items: [
            { text: '教程概览', link: '/zh/resources/tutorials/' },
            { text: '基础知识', link: '/zh/resources/tutorials/basics/' },
            { text: '常见问题', link: '/zh/resources/tutorials/faq/' }
          ]
        },
        {
          text: '实用链接',
          items: [
            { text: '实用链接概览', link: '/zh/resources/useful-links/' },
            { text: '工具', link: '/zh/resources/useful-links/tools/' }
          ]
        }
      ],
      '/zh/resources/tutorials/basics/': [
        {
          text: '基础知识',
          items: [
            { text: '什么是合约交易', link: '/zh/resources/tutorials/basics/what-is-contract-trading' },
            { text: '合约类型', link: '/zh/resources/tutorials/basics/contract-types' },
            { text: '理解杠杆', link: '/zh/resources/tutorials/basics/understanding-leverage' },
            { text: '杠杆和保证金', link: '/zh/resources/tutorials/basics/leverage-and-margin' },
            { text: '保证金概念', link: '/zh/resources/tutorials/basics/margin-concepts' },
            { text: '交易术语', link: '/zh/resources/tutorials/basics/trading-terminology' }
          ]
        }
      ],
      '/zh/resources/personal-finance-tips/risk-management/': [
        {
          text: '风险管理',
          items: [
            { text: '风险管理基础', link: '/zh/resources/personal-finance-tips/risk-management/basics' },
            { text: '止损策略', link: '/zh/resources/personal-finance-tips/risk-management/stop-loss' },
            { text: '仓位管理', link: '/zh/resources/personal-finance-tips/risk-management/position-sizing' },
            { text: '风险回报比', link: '/zh/resources/personal-finance-tips/risk-management/risk-reward' }
          ]
        }
      ],
      '/zh/resources/useful-links/tools/': [
        {
          text: '交易工具',
          items: [
            { text: '工具概览', link: '/zh/resources/useful-links/tools/' },
            { text: '计算器', link: '/zh/resources/useful-links/tools/calculator' }
          ]
        }
      ],
      '/zh/resources/tutorials/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '常见问题', link: '/zh/resources/tutorials/faq/' },
            { text: '一般问题', link: '/zh/resources/tutorials/faq/general' },
            { text: '技术问题', link: '/zh/resources/tutorials/faq/technical' },
            { text: '交易问题', link: '/zh/resources/tutorials/faq/trading' },
            { text: '平台问题', link: '/zh/resources/tutorials/faq/platform' },
            { text: '策略问题', link: '/zh/resources/tutorials/faq/strategies' }
          ]
        }
      ],
      
      // Spanish sidebars - New Structure
      '/es/insights/': [
        {
          text: 'Análisis de Mercado',
          items: [
            { text: 'Visión General de Análisis', link: '/es/insights/market-analysis/' }
          ]
        },
        {
          text: 'Estrategia de Trading',
          items: [
            { text: 'Visión General de Estrategias', link: '/es/insights/trading-strategy/' },
            { text: 'Estrategias Avanzadas', link: '/es/insights/trading-strategy/advanced/' }
          ]
        }
      ],
      '/es/resources/': [
        {
          text: 'Consejos de Finanzas Personales',
          items: [
            { text: 'Visión General de Finanzas', link: '/es/resources/personal-finance-tips/' },
            { text: 'Gestión de Riesgos', link: '/es/resources/personal-finance-tips/risk-management/' }
          ]
        },
        {
          text: 'Tutoriales',
          items: [
            { text: 'Visión General de Tutoriales', link: '/es/resources/tutorials/' },
            { text: 'Fundamentos', link: '/es/resources/tutorials/basics/' },
            { text: 'Preguntas Frecuentes', link: '/es/resources/tutorials/faq/' }
          ]
        },
        {
          text: 'Enlaces Útiles',
          items: [
            { text: 'Visión General de Enlaces', link: '/es/resources/useful-links/' },
            { text: 'Herramientas', link: '/es/resources/useful-links/tools/' }
          ]
        }
      ],
      '/es/resources/tutorials/basics/': [
        {
          text: 'Fundamentos',
          items: [
            { text: '¿Qué es el Trading de Contratos?', link: '/es/resources/tutorials/basics/what-is-contract-trading' },
            { text: 'Tipos de Contratos', link: '/es/resources/tutorials/basics/types-of-contracts' },
            { text: 'Comprender el Apalancamiento', link: '/es/resources/tutorials/basics/understanding-leverage' },
            { text: 'Conceptos de Margen', link: '/es/resources/tutorials/basics/margin-concepts' },
            { text: 'Terminología de Trading', link: '/es/resources/tutorials/basics/trading-terminology' },
            { text: 'Elegir Plataforma', link: '/es/resources/tutorials/basics/choosing-platform' }
          ]
        }
      ],
      '/es/resources/personal-finance-tips/risk-management/': [
        {
          text: 'Gestión de Riesgos',
          items: [
            { text: 'Fundamentos', link: '/es/resources/personal-finance-tips/risk-management/basics' }
          ]
        }
      ],
      '/es/resources/useful-links/tools/': [
        {
          text: 'Herramientas',
          items: [
            { text: 'Herramientas Avanzadas', link: '/es/resources/useful-links/tools/advanced' }
          ]
        }
      ],
      '/es/resources/tutorials/faq/': [
        {
          text: 'Preguntas Frecuentes',
          items: [
            { text: 'Preguntas Generales', link: '/es/resources/tutorials/faq/general' },
            { text: 'Preguntas Avanzadas', link: '/es/resources/tutorials/faq/advanced' },
            { text: 'Plataformas', link: '/es/resources/tutorials/faq/platforms' },
            { text: 'Estrategias', link: '/es/resources/tutorials/faq/strategies' },
            { text: 'Regulación', link: '/es/resources/tutorials/faq/regulation' },
            { text: 'Análisis Técnico', link: '/es/resources/tutorials/faq/technical' },
            { text: 'Gestión de Riesgos', link: '/es/resources/tutorials/faq/risk-management' }
          ]
        }
      ]
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/davioleung-mc/tradingpal' }
    // ],

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
      pattern: 'https://github.com/davioleung-mc/tradingpal/edit/main/docs/:path'
    },

    footer: {
      message: '⚠️ Educational Content Only - Not Financial Advice | <a href="/disclaimer">Risk Disclaimer</a> | <a href="https://github.com/davioleung-mc/tradingpal">Open Source</a>',
      copyright: 'Copyright © 2025 TradingPal - Professional Trading Education with YMYL Compliance'
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
