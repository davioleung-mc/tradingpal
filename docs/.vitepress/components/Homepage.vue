<template>
  <div class="financial-homepage">
    <!-- Hero Section: NYT-inspired above-the-fold -->
    <section class="hero-section">
      <div class="hero-main" itemprop="mainEntity" itemscope itemtype="https://schema.org/CreativeWork">
        <div class="lead-story" itemprop="mainEntityOfPage">
          <h1 class="headline">{{ heroLead.title }}</h1>
          <p v-if="heroLead.description" class="summary">{{ heroLead.description }}</p>
          <a :href="withBase(heroLead.link)" class="read-more">Read More</a>
        </div>
        <div v-if="heroAlsoToday.length" class="secondary-stories">
          <h3 class="section-label">Also Today</h3>
          <ul class="story-list">
            <li v-for="post in heroAlsoToday" :key="post.link">
              <a :href="withBase(post.link)">{{ post.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Insights Section -->
    <section class="insights-section">
      <div class="section-header">
        <h2 class="section-title" id="trading-strategies-heading">Trading Strategies</h2>
      </div>

      <div class="insights-grid">
        <a
          v-for="post in insightPosts"
          :key="post.link"
          :href="withBase(post.link)"
          class="insight-card"
        >
          <article class="insight-card-inner">
            <div class="card-image">
              <img
                :src="resolveInsightImage(post)"
                :alt="post.title"
                loading="lazy"
                decoding="async"
                @error="usePlaceholder"
              />
            </div>
            <h3 class="card-headline">
              <span class="card-title">{{ post.title }}</span>
            </h3>
          </article>
        </a>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="resources-section">
      <div class="content-inner">
        <h2 class="section-title">Finance 101</h2>
        <div class="resource-categories finance-columns">
          <div
            v-for="(column, idx) in financeColumns"
            :key="'finance-column-' + idx"
            class="resource-category finance-column"
          >
            <ul class="resource-list">
              <li v-for="post in column" :key="post.link">
                <a :href="withBase(post.link)">
                  <span class="resource-title">{{ post.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="tools-section">
      <div class="content-inner tools-inner">
        <h2 class="section-title tools-title">Useful Links</h2>
        <div class="tools-grid tools-list four-up" itemscope itemtype="https://schema.org/ItemList">
          <a href="/useful-links/forex-heatmap" class="tool-item">
            <span class="tool-icon">💱</span>
            <span class="tool-name">Forex Heatmap</span>
          </a>
          <a href="/useful-links/stock-heatmap" class="tool-item">
            <span class="tool-icon">📈</span>
            <span class="tool-name">Stock Heatmap</span>
          </a>
          <a href="/useful-links/crypto-coins-heatmap" class="tool-item">
            <span class="tool-icon">💹</span>
            <span class="tool-name">Crypto Coins Heatmap</span>
          </a>
          <a href="/useful-links/economic-calendar" class="tool-item">
            <span class="tool-icon">🗓️</span>
            <span class="tool-name">Economic Calendar</span>
          </a>
        </div>
      </div>
    </section>
    <!-- Investor Wisdom Quote Section -->
    <section class="investor-quote quote-band">
      <div class="content-inner quote-inner">
        <span class="quote-label">Investor Wisdom</span>
        <blockquote>
          <p><span class="quote-mark">“</span>Be fearful when others are greedy and be greedy when others are fearful.<span class="quote-mark end">”</span></p>
          <cite>&mdash; Warren Buffett</cite>
        </blockquote>
      </div>
    </section>

    <!-- Investment Disclaimer Footer -->
    <footer class="investment-disclaimer">
      <div class="disclaimer-content">
        <p class="disclaimer-text">
          <strong>Disclaimer:</strong> This content is for educational purposes only and not investment advice. Trading involves risk of loss. Consult a financial advisor before making investment decisions.
        </p>
        <p class="disclaimer-footer">
          © 2025 TradingPal. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const rawMarketAnalysis = import.meta.glob('../../market-analysis/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const rawTradingStrategies = import.meta.glob('../../trading-strategies/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const rawFinance101 = import.meta.glob('../../finance-101/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

function parseFrontmatter(raw) {
  if (typeof raw !== 'string') return {}
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const result = {}
  match[1].split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!kv) return
    const key = kv[1].trim()
    let value = kv[2].trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    result[key] = value
  })
  return result
}

function stripFrontmatter(raw) {
  if (typeof raw !== 'string') return ''
  return raw.replace(/^---[\s\S]*?---\s*/, '')
}

function extractExcerpt(raw) {
  const body = stripFrontmatter(raw).replace(/\r\n/g, '\n')
  const blocks = body.split(/\n\n+/)
  for (const block of blocks) {
    const clean = block.trim()
    if (!clean) continue
    if (/^([#!>]|```)/.test(clean)) continue
    return clean.replace(/[#*_`>]/g, '').split('\n')[0].trim()
  }
  return ''
}

function normalizeLink(key) {
  let normalized = String(key || '').replace(/\\/g, '/').replace(/\.md$/, '')
  const parts = normalized.split('/').filter(Boolean)
  while (parts.length && parts[0] === '..') parts.shift()
  if (parts.length && parts[0] === '.') parts.shift()
  return '/' + parts.join('/')
}

function normalizePost(key, raw) {
  const fm = parseFrontmatter(raw)
  const link = normalizeLink(key)
  const slug = link.split('/').pop() || ''
  let title = fm.title || ''
  if (!title && typeof raw === 'string') {
    const heading = raw.match(/^#\s+(.+?)\s*$/m)
    if (heading) title = heading[1]
  }
  if (!title) title = slug.replace(/-/g, ' ')
  const description = fm.description || ''
  const image = fm.image || ''
  const excerpt = description || extractExcerpt(raw)
  const date = fm.date ? new Date(fm.date) : undefined
  return { title, link, description, date, image, excerpt }
}

const fallbackLead = {
  title: 'Bitcoin Halving Explained: Impact, History, and Trading Strategies',
  link: '/finance-101/bitcoin-halving-explained-impact-history-trading-strategies',
  description: 'An in-depth guide to Bitcoin halving, covering its mechanics, historical schedule, market impact, key metrics, and practical trading approaches for crypto investors and traders.'
}

const fallbackAlsoToday = [
  {
    title: 'The Binance Alpha Effect: Can an On-Chain Whisper Boost Meme Coins?',
    link: '/market-analysis/binance-alpha-effect-meme-coins'
  },
  {
    title: 'Gold Price Forecast Q4 2025: Can $4,000 Break?',
    link: '/market-analysis/gold-price-forecast-q4-2025-break-4000'
  },
  {
    title: 'Mastering Dollar-Cost Averaging (DCA)',
    link: '/trading-strategies/mastering-dollar-cost-averaging-dca-beginners-guide'
  }
]

const fallbackInsights = [
  {
    title: 'Market Crash 2025 Playbook: Crypto, RWAs & Traditional Assets',
    link: '/trading-strategies/invest-market-crash-2025-playbook-crypto-rwas-traditional-assets',
    excerpt: 'Scenario plans for balancing risk across crypto, tokenized assets, and equities.',
    image: ''
  },
  {
    title: 'The 3 Best Technical Indicators for Beginner Forex Traders',
    link: '/trading-strategies/the-3-best-technical-indicators-for-beginner-forex-traders',
    excerpt: 'How RSI, MACD, and moving averages can anchor your first FX strategy.',
    image: ''
  },
  {
    title: 'Ultimate MACD Crossover Strategy',
    link: '/finance-101/ultimate-macd-crossover-strategy',
    excerpt: 'Time entries using classic momentum crossovers and risk controls.',
    image: ''
  },
  {
    title: 'Combining MACD and RSI for More Powerful Signals',
    link: '/trading-strategies/combining-macd-rsi-powerful-trading-signals',
    excerpt: 'Frameworks for pairing momentum oscillators to confirm trades.',
    image: ''
  },
  {
    title: 'Liquidity Map: Reading Order Books Like a Pro',
    link: '/market-analysis/binance-alpha-effect-meme-coins',
    excerpt: 'Spot spoofing and hidden bids using depth-of-market heat maps.',
    image: ''
  },
  {
    title: 'Gold Price Forecast Q4 2025: Can $4,000 Break?',
    link: '/market-analysis/gold-price-forecast-q4-2025-break-4000',
    excerpt: 'Macro catalysts and trade setups around bullion breakouts.',
    image: ''
  }
]

const fallbackFinance = [
  {
    title: 'Bitcoin Halving Explained: Impact, History, and Trading Strategies',
    link: '/finance-101/bitcoin-halving-explained-impact-history-trading-strategies',
    excerpt: 'Understand halving mechanics, market impact, and trading tactics.'
  },
  {
    title: 'Crypto Wallet Types Explained',
    link: '/finance-101/crypto-wallet',
    excerpt: 'Compare hot, cold, and warm wallets to keep digital assets secure.'
  },
  {
    title: 'Decoding the Market’s Mood with RSI',
    link: '/finance-101/decoding-the-markets-mood-rsi',
    excerpt: 'Read relative strength signals to gauge momentum extremes.'
  },
  {
    title: 'DEX vs CEX: Crypto Trading Guide',
    link: '/finance-101/dex-vs-cex-crypto-trading-guide',
    excerpt: 'Break down centralized versus decentralized exchange workflows.'
  },
  {
    title: 'On-Balance Volume (OBV): A Trader’s Guide',
    link: '/finance-101/on-balance-volume',
    excerpt: 'Pair volume flow with price to confirm trend strength.'
  },
  {
    title: 'Ultimate MACD Crossover Strategy',
    link: '/finance-101/ultimate-macd-crossover-strategy',
    excerpt: 'Time entries with proven momentum crossover techniques.'
  },
  {
    title: 'Unlocking the Digital Universe: Blockchain & Wallets',
    link: '/finance-101/unlocking-the-digital-universe-blockchain-crypto-wallets',
    excerpt: 'Demystify blockchain foundations and the role of crypto wallets.'
  },
  {
    title: 'What Causes Inflation? Drivers and Strategies',
    link: '/finance-101/what-causes-inflation-key-drivers-data-insights-strategies-traders',
    excerpt: 'Track inflation catalysts and position portfolios accordingly.'
  }
]

const marketAnalysisPosts = computed(() => {
  return Object.entries(rawMarketAnalysis)
    .map(([key, raw]) => [key.replace(/\\/g, '/'), raw])
    .filter(([key]) => !key.endsWith('/index.md'))
    .map(([key, raw]) => normalizePost(key, raw))
    .filter((post) => post.title && post.link)
    .sort((a, b) => {
      if (a.date && b.date) return b.date.getTime() - a.date.getTime()
      if (a.date) return -1
      if (b.date) return 1
      return a.title.localeCompare(b.title)
    })
})

const heroLead = computed(() => {
  return marketAnalysisPosts.value[0] || fallbackLead
})

const heroAlsoToday = computed(() => {
  const posts = marketAnalysisPosts.value.slice(1, 4)
  return posts.length ? posts : fallbackAlsoToday
})

const placeholderImage = 'https://placehold.co/600x360?text=Trading%20Strategies'

function extractFirstImage(raw, key) {
  if (typeof raw !== 'string') return ''
  const match = raw.match(/!\[[^\]]*\]\(([^)]+)\)/)
  if (!match) return ''
  const url = match[1].trim()
  return resolveRelativeImage(url, key)
}

function resolveRelativeImage(src, key) {
  if (!src) return ''
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  if (src.startsWith('/')) return src
  const segments = key.split('/')
  segments.pop()
  const basePath = segments.join('/')
  const combined = basePath ? `${basePath}/${src}` : src
  return normalizeLink(combined)
}

const insightPosts = computed(() => {
  const posts = Object.entries(rawTradingStrategies)
    .map(([key, raw]) => [key.replace(/\\/g, '/'), raw])
    .filter(([key]) => !key.endsWith('/index.md'))
    .map(([key, raw]) => {
      const normalized = normalizePost(key, raw)
      if (!normalized.image) {
        const firstImage = extractFirstImage(raw, key)
        normalized.image = firstImage || placeholderImage
      }
      return normalized
    })
    .filter((post) => post.title && post.link)
    .sort((a, b) => {
      if (a.date && b.date) return b.date.getTime() - a.date.getTime()
      if (a.date) return -1
      if (b.date) return 1
      return a.title.localeCompare(b.title)
    })
    .slice(0, 6)

  if (posts.length) return posts

  return fallbackInsights.map((post) => ({ ...post, image: post.image || placeholderImage }))
})

const finance101List = computed(() => {
  const posts = Object.entries(rawFinance101)
    .map(([key, raw]) => [key.replace(/\\/g, '/'), raw])
    .filter(([key]) => !key.endsWith('/index.md'))
    .map(([key, raw]) => normalizePost(key, raw))
    .filter((post) => post.title && post.link)
    .sort((a, b) => {
      if (a.date && b.date) return b.date.getTime() - a.date.getTime()
      if (a.date) return -1
      if (b.date) return 1
      return a.title.localeCompare(b.title)
    })

  return posts.length ? posts : fallbackFinance
})

const financeColumns = computed(() => {
  const existing = [...finance101List.value]
  const seenLinks = new Set(existing.map((post) => post.link))

  if (existing.length < 8) {
    for (const fallback of fallbackFinance) {
      if (seenLinks.has(fallback.link)) continue
      existing.push(fallback)
      seenLinks.add(fallback.link)
      if (existing.length >= 8) break
    }
  }

  const posts = existing.slice(0, 8)
  const itemsPerColumn = 4
  const columns = []

  for (let columnIndex = 0; columnIndex < 2; columnIndex++) {
    const start = columnIndex * itemsPerColumn
    columns.push(posts.slice(start, start + itemsPerColumn))
  }

  return columns
})

function hideImage(event) {
  const target = event?.currentTarget
  if (!target) return
  const wrapper = target.closest('.card-image')
  if (wrapper) wrapper.remove()
}

function resolveInsightImage(post) {
  return post?.image || placeholderImage
}

function usePlaceholder(event) {
  const target = event?.currentTarget
  if (!target) return
  if (target.src === placeholderImage) return
  target.src = placeholderImage
  target.removeEventListener('error', usePlaceholder)
}

onMounted(() => {
  document.body.classList.add('is-homepage')
})

onUnmounted(() => {
  document.body.classList.remove('is-homepage')
})
</script>


