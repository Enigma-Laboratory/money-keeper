import 'i18next';
import { createInstance } from 'i18next';
import { en, vi } from 'services';

export const resources = {
  en,
  vi,
} as const;

export enum Languages {
  EN = 'en',
  VI = 'vi',
}

const i18n = createInstance({
  resources: resources,
  lng: 'vi',
  fallbackLng: [Languages.EN, Languages.VI],
  interpolation: {
    escapeValue: false,
  },
  appendNamespaceToMissingKey: true,
  // debug: true,
});

i18n.init();
export default i18n;
