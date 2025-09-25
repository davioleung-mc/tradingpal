// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import { onMounted } from 'vue'
import PostFurtherReading from '../components/PostFurtherReading.vue'
import PostAuthor from '../components/PostAuthor.vue'
import AppImage from '../components/AppImage.vue'
import TradingViewCryptoHeatmap from '../components/TradingViewCryptoHeatmap.vue'
import TradingViewForexHeatmap from '../components/TradingViewForexHeatmap.vue'
import TradingViewEconomicCalendar from '../components/TradingViewEconomicCalendar.vue'
import TradingViewStockHeatmap from '../components/TradingViewStockHeatmap.vue'
import './style.css'
import './navigation-fix.css'
import './custom.css'

/**
 * Client enhancement: fade‑in animation for homepage cards.
 * Uses proper theme extension so DefaultTheme receives full context (app, router, siteData).
 */
export default {
	extends: DefaultTheme,
	Layout,
	enhanceApp(ctx) {
		// Call parent enhanceApp if it exists
		DefaultTheme.enhanceApp && DefaultTheme.enhanceApp(ctx)

		// Globally register shared components for Markdown usage
		ctx.app.component('PostFurtherReading', PostFurtherReading)
		ctx.app.component('PostAuthor', PostAuthor)
    ctx.app.component('AppImage', AppImage)
    ctx.app.component('TradingViewCryptoHeatmap', TradingViewCryptoHeatmap)
    ctx.app.component('TradingViewForexHeatmap', TradingViewForexHeatmap)
    ctx.app.component('TradingViewEconomicCalendar', TradingViewEconomicCalendar)
    ctx.app.component('TradingViewStockHeatmap', TradingViewStockHeatmap)

		onMounted(() => {
			const applyReveal = () => {
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
				const cards = document.querySelectorAll('.feature-card, .update-link')
				if (!cards.length) return
				const observer = new IntersectionObserver((entries) => {
					entries.forEach(e => {
						if (e.isIntersecting) {
							e.target.classList.add('reveal-in')
							observer.unobserve(e.target)
						}
					})
				}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
				cards.forEach(card => {
					card.classList.add('pre-reveal')
					observer.observe(card)
				})
			}
			applyReveal()
			ctx.router.onAfterRouteChanged = () => setTimeout(applyReveal, 60)
		})
	}
}
