<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
// We temporarily disable CustomNav so the original right‑side controls (language, theme, search)
// render again. Once verified, we can optionally reintroduce a slimmer helper component.
const { Layout } = DefaultTheme
</script>

<template>
  <Layout />
</template>
