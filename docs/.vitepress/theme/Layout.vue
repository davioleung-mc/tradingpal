<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { computed, onMounted, onBeforeUnmount } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()
const { frontmatter } = useData()

const isPost = computed(() => {
  const fm = frontmatter.value || {}
  // Treat any non-index page under a top-level section as a post
  const path = route.path || ''
  const top = path.split('/').filter(Boolean)[0] || ''
  const isIndex = /\/$/.test(path) || /\/index$/.test(path)
  const inSection = ['market-analysis','trading-strategies','finance-101','useful-links'].includes(top)
  return inSection && !isIndex
})

onMounted(() => {
  if (isPost.value) document.body.classList.add('is-post')
})
onBeforeUnmount(() => {
  document.body.classList.remove('is-post')
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <PostAuthor v-if="isPost" />
      <PostFurtherReading v-if="isPost" />
    </template>
  </Layout>
</template>
