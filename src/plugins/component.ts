/**
 * Vue Component Configurations
 * @author Nguyen Manh Thang
 */

import {
  computed,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  watch,
  watchEffect,
  nextTick,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEventBus } from "./bus";
import { appendToast, openAlert, openLoading } from "../helpers/component";
import { useI18n } from "vue-i18n";

export abstract class Component {
  public readonly route = useRoute();
  public readonly router = useRouter();
  public readonly eventBus = useEventBus();
  public readonly i18n = useI18n();
  public readonly $t = this.i18n.t;

  public readonly ref = ref;
  public readonly reactive = reactive;
  public readonly computed = computed;
  public readonly watch = watch;
  public readonly watchEffect = watchEffect;
  public readonly onMounted = onMounted;
  public readonly onUpdated = onUpdated;
  public readonly onUnmounted = onUnmounted;
  public readonly onBeforeMount = onBeforeMount;
  public readonly onBeforeUpdate = onBeforeUpdate;
  public readonly onBeforeUnmount = onBeforeUnmount;
  public readonly onActivated = onActivated;
  public readonly onDeactivated = onDeactivated;
  public readonly nextTick = nextTick;
  public readonly appendToast = appendToast;
  public readonly openAlert = openAlert;
  public readonly openLoading = openLoading;

  public readonly changeQueryParams = (queryParams: Record<string, string | number>) => {
    this.router.replace({ name: this.route.name as any, query: queryParams });
  };

  public readonly changeLanguage = (locale: string) => {
    this.i18n.locale.value = locale;
  };
}

export function defineClassComponent<C extends Component>(Component: new () => C) {
  return new Component();
}
