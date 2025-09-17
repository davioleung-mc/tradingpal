<script setup lang="ts">
import { useHead, withBase } from 'vitepress'
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: withBase('favicon.ico') },
    { rel: 'shortcut icon', type: 'image/x-icon', href: withBase('favicon.ico') }
  ]
})
</script>
<template></template>
