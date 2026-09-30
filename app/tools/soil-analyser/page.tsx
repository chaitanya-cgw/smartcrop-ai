'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  MapPin, 
  MessageSquare, 
  Package, 
  Sparkles, 
  HelpCircle,
  Truck
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface SoilRemedy {
  step: number;
  title: string;
  instruction: string;
  recommendedProduct: string;
  amazonLink: string;
  flipkartLink: string;
  agribegriLink: string;
}

export default function SoilAnalyserPage() {
  const [activeTab, setActiveTab] = useState<'instant' | 'courier'>('instant');

  // Direct manual soil input state
  const [ph, setPh] = useState<string>('5.5');
  const [nitrogen, setNitrogen] = useState<string>('Low');
  const [phosphorus, setPhosphorus] = useState<string>('Medium');
  const [potassium, setPotassium] = useState<string>('High');
  const [organicCarbon, setOrganicCarbon] = useState<string>('0.4');

  const [analyzed, setAnalyzed] = useState(false);
  const [isFit, setIsFit] = useState(false);
  const [remedies, setRemedies] = useState<SoilRemedy[]>([]);

  // Courier booking state
  const [selectedState, setSelectedState] = useState('Telangana');
  const [selectedLab, setSelectedLab] = useState('Central Krishi Soil Lab & Agri Pharmacy, Hyderabad');
  const testFee = '₹250';

  const labsByState: Record<string, string[]> = {
    Telangana: [
      'Central Krishi Soil Lab & Agri Pharmacy, Hyderabad',
      'District Agri Extension Testing Center, Warangal',
      'Rythu Seva Soil Diagnosis Pharmacy, Nizamabad'
    ],
    AndhraPradesh: [
      'AP State Agro Soil Diagnostics, Guntur',
      'Coastal Krishi Pharmacy & Soil Lab, Vijayawada',
      'Rayalaseema Soil Testing Center, Kurnool'
    ],
    Maharashtra: [
      'Maha Agri Soil & Water Testing Lab, Pune',
      'Vidarbha Krishi Soil Pharmacy, Nagpur'
    ],
    Karnataka: [
      'Raitha Sanjeevini Soil Lab, Bengaluru',
      'North Karnataka Soil Testing Pharmacy, Hubballi'
    ]
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    const phVal = parseFloat(ph);
    const ocVal = parseFloat(organicCarbon);

    // Rule-based diagnostic check
    const soilOk = phVal >= 6.2 && phVal <= 7.8 && nitrogen !== 'Low' && ocVal >= 0.5;
    setIsFit(soilOk);

    if (!soilOk) {
      const correctiveActions: SoilRemedy[] = [];
      let stepCount = 1;

      if (phVal < 6.2) {
        correctiveActions.push({
          step: stepCount++,
          title: 'Neutralize Acidic Soil pH',
          instruction: 'Broadcast Agricultural Dolomite Lime at 250 kg/acre 3 weeks before sowing to bring pH to optimal range (6.5).',
          recommendedProduct: 'Agricultural Dolomite Lime Powder (50kg)',
          amazonLink: 'https://www.amazon.in/s?k=agricultural+lime+soil',
          flipkartLink: 'https://www.flipkart.com/search?q=agricultural+dolomite+lime',
          agribegriLink: 'https://agribegri.com/products/soil-conditioner'
        });
      }

      if (nitrogen === 'Low' || ocVal < 0.5) {
        correctiveActions.push({
          step: stepCount++,
          title: 'Replenish Nitrogen & Soil Organic Carbon',
          instruction: 'Incorporate Humic Acid 98% combined with Azotobacter biofertilizer to stimulate biological nitrogen fixation.',
          recommendedProduct: 'Humic Acid 98% Potassium Humate + Azotobacter Culture',
          amazonLink: 'https://www.amazon.in/s?k=humic+acid+for+plants',
          flipkartLink: 'https://www.flipkart.com/search?q=humic+acid+biofertilizer',
          agribegriLink: 'https://agribegri.com/products/humic-acid'
        });
      }

      correctiveActions.push({
        step: stepCount++,
        title: 'Micro-Nutrient Balancing',
        instruction: 'Apply multi-micronutrient mixture (Zinc + Boron + Iron) to boost seed germination capacity.',
        recommendedProduct: 'Chelated Multi-Micronutrient Soil Formula',
        amazonLink: 'https://www.amazon.in/s?k=chelated+micronutrient+fertilizer',
        flipkartLink: 'https://www.flipkart.com/search?q=soil+micronutrients',
        agribegriLink: 'https://agribegri.com/products/micronutrients'
      });

      setRemedies(correctiveActions);
    } else {
      setRemedies([]);
    }

    setAnalyzed(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I am sending my farm soil sample to your center (${selectedLab}).\nState: ${selectedState}\nCourier Method: India Post / Local Courier.\nTesting Fee: ${testFee}.\nPlease confirm reception and share testing procedure.`
  );

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
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Tool 3 of 8
          </span>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-700 to-orange-800 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-full text-amber-300 text-xs font-bold mb-2">
              <FlaskConical className="w-4 h-4" />
              Soil Health & Biological Restoration
            </div>
            <h1 className="text-2xl font-black">Crop Soil Analyser</h1>
            <p className="text-xs text-amber-100/80 mt-1 max-w-xl">
              Evaluate your soil fertility parameters directly or send a physical soil sample via postal courier to certified testing pharmacies.
            </p>
          </div>

          <div className="flex bg-amber-900/50 p-1 rounded-2xl border border-amber-600/40 text-xs font-bold">
            <button
              onClick={() => setActiveTab('instant')}
              className={`px-4 py-2 rounded-xl transition ${
                activeTab === 'instant' 
                  ? 'bg-white text-amber-900 shadow' 
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Enter Soil Test Values
            </button>
            <button
              onClick={() => setActiveTab('courier')}
              className={`px-4 py-2 rounded-xl transition ${
                activeTab === 'courier' 
                  ? 'bg-white text-amber-900 shadow' 
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Courier Soil Sample To Lab
            </button>
          </div>
        </div>

        {/* Tab 1: Instant Soil Analyzer Form */}
        {activeTab === 'instant' && (
          <div className="space-y-6">
            <form onSubmit={handleAnalyze} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-3 flex items-center justify-between">
                <span>Soil Chemical Properties</span>
                <span className="text-xs font-medium text-slate-500 lowercase normal-case">
                  Don't know metrics? Use the courier tab above
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Soil pH Level (Ideal: 6.5 - 7.5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="3"
                    max="10"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Nitrogen (N) Availability
                  </label>
                  <select
                    aria-label="Nitrogen Availability"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                  >
                    <option value="Low">Low (&lt; 280 kg/ha)</option>
                    <option value="Medium">Medium (280 - 560 kg/ha)</option>
                    <option value="High">High (&gt; 560 kg/ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Phosphorus (P) Level
                  </label>
                  <select
                    aria-label="Phosphorus Level"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                  >
                    <option value="Low">Low (&lt; 10 kg/ha)</option>
                    <option value="Medium">Medium (10 - 25 kg/ha)</option>
                    <option value="High">High (&gt; 25 kg/ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Potassium (K) Level
                  </label>
                  <select
                    aria-label="Potassium Level"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                  >
                    <option value="Low">Low (&lt; 110 kg/ha)</option>
                    <option value="Medium">Medium (110 - 280 kg/ha)</option>
                    <option value="High">High (&gt; 280 kg/ha)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Organic Carbon % (OC)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="2.5"
                    value={organicCarbon}
                    onChange={(e) => setOrganicCarbon(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Analyze Soil Fertility & Health
              </button>
            </form>

            {/* Analysis Output */}
            {analyzed && (
              <div className="space-y-6">
                <div className={`p-6 rounded-3xl border-2 flex items-start gap-4 ${
                  isFit 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900' 
                    : 'bg-red-50 border-red-400 text-red-900'
                }`}>
                  {isFit ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-600 shrink-0 mt-1" />
                  )}
                  <div>
                    <h3 className="text-xl font-black">
                      {isFit ? 'Land is High-Yield & Suitable for Cultivation!' : 'Land Soil Deficiencies Detected'}
                    </h3>
                    <p className="text-xs mt-1 leading-relaxed">
                      {isFit 
                        ? 'Your soil parameters are balanced with strong organic carbon and healthy nutrient reserves. Sowing can proceed directly.' 
                        : 'Your soil currently exhibits severe imbalances (low pH and depleted organic nitrogen). Follow the step-by-step restoration procedure below.'}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Fixes & Product Buy Links */}
                {!isFit && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
                      Step-by-Step Soil Restoration Plan
                    </h3>

                    <div className="space-y-4">
                      {remedies.map((remedy) => (
                        <div key={remedy.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">
                              {remedy.step}
                            </span>
                            <h4 className="font-bold text-sm text-slate-800">{remedy.title}</h4>
                          </div>

                          <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                            {remedy.instruction}
                          </p>

                          <div className="pl-8 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200/60 mt-3">
                            <span className="text-xs font-bold text-emerald-800">
                              Product: {remedy.recommendedProduct}
                            </span>

                            <div className="flex items-center gap-2 text-xs">
                              <a
                                href={remedy.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold flex items-center gap-1"
                              >
                                Amazon <ExternalLink className="w-3 h-3" />
                              </a>
                              <a
                                href={remedy.flipkartLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg font-bold flex items-center gap-1"
                              >
                                Flipkart <ExternalLink className="w-3 h-3" />
                              </a>
                              <a
                                href={remedy.agribegriLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg font-bold flex items-center gap-1"
                              >
                                AgriBegri <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Courier Soil Sample Workflow */}
        {activeTab === 'courier' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Postal Courier Workflow
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">
                Send Soil Sample to Nearest Pharmacy / Laboratory
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Collect your soil, parcel it via your local post office, and receive your comprehensive test report on this website.
              </p>
            </div>

            {/* Steps Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-amber-900">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Select Pharmacy Lab
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose your state and select the nearest certified government or private soil testing laboratory.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-amber-900">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
                  Soil Sampling (Top & Deep)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dig a V-shape hole: collect 250g from top layer (0-5cm) and 250g from sub-surface layer (15-20cm). Mix and air-dry in shade.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-amber-900">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
                  Courier & WhatsApp Pay
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pack in a clean zip pouch, post it to the lab address, and notify them directly via WhatsApp without payment gateway charges.
                </p>
              </div>
            </div>

            {/* Lab Selector & Fee Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Select State
                  </label>
                  <select
                    aria-label="Select State for Soil Lab"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedLab(labsByState[e.target.value][0]);
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                  >
                    <option value="Telangana">Telangana</option>
                    <option value="AndhraPradesh">Andhra Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Authorized Testing Pharmacy / Center
                  </label>
                  <select
                    aria-label="Authorized Testing Pharmacy or Center"
                    value={selectedLab}
                    onChange={(e) => setSelectedLab(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium outline-none focus:border-amber-500"
                  >
                    {labsByState[selectedState]?.map((lab) => (
                      <option key={lab} value={lab}>{lab}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & WhatsApp Dispatch Action */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block">Fixed Lab Testing Fee</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900">{testFee}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Standard Govt/NGO Rate
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Payable directly to the tester upon dispatch
                  </span>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Tester on WhatsApp (Pay & Confirm)
                </a>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}