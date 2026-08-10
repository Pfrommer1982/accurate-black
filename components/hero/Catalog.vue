<script setup lang="ts">
import HeroScramble from '~/components/hero/Scramble.vue'
defineProps<{ catalogNumber: string }>()
</script>

<template><HeroScramble :text="catalogNumber" /></template>
