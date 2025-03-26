import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./localization/en/translation.json";
import thTranslation from "./localization/th/translation.json";

const resources: Record<string, { translation: Record<string, string> }> = {
  en: { translation: enTranslation },
  th: { translation: thTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
