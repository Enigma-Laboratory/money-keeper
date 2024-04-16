import { translationEN, translationVN } from './locales';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

export const resources = {
  en: {
    translation: translationEN,
  },
  vn: {
    translation: translationVN,
  },
};

// i18n.ts

// Import translations

i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // Not needed for React
  },
});

export default i18n;
