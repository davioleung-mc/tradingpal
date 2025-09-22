<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const name = computed(() => frontmatter.value?.author || '')
const date = computed(() => frontmatter.value?.date ? new Date(frontmatter.value.date) : null)
const bio = computed(() => frontmatter.value?.authorBio || '')
const url = computed(() => frontmatter.value?.authorUrl || '')
const avatar = computed(() => frontmatter.value?.authorAvatar || '')

const host = computed(() => {
  const u = url.value
  if (!u) return ''
  try {
    const parsed = new URL(u, 'https://dummy.local')
    return parsed.hostname || u.replace(/^https?:\/\//, '').replace(/\/$/, '')
  } catch {
    return u.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
})
</script>

<template>
  <div class="post-author" v-if="name || bio">
    <div class="author-inner">
      <img v-if="avatar" class="author-avatar" :src="avatar" alt="Author avatar" />
      <div class="author-meta">
        <div class="author-name">
          <a v-if="url" :href="url" target="_blank" rel="noopener noreferrer">{{ name }}</a>
          <span v-else>{{ name }}</span>
          <span v-if="host" class="author-link-sep">•</span>
          <a v-if="host" class="author-link" :href="url" target="_blank" rel="noopener noreferrer">
            {{ host }}<span aria-hidden="true" class="ext">↗</span>
          </a>
        </div>
        <div v-if="date" class="author-date">Published {{ date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
        <div v-if="bio" class="author-bio">{{ bio }}</div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.post-author {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
}
.author-inner { display:flex; align-items: flex-start; gap: .9rem; }
.author-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  object-fit: cover; flex: none; border: 1px solid var(--vp-c-divider);
}
.author-meta { line-height: 1.4; }
.author-name { font-weight: 600; display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
.author-name a { color: var(--vp-c-text-1); text-decoration: none; }
.author-name a:hover { text-decoration: underline; }
.author-link-sep { color: var(--vp-c-text-3); }
.author-link { color: var(--vp-c-text-2); font-weight: 500; }
.author-link:hover { color: var(--vp-c-text-1); text-decoration: underline; }
.author-link .ext { margin-left: .2rem; font-size: .9em; }
.author-date { color: var(--vp-c-text-3); font-size: .9rem; margin-top: .2rem; }
.author-bio { color: var(--vp-c-text-2); margin-top: .35rem; }

@media (max-width: 640px) {
  .author-inner { align-items: center; }
}
</style>
