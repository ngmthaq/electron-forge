<template>
  <!-- Toast Component -->
  <div class="toast-container position-fixed top-0 end-0">
    <div
      v-for="toast in app.toasts.value"
      :key="toast.id"
      :id="toast.id"
      :class="`text-bg-${toast.type}`"
      class="toast align-items-center my-1 mx-1"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">{{ toast.message }}</div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastComponentFullType, ToastComponentType } from "./ToastComponent";
import { Toast } from "bootstrap";
import { Component, defineClassComponent } from "../../plugins/component";
import { randomString } from "../../helpers/str";
import { APP_CONSTANTS } from "../../const/app";

const app = defineClassComponent(
  class ToastComponent extends Component {
    public toasts = this.ref<ToastComponentFullType[]>([]);

    public constructor() {
      super();

      this.eventBus.on(APP_CONSTANTS.eventBus.appendToast, (toast: ToastComponentType) => {
        const newToast: ToastComponentFullType = {
          id: Date.now() + "_" + randomString(),
          type: toast.type ? toast.type : "light",
          message: toast.message,
          isOpened: false,
        };
        this.toasts.value.push(newToast);
      });

      this.onUpdated(() => {
        this.nextTick(() => {
          this.showToast();
        });
      });
    }

    public showToast() {
      this.toasts.value.forEach((_, index) => {
        const toast = this.toasts.value[index];
        const toastLive = document.getElementById(toast.id);
        if (toastLive && toast.isOpened === false) {
          const toastBootstrap = Toast.getOrCreateInstance(toastLive, {
            delay: 6000,
          });
          toastBootstrap.show();
          this.toasts.value[index].isOpened = true;
        }
      });
    }
  },
);
</script>

<style scoped lang="scss"></style>
