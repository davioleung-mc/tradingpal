<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'
import PostMeta from '../components/PostMeta.vue'

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

const toggleBodyClass = (active) => {
  const cls = 'is-post'
  if (active) {
    document.body.classList.add(cls)
  } else {
    document.body.classList.remove(cls)
  }
}

onMounted(() => {
  toggleBodyClass(isPost.value)
  watch(isPost, (value) => toggleBodyClass(value), { immediate: false })
})

onBeforeUnmount(() => {
  toggleBodyClass(false)
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <PostMeta v-if="isPost" />
    </template>
    <template #doc-after>
      <PostAuthor v-if="isPost" />
      <PostFurtherReading v-if="isPost" title="You Might Be Also Interested" />
    </template>
  </Layout>
</template>
