import { isJsonString } from "./str";

export function setLocalStorage(key: string, value: any) {
  try {
    const ref = { value: value };
    localStorage.setItem(key, JSON.stringify(ref));

    return value;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function getLocalStorage(key: string, defaultValue: any = null) {
  const value: any = localStorage.getItem(key);
  if (value !== null && isJsonString(value)) {
    const ref = JSON.parse(value);

    return ref.value;
  }

  return defaultValue;
}
