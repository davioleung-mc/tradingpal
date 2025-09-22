<template>
  <picture>
    <source v-if="srcAvif" :srcset="srcAvifSet || srcAvif" type="image/avif" :sizes="sizes" />
    <source v-if="srcWebp" :srcset="srcWebpSet || srcWebp" type="image/webp" :sizes="sizes" />
    <img
      :src="src"
      :srcset="srcSet || undefined"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
      style="max-width: 100%; height: auto; display: block;"
    />
  </picture>
  
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  srcWebp?: string
  srcAvif?: string
  srcSet?: string
  srcWebpSet?: string
  srcAvifSet?: string
  sizes?: string
  width?: number | string
  height?: number | string
  priority?: boolean
}

defineProps<Props>()
</script>

<style scoped>
/* No additional styles needed; keep images responsive */
</style>
