import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from "./languages";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {}
    ),
  },
  fallbackLng: "en"
});

export default i18n
