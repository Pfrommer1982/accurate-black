<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template><span v-scramble.once="{ duration: 320, delay: 560 }">{{ text }}</span></template>
