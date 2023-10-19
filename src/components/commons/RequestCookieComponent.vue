<template>
  <div class="request-cookie" v-if="app.isOpen.value">
    <p>{{ app.$t("common.requestCookieText") }}</p>
    <button type="button" class="btn btn-light" @click="app.onClick">{{ app.$t("common.understand") }}</button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { getLocalStorage, setLocalStorage } from "../../helpers/storage";
import { Component, defineClassComponent } from "../../plugins/component";

const COOKIE_PERMISSION_KEY = "COOKIE_PERMISSION_KEY";

const app = defineClassComponent(
  class RequestCookieComponent extends Component {
    public isOpen: Ref<boolean> = this.ref(false);

    public constructor() {
      super();

      const isAccepted = getLocalStorage(COOKIE_PERMISSION_KEY);

      if (!isAccepted) {
        this.isOpen.value = true;
      }
    }

    public onClick = () => {
      setLocalStorage(COOKIE_PERMISSION_KEY, true);
      this.isOpen.value = false;
    };
  },
);
</script>

<style scoped lang="scss">
.request-cookie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $dark;
  padding: 8px 16px;

  & p {
    color: $light;
    padding-right: 32px;
    margin: 0;
  }

  & button {
    flex-shrink: 0;
  }
}
</style>
