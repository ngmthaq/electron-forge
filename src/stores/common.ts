import { Store, defineClassStore } from "../plugins/store";

export const useCommonStore = defineClassStore(
  class CommonStore extends Store {
    public name = "common";
  },
);
