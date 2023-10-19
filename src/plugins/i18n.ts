import { createI18n } from "vue-i18n";
import en from "../lang/en.json";

export const DEFAULT_LOCALE = "en";

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en },
});
