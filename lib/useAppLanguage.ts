'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translations, Language } from '@/lib/translations';

export function useToolTranslation() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const updateLang = () => {
      const active = (
        i18n.language || 
        (typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || localStorage.getItem('app_lang') : 'en') || 
        'en'
      ).slice(0, 2) as Language;

      if (['en', 'te', 'hi', 'ta'].includes(active)) {
        setLang(active);
      }
    };

    updateLang();
    window.addEventListener('languageChange', updateLang);
    return () => window.removeEventListener('languageChange', updateLang);
  }, [i18n.language]);

  return {
    lang,
    t: translations[lang] || translations.en
  };
}