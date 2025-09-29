<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  baseDir: { type: String, required: true } // e.g. '/market-analysis'
})

// Glob markdown files relative to this component
// SectionIndex.vue is at docs/.vitepress/components → go up two levels to reach docs/
// Load raw markdown for sections; avoid importing MD modules to prevent named export issues.
const rawMA = import.meta.glob('../../market-analysis/**/*.md', { eager: true, query: '?raw', import: 'default' })
const rawTS = import.meta.glob('../../trading-strategies/**/*.md', { eager: true, query: '?raw', import: 'default' })
const rawF1 = import.meta.glob('../../finance-101/**/*.md', { eager: true, query: '?raw', import: 'default' })
const rawUL = import.meta.glob('../../useful-links/**/*.md', { eager: true, query: '?raw', import: 'default' })
const raws = { ...rawMA, ...rawTS, ...rawF1, ...rawUL }

function parseFrontmatter(raw) {
  if (typeof raw !== 'string') return {}
  // Basic YAML frontmatter parser: ---\n...\n--- at top of file
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return {}
  const body = fmMatch[1]
  const out = {}
  body.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) return
    const key = m[1].trim()
    let val = m[2].trim()
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    out[key] = val
  })
  return out
}
const posts = computed(() => {
  const base = props.baseDir.replace(/^\/+|\/+$/g, '') // 'market-analysis'
  const list = Object.entries(raws)
    .map(([key, raw]) => [key.replace(/\\/g, '/'), raw])
    .filter(([key]) => key.startsWith(`../../${base}/`))
    .filter(([key]) => !key.endsWith('/index.md'))
    .map(([key, raw]) => {
      const fm = parseFrontmatter(raw)
      const link = '/' + key.replace(/^(\.\/|\.\.\/)+/, '').replace(/\.md$/, '')
      const last = link.split('/').pop() || ''
      // Prefer frontmatter.title; fallback to first H1 in raw markdown; then slug
      let title = fm && fm.title ? String(fm.title) : ''
      if (!title && typeof raw === 'string') {
        const m = raw.match(/^#\s+(.+?)\s*$/m)
        if (m) title = m[1]
      }
      if (!title) title = last.replace(/-/g, ' ')
      const date = fm && fm.date ? new Date(fm.date) : undefined
      const time = date instanceof Date && !Number.isNaN(date.getTime()) ? date.getTime() : undefined
      return { title, link, date, time }
    })
    .sort((a, b) => {
      const aHas = typeof a.time === 'number'
      const bHas = typeof b.time === 'number'
      if (aHas && bHas && a.time !== b.time) return b.time - a.time
      if (aHas && !bHas) return -1
      if (!aHas && bHas) return 1
      return a.title.localeCompare(b.title)
    })
  return list
})

const lastUpdatedDisplay = computed(() => {
  const dated = posts.value.filter(p => p.date instanceof Date)
  if (!dated.length) return null
  const latest = dated.reduce((acc, cur) => {
    if (!acc.date) return cur
    if (!cur.date) return acc
    return cur.date > acc.date ? cur : acc
  })
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(latest.date)
  } catch (err) {
    return latest.date.toLocaleDateString()
  }
})

const toggleSectionClass = (active) => {
  const cls = 'section-index-page'
  if (active) {
    document.body.classList.add(cls)
  } else {
    document.body.classList.remove(cls)
  }
}

onMounted(() => toggleSectionClass(true))
onBeforeUnmount(() => toggleSectionClass(false))
</script>

<template>
  <div class="section-index no-left-sidebar">
    <div class="content">
      <header class="section-hero">
        <h1 class="section-title">{{ title }}</h1>
        <p class="section-updated" v-if="lastUpdatedDisplay">Last updated {{ lastUpdatedDisplay }}</p>
        <p class="section-desc">{{ description }}</p>
      </header>

      <div class="section-body">
        <ul class="post-list">
          <li v-for="p in posts" :key="p.link" class="post-card">
            <a :href="withBase(p.link)" class="post-link">
              <span class="post-title">{{ p.title }}</span>
              <span v-if="p.date" class="post-date">{{ new Date(p.date).toLocaleDateString() }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.section-index {
  display: block;
}
.no-left-sidebar :deep(.VPDoc .VPDocAsideOutline) {
  display: none !important;
}
.no-left-sidebar :deep(.VPSidebar) {
  display: none !important;
}
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}
.section-hero {
  margin-bottom: 1.5rem;
}
.section-title {
  font-size: 2rem;
  line-height: 1.25;
  margin: 0 0 .5rem 0;
}
.section-updated {
  margin: 0 0 .75rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-3);
}
.section-desc {
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
}
.section-body { margin-top: 1.25rem; }
.post-list,
.aside-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-list { display: grid; gap: .75rem; }
.post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
}
.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 14px rgba(0,0,0,.06);
  transform: translateY(-1px);
}
.post-link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: .9rem 1rem;
  text-decoration: none;
}
.post-title {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.post-date {
  color: var(--vp-c-text-3);
  font-size: .9rem;
  margin-left: 1rem;
}

/* Mobile: stack date below title */
@media (max-width: 640px) {
  .post-link {
    flex-direction: column;
    align-items: flex-start;
    gap: .25rem;
  }
  .post-date {
    margin-left: 0;
  }
}
</style>