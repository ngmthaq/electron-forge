import Cookie, { CookieAttributes } from "js-cookie";
import localforage from "localforage";
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

export function getLocalStorage(key: string, defaultValue: any = null) {
  const value: any = localStorage.getItem(key);
  if (value !== null && isJsonString(value)) {
    const ref = JSON.parse(value);

    return ref.value;
  }

  return defaultValue;
}

export function setSessionStorage(key: string, value: any) {
  try {
    const ref = { value: value };
    sessionStorage.setItem(key, JSON.stringify(ref));

    return value;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

export function getSessionStorage(key: string, defaultValue: any = null) {
  const value: any = sessionStorage.getItem(key);
  if (value !== null && isJsonString(value)) {
    const ref = JSON.parse(value);

    return ref.value;
  }

  return defaultValue;
}

export function setCookieStorage(key: string, value: any, options: CookieAttributes = {}) {
  try {
    const ref = { value: value };
    Cookie.set(key, JSON.stringify(ref), options);

    return value;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function removeCookieStorage(key: string, options: CookieAttributes = {}) {
  Cookie.remove(key, options);
}

export function getCookieStorage(key: string, defaultValue: any = null) {
  const value: any = Cookie.get(key);
  if (value !== null && isJsonString(value)) {
    const ref = JSON.parse(value);

    return ref.value;
  }

  return defaultValue;
}

export async function setIndexedDb<V>(key: string, value: V) {
  try {
    await localforage.setItem(key, value);
    return value;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getIndexedDb<V>(key: string) {
  try {
    const value = await localforage.getItem<V>(key);
    return value;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function removeIndexedDb(key: string) {
  try {
    await localforage.removeItem(key);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
