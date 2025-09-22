<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const name = computed(() => frontmatter.value?.author || '')
const date = computed(() => frontmatter.value?.date ? new Date(frontmatter.value.date) : null)
const bio = computed(() => frontmatter.value?.authorBio || '')
const url = computed(() => frontmatter.value?.authorUrl || '')
const avatar = computed(() => frontmatter.value?.authorAvatar || '')

// no separate host link; name itself is the anchor when authorUrl exists
</script>

<template>
  <div class="post-author" v-if="name || bio">
    <div class="author-inner">
      <img v-if="avatar" class="author-avatar" :src="avatar" alt="Author avatar" />
      <div class="author-meta">
        <div class="author-name">
          <span class="author-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21a8 8 0 0 0-16 0"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <a v-if="url" :href="url" target="_blank" rel="noopener noreferrer">{{ name }}</a>
          <span v-else>{{ name }}</span>
        </div>
        <div v-if="date" class="author-date">
          <span class="date-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
          <span>Published {{ date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
        </div>
        <div v-if="bio" class="author-bio">{{ bio }}</div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.post-author {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}
.author-inner { display:flex; align-items: flex-start; gap: .9rem; }
.author-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  object-fit: cover; flex: none; border: 1px solid var(--vp-c-divider);
}
.author-meta { line-height: 1.4; }
.author-name { font-weight: 700; display: inline-flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
.author-name a { color: var(--vp-c-text-1); text-decoration: none; }
.author-name a:hover { text-decoration: underline; }
.author-date { color: var(--vp-c-text-3); font-size: .9rem; margin-top: .2rem; }
.author-bio { color: var(--vp-c-text-2); margin-top: .35rem; }

.author-icon, .date-icon { display:inline-flex; align-items:center; color: var(--vp-c-text-3); }
.author-icon svg, .date-icon svg { display:block; }
.author-icon { margin-right: .25rem; }
.date-icon { margin-right: .35rem; position: relative; top: 2px; }

@media (max-width: 640px) {
  .author-inner { align-items: center; }
}
</style>
