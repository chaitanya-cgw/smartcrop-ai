'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarDays, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Sprout, 
  Layers, 
  Sun, 
  Snowflake, 
  Wheat,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface CropSchedule {
  id: string;
  plotName: string;
  crop: string;
  season: 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)';
  sowDate: string;
  harvestDate: string;
  durationDays: number;
  status: 'Planned' | 'Growing' | 'Harvest Ready';
  notes: string;
}

export default function CalendarPage() {
  const [selectedPlot, setSelectedPlot] = useState<string>('All Plots');
  const [schedules, setSchedules] = useState<CropSchedule[]>([
    {
      id: 'sched-1',
      plotName: 'Plot 1 (North 3-Acre)',
      crop: 'Soybean (JS-335)',
      season: 'Kharif (Monsoon)',
      sowDate: '2026-06-25',
      harvestDate: '2026-10-15',
      durationDays: 110,
      status: 'Harvest Ready',
      notes: 'Fixes nitrogen in root nodules. Follow up with Gram/Wheat.'
    },
    {
      id: 'sched-2',
      plotName: 'Plot 1 (North 3-Acre)',
      crop: 'Chickpea / Bengal Gram',
      season: 'Rabi (Winter)',
      sowDate: '2026-11-05',
      harvestDate: '2027-02-28',
      durationDays: 115,
      status: 'Planned',
      notes: 'Winter second crop utilizing residual moisture from Kharif.'
    },
    {
      id: 'sched-3',
      plotName: 'Plot 2 (Borewell 2-Acre)',
      crop: 'Hybrid Maize',
      season: 'Kharif (Monsoon)',
      sowDate: '2026-07-01',
      harvestDate: '2026-10-25',
      durationDays: 115,
      status: 'Growing',
      notes: 'High biomass crop. Mulch stems into soil after harvest.'
    },
    {
      id: 'sched-4',
      plotName: 'Plot 2 (Borewell 2-Acre)',
      crop: 'Mustard / Sunflower',
      season: 'Rabi (Winter)',
      sowDate: '2026-11-15',
      harvestDate: '2027-03-10',
      durationDays: 115,
      status: 'Planned',
      notes: 'Deep-root oilseed rotation to break pest lifecycles.'
    }
  ]);

  // Load any crops pushed from Tool 1 (Crop Optimizer)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('farmer_crop_calendar');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const newItems: CropSchedule[] = parsed.map((item: any, idx: number) => ({
              id: `imported-${Date.now()}-${idx}`,
              plotName: 'Plot 1 (North 3-Acre)',
              crop: item.crop || 'Recommended Crop',
              season: item.season?.includes('Rabi') ? 'Rabi (Winter)' : 'Kharif (Monsoon)',
              sowDate: '2026-10-20',
              harvestDate: '2027-02-15',
              durationDays: 120,
              status: 'Planned',
              notes: `Auto-scheduled from Crop Optimizer Engine (${item.planting || 'Optimal Window'}).`
            }));
            setSchedules(prev => {
              const ids = new Set(prev.map(p => p.id));
              const unique = newItems.filter(n => !ids.has(n.id));
              return [...prev, ...unique];
            });
            // Clear once merged
            localStorage.removeItem('farmer_crop_calendar');
          }
        } catch {
          // ignore parsing error
        }
      }
    }
  }, []);

  // Modal / Form state for adding custom multi-crop schedule
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlot, setNewPlot] = useState('Plot 1 (North 3-Acre)');
  const [newCrop, setNewCrop] = useState('');
  const [newSeason, setNewSeason] = useState<'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)'>('Kharif (Monsoon)');
  const [newSow, setNewSow] = useState('2026-10-15');
  const [newHarvest, setNewHarvest] = useState('2027-02-10');
  const [newNotes, setNewNotes] = useState('');

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop) return;

    const newItem: CropSchedule = {
      id: `sched-${Date.now()}`,
      plotName: newPlot,
      crop: newCrop,
      season: newSeason,
      sowDate: newSow,
      harvestDate: newHarvest,
      durationDays: 110,
      status: 'Planned',
      notes: newNotes || 'Multi-season planned rotation.'
    };

    setSchedules([newItem, ...schedules]);
    setNewCrop('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const plots = ['All Plots', ...Array.from(new Set(schedules.map(s => s.plotName)))];

  const filteredSchedules = selectedPlot === 'All Plots' 
    ? schedules 
    : schedules.filter(s => s.plotName === selectedPlot);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-semibold bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
            Tool 2 of 8
          </span>
        </div>

        {/* Title Header */}
        <div className="bg-gradient-to-r from-teal-800 to-cyan-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 px-3 py-1 rounded-full text-cyan-300 text-xs font-bold mb-2">
              <CalendarDays className="w-4 h-4" />
              Multi-Crop & Multi-Season Planner
            </div>
            <h1 className="text-2xl font-black">Calendar Organizer</h1>
            <p className="text-xs text-teal-100/80 mt-1 max-w-xl">
              Track multi-parcel land allocations, plan summer-to-winter sequential rotations, and monitor sowing-to-harvest milestones.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New Crop Schedule
          </button>
        </div>

        {/* Multi-Land Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">Filter Land Plot:</span>
            <select
              aria-label="Filter Land Plot"
              value={selectedPlot}
              onChange={(e) => setSelectedPlot(e.target.value)}
              className="text-xs font-bold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg outline-none cursor-pointer focus:border-emerald-500"
            >
              {plots.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Kharif (Monsoon)
            </span>
            <span className="flex items-center gap-1.5">
              <Snowflake className="w-3.5 h-3.5 text-cyan-500" /> Rabi (Winter)
            </span>
            <span className="flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-orange-500" /> Zaid (Summer)
            </span>
          </div>
        </div>

        {/* Rotation Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSchedules.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.plotName}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                      {item.crop}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    item.status === 'Harvest Ready' 
                      ? 'bg-amber-50 text-amber-700 border-amber-200' 
                      : item.status === 'Growing' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 my-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Sowing Period</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {item.sowDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Harvest Target</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-amber-600" />
                      {item.harvestDate}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 flex items-start gap-1.5 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/50">
                  <AlertCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.notes}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-400">
                  Cycle duration: ~{item.durationDays} days
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                  title="Remove from calendar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Crop Schedule Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-base text-slate-800">Plan Crop Schedule</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSchedule} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Land Parcel / Plot</label>
                  <select
                    aria-label="Land Parcel or Plot"
                    value={newPlot}
                    onChange={(e) => setNewPlot(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                  >
                    <option value="Plot 1 (North 3-Acre)">Plot 1 (North 3-Acre)</option>
                    <option value="Plot 2 (Borewell 2-Acre)">Plot 2 (Borewell 2-Acre)</option>
                    <option value="Plot 3 (River Bed 1.5-Acre)">Plot 3 (River Bed 1.5-Acre)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Groundnut (Peanut) / Wheat"
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Season</label>
                  <select
                    aria-label="Crop Season"
                    value={newSeason}
                    onChange={(e) => setNewSeason(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                  >
                    <option value="Kharif (Monsoon)">Kharif (Monsoon: June - Oct)</option>
                    <option value="Rabi (Winter)">Rabi (Winter: Nov - Mar)</option>
                    <option value="Zaid (Summer)">Zaid (Summer: Mar - June)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Sowing Date</label>
                    <input
                      type="date"
                      value={newSow}
                      onChange={(e) => setNewSow(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Harvest Date</label>
                    <input
                      type="date"
                      value={newHarvest}
                      onChange={(e) => setNewHarvest(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rotation / Soil Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Nitrogen replenishment or pest cycle breaker"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition cursor-pointer"
                >
                  Save to Crop Calendar
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}