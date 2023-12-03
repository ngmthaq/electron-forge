import { ref } from "vue";

export class EventBus {
  private events = ref<Record<string, EventBusCallback<any>[]>>({});

  public on<T>(eventName: string, callback: EventBusCallback<T>) {
    if (this.events.value[eventName]) {
      this.events.value[eventName].push(callback);
    } else {
      this.events.value[eventName] = [callback];
    }
  }

  public off<T>(eventName: string, callback: EventBusCallback<T>) {
    if (this.events.value[eventName]) {
      this.events.value[eventName] = this.events.value[eventName].filter((cb) => cb !== callback);
    } else {
      this.events.value[eventName] = [];
    }
  }

  public emit<T>(eventName: string, params?: T) {
    if (this.events.value[eventName]) {
      this.events.value[eventName].forEach((callback) => {
        callback(params);
      });
    }
  }

  public once<T>(eventName: string, callback: EventBusCallback<T>) {
    const handler = (params: T) => {
      callback(params);
      this.off(eventName, callback);
    };

    if (this.events.value[eventName]) {
      this.events.value[eventName].push(handler);
    } else {
      this.events.value[eventName] = [handler];
    }
  }
}

export const eventBus = new EventBus();

export function useEventBus() {
  return eventBus;
}

export type EventBusCallback<T> = (params: T) => void;
