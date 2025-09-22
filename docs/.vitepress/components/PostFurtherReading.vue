<script setup>
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'

const props = defineProps({
  title: { type: String, default: 'Further Reading' },
  items: { type: Array, default: null }
})

const { frontmatter, page } = useData()

// Discover raw markdown in known sections for fallback suggestions
const rawMA = import.meta.glob('../../market-analysis/**/*.md', { eager: true, query: '?raw', import: 'default' })
const rawTS = import.meta.glob('../../trading-strategies/**/*.md', { eager: true, query: '?raw', import: 'default' })
const rawF1 = import.meta.glob('../../finance-101/**/*.md', { eager: true, query: '?raw', import: 'default' })
const rawUL = import.meta.glob('../../useful-links/**/*.md', { eager: true, query: '?raw', import: 'default' })
const RAWS = { ...rawMA, ...rawTS, ...rawF1, ...rawUL }

function parseFrontmatter(raw) {
  if (typeof raw !== 'string') return {}
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return {}
  const body = fmMatch[1]
  const out = {}
  body.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) return
    const key = m[1].trim()
    let val = m[2].trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    out[key] = val
  })
  return out
}

function deriveTitleFromRaw(raw, fallback) {
  const fm = parseFrontmatter(raw)
  if (fm && fm.title) return String(fm.title)
  const m = typeof raw === 'string' ? raw.match(/^#\s+(.+?)\s*$/m) : null
  if (m) return m[1]
  return fallback
}

const entries = computed(() => {
  // 1) Explicit items via props or frontmatter
  const explicit = (Array.isArray(props.items) ? props.items : (frontmatter.value?.further || []))
    .map((i) => ({
      text: i?.text || i?.title || i?.label || '',
      link: i?.link || i?.href || i?.url || ''
    }))
    .filter((i) => i.text && i.link)

  if (explicit.length >= 2) {
    return explicit.slice(0, 2)
  }

  // 2) Fallback: pick up to two posts from the same section (exclude current and index.md)
  const rel = page.value?.relativePath || '' // e.g., market-analysis/exploring-energy-markets.md
  const section = rel.split('/')[0] || ''
  const currentKeySuffix = '/' + rel // '../../' + this => match end of RAWS key after normalization

  // Collect candidates from RAWS under this section
  const candidates = Object.entries(RAWS)
    .map(([key, raw]) => [key.replace(/\\/g, '/'), raw])
    .filter(([key]) => key.startsWith(`../../${section}/`))
    .filter(([key]) => !key.endsWith('/index.md'))
    .filter(([key]) => !key.endsWith(currentKeySuffix))
    .map(([key, raw]) => {
      const link = '/' + key.replace(/^(\.\/|\.\.\/)+/, '').replace(/\.md$/, '')
      const last = link.split('/').pop() || ''
      const title = deriveTitleFromRaw(raw, last.replace(/-/g, ' '))
      return { text: title, link }
    })

  // If not enough candidates, pad with some helpful defaults
  while (candidates.length < 2) {
    if (!candidates.find(c => c.link === '/market-analysis/')) {
      candidates.push({ text: 'Weekly Market Summary', link: '/market-analysis/' })
    } else if (!candidates.find(c => c.link.includes('/finance-101/personal-finance-basics'))) {
      candidates.push({ text: 'Risk management basics', link: '/finance-101/personal-finance-basics#risk-management' })
    } else {
      break
    }
  }

  const combined = [...explicit, ...candidates]
  return combined.slice(0, 2)
})
</script>

<template>
  <div v-if="entries.length" class="further-reading">
    <h2 class="fr-title">{{ title }}</h2>
    <div class="fr-grid">
      <a v-for="(it, idx) in entries" :key="idx" :href="withBase(it.link)" class="fr-card">
        <span class="fr-text">{{ it.text }}</span>
        <span class="fr-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.further-reading { margin-top: 2.5rem; }
.fr-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 .75rem 0;
}
.fr-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
}
.fr-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  padding: .9rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
}
.fr-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 14px rgba(0,0,0,.06);
  transform: translateY(-1px);
}
.fr-text { font-weight: 600; }
.fr-arrow { color: var(--vp-c-text-3); }

@media (max-width: 720px) {
  .fr-grid { grid-template-columns: 1fr; }
}
</style>
