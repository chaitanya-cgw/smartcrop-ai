'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Calendar, 
  FlaskConical, 
  Scan, 
  Users, 
  Bell, 
  Sprout, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Clock,
  CloudSun
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { translations, Language } from '@/lib/translations';

export default function DashboardPage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Language>('en');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [weatherTemp, setWeatherTemp] = useState<string>('28°C');

  useEffect(() => {
    const updateLang = () => {
      const active = (i18n.language || localStorage.getItem('i18nextLng') || 'en').slice(0, 2) as Language;
      if (['en', 'te', 'hi', 'ta'].includes(active)) setLang(active);
    };

    updateLang();
    window.addEventListener('languageChange', updateLang);

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    fetch('https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.486&current=temperature_2m')
      .then(res => res.json())
      .then(data => {
        if (data?.current?.temperature_2m) {
          setWeatherTemp(`${Math.round(data.current.temperature_2m)}°C`);
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener('languageChange', updateLang);
      clearInterval(timer);
    };
  }, [i18n.language]);

  const t = translations[lang] || translations.en;

  const tools = [
    {
      id: 'crop-optimizer',
      title: t.tool1Title,
      desc: t.tool1Desc,
      icon: Sprout,
      href: '/tools/crop-optimizer',
      badge: t.tool1Badge
    },
    {
      id: 'calendar',
      title: t.tool2Title,
      desc: t.tool2Desc,
      icon: Calendar,
      href: '/tools/calendar',
      badge: t.tool2Badge
    },
    {
      id: 'soil-analyser',
      title: t.tool3Title,
      desc: t.tool3Desc,
      icon: FlaskConical,
      href: '/tools/soil-analyser',
      badge: t.tool3Badge
    },
    {
      id: 'plant-scanner',
      title: t.tool4Title,
      desc: t.tool4Desc,
      icon: Scan,
      href: '/tools/plant-scanner',
      badge: t.tool4Badge
    },
    {
      id: 'community',
      title: t.tool6Title,
      desc: t.tool6Desc,
      icon: Users,
      href: '/tools/community',
      badge: t.tool6Badge
    },
    {
      id: 'notifications',
      title: t.tool7Title,
      desc: t.tool7Desc,
      icon: Bell,
      href: '/tools/notifications',
      badge: t.tool7Badge
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Real-time Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <Clock className="w-4 h-4 text-emerald-600" />
              {currentTime || '08:00:00 AM'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <CloudSun className="w-4 h-4 text-amber-500" />
              Hyderabad {weatherTemp} (Open-Meteo Live)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-800 font-extrabold uppercase text-[10px] tracking-wider">
              {t.activeProtocol}
            </span>
          </div>
        </div>

        {/* HERO CARD: AgriLock Guaranteed Price Lock & Enforceable Trade Hub */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-7 sm:p-9 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>{t.heroBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.heroTitle}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            <Link
              href="/tools/market-prices"
              className="px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 font-black rounded-2xl shadow-lg flex items-center gap-2 text-sm transition shrink-0 hover:scale-105 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>{t.lockPricesBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </Link>
          </div>
        </div>

        {/* Supporting Tools Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              {t.farmOpsTitle}
            </h2>
            <span className="text-xs font-bold text-slate-400">6 Agritech Tools</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group bg-white hover:bg-emerald-50/40 border border-emerald-100/80 hover:border-emerald-300 p-6 rounded-3xl transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        {tool.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
                    <span>{t.launchTool}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}