<template>
  <div class="tradingview-heatmap">
    <div ref="container" class="tradingview-widget-container">
      <div :id="widgetId" class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/heatmap/stock/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span class="blue-text">Stock Heatmap</span>
        </a>
        <span class="trademark"> by TradingView</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const container = ref(null)
const widgetId = `tradingview-stock-heatmap-${Math.random().toString(36).slice(2)}`
let scriptEl = null
let resizeObserver = null
let lastWidth = 0

function renderWidget(force = false) {
  const target = container.value
  if (!target) return

  const widget = target.querySelector(`#${widgetId}`)
  if (!widget) return

  const containerWidth = target.clientWidth
  if (!containerWidth) return

  const minWidth = 800
  const maxWidth = 1280
  const width = Math.max(minWidth, Math.min(containerWidth, maxWidth))
  const height = Math.round((width * 9) / 16)

  if (!force && Math.abs(width - lastWidth) < 8) return
  lastWidth = width

  widget.style.width = `${width}px`
  widget.style.height = `${height}px`
  widget.innerHTML = ''

  if (scriptEl && scriptEl.parentNode) {
    scriptEl.parentNode.removeChild(scriptEl)
    scriptEl = null
  }

  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js'
  script.type = 'text/javascript'
  script.async = true
  script.text = JSON.stringify({
    dataSource: 'SPX500',
    blockSize: 'market_cap_basic',
    blockColor: 'change',
    grouping: 'sector',
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'dark',
    exchanges: [],
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width,
    height,
    container_id: widgetId
  })

  target.appendChild(script)
  scriptEl = script
}

onMounted(() => {
  const target = container.value
  if (!target) return

  nextTick(() => {
    renderWidget(true)
    resizeObserver = new ResizeObserver(() => renderWidget())
    resizeObserver.observe(target)
  })
})

onBeforeUnmount(() => {
  const target = container.value
  if (!target) return
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (scriptEl && scriptEl.parentNode) {
    scriptEl.parentNode.removeChild(scriptEl)
    scriptEl = null
  }
  const widget = target.querySelector(`#${widgetId}`)
  if (widget) widget.innerHTML = ''
})
</script>

<style scoped>
.tradingview-heatmap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.tradingview-widget-container {
  width: 100%;
  max-width: 1280px;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  background: transparent;
  box-shadow: none;
}

.tradingview-widget-container__widget {
  width: 100%;
  height: auto;
}

.tradingview-widget-copyright {
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem 0;
}
</style>
