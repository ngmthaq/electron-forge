<template>
  <div>Homepage</div>
  <RouterLink :to="routes.about.path">About</RouterLink>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
</script>

<style scoped lang="scss"></style>
