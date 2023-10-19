/**
 * Pinia Configurations
 * @author Nguyen Manh Thang
 */

import { createPinia, defineStore } from "pinia";
import { computed, ref } from "vue";

export abstract class Store {
  public abstract name: string;
  public readonly ref = ref;
  public readonly computed = computed;
}

export function defineClassStore<S extends Store>(Store: new () => S) {
  const store = new Store();

  return defineStore(store.name, () => store);
}

export const store = createPinia();
