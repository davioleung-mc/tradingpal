<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'
import PostMeta from '../components/PostMeta.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const { frontmatter, page, site } = useData()

const SITE_ORIGIN = 'https://thetradingpal.com'

const toIsoString = (value) => {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

const absoluteUrl = (path) => {
  if (!path) return undefined
  try {
    return new URL(path, SITE_ORIGIN).toString()
  } catch (err) {
    return undefined
  }
}

const isPost = computed(() => {
  const fm = frontmatter.value || {}
  // Treat any non-index page under a top-level section as a post
  const path = route.path || ''
  const top = path.split('/').filter(Boolean)[0] || ''
  const isIndex = /\/$/.test(path) || /\/index$/.test(path)
  const inSection = ['market-analysis','trading-strategies','finance-101','useful-links'].includes(top)
  return inSection && !isIndex
})

const articleJsonLd = computed(() => {
  if (!isPost.value) return null

  const fm = frontmatter.value || {}
  const pg = page.value || {}
  const siteData = site.value || {}

  const basePath = (siteData.base || '/').replace(/\/$/, '')
  const canonicalPath = `${basePath}${route.path || ''}`
  const url = absoluteUrl(canonicalPath)

  const datePublished = toIsoString(fm.date)
  const dateModified = toIsoString(pg.lastUpdated || fm.lastUpdated || fm.last_update || fm.date)

  const authorName = fm.author || 'TradingPal Editorial Team'
  const author = authorName ? {
    "@type": 'Person',
    name: authorName,
    ...(fm.authorUrl ? { url: fm.authorUrl } : {}),
    ...(fm.authorAvatar ? { image: absoluteUrl(fm.authorAvatar) } : {})
  } : undefined

  const image = fm.image || fm.cover || fm.heroImage
  const images = Array.isArray(image) ? image : (image ? [image] : [])
  const imageUrls = images
    .map((item) => absoluteUrl(item))
    .filter(Boolean)

  return {
    "@context": 'https://schema.org',
    "@type": 'Article',
    mainEntityOfPage: url,
    headline: fm.title || pg.title || '',
    description: fm.description || siteData.description || '',
    url,
    ...(imageUrls.length ? { image: imageUrls } : {}),
    author,
    publisher: {
      "@type": 'Organization',
      name: 'TradingPal',
      logo: {
        "@type": 'ImageObject',
        url: absoluteUrl('/favicon.ico')
      }
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {})
  }
})

let structuredDataEl = null
let stopStructuredDataWatch = null

const removeStructuredData = () => {
  if (structuredDataEl?.parentNode) {
    structuredDataEl.parentNode.removeChild(structuredDataEl)
  }
  structuredDataEl = null
}

onMounted(() => {
  stopStructuredDataWatch = watch(articleJsonLd, (schema) => {
    if (typeof document === 'undefined') return
    removeStructuredData()
    if (!schema) return
    structuredDataEl = document.createElement('script')
    structuredDataEl.type = 'application/ld+json'
    structuredDataEl.textContent = JSON.stringify(schema)
    document.head.appendChild(structuredDataEl)
  }, { immediate: true })
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
  if (stopStructuredDataWatch) {
    stopStructuredDataWatch()
    stopStructuredDataWatch = null
  }
  removeStructuredData()
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
