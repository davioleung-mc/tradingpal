<template>
  <div class="financial-homepage">
    <!-- Hero Section: NYT-inspired above-the-fold -->
    <section class="hero-section">
      <div class="hero-main">
        <div class="lead-story">
          <h1 class="headline">Federal Reserve Signals Pivotal Rate Decision as Markets Brace for Q4 Volatility</h1>
          <p class="summary">Central bank officials hint at potential policy shift amid growing inflation concerns and market uncertainty heading into the final quarter of 2025.</p>
          <a href="/insights/market-analysis/fed-policy-shift" class="read-more">Read More</a>
        </div>
        <div class="secondary-stories">
          <h3 class="section-label">Also Today</h3>
          <ul class="story-list">
            <li><a href="/insights/market-analysis/tech-earnings">Tech Earnings Season: What to Expect from Mega-Cap Results</a></li>
            <li><a href="/insights/economic-trends/inflation-data">September Inflation Data Shows Mixed Signals for Consumer Spending</a></li>
            <li><a href="/resources/personal-finance/retirement-planning">Why Your 401(k) Strategy Needs a 2025 Update</a></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Insights Section -->
    <section class="insights-section">
      <div class="section-header">
        <h2 class="section-title" id="insights-heading">Insights</h2>
        <div class="filter-tabs" role="tablist" aria-labelledby="insights-heading">
          <button class="filter-tab active" role="tab" aria-selected="true" tabindex="0" data-filter="all">All</button>
          <button class="filter-tab" role="tab" aria-selected="false" tabindex="-1" data-filter="market-analysis">Market Analysis</button>
          <button class="filter-tab" role="tab" aria-selected="false" tabindex="-1" data-filter="economic-trends">Economic Trends</button>
          <button class="filter-tab" role="tab" aria-selected="false" tabindex="-1" data-filter="stock-deep-dives">Stock Deep Dives</button>
        </div>
      </div>
      
      <div class="insights-grid">
        <article class="insight-card" data-category="market-analysis">
          <div class="card-image">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop&auto=format" alt="Stock market charts and analysis" />
          </div>
          <h3 class="card-headline">S&P 500 Technical Outlook: Key Levels to Watch</h3>
          <p class="card-excerpt">Critical support and resistance zones as markets navigate earnings season volatility.</p>
        </article>
        
        <article class="insight-card" data-category="economic-trends">
          <div class="card-image">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop&auto=format" alt="Economic data visualization" />
          </div>
          <h3 class="card-headline">Labor Market Strength Continues Despite Rate Concerns</h3>
          <p class="card-excerpt">Employment data suggests resilient consumer spending power amid monetary tightening.</p>
        </article>
        
        <article class="insight-card" data-category="stock-deep-dives">
          <div class="card-image">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop&auto=format" alt="Business analysis and technology" />
          </div>
          <h3 class="card-headline">Apple's Services Revenue: The Hidden Growth Driver</h3>
          <p class="card-excerpt">Breaking down the tech giant's recurring revenue streams and long-term value proposition.</p>
        </article>

        <!-- Added second row of insight cards -->
        <article class="insight-card" data-category="market-analysis">
          <div class="card-image">
            <img loading="lazy" src="https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&h=480&fit=crop&auto=format" alt="Volatility and market sentiment" onerror="this.style.display='none'" />
          </div>
          <h3 class="card-headline">Volatility Index Signals Cautious Optimism</h3>
          <p class="card-excerpt">Option markets are pricing a narrowing risk range as earnings guidance stabilizes.</p>
        </article>

        <article class="insight-card" data-category="economic-trends">
          <div class="card-image">
            <img loading="lazy" src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=480&fit=crop&auto=format" alt="Energy transition and renewable infrastructure" onerror="this.style.display='none'" />
          </div>
          <h3 class="card-headline">Energy Transition Investments Accelerate Globally</h3>
          <p class="card-excerpt">Capital flows into grid resilience and clean energy infrastructure hit new highs.</p>
        </article>

        <article class="insight-card" data-category="stock-deep-dives">
          <div class="card-image">
            <img loading="lazy" src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=480&fit=crop&auto=format" alt="AI technology concept" onerror="this.style.display='none'" />
          </div>
          <h3 class="card-headline">AI Infrastructure: The Next Competitive Moat</h3>
          <p class="card-excerpt">Why data center efficiency and custom silicon are shaping future tech leadership.</p>
        </article>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="resources-section">
      <div class="content-inner">
        <h2 class="section-title">Resources</h2>
        <div class="resource-categories">
        <div class="resource-category">
          <h3 class="category-title">Personal Finance Tips</h3>
          <ul class="resource-list">
            <li><a href="/resources/personal-finance/first-budget">Building Your First Budget: A Step-by-Step Guide</a></li>
            <li><a href="/resources/personal-finance/emergency-fund">Emergency Fund Essentials: How Much Do You Really Need?</a></li>
            <li><a href="/resources/personal-finance/pension-guide">Understanding Your Pension: Maximizing Retirement Benefits</a></li>
            <li><a href="/resources/personal-finance/debt-strategy">Smart Debt Management Strategies for 2025</a></li>
          </ul>
        </div>
        
        <div class="resource-category">
          <h3 class="category-title">Investment Guides</h3>
          <ul class="resource-list">
            <li><a href="/resources/investing/etf-beginners">A Beginner's Guide to ETFs: Everything You Need to Know</a></li>
            <li><a href="/resources/investing/balance-sheet">How to Read a Balance Sheet: Key Metrics Explained</a></li>
            <li><a href="/resources/investing/dividend-investing">Dividend Investing: Building Passive Income Streams</a></li>
            <li><a href="/resources/investing/portfolio-diversification">Portfolio Diversification Beyond Stocks and Bonds</a></li>
          </ul>
        </div>
        
        <div class="resource-category">
          <h3 class="category-title">Tools & Calculators</h3>
          <div class="tools-grid">
            <a href="/tools/compound-calculator" class="tool-item">
              <span class="tool-icon">🧮</span>
              <span class="tool-name">Compound Interest Calculator</span>
            </a>
            <a href="/tools/retirement-planner" class="tool-item">
              <span class="tool-icon">📊</span>
              <span class="tool-name">Retirement Planner</span>
            </a>
            <a href="/tools/risk-assessment" class="tool-item">
              <span class="tool-icon">⚖️</span>
              <span class="tool-name">Risk Assessment Tool</span>
            </a>
            <a href="/tools/budget-tracker" class="tool-item">
              <span class="tool-icon">💰</span>
              <span class="tool-name">Budget Tracker</span>
            </a>
          </div>
        </div>
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
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('TradingPal homepage loaded')
  document.body.classList.add('is-homepage')

  // Insights filtering
  const tabs = Array.from(document.querySelectorAll('.filter-tab'))
  const cards = Array.from(document.querySelectorAll('.insight-card'))

  function activateTab(tab) {
    tabs.forEach(t => {
      const isActive = t === tab
      t.classList.toggle('active', isActive)
      t.setAttribute('aria-selected', isActive.toString())
      t.setAttribute('tabindex', isActive ? '0' : '-1')
    })
    const filter = tab.getAttribute('data-filter')
    cards.forEach(card => {
      const cat = card.getAttribute('data-category')
      const show = filter === 'all' || filter === cat
      card.style.display = show ? '' : 'none'
    })
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab))
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const dir = e.key === 'ArrowRight' ? 1 : -1
        const idx = tabs.indexOf(tab)
        const next = tabs[(idx + dir + tabs.length) % tabs.length]
        next.focus()
        activateTab(next)
      }
      if (e.key === 'Home') { e.preventDefault(); tabs[0].focus(); activateTab(tabs[0]) }
      if (e.key === 'End') { e.preventDefault(); tabs[tabs.length - 1].focus(); activateTab(tabs[tabs.length - 1]) }
    })
  })
})

onUnmounted(() => {
  document.body.classList.remove('is-homepage')
})
</script>