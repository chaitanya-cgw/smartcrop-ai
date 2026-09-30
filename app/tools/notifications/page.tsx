'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BellRing, 
  ArrowLeft, 
  AlertTriangle, 
  TrendingUp, 
  CloudLightning, 
  Droplets, 
  SunMedium, 
  CheckCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface NotificationItem {
  id: string;
  title: string;
  category: 'Weather Hazard' | 'Price Spike' | 'Advisory';
  description: string;
  action: string;
  timestamp: string;
  severity: 'High' | 'Medium' | 'Info';
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'All' | 'Weather Hazard' | 'Price Spike'>('All');

  const alerts: NotificationItem[] = [
    {
      id: 'al-1',
      title: 'Cyclonic Depression & Heavy Rainfall Warning',
      category: 'Weather Hazard',
      description: 'IMD predicts 110mm - 140mm rainfall with wind gusts up to 55 km/h over the next 48 hours.',
      action: 'Dig drainage channels immediately and secure mature grain harvests in waterproof godowns.',
      timestamp: '15 mins ago',
      severity: 'High'
    },
    {
      id: 'al-2',
      title: 'Tomato & Fresh Onion Mandi Rate Surge (+18.5%)',
      category: 'Price Spike',
      description: 'Due to inter-state supply shortfalls, Bowenpally and Nizamabad APMC rates surged to ₹3,400/quintal.',
      action: 'Harvest mature red tomatoes today to capture peak price window before incoming supply balances rates.',
      timestamp: '1 hour ago',
      severity: 'Medium'
    },
    {
      id: 'al-3',
      title: 'Extended Dry Spell Forecast (No Rain for 12 Days)',
      category: 'Weather Hazard',
      description: 'Rising temperatures will elevate evapotranspiration rates across regional black soil basins.',
      action: 'Apply paddy straw mulch around fruit tree bases to retain subsoil moisture.',
      timestamp: '3 hours ago',
      severity: 'High'
    },
    {
      id: 'al-4',
      title: 'Soybean (Yellow) Minimum Support Price Update',
      category: 'Price Spike',
      description: 'Govt procurement centers opened at ₹4,892/quintal with zero commission charges.',
      action: 'Book direct transport via Tool 5 to the nearest government storage depot.',
      timestamp: 'Yesterday',
      severity: 'Info'
    }
  ];

  const filtered = filter === 'All' ? alerts : alerts.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Tool 7 of 8
          </span>
        </div>

        {/* Title Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-700 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-300 text-xs font-bold mb-2">
              <BellRing className="w-4 h-4" />
              Real-Time Rural Intelligence
            </div>
            <h1 className="text-2xl font-black">Live Alerts & Notifications</h1>
            <p className="text-xs text-yellow-100/80 mt-1 max-w-xl">
              Severe weather anomalies, drought indicators, cyclone advisories, and sudden market price hike alerts.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          {(['All', 'Weather Hazard', 'Price Spike'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                filter === tab 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification Cards */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border-l-4 shadow-sm space-y-3 ${
                item.severity === 'High' 
                  ? 'border-l-red-500' 
                  : item.severity === 'Medium' 
                  ? 'border-l-amber-500' 
                  : 'border-l-blue-500'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    item.category === 'Weather Hazard' 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {item.category === 'Weather Hazard' ? (
                      <CloudLightning className="w-5 h-5" />
                    ) : (
                      <TrendingUp className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400 font-semibold whitespace-nowrap">
                  {item.timestamp}
                </span>
              </div>

              {/* Recommended Action Box */}
              <div className="ml-11 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs flex items-start gap-2 text-slate-700">
                <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Recommended Farmer Action: </strong>
                  <span>{item.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}