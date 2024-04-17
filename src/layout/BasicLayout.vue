<template>
  <NavBar class="fixed top-0 inset-x-0" />
  <main class="mygo-content">
    <router-view></router-view>
  </main>
  <Tabbar />
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue";
import Tabbar from "@/components/TabBar.vue";
</script>

<style>
.mygo-content {
  padding-top: var(--nav-bar-height);
  padding-bottom: var(--tab-bar-height);
}
</style>
