import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, languageKey } from '../constants/languages';

export const useComponentTKey = (componentName) => {
  const { t } = useTranslation('global');
  const tKey = useCallback((key) => t(`${componentName}.${key}`), [componentName]);
  return { tKey };
};

export const getCurrentLanguage = () => {
  return localStorage.getItem(languageKey) ? localStorage.getItem(languageKey) : languages.SPANISH;
};

export const isSpanishSite = () => {
  return getCurrentLanguage() === languages.SPANISH;
};
