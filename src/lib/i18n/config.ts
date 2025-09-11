import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en/translation.json';
import viTranslation from './vi/translation.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: 'vi',
  debug: true,
  resources: {
    vi: {
      translation: viTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
});

export default i18n;
