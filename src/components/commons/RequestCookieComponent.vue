<template>
  <div class="request-cookie" v-if="app.isOpen.value">
    <p>{{ app.$t("common.requestCookieText") }}</p>
    <button type="button" class="btn btn-light" @click="app.onClick">{{ app.$t("common.understand") }}</button>
  </div>
</template>

<script setup lang="ts">
import { KEY_CONSTANTS } from "../../const/key";
import { Component, defineClassComponent } from "../../plugins/component";
import { getLocalStorage, setLocalStorage } from "../../helpers/storage";

const COOKIE_PERMISSION_KEY = KEY_CONSTANTS.storage.cookiePermission;

const app = defineClassComponent(
  class RequestCookieComponent extends Component {
    public isOpen = this.ref<boolean>(false);

    public constructor() {
      super();

      const isAccepted = getLocalStorage<boolean>(COOKIE_PERMISSION_KEY);

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
