'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>('en');

  useEffect(() => {
    const active = i18n.language || localStorage.getItem('i18nextLng') || 'en';
    setCurrentLang(active.slice(0, 2));
  }, [i18n.language]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lang);
      localStorage.setItem('app_lang', lang);
      // Broadcast storage event so all mounted tools update instantly
      window.dispatchEvent(new Event('languageChange'));
    }
  };

  return (
    <div className="flex items-center gap-1.5 bg-white border border-emerald-200 shadow-sm rounded-xl px-2.5 py-1 text-xs">
      <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer text-xs"
      >
        <option value="en">English (EN)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="ta">தமிழ் (Tamil)</option>
      </select>
    </div>
  );
}