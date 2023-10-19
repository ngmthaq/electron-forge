import type { Ref } from "vue";
import { Store, defineClassStore } from "../plugins/store";

export const useCommonStore = defineClassStore(
  class CommonStore extends Store {
    public name = "common";
    public badge: Ref<number> = this.ref(0);

    public setBadge = (number: number) => {
      if (number < 0) number = 0;
      this.badge.value = number;
      if (this.badge.value === 0) navigator.clearAppBadge();
      else navigator.setAppBadge(this.badge.value);
    };
  },
);
