import { en, vn } from './locales';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, vi: { translation: vn } },
  lng: 'vi', // Default language
  fallbackLng: ['en', 'vn'], // Fallback language
  interpolation: {
    escapeValue: false, // Not needed for React
  },
  debug: false,
});

export default i18n;
