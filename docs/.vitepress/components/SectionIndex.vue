<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  baseDir: { type: String, required: true } // e.g. '/market-analysis'
})

// Glob markdown files relative to this component
// SectionIndex.vue is at docs/.vitepress/components → go up two levels to reach docs/
const modules = import.meta.glob('../../**/*.md', { eager: true })
const posts = computed(() => {
  const base = props.baseDir.replace(/^\/+|\/+$/g, '') // 'market-analysis'
  const list = Object.entries(modules)
    .map(([key, mod]) => [key.replace(/\\/g, '/'), mod])
    .filter(([key]) => key.startsWith(`../../${base}/`))
    .filter(([key]) => !key.endsWith('/index.md'))
    .map(([key, mod]) => {
      const fm = (mod && mod.frontmatter) ? mod.frontmatter : {}
      const link = '/' + key.replace(/^(\.\/|\.\.\/)+/, '').replace(/\.md$/, '')
      const last = link.split('/').pop() || ''
      const title = fm.title || (mod && mod.title) || last.replace(/-/g, ' ')
      const date = fm.date ? new Date(fm.date) : undefined
      return { title, link, date }
    })
    // Optional: newest first if dates exist; otherwise stable order
    .sort((a, b) => {
      if (a.date && b.date) return b.date.getTime() - a.date.getTime()
      if (a.date) return -1
      if (b.date) return 1
      return a.title.localeCompare(b.title)
    })
    .sort((a, b) => a.title.localeCompare(b.title))
  return list
})
</script>

<template>
  <div class="section-index no-left-sidebar">
    <div class="content">
      <header class="section-hero">
        <h1 class="section-title">{{ title }}</h1>
        <p class="section-desc">{{ description }}</p>
      </header>

      <div class="section-body">
        <div class="posts">
          <ul class="post-list">
            <li v-for="p in posts" :key="p.link">
              <a :href="withBase(p.link)">{{ p.title }}</a>
            </li>
          </ul>
        </div>

        <aside class="right-panel">
          <h2 class="aside-title">All Posts</h2>
          <ul class="aside-list">
            <li v-for="p in posts" :key="p.link + ':aside'">
              <a :href="withBase(p.link)">{{ p.title }}</a>
            </li>
          </ul>
        </aside>
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
  margin-bottom: 1.25rem;
}
.section-title {
  font-size: 2rem;
  line-height: 1.25;
  margin: 0 0 .5rem 0;
}
.section-desc {
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
}
.section-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
}
.post-list,
.aside-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-list li,
.aside-list li { margin: .35rem 0; }
.post-list a, .aside-list a { text-decoration: none; }
.post-list a:hover, .aside-list a:hover { text-decoration: underline; }
.right-panel {
  position: sticky;
  top: 84px;
  align-self: start;
}
@media (max-width: 960px) {
  .section-body { grid-template-columns: 1fr; }
  .right-panel { position: static; }
}
</style>