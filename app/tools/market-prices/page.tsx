'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowLeft, 
  Truck, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  PackageCheck,
  ChevronRight,
  Plus
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface MandiRate {
  id: string;
  crop: string;
  mandi: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down';
  change: string;
}

interface Merchant {
  id: string;
  name: string;
  firmName: string;
  cropBought: string;
  offeredPrice: number; // per quintal
  location: string;
  phone: string;
  rating: string;
}

interface TransportBooking {
  id: string;
  crop: string;
  quantity: string;
  merchantName: string;
  vehicleType: string;
  fare: string;
  pickupDate: string;
  status: 'Started' | 'In Transit' | 'Delivered';
}

export default function MarketPricesPage() {
  const [activeTab, setActiveTab] = useState<'mandi' | 'merchants' | 'transport'>('mandi');

  // Live Mandi Rates Data
  const mandiRates: MandiRate[] = [
    {
      id: 'm1',
      crop: 'Soybean (Yellow)',
      mandi: 'Nizamabad APMC',
      minPrice: 4600,
      maxPrice: 5120,
      modalPrice: 4950,
      trend: 'up',
      change: '+4.2%'
    },
    {
      id: 'm2',
      crop: 'Tomato (Hybrid)',
      mandi: 'Bowenpally Market, Hyderabad',
      minPrice: 2200,
      maxPrice: 3400,
      modalPrice: 3100,
      trend: 'up',
      change: '+18.5%'
    },
    {
      id: 'm3',
      crop: 'Paddy / Rice (Common)',
      mandi: 'Warangal Grain Market',
      minPrice: 2183,
      maxPrice: 2320,
      modalPrice: 2280,
      trend: 'up',
      change: '+1.5%'
    },
    {
      id: 'm4',
      crop: 'Cotton (Medium Staple)',
      mandi: 'Khammam Mandi',
      minPrice: 6800,
      maxPrice: 7450,
      modalPrice: 7100,
      trend: 'down',
      change: '-2.1%'
    },
    {
      id: 'm5',
      crop: 'Maize (Yellow Corn)',
      mandi: 'Karimnagar Market',
      minPrice: 2050,
      maxPrice: 2280,
      modalPrice: 2190,
      trend: 'up',
      change: '+3.0%'
    }
  ];

  // Direct Procurement Merchants
  const merchants: Merchant[] = [
    {
      id: 'mer-1',
      name: 'Ramesh Reddy',
      firmName: 'Sri Balaji Agro Commodities',
      cropBought: 'Soybean & Maize',
      offeredPrice: 5050,
      location: 'Nizamabad, Telangana',
      phone: '+91 98480 12345',
      rating: '4.8/5'
    },
    {
      id: 'mer-2',
      name: 'K. Srinivasan',
      firmName: 'Deccan Fresh Produce Ltd.',
      cropBought: 'Tomato, Chilies & Vegetables',
      offeredPrice: 3250,
      location: 'Bowenpally, Hyderabad',
      phone: '+91 99887 54321',
      rating: '4.9/5'
    },
    {
      id: 'mer-3',
      name: 'Anand Kumar',
      firmName: 'Kisan Grains & Pulses Corp',
      cropBought: 'Paddy & Black Gram',
      offeredPrice: 2310,
      location: 'Warangal, Telangana',
      phone: '+91 97011 88990',
      rating: '4.7/5'
    }
  ];

  // Transport Bookings & Trade History
  const [bookings, setBookings] = useState<TransportBooking[]>([
    {
      id: 'TR-8091',
      crop: 'Soybean',
      quantity: '25 Quintals',
      merchantName: 'Sri Balaji Agro Commodities',
      vehicleType: 'Tata Ace (1.5 Ton)',
      fare: '₹1,850',
      pickupDate: '2026-09-28',
      status: 'In Transit'
    },
    {
      id: 'TR-7822',
      crop: 'Tomato',
      quantity: '40 Crates (1 Ton)',
      merchantName: 'Deccan Fresh Produce Ltd.',
      vehicleType: 'Pickup Bolero (2 Ton)',
      fare: '₹2,400',
      pickupDate: '2026-09-24',
      status: 'Delivered'
    }
  ]);

  // New Transport Booking Form State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookCrop, setBookCrop] = useState('Soybean');
  const [bookQty, setBookQty] = useState('20 Quintals');
  const [bookMerchant, setBookMerchant] = useState('Sri Balaji Agro Commodities');
  const [bookVehicle, setBookVehicle] = useState('Tata Ace (1.5 Ton)');
  const [bookFare, setBookFare] = useState('₹1,800');

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: TransportBooking = {
      id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      crop: bookCrop,
      quantity: bookQty,
      merchantName: bookMerchant,
      vehicleType: bookVehicle,
      fare: bookFare,
      pickupDate: new Date().toISOString().split('T')[0],
      status: 'Started'
    };

    setBookings([newEntry, ...bookings]);
    setShowBookingModal(false);
  };

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
          <span className="text-xs font-semibold bg-violet-100 text-violet-800 px-3 py-1 rounded-full">
            Tool 5 of 8
          </span>
        </div>

        {/* Title Banner */}
        <div className="bg-gradient-to-r from-violet-800 to-purple-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-500/20 px-3 py-1 rounded-full text-violet-300 text-xs font-bold mb-2">
              <TrendingUp className="w-4 h-4" />
              Mandi Discovery & Rural Logistics
            </div>
            <h1 className="text-2xl font-black">Live Market & Farm Logistics</h1>
            <p className="text-xs text-violet-100/80 mt-1 max-w-xl">
              Track live mandi benchmark rates, trade directly with verified regional merchants, and book rural pickup vehicles with full transit tracking.
            </p>
          </div>

          <div className="flex bg-violet-950/60 p-1 rounded-2xl border border-violet-700/50 text-xs font-bold">
            <button
              onClick={() => setActiveTab('mandi')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'mandi' ? 'bg-white text-violet-900 shadow' : 'text-violet-200 hover:text-white'
              }`}
            >
              Live Mandi Rates
            </button>
            <button
              onClick={() => setActiveTab('merchants')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'merchants' ? 'bg-white text-violet-900 shadow' : 'text-violet-200 hover:text-white'
              }`}
            >
              Merchant Directory
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'transport' ? 'bg-white text-violet-900 shadow' : 'text-violet-200 hover:text-white'
              }`}
            >
              Transport & Trades ({bookings.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Live Mandi Rates */}
        {activeTab === 'mandi' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Today's APMC Mandi Benchmark Prices
                </h2>
                <p className="text-xs text-slate-500">Official modal prices updated daily from regional market yards</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
                Live Feed Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">Crop / Commodity</th>
                    <th className="py-3 px-3">Mandi Market</th>
                    <th className="py-3 px-3">Min Price</th>
                    <th className="py-3 px-3">Max Price</th>
                    <th className="py-3 px-3">Modal Rate / Qtl</th>
                    <th className="py-3 px-3 text-right">Today's Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mandiRates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-3 font-bold text-slate-800">{rate.crop}</td>
                      <td className="py-3.5 px-3 text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {rate.mandi}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500">₹{rate.minPrice}</td>
                      <td className="py-3.5 px-3 text-slate-500">₹{rate.maxPrice}</td>
                      <td className="py-3.5 px-3 font-black text-slate-900 text-sm">₹{rate.modalPrice}</td>
                      <td className="py-3.5 px-3 text-right">
                        <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
                          rate.trend === 'up' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {rate.trend === 'up' ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {rate.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Merchant Directory */}
        {activeTab === 'merchants' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Verified Commodity Buyers & Merchants
                </h2>
                <p className="text-xs text-slate-500">Sell directly at transparent prices without local middleman commission</p>
              </div>
              <button
                onClick={() => { setActiveTab('transport'); setShowBookingModal(true); }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                Book Vehicle for Merchant
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {merchants.map((merchant) => (
                <div key={merchant.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Buyer
                      </span>
                      <span className="text-xs font-bold text-amber-500">★ {merchant.rating}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{merchant.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{merchant.firmName}</p>

                    <div className="my-3 p-3 bg-violet-50 rounded-2xl border border-violet-100 text-xs">
                      <span className="text-[10px] uppercase text-violet-700 font-bold block">Buying Commodities</span>
                      <p className="font-bold text-slate-800 mt-0.5">{merchant.cropBought}</p>
                      <div className="mt-2 pt-2 border-t border-violet-200/60 flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">Offering Rate:</span>
                        <span className="text-sm font-black text-violet-900">₹{merchant.offeredPrice} / Qtl</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {merchant.location}
                    </p>
                  </div>

                  <a
                    href={`tel:${merchant.phone}`}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call {merchant.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Transport Logistics & Live Delivery Tracker */}
        {activeTab === 'transport' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Farm Transport Logistics & Trade Status
                </h2>
                <p className="text-xs text-slate-500">Track shipments sent from your farm to merchant warehouses</p>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Book Farm Pickup Vehicle
              </button>
            </div>

            {/* Active & Past Shipment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">Order #{item.id}</span>
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 mt-0.5">
                        <Truck className="w-4 h-4 text-violet-600" />
                        {item.crop} ({item.quantity})
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Destination Merchant: {item.merchantName}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'Delivered' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : item.status === 'In Transit' 
                        ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' 
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl text-xs border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Vehicle</span>
                      <span className="font-bold text-slate-700 mt-0.5 block">{item.vehicleType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Fare Fee</span>
                      <span className="font-bold text-slate-700 mt-0.5 block">{item.fare}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Pickup Date</span>
                      <span className="font-bold text-slate-700 mt-0.5 block">{item.pickupDate}</span>
                    </div>
                  </div>

                  {/* Delivery Status Progression Bar */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                      <span className={item.status === 'Started' || item.status === 'In Transit' || item.status === 'Delivered' ? 'text-violet-700' : 'text-slate-300'}>
                        ✓ Loaded at Farm
                      </span>
                      <span className={item.status === 'In Transit' || item.status === 'Delivered' ? 'text-amber-600' : 'text-slate-300'}>
                        🚚 On the Way
                      </span>
                      <span className={item.status === 'Delivered' ? 'text-emerald-600' : 'text-slate-300'}>
                        📍 Delivered
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${
                        item.status === 'Delivered' 
                          ? 'w-full bg-emerald-500' 
                          : item.status === 'In Transit' 
                          ? 'w-2/3 bg-amber-500' 
                          : 'w-1/3 bg-violet-600'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-base text-slate-800">Book Farm Pickup Vehicle</h3>
                    <button 
                      onClick={() => setShowBookingModal(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Crop & Harvest</label>
                      <input
                        type="text"
                        value={bookCrop}
                        onChange={(e) => setBookCrop(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-violet-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estimated Quantity (Quintals / Tons)</label>
                      <input
                        type="text"
                        value={bookQty}
                        onChange={(e) => setBookQty(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-violet-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Destination Merchant</label>
                      <select
                        aria-label="Destination Merchant"
                        value={bookMerchant}
                        onChange={(e) => setBookMerchant(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-violet-500"
                      >
                        {merchants.map(m => (
                          <option key={m.id} value={m.firmName}>{m.firmName} ({m.name})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Vehicle Type</label>
                        <select
                          aria-label="Vehicle Type"
                          value={bookVehicle}
                          onChange={(e) => {
                            setBookVehicle(e.target.value);
                            setBookFare(e.target.value.includes('Ace') ? '₹1,800' : '₹3,500');
                          }}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-violet-500"
                        >
                          <option value="Tata Ace (1.5 Ton)">Tata Ace (1.5 Ton)</option>
                          <option value="Pickup Bolero (2 Ton)">Pickup Bolero (2 Ton)</option>
                          <option value="Eicher 407 (4 Ton)">Eicher 407 (4 Ton)</option>
                          <option value="10-Wheeler Truck (16 Ton)">10-Wheeler (16 Ton)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Estimated Transport Fare</label>
                        <input
                          type="text"
                          value={bookFare}
                          readOnly
                          className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition cursor-pointer"
                    >
                      Confirm Vehicle Booking & Generate Trip
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}