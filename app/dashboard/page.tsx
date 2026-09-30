'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  CalendarDays, 
  FlaskConical, 
  ScanLine, 
  TrendingUp, 
  Users, 
  BellRing, 
  Bot, 
  MapPin, 
  User, 
  RotateCcw, 
  ArrowUpRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [farmer, setFarmer] = useState({
    name: 'Farmer Partner',
    location: 'Hyderabad',
    state: 'Telangana',
    phone: '+91 98765 43210'
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('farmer_session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          setFarmer(prev => ({ ...prev, ...parsed }));
        } catch {
          // keep default
        }
      }
    }
  }, []);

  const tools = [
    {
      id: 'tool-1',
      title: t('tool1Title'),
      desc: t('tool1Desc'),
      icon: Sprout,
      href: '/tools/crop-optimizer',
      tag: t('tool1Tag'),
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 'tool-2',
      title: t('tool2Title'),
      desc: t('tool2Desc'),
      icon: CalendarDays,
      href: '/tools/calendar',
      tag: t('tool2Tag'),
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'tool-3',
      title: t('tool3Title'),
      desc: t('tool3Desc'),
      icon: FlaskConical,
      href: '/tools/soil-analyser',
      tag: t('tool3Tag'),
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'tool-4',
      title: t('tool4Title'),
      desc: t('tool4Desc'),
      icon: ScanLine,
      href: '/tools/plant-scanner',
      tag: t('tool4Tag'),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'tool-5',
      title: t('tool5Title'),
      desc: t('tool5Desc'),
      icon: TrendingUp,
      href: '/tools/market-prices',
      tag: t('tool5Tag'),
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'tool-6',
      title: t('tool6Title'),
      desc: t('tool6Desc'),
      icon: Users,
      href: '/tools/community',
      tag: t('tool6Tag'),
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'tool-7',
      title: t('tool7Title'),
      desc: t('tool7Desc'),
      icon: BellRing,
      href: '/tools/notifications',
      tag: t('tool7Tag'),
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'tool-8',
      title: t('tool8Title'),
      desc: t('tool8Desc'),
      icon: Bot,
      href: '#bhoomi',
      tag: t('tool8Tag'),
      color: 'from-emerald-600 to-teal-700'
    }
  ];

  const previousRemedies = [
    {
      id: '1',
      crop: 'Paddy / Rice',
      issue: 'Nitrogen Deficiency',
      product: 'Neem-Coated Organic Urea (50kg)',
      link: 'https://agribegri.com',
      platform: 'AgriBegri',
      date: 'Aug 2026'
    },
    {
      id: '2',
      crop: 'Tomato',
      issue: 'Early Blight Fungus',
      product: 'Copper Oxychloride 50% WP Fungicide',
      link: 'https://amazon.in',
      platform: 'Amazon',
      date: 'Sep 2026'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Farmer Profile Hero Banner */}
        <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">{farmer.name}</h2>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {t('verifiedFarmer')}
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {farmer.location}, {farmer.state} • {farmer.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tools/crop-optimizer"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              {t('startRotationBtn')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Tools Shortcut Hub */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{t('toolsTitle')}</h3>
              <p className="text-xs text-slate-500">{t('toolsSubtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {tool.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>{t('openTool')}</span>
                    <ArrowUpRight className="w-4 h-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Re-Order Hub */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-700">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{t('reorderTitle')}</h3>
                <p className="text-xs text-slate-500">{t('reorderSubtitle')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {previousRemedies.map((remedy) => (
              <div key={remedy.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{remedy.crop}</span>
                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                      {remedy.issue}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-800 mt-1">{remedy.product}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t('purchasedOn')} {remedy.date} {t('via')} {remedy.platform}
                  </p>
                </div>

                <a
                  href={remedy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:border-emerald-500 text-emerald-700 text-xs font-bold rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 shrink-0"
                >
                  {t('reorderBtn')}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}