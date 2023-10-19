<template>
  <template v-if="app.isWorking.value">
    <RouterView />
    <ToastComponent />
    <AlertComponent />
    <LoadingComponent />
    <RequestCookieComponent />
    <RequestNotificationComponent />
  </template>
  <template v-else>
    <InternalErrorView />
  </template>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { RouterView } from "vue-router";
import { APP_CONSTANTS } from "./const/app";
import { Component, defineClassComponent } from "./plugins/component";
import ToastComponent from "./components/commons/ToastComponent.vue";
import AlertComponent from "./components/commons/AlertComponent.vue";
import LoadingComponent from "./components/commons/LoadingComponent.vue";
import RequestCookieComponent from "./components/commons/RequestCookieComponent.vue";
import RequestNotificationComponent from "./components/commons/RequestNotificationComponent.vue";
import InternalErrorView from "./views/InternalErrorView.vue";

const app = defineClassComponent(
  class App extends Component {
    public isWorking: Ref = this.ref(true);

    public constructor() {
      super();

      this.eventBus.on(APP_CONSTANTS.eventBus.executeInternalError, (error: any) => {
        console.error(error);
        this.isWorking.value = false;
      });
    }
  },
);
</script>

<style scoped lang="scss"></style>
