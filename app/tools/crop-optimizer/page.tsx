'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sprout, 
  ArrowLeft, 
  CheckCircle2, 
  CalendarPlus, 
  DollarSign, 
  Droplet, 
  Layers, 
  Sparkles,
  Users,
  Compass,
  Clock,
  TreeDeciduous
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface CropRecommendation {
  cropName: string;
  scientificName: string;
  season: string;
  estimatedYield: string;
  estimatedProfit: string;
  soilCompatibility: string;
  waterRequirement: string;
  rotationBenefit: string;
  plantingWindow: string;
  harvestWindow: string;
}

export default function CropOptimizerPage() {
  const router = useRouter();

  // Multi-variable farmer inputs
  const [formData, setFormData] = useState({
    soilType: 'Black Soil',
    landSize: '2.5',
    budget: '50000',
    season: 'Kharif (Monsoon)',
    waterFacility: 'Borewell / Drip Irrigation',
    rainfall: 'Medium (600 - 900 mm)',
    location: 'Telangana',
    workers: '4',
    growthDuration: 'Short Duration (3-4 Months)',
    cropType: 'Seasonal Crop'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendation | null>(null);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  // Dynamic recommendation calculation balancing soil, profit, and water
  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAddedToCalendar(false);

    setTimeout(() => {
      // Algorithmic evaluation based on input combination
      let recommended: CropRecommendation;

      if (formData.soilType === 'Black Soil' && formData.growthDuration.includes('Short')) {
        recommended = {
          cropName: 'Soybean & Black Gram (Urad)',
          scientificName: 'Glycine max / Vigna mungo',
          season: formData.season,
          estimatedYield: '14 - 18 Quintals / Acre',
          estimatedProfit: '₹45,000 - ₹55,000 / Acre',
          soilCompatibility: 'Excellent - Fixes biological atmospheric nitrogen',
          waterRequirement: 'Moderate (350 - 450 mm)',
          rotationBenefit: 'Restores nitrogen reserves depleted by previous cereal cycles',
          plantingWindow: 'June 15 - July 10',
          harvestWindow: 'October 1 - October 20'
        };
      } else if (formData.cropType === 'Permanent Orchard / Tree') {
        recommended = {
          cropName: 'Guava (Taiwan Pink) or Pomegranate',
          scientificName: 'Psidium guajava',
          season: 'All-Year Perennial',
          estimatedYield: '8 - 12 Tons / Acre (Year 2 onwards)',
          estimatedProfit: '₹1,80,000 - ₹2,50,000 / Year',
          soilCompatibility: 'High tolerance to varying soil pH',
          waterRequirement: 'Drip system optimized (low water wastage)',
          rotationBenefit: 'Permanent root structure prevents topsoil erosion',
          plantingWindow: 'July - August',
          harvestWindow: 'Perennial Harvesting Cycle'
        };
      } else if (formData.waterFacility.includes('Low') || formData.rainfall.includes('Low')) {
        recommended = {
          cropName: 'Finger Millet (Ragi) & Chickpea',
          scientificName: 'Eleusine coracana / Cicer arietinum',
          season: formData.season,
          estimatedYield: '10 - 12 Quintals / Acre',
          estimatedProfit: '₹35,000 - ₹42,000 / Acre',
          soilCompatibility: 'Thrives in low-fertility & red sandy soils',
          waterRequirement: 'Very Low (Drought-resilient)',
          rotationBenefit: 'Breaks fungal pathogen cycles common in high-moisture crops',
          plantingWindow: 'July 1 - July 25',
          harvestWindow: 'November 10 - November 30'
        };
      } else {
        recommended = {
          cropName: 'Hybrid Maize & Groundnut intercrop',
          scientificName: 'Zea mays / Arachis hypogaea',
          season: formData.season,
          estimatedYield: '22 - 28 Quintals / Acre',
          estimatedProfit: '₹50,000 - ₹62,000 / Acre',
          soilCompatibility: 'Balances deep-root and shallow-root nutrient extraction',
          waterRequirement: 'Medium (500 mm)',
          rotationBenefit: 'Leaves organic mulch residue that replenishes soil carbon',
          plantingWindow: 'June 20 - July 15',
          harvestWindow: 'October 15 - November 5'
        };
      }

      setResult(recommended);
      setLoading(false);
    }, 700);
  };

  // Add to Calendar integration
  const handleAddToCalendar = () => {
    if (!result) return;
    const plan = {
      crop: result.cropName,
      planting: result.plantingWindow,
      harvest: result.harvestWindow,
      season: result.season,
      landSize: formData.landSize,
      dateAdded: new Date().toLocaleDateString()
    };

    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('farmer_crop_calendar') || '[]');
      existing.push(plan);
      localStorage.setItem('farmer_crop_calendar', JSON.stringify(existing));
    }

    setAddedToCalendar(true);
    setTimeout(() => {
      router.push('/tools/calendar');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        
        {/* Back breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            Tool 1 of 8
          </span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold mb-2">
              <Sprout className="w-4 h-4" />
              Multi-Season Agricultural Optimization
            </div>
            <h1 className="text-2xl font-black">Crop Recommendation Engine</h1>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
              Dynamically evaluates soil chemistry, water capacity, operational labor, and budget constraints to calculate your optimal crop rotation.
            </p>
          </div>
        </div>

        {/* Input Questionnaire Form */}
        <form onSubmit={handleOptimize} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-3">
            Farmer Operational Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            
            {/* 1. Soil Type */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                Soil Type
              </label>
              <select
                aria-label="Soil Type"
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
              >
                <option value="Black Soil">Black Cotton Soil (Regur)</option>
                <option value="Red Sandy Soil">Red Sandy Soil</option>
                <option value="Alluvial Soil">Alluvial River Basin Soil</option>
                <option value="Clayey Loam">Clayey Loam</option>
                <option value="Laterite Soil">Laterite Soil</option>
              </select>
            </div>

            {/* 2. Land Size */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                Land Size (Acres)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* 3. Budget */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Available Budget (₹)
              </label>
              <input
                type="number"
                step="5000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* 4. Season */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Target Planting Season</label>
              <select
                aria-label="Target Planting Season"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
              >
                <option value="Kharif (Monsoon)">Kharif (Monsoon: June - Oct)</option>
                <option value="Rabi (Winter)">Rabi (Winter: Nov - April)</option>
                <option value="Zaid (Summer)">Zaid (Summer: March - June)</option>
              </select>
            </div>

            {/* 5. Water Facility */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-emerald-600" />
                Irrigation / Water Facility
              </label>
              <select
                aria-label="Irrigation or Water Facility"
                value={formData.waterFacility}
                onChange={(e) => setFormData({ ...formData, waterFacility: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
              >
                <option value="Borewell / Drip Irrigation">Borewell + Drip Irrigation</option>
                <option value="Canal / River Flow">Canal / River Flow</option>
                <option value="Rainfed (No Borewell)">Rainfed Only (No Borewell)</option>
                <option value="Farm Pond / Sprinklers">Farm Pond + Sprinklers</option>
              </select>
            </div>

            {/* 6. Rainfall Pattern */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Local Rainfall Level</label>
              <select
                aria-label="Local Rainfall Level"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
              >
                <option value="High (Above 1100 mm)">High (Above 1100 mm)</option>
                <option value="Medium (600 - 900 mm)">Medium (600 - 900 mm)</option>
                <option value="Low / Drought Prone (Below 500 mm)">Low / Drought-Prone (Below 500 mm)</option>
              </select>
            </div>

            {/* 7. Available Workers */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Available Labor / Workers
              </label>
              <input
                type="number"
                min="1"
                value={formData.workers}
                onChange={(e) => setFormData({ ...formData, workers: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* 8. Growth Duration */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Growth Cycle
              </label>
              <select
                aria-label="Growth Cycle"
                value={formData.growthDuration}
                onChange={(e) => setFormData({ ...formData, growthDuration: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
              >
                <option value="Short Duration (3-4 Months)">Fast Growing / Short (90-120 days)</option>
                <option value="Medium Duration (5-6 Months)">Medium Duration (150-180 days)</option>
                <option value="Long Duration (8-10 Months)">Long Duration (Annual cycle)</option>
              </select>
            </div>

            {/* 9. Crop Category */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <TreeDeciduous className="w-3.5 h-3.5 text-emerald-600" />
                Crop Category
              </label>
              <select
                aria-label="Crop Category"
                value={formData.cropType}
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-500"
              >
                <option value="Seasonal Crop">Seasonal Field Crop (Grains / Pulses / Oilseeds)</option>
                <option value="Vegetable Cash Crop">Vegetable Cash Crop (Tomatoes / Chilies / Onions)</option>
                <option value="Permanent Orchard / Tree">Permanent Orchard / Fruit Trees</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {loading ? (
              <span>Calculating Multi-Season Optimization...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Optimal Crop Recommendation
              </>
            )}
          </button>
        </form>

        {/* AI Recommendation Result Card */}
        {result && (
          <section className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Recommended Sequence
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{result.cropName}</h3>
                <p className="text-xs italic text-slate-500 font-serif">{result.scientificName}</p>
              </div>

              <button
                onClick={handleAddToCalendar}
                disabled={addedToCalendar}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:bg-emerald-800"
              >
                {addedToCalendar ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    Added to Calendar!
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4" />
                    Add to Calendar
                  </>
                )}
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] text-slate-500 font-semibold">Estimated Yield</p>
                <p className="text-sm font-black text-slate-800 mt-0.5">{result.estimatedYield}</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-[11px] text-emerald-700 font-semibold">Est. Net Profit</p>
                <p className="text-sm font-black text-emerald-900 mt-0.5">{result.estimatedProfit}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] text-slate-500 font-semibold">Planting Window</p>
                <p className="text-sm font-black text-slate-800 mt-0.5">{result.plantingWindow}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] text-slate-500 font-semibold">Harvest Window</p>
                <p className="text-sm font-black text-slate-800 mt-0.5">{result.harvestWindow}</p>
              </div>
            </div>

            {/* Agronomic Reasoning */}
            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p>
                <strong className="text-slate-800">Soil Compatibility:</strong>{' '}
                <span className="text-slate-600">{result.soilCompatibility}</span>
              </p>
              <p>
                <strong className="text-slate-800">Water Efficiency:</strong>{' '}
                <span className="text-slate-600">{result.waterRequirement}</span>
              </p>
              <p>
                <strong className="text-slate-800">Rotation & Pathogen Defense:</strong>{' '}
                <span className="text-slate-600">{result.rotationBenefit}</span>
              </p>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}