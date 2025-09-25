<template>
  <div class="tradingview-calendar">
    <div ref="container" class="tradingview-widget-container">
      <div :id="widgetId" class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/economic-calendar/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span class="blue-text">Economic Calendar</span>
        </a>
        <span class="trademark"> by TradingView</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const container = ref(null)
const widgetId = `tradingview-economic-calendar-${Math.random().toString(36).slice(2)}`
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

  const minWidth = 400
  const maxWidth = 640
  const width = Math.max(minWidth, Math.min(containerWidth, maxWidth))
  const aspect = 550 / 400
  const height = Math.round(width * aspect)

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
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
  script.type = 'text/javascript'
  script.async = true
  script.text = JSON.stringify({
    colorTheme: 'dark',
    isTransparent: false,
    locale: 'en',
    countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
    importanceFilter: '-1,0,1',
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
.tradingview-calendar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
}

.tradingview-widget-container {
  width: 100%;
  max-width: 640px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0f0f0f;
  box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.55);
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
