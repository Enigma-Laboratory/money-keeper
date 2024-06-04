import { createInstance } from 'i18next';
import { en, vi } from 'services';

/**
 * Type of resources are used to check
 * if objects in different languages are the same or not
 */
export const resources: { en: typeof vi; vi: typeof en } = {
  en,
  vi,
};

export enum Languages {
  EN = 'en',
  VI = 'vi',
}

const i18nInit = createInstance({
  resources: resources,
  lng: Languages.EN,
  fallbackLng: [Languages.EN, Languages.VI],
  interpolation: {
    escapeValue: false,
  },
  appendNamespaceToMissingKey: true,
  // debug: true,
});
i18nInit.init();

export const i18n = i18nInit;
