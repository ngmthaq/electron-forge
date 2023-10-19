<template>
  <main>
    <div>
      <h1>404</h1>
      <p>{{ app.$t("common.pageNotFound") }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Component, defineClassComponent } from "../plugins/component";

const app = defineClassComponent(class PathNotFoundTemplate extends Component {});
</script>

<style scoped lang="scss">
main {
  background-color: $dark;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;

  & h1 {
    font-size: 64px;
    display: inline-block;
    margin: 0;
    color: $danger;
    border-bottom: 1px solid $danger;
  }

  & p {
    color: $light;
    margin-bottom: 0;
    margin-top: 16px;
    font-size: 16px;
  }

  & small {
    color: $gray-600;
  }
}
</style>
