<template>
  <!-- Loading Component -->
  <Transition name="fade">
    <div class="loading-container" v-if="app.isOpen.value">
      <div
        class="progress custom-progress"
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="app.percent.value"
      >
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          :style="`width: ${app.percent.value}%; height: ${app.isOpen.value ? '100' : '0'}%`"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { APP_CONSTANTS } from "../../const/app";
import { Component, defineClassComponent } from "../../plugins/component";

const app = defineClassComponent(
  class LoadingComponent extends Component {
    public isOpen: Ref<boolean> = this.ref(false);
    public percent: Ref<number> = this.ref(0);
    public interval: Ref<any> = this.ref();

    public constructor() {
      super();

      this.eventBus.on(APP_CONSTANTS.eventBus.executeLoading, (open) => {
        if (open) {
          this.isOpen.value = true;
          this.interval.value = this.onLoading();
        } else {
          clearInterval(this.interval.value);
          this.interval.value = undefined;
          this.isOpen.value = false;
          this.percent.value = 0;
        }
      });
    }

    public onLoading = () => {
      return setInterval(() => {
        if (this.percent.value < 99) {
          this.percent.value = this.percent.value + 1;
        }
      }, 32);
    };
  },
);
</script>

<style scoped lang="scss">
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-common-loading;
  background-color: rgba($color: $dark, $alpha: 0.25);

  & .custom-progress {
    height: 4px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
