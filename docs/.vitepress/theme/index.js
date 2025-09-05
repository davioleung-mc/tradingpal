// .vitepress/theme/index.js
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // Add any app-level enhancements
  },
  setup() {
    // Handle any theme setup
  }
}
