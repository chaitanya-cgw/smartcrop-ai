'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ScanLine, 
  ArrowLeft, 
  UploadCloud, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles,
  ShieldAlert,
  Droplets,
  RotateCcw
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface DiagnosticReport {
  cropName: string;
  condition: string;
  confidence: string;
  severity: 'Low' | 'Moderate' | 'Severe';
  symptoms: string[];
  stepsToFix: string[];
  productName: string;
  usageInstructions: string;
  amazonLink: string;
  flipkartLink: string;
  agribegriLink: string;
}

export default function PlantScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<DiagnosticReport | null>(null);

  // Handle image upload from file or device camera
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setReport(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI disease diagnosis simulation
  const handleScanPlant = () => {
    if (!selectedImage) return;
    setLoading(true);

    setTimeout(() => {
      const diagnosed: DiagnosticReport = {
        cropName: 'Tomato / Solanaceae Plant',
        condition: 'Early Blight (Alternaria solani)',
        confidence: '96.4%',
        severity: 'Moderate',
        symptoms: [
          'Concentric dark rings with yellow halo spots on lower leaves',
          'Premature leaf drop and gradual stem collar rot',
          'Spreading rapidly during humid and high-temperature conditions'
        ],
        stepsToFix: [
          'Prune and destroy infected lower leaves immediately to stop airborne spore spread.',
          'Avoid overhead sprinkler irrigation; water directly at the base or drip line.',
          'Spray Copper Oxychloride 50% WP or Mancozeb 75% WP early in the morning.'
        ],
        productName: 'Copper Oxychloride 50% WP (Broad Spectrum Fungicide)',
        usageInstructions: 'Mix 2.5 grams per 1 Liter of clean water. Spray thoroughly covering both sides of remaining leaves. Repeat after 10 days if humidity persists.',
        amazonLink: 'https://www.amazon.in/s?k=copper+oxychloride+50+wp',
        flipkartLink: 'https://www.flipkart.com/search?q=copper+oxychloride+fungicide',
        agribegriLink: 'https://agribegri.com/products/fungicides'
      };

      setReport(diagnosed);
      setLoading(false);

      // Save to Dashboard Re-Order storage
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('farmer_remedies') || '[]');
        stored.unshift({
          id: `remedy-${Date.now()}`,
          crop: diagnosed.cropName,
          issue: diagnosed.condition,
          product: diagnosed.productName,
          link: diagnosed.agribegriLink,
          platform: 'AgriBegri',
          date: 'Just Now'
        });
        localStorage.setItem('farmer_remedies', JSON.stringify(stored.slice(0, 10)));
      }
    }, 1200);
  };

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
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Tool 4 of 8
          </span>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 text-xs font-bold mb-2">
              <ScanLine className="w-4 h-4" />
              Vision AI Crop Diagnostics
            </div>
            <h1 className="text-2xl font-black">AI Plant Scanner</h1>
            <p className="text-xs text-blue-100/80 mt-1 max-w-xl">
              Take or upload a photo of infected leaves, stems, or pests to receive instant disease identification, curative procedures, and verified medicine purchase links.
            </p>
          </div>
        </div>

        {/* Upload & Scanner Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Upload Zone */}
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50/50 hover:bg-emerald-50/20 min-h-[260px]">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <UploadCloud className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-slate-700 block">
                Click to Upload or Take Photo
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Supports JPG, PNG, WEBP from mobile camera or gallery
              </span>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-full">
                <Camera className="w-3.5 h-3.5" />
                <span>Snap Leaf Picture</span>
              </div>
            </label>

            {/* Preview Box */}
            <div className="flex flex-col items-center justify-center min-h-[260px] bg-slate-100 rounded-3xl p-4 border border-slate-200">
              {selectedImage ? (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={selectedImage}
                    alt="Uploaded crop leaf preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                    Ready to diagnose
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs p-6">
                  <ScanLine className="w-10 h-10 mx-auto mb-2 text-slate-300 animate-pulse" />
                  <span>No leaf photo selected yet.<br />Upload a leaf showing spots or discoloration.</span>
                </div>
              )}
            </div>

          </div>

          <button
            onClick={handleScanPlant}
            disabled={!selectedImage || loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Scanning Cellular Symptoms & Pathogen Markers...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run AI Disease Diagnostic
              </>
            )}
          </button>
        </div>

        {/* Diagnosis & Treatment Results */}
        {report && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-500 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Confidence: {report.confidence}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    Severity: {report.severity}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">{report.condition}</h3>
                <p className="text-xs text-slate-500 font-medium">Detected on: {report.cropName}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Saved to Re-Order Hub
              </div>
            </div>

            {/* Visual Symptoms */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Observed Pathological Symptoms
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {report.symptoms.map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Fix Procedure */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Step-by-Step Treatment Procedure
              </h4>
              <div className="space-y-2.5">
                {report.stepsToFix.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Product & How to Use */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                  Recommended Curative Medicine
                </span>
                <h4 className="text-base font-black text-emerald-950 mt-0.5">
                  {report.productName}
                </h4>
              </div>

              <div className="text-xs text-emerald-900 bg-white/80 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
                <Droplets className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>How to Apply: </strong>
                  <span>{report.usageInstructions}</span>
                </div>
              </div>

              {/* Direct Purchase Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700">
                  Buy from verified agricultural retailers:
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <a
                    href={report.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    Amazon <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={report.flipkartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    Flipkart <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={report.agribegriLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    AgriBegri <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}