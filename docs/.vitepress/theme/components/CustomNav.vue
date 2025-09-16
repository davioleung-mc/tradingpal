<!-- .vitepress/theme/components/CustomNav.vue -->
<template>
  <div class="custom-nav">
    <VPNavBarTranslations class="custom-nav-item" />
    <VPNavBarAppearance class="custom-nav-item" />
    <VPNavBarSearch class="custom-nav-item" />
  </div>
</template>

<script setup>
import VPNavBarTranslations from 'vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue'
import VPNavBarAppearance from 'vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
</script>

<style scoped>
.custom-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto; /* Push to the right on desktop */
}

/* Hide original elements to prevent duplication */
:global(.VPNavBar .VPNavBarTranslations),
:global(.VPNavBar .VPSwitchAppearance),
:global(.VPNavBar .VPNavBarSearch) {
  display: none !important;
}

@media (max-width: 768px) {
  .custom-nav {
    gap: 8px;
    margin-left: 0; /* Reset margin for mobile view if needed */
  }
}
</style>
