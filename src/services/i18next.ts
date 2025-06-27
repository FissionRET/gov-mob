import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { join } from "path";

i18next.use(Backend).init({
  lng: "en-US",
  fallbackLng: "en-US",
  backend: {
    loadPath: join("../../", "lang", "{{lng}}.json"),
  },
});

export const i18nService = i18next;
export const t = i18next.t.bind(i18next);
