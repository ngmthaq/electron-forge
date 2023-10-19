<template>
  <!-- Request Notification Modal -->
  <div
    class="modal fade"
    id="requestNotification"
    tabindex="-1"
    data-backdrop="static"
    data-keyboard="false"
    aria-labelledby="requestNotificationLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex align-items-center justify-content-start">
            <img
              alt="logo"
              src="../../assets/images/icon-256x256.png"
              style="width: 64px; height: auto; margin-right: 16px"
            />
            <div>
              <h4>{{ app.$t("common.requestNotificationTitle") }}</h4>
              <p class="m-0">{{ app.$t("common.requestNotificationText") }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer p-1">
          <div class="d-flex align-items-center justify-content-between gap-2 w-100">
            <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal" @click="app.onDeny">
              {{ app.$t("common.later") }}
            </button>
            <button type="button" class="btn btn-primary w-100" data-bs-dismiss="modal" @click="app.onAccept">
              {{ app.$t("common.allow") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { NotificationPermissionType } from "./RequestNotificationComponent";
import { Modal } from "bootstrap";
import { Component, defineClassComponent } from "../../plugins/component";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../helpers/storage";

const NOTIFICATION_PERMISSION_KEY = "NOTIFICATION_PERMISSION_KEY";

const RECHECK_PERMISSION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

const app = defineClassComponent(
  class RequestNotificationComponent extends Component {
    public readonly modal: Ref<Modal | null> = this.ref(null);

    public constructor() {
      super();

      this.onMounted(() => {
        if ("Notification" in window) {
          this.modal.value = new Modal("#requestNotification", { keyboard: false, backdrop: "static" });
          const permission: NotificationPermissionType | null = getLocalStorage(NOTIFICATION_PERMISSION_KEY);
          if (permission) {
            if (Date.now() - permission.requestedAt > RECHECK_PERMISSION_TIME) {
              if (Notification.permission === "granted") {
                this.onSetPermission(true);
              } else if (Notification.permission === "default") {
                removeLocalStorage(NOTIFICATION_PERMISSION_KEY);
                this.modal.value.show();
              }
            }
          } else {
            if (Notification.permission === "granted") {
              this.onSetPermission(true);
            } else if (Notification.permission === "default") {
              this.modal.value.show();
            }
          }
        }
      });
    }

    public onAccept = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        this.onSetPermission(true);
      } else {
        this.onDeny();
      }
    };

    public onDeny = () => {
      this.onSetPermission(false);
    };

    public onSetPermission = (isGranted: boolean) => {
      const newNotificationPermission: NotificationPermissionType = {
        requestedAt: Date.now(),
        isGranted: isGranted,
      };
      setLocalStorage(NOTIFICATION_PERMISSION_KEY, newNotificationPermission);
    };
  },
);
</script>

<style scoped lang="scss"></style>
