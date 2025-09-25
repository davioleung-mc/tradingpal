<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const formattedDate = computed(() => {
  const fm = frontmatter.value || {}
  const pg = page.value || {}
  const source = pg.lastUpdated || fm.lastUpdated || fm.last_update || fm.date
  if (!source) return null
  const date = new Date(source)
  if (Number.isNaN(date.getTime())) return null
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  } catch (err) {
    return date.toLocaleString()
  }
})

let insertedEl = null
let cleanupTimer = null
let observer = null

onMounted(() => {
  const text = formattedDate.value
  console.debug('[PostMeta] formatted date', text, page.value)
  if (!text) return

  const insert = (attempt = 0) => {
    const docRoot = document.querySelector('.VPDoc .content') || document.querySelector('.vp-doc .content')
    const heading = docRoot?.querySelector('h1')
    if (!heading || !docRoot) {
      if (attempt < 120) {
        cleanupTimer = window.setTimeout(() => insert(attempt + 1), 50)
      }
      return
    }

    // Avoid duplicating if already present
    if (docRoot.querySelector('.post-last-updated')) return

    insertedEl = document.createElement('p')
    insertedEl.className = 'post-last-updated'
    insertedEl.textContent = `Last updated ${text}`
    heading.insertAdjacentElement('afterend', insertedEl)

    if (!observer) {
      observer = new MutationObserver(() => {
        if (!docRoot.contains(insertedEl)) {
          insertedEl = null
          insert()
        }
      })
      observer.observe(docRoot, { childList: true, subtree: true })
    }
  }

  insert()
})

onBeforeUnmount(() => {
  if (cleanupTimer) {
    clearTimeout(cleanupTimer)
    cleanupTimer = null
  }
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (insertedEl?.parentNode) {
    insertedEl.parentNode.removeChild(insertedEl)
  }
  insertedEl = null
})
</script>
