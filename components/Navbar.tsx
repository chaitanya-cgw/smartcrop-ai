'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  Clock, 
  CloudSun, 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  X,
  Droplets
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);
  const [showAlerts, setShowAlerts] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const lat = 17.3850;
        const lon = 78.4867;
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        const data = await res.json();
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            condition: data.current.weather_code <= 3 ? 'Clear' : 'Rain'
          });
        }
      } catch {
        setWeather({ temp: 28, condition: 'Clear' });
      }
    }
    fetchWeather();
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-800 tracking-tight block leading-tight">
              {t('appName')}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
              {t('ruralEngine')}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 border-r border-slate-300 pr-3">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono text-slate-800">{time || '00:00:00'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <span>{weather ? `${weather.temp}°C` : '28°C'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowAlerts(!showAlerts)}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
              title="Alerts"
            >
              <Bell className="w-5 h-5 text-emerald-700" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>

            {showAlerts && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50">
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    {t('tool7Title')}
                  </h4>
                  <button onClick={() => setShowAlerts(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 text-xs">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-900">{t('heavyRainTitle')}</p>
                      <p className="text-amber-700 text-[11px] mt-0.5">{t('heavyRainDesc')}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-2.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-900">{t('priceHikeTitle')}</p>
                      <p className="text-emerald-700 text-[11px] mt-0.5">{t('priceHikeDesc')}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex gap-2.5">
                    <Droplets className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-blue-900">{t('irrigationTitle')}</p>
                      <p className="text-blue-700 text-[11px] mt-0.5">{t('irrigationDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <LanguageSwitcher />
        </div>

      </div>
    </nav>
  );
}