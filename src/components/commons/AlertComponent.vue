<template>
  <!-- Alert Component -->
  <div :id="app.id" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-black">
          {{ app.props.value.message }}
        </div>
        <div class="modal-footer p-1">
          <button
            type="button"
            style="min-width: 64px"
            class="btn btn-secondary btn-sm"
            v-if="app.props.value.type === 'confirm'"
            @click="app.onDeny"
          >
            {{ app.$t("common.cancel") }}
          </button>
          <button
            type="button"
            style="min-width: 64px"
            class="btn btn-sm"
            :class="app.variant.value"
            @click="app.onAccept"
          >
            {{ app.$t("common.ok") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { AlertComponentType } from "./AlertComponent";
import { Modal } from "bootstrap";
import { Component, defineClassComponent } from "../../plugins/component";
import { randomString } from "../../helpers/str";
import { APP_CONSTANTS } from "../../const/app";

const app = defineClassComponent(
  class AlertComponent extends Component {
    public readonly modal: Ref<Modal | null> = this.ref(null);

    public readonly id = Date.now() + "_" + randomString();

    public props: Ref<AlertComponentType> = this.ref({
      type: "alert",
      variant: "primary",
      message: "",
    });

    public variant = this.computed(() => {
      if (!this.props.value.variant) return "btn-primary";
      if (this.props.value.variant === "primary") return "btn-primary";
      if (this.props.value.variant === "success") return "btn-success";
      if (this.props.value.variant === "error") return "btn-danger";
    });

    public constructor() {
      super();

      this.eventBus.on(APP_CONSTANTS.eventBus.executeAlert, (params: AlertComponentType) => {
        this.props.value = params;
        this.modal.value?.show();
      });

      this.onMounted(() => {
        this.modal.value = new Modal("#" + this.id, { keyboard: false, backdrop: "static" });
        this.modal.value?.hide();
      });
    }

    public onAccept = async () => {
      if (this.props.value.onAccept) {
        await this.props.value.onAccept();
        this.modal.value?.hide();
      } else {
        this.modal.value?.hide();
      }
    };

    public onDeny = async () => {
      if (this.props.value.onDeny) {
        await this.props.value.onDeny();
        this.modal.value?.hide();
      } else {
        this.modal.value?.hide();
      }
    };
  },
);
</script>

<style scoped lang="scss"></style>
