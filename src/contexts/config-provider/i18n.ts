import 'i18next';
import { createInstance } from 'i18next';
import { en, vi } from 'services';

/**
 * Type of resources to check object in the languages is the same or not
 */
export const resources: { en: typeof vi; vi: typeof en } = {
  en,
  vi,
};

export enum Languages {
  EN = 'en',
  VI = 'vi',
}

const i18n = createInstance({
  resources: resources,
  lng: Languages.EN,
  fallbackLng: [Languages.EN, Languages.VI],
  interpolation: {
    escapeValue: false,
  },
  appendNamespaceToMissingKey: true,
  // debug: true,
});

i18n.init();
export default i18n;
