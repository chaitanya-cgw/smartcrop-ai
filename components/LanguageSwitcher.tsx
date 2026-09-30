'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_lang', code);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-emerald-200 px-3 py-1.5 rounded-full shadow-sm">
      <Globe className="w-4 h-4 text-emerald-600 animate-pulse" />
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        aria-label="Select website language"
        className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer focus:ring-0"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.native} ({lang.label})
          </option>
        ))}
      </select>
    </div>
  );
}