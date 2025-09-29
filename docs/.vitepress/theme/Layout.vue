<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'
import PostMeta from '../components/PostMeta.vue'

const { Layout } = DefaultTheme
const route = useRoute()

let gtmNoscriptEl = null

const insertGtmNoscript = () => {
  if (typeof document === 'undefined' || gtmNoscriptEl) return
  const body = document.body
  if (!body) return
  const el = document.createElement('noscript')
  el.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCQZS4TS" height="0" width="0" style="display:none;visibility:hidden"></iframe>'
  body.insertBefore(el, body.firstChild)
  gtmNoscriptEl = el
}

const removeGtmNoscript = () => {
  if (gtmNoscriptEl?.parentNode) {
    gtmNoscriptEl.parentNode.removeChild(gtmNoscriptEl)
  }
  gtmNoscriptEl = null
}

const isPost = computed(() => {
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
  insertGtmNoscript()
  toggleBodyClass(isPost.value)
  watch(isPost, (value) => toggleBodyClass(value), { immediate: false })
})

onBeforeUnmount(() => {
  toggleBodyClass(false)
  removeGtmNoscript()
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
