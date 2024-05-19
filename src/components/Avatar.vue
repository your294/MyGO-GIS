<template>
  <div id="avatar">
    <img :src="props.src" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
});
</script>

<style scoped>
#avatar img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 0;
  flex-basis: 30px 30px;
}
</style>
