<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps<{
  content: any;
}>();
</script>

<template>
  <span class="min-w-24 text-xl">
    {{ props.content }}
  </span>
</template>
