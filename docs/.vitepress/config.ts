import { defineConfig } from 'vitepress'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any

// https://vitepress.dev/reference/site-config
const base = process.env.VP_BASE || '/'
const SITE_URL = 'https://thetradingpal.com'

const absoluteUrl = (path?: string) => {
  if (!path) return undefined
  try {
    return new URL(path, SITE_URL).toString()
  } catch {
    return undefined
  }
}

const findFirstImageSrc = (source?: string) => {
  if (!source) return undefined
  const htmlImg = source.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (htmlImg) return htmlImg[1]
  const markdownImg = source.match(/!\[[^\]]*\]\(([^)]+)\)/)
  if (markdownImg) return markdownImg[1]
  return undefined
}

export default defineConfig({
  // HTML language for SEO/i18n
  lang: 'en-US',
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
  // Language hint
  ['meta', { httpEquiv: 'content-language', content: 'en-US' }],
  // (Hreflang links are injected per-page in transformHead)
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    // Open Graph defaults (page-specific overrides in transformHead)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site_name', content: 'TradingPal' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'author', content: 'TradingPal Editorial Team' }],
    ['meta', { name: 'publisher', content: 'TradingPal' }],
    // Preconnects
    ['link', { rel: 'preconnect', href: 'https://images.unsplash.com' }],
    // Google Tag Manager
    ['script', {}, `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TCQZS4TS')`],
    // Base WebSite schema
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://thetradingpal.com#website",
      "name": "TradingPal",
      "description": "Your trusted companion for contract trading and financial education",
      "url": SITE_URL,
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://thetradingpal.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })],
    // Organization schema
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://thetradingpal.com#organization",
      "name": "TradingPal",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`
      }
    })],
    // (Breadcrumbs are injected per-page in transformHead)
  ],

  // Clean URLs
  cleanUrls: true,
  
  // Sitemap generation
  sitemap: {
    hostname: 'https://thetradingpal.com'
  },

  // Include Git timestamps to power dateModified metadata
  lastUpdated: true,

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
    },
    assetsInclude: ['**/*.webp', '**/*.avif']
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
    const canonicalPath = page.startsWith('/') ? page : `/${page}`
    const url = `${SITE_URL}${canonicalPath}`
    const rawContent: string = (ctx as any).content || pageData.content || ''
    const imageCandidates = [frontmatter.image, findFirstImageSrc(rawContent)]
    const imageUrls = Array.from(new Set(imageCandidates
      .map((candidate) => absoluteUrl(candidate))
      .filter((value): value is string => Boolean(value))
    ))
    const primaryOgImage = imageUrls[0] || `${SITE_URL}/favicon.ico`
    // Determine page type
    let ogType = 'website'
    const head = [
      ['link', { rel: 'canonical', href: url }],
      // Self-referential hreflang for single-locale site
      ['link', { rel: 'alternate', hreflang: 'en', href: url }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { property: 'og:image', content: primaryOgImage }],
      ['meta', { name: 'twitter:image', content: primaryOgImage }]
    ] as any[]

    // If this is a post page (non-index under our 4 sections), add Article JSON-LD
    const path: string = (page || '')
    const segments = path.split('/').filter(Boolean)
    const top = segments[0] || ''
    const isIndex = path.endsWith('/') || path.endsWith('/index')
    const inSection = ['market-analysis','trading-strategies','finance-101','useful-links'].includes(top)
    const isPost = inSection && !isIndex
    if (isPost) {
      ogType = 'article'
      const authorName = frontmatter.author || 'TradingPal Editorial Team'
      const authorUrl = frontmatter.authorUrl || undefined
      const datePublished = frontmatter.date || undefined
      const dateModified = (pageData?.lastUpdated && typeof pageData.lastUpdated === 'number')
        ? new Date(pageData.lastUpdated).toISOString()
        : datePublished
      const articleSection = top
      const articleSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fmTitle || baseTitle,
        description,
        inLanguage: 'en-US',
        articleSection,
        author: authorName ? {
          '@type': 'Person',
          name: authorName,
          url: authorUrl,
          sameAs: authorUrl ? [authorUrl] : undefined
        } : undefined,
        publisher: { '@type': 'Organization', name: 'TradingPal', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
        mainEntityOfPage: url,
        url,
        datePublished,
        dateModified,
        ...(imageUrls.length ? { image: imageUrls } : {})
      }
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(articleSchema)])
      // Article Open Graph extensions
      if (datePublished) head.push(['meta', { property: 'article:published_time', content: datePublished }])
      if (dateModified) head.push(['meta', { property: 'article:modified_time', content: dateModified }])
      head.push(['meta', { property: 'article:section', content: articleSection }])
      if (authorUrl) {
        head.push(['meta', { property: 'article:author', content: authorUrl }])
      } else if (authorName) {
        head.push(['meta', { property: 'article:author', content: authorName }])
      }

      // Breadcrumbs: Home > Section > Post
      const crumbs = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thetradingpal.com/' },
        { '@type': 'ListItem', position: 2, name: top.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()), item: `https://thetradingpal.com/${top}/` },
        { '@type': 'ListItem', position: 3, name: fmTitle || baseTitle, item: url }
      ]
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs
      })])
    }
    // Optionally preload a hero image when explicitly requested
    if (frontmatter.image && frontmatter.preloadImage === true && imageUrls.length) {
      head.push(['link', { rel: 'preload', as: 'image', href: imageUrls[0], fetchpriority: 'high' }])
    }
    // Section index breadcrumb (Home > Section)
    else if (inSection && isIndex) {
      const crumbs = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thetradingpal.com/' },
        { '@type': 'ListItem', position: 2, name: top.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()), item: url }
      ]
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs
      })])
    }

    // Generic WebPage schema for all pages
    const webPageSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      inLanguage: 'en-US',
      name: fmTitle || baseTitle,
      description,
      url,
      ...(imageUrls.length ? { image: imageUrls } : {})
    }
    head.push(['script', { type: 'application/ld+json' }, JSON.stringify(webPageSchema)])

    // Ensure og:type is set appropriately
    head.push(['meta', { property: 'og:type', content: ogType }])

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
    config: (md) => {
      // Add lazy-loading and async decoding to all Markdown images
      const defaultImageRule = md.renderer.rules.image || function(tokens, idx, options, _env, self) {
        return self.renderToken(tokens, idx, options)
      }
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        token.attrs = token.attrs ?? []
        const setAttr = (name: string, value: string) => {
          const attrs = token.attrs as [string, string][]
          const i = attrs.findIndex(([n]) => n === name)
          if (i > -1) attrs[i][1] = value
          else attrs.push([name, value])
        }
        setAttr('loading', 'lazy')
        setAttr('decoding', 'async')
        return defaultImageRule(tokens, idx, options, env, self)
      }
    }
  }
})
