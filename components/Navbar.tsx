'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  LogOut, 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building2, 
  X,
  BadgeCheck,
  History,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  Calendar
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useRouter, usePathname } from 'next/navigation';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface UserSession {
  name?: string;
  phone?: string;
  email?: string;
  state?: string;
  location?: string;
  apmcYard?: string;
}

interface PastOrder {
  id: string;
  productNameKey: string;
  categoryKey: string;
  quantity: string;
  price: string;
  orderDate: string;
  vendor: string;
  statusKey: string;
  vendorUrl: string;
}

export default function Navbar() {
  const { lang } = useToolTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [reorderSuccessId, setReorderSuccessId] = useState<string | null>(null);

  const [userSession, setUserSession] = useState<UserSession>({
    name: 'Chaitanya (Farmer Partner)',
    phone: '+91 98765 43210',
    email: 'farmer.partner@agrilock.in',
    state: 'Telangana',
    location: 'Nizamabad / Hyderabad',
    apmcYard: 'Bowenpally & Nizamabad APMC'
  });

  const profileRef = useRef<HTMLDivElement>(null);

  // Localized Dictionary
  const navText: Record<string, Record<string, string>> = {
    en: {
      profileTitle: "Farmer Profile & Identity",
      verifiedStatus: "APMC Verified Trader",
      nameLabel: "Registered Farmer",
      contactLabel: "Contact Information",
      locationLabel: "Village / Farm Location",
      escrowBadge: "Escrow Collateral Active",
      closeBtn: "Close",
      brandSub: "Farmer Forward-Contract Protocol",
      dashboardLink: "Dashboard",
      signOutTitle: "Sign out",

      // History Modal
      historyBtn: "History",
      historyModalTitle: "Input Order History & Reorder",
      historySubtitle: "Previously ordered fertilizers, curative fungicides, and soil inputs",
      reorderBtn: "Reorder",
      reorderedSuccess: "Reordered Successfully!",
      orderedOn: "Ordered on",
      totalPaid: "Amount:",
      statusDelivered: "Delivered",
      statusInTransit: "In Transit",
      emptyHistory: "No prior farm input orders found.",

      prod1: "Mancozeb 75% WP (Curative Fungicide)",
      prod2: "Agricultural Gypsum Soil Ameliorant",
      prod3: "Organic Cold-Pressed Neem Oil 10,000 PPM",
      prod4: "Rhizobium Bio-Fertilizer Seed Inoculant",
      catFungicide: "Fungicide",
      catSoil: "Soil Conditioner",
      catBio: "Organic Pest Control",
      catBioFert: "Bio-Fertilizer"
    },
    te: {
      profileTitle: "రైతు ప్రొఫైల్ & వివరాలు",
      verifiedStatus: "ధృవీకృత APMC రైతు",
      nameLabel: "నమోదిత రైతు పేరు",
      contactLabel: "సంప్రదింపు వివరాలు",
      locationLabel: "గ్రామం / పొలం ప్రాంతం",
      escrowBadge: "ఎస్క్రో భద్రతా డిపాజిట్ అమలులో ఉంది",
      closeBtn: "మూసివేయండి",
      brandSub: "రైతు ముందస్తు ఒప్పంద విధానం",
      dashboardLink: "డ్యాష్‌‌బోర్డు",
      signOutTitle: "లాగ్ అవుట్",

      historyBtn: "ఆర్డర్ల చరిత్ర",
      historyModalTitle: "గత ఆర్డర్ల చరిత్ర & మళ్లీ ఆర్డర్ చేయండి",
      historySubtitle: "ఇంతకు ముందు కొనుగోలు చేసిన ఎరువులు, పురుగు మందులు మరియు నేల దిద్దుబాటు ఉత్పత్తులు",
      reorderBtn: "మళ్లీ ఆర్డర్ చేయండి",
      reorderedSuccess: "విజయవంతంగా ఆర్డర్ చేయబడింది!",
      orderedOn: "ఆర్డర్ తేదీ",
      totalPaid: "చెల్లించిన మొత్తం:",
      statusDelivered: "డెలివరీ చేయబడింది",
      statusInTransit: "రవాణాలో ఉంది",
      emptyHistory: "గతంలో ఎలాంటి ఆర్డర్లు లేవు.",

      prod1: "మాంకోజెబ్ 75% WP (శిలీంధ్ర నాశిని)",
      prod2: "వ్యవసాయ జిప్సం (నేల చౌడు నివారిణి)",
      prod3: "సేంద్రీయ వేప నూనె 10,000 PPM",
      prod4: "రైజోబియం జీవ ఎరువుల విత్తన శుద్ధి",
      catFungicide: "శిలీంధ్ర నాశిని",
      catSoil: "నేల కండిషనర్",
      catBio: "సేంద్రీయ పురుగుల మందు",
      catBioFert: "జీవన ఎరువులు"
    },
    hi: {
      profileTitle: "किसान प्रोफ़ाइल एवं पहचान",
      verifiedStatus: "सत्यापित मंडी व्यापारी/किसान",
      nameLabel: "पंजीकृत किसान का नाम",
      contactLabel: "संपर्क विवरण",
      locationLabel: "गांव / खेत का स्थान",
      escrowBadge: "जमानत राशि सक्रिय",
      closeBtn: "बंद करें",
      brandSub: "किसान अग्रिम अनुबंध प्रणाली",
      dashboardLink: "डैशबोर्ड",
      signOutTitle: "साइन आउट",

      historyBtn: "ऑर्डर इतिहास",
      historyModalTitle: "पूर्व ऑर्डर इतिहास एवं पुनः ऑर्डर",
      historySubtitle: "पूर्व में खरीदे गए उर्वरक, फफूंदनाशक और भूमि सुधारक उत्पाद",
      reorderBtn: "पुनः ऑर्डर करें",
      reorderedSuccess: "पुनः ऑर्डर सफल रहा!",
      orderedOn: "ऑर्डर तिथि",
      totalPaid: "भुगतान राशि:",
      statusDelivered: "डिलीवर हो गया",
      statusInTransit: "रास्ते में है",
      emptyHistory: "कोई पूर्व ऑर्डर नहीं मिला।",

      prod1: "मैंकोजेब 75% WP (फफूंदनाशक दवा)",
      prod2: "कृषि जिप्सम (क्षारीय भूमि सुधारक)",
      prod3: "जैविक नीम का तेल 10,000 PPM",
      prod4: "राइजोबियम जैव उर्वरक बीज उपचार",
      catFungicide: "फफूंदनाशक",
      catSoil: "मृदा सुधारक",
      catBio: "जैविक कीटनाशक",
      catBioFert: "जैव उर्वरक"
    },
    ta: {
      profileTitle: "விவசாயி சுயவிவரம்",
      verifiedStatus: "சான்றளிக்கப்பட்ட APMC விவசாயி",
      nameLabel: "பதிவுசெய்த விவசாயி",
      contactLabel: "தொடர்பு விவரங்கள்",
      locationLabel: "கிராமம் / பண்ணை இடம்",
      escrowBadge: "வைப்புத்தொகை பாதுகாப்பு உள்ளது",
      closeBtn: "மூடு",
      brandSub: "விவசாயிகள் முன்கூட்டிய வர்த்தக ஒப்பந்தம்",
      dashboardLink: "முகப்பு",
      signOutTitle: "வெளியேறு",

      historyBtn: "வரலாறு",
      historyModalTitle: "முந்தைய ஆர்டர்கள் & மீண்டும் ஆர்டர் செய்க",
      historySubtitle: "முன்பு வாங்கிய உரங்கள், பூஞ்சாண மருந்துகள் மற்றும் மண் சீரமைப்பு பொருட்கள்",
      reorderBtn: "மீண்டும் ஆர்டர் செய்",
      reorderedSuccess: "வெற்றிகரமாக ஆர்டர் செய்யப்பட்டது!",
      orderedOn: "ஆர்டர் செய்த தேதி",
      totalPaid: "செலுத்திய தொகை:",
      statusDelivered: "வழங்கப்பட்டது",
      statusInTransit: "வழியில் உள்ளது",
      emptyHistory: "முந்தைய ஆர்டர்கள் எதுவும் இல்லை.",

      prod1: "மேன்கோசெப் 75% WP (பூஞ்சாணக்கொல்லி)",
      prod2: "விவசாய ஜிப்சம் (மண் சீரமைப்பான்)",
      prod3: "இயற்கை வேப்பெண்ணெய் 10,000 PPM",
      prod4: "ரைசோபியம் நுண்ணுயிர் உரம்",
      catFungicide: "பூஞ்சாணக்கொல்லி",
      catSoil: "மண் சீரமைப்பான்",
      catBio: "இயற்கை பூச்சி விரட்டி",
      catBioFert: "உயிர் உரம்"
    }
  };

  const cur = navText[lang] || navText.en;

  const [pastOrders, setPastOrders] = useState<PastOrder[]>([
    {
      id: 'ORD-9821',
      productNameKey: 'prod1',
      categoryKey: 'catFungicide',
      quantity: '2 Packets (500g each)',
      price: '₹580',
      orderDate: '24 Sep 2026',
      vendor: 'AgriBegri',
      statusKey: 'statusDelivered',
      vendorUrl: 'https://agribegri.com/search?q=mancozeb'
    },
    {
      id: 'ORD-9410',
      productNameKey: 'prod2',
      categoryKey: 'catSoil',
      quantity: '4 Bags (50kg each)',
      price: '₹1,950',
      orderDate: '15 Sep 2026',
      vendor: 'Amazon.in',
      statusKey: 'statusDelivered',
      vendorUrl: 'https://www.amazon.in/s?k=agricultural+gypsum+for+farming'
    },
    {
      id: 'ORD-8902',
      productNameKey: 'prod3',
      categoryKey: 'catBio',
      quantity: '1 Litre Bottle',
      price: '₹620',
      orderDate: '02 Sep 2026',
      vendor: 'Flipkart',
      statusKey: 'statusDelivered',
      vendorUrl: 'https://www.flipkart.com/search?q=neem+oil+farming'
    },
    {
      id: 'ORD-8334',
      productNameKey: 'prod4',
      categoryKey: 'catBioFert',
      quantity: '2 Litres Liquid Culture',
      price: '₹440',
      orderDate: '20 Aug 2026',
      vendor: 'AgriBegri',
      statusKey: 'statusDelivered',
      vendorUrl: 'https://agribegri.com/search?q=rhizobium'
    }
  ]);

  // Load session from localStorage safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('farmer_session');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserSession(prev => ({
            ...prev,
            name: parsed.name || prev.name,
            phone: parsed.phone || prev.phone,
            email: parsed.email || prev.email,
            state: parsed.state || prev.state,
            location: parsed.location || prev.location
          }));
        }
      } catch {}
    }
  }, []);

  // Profile click-outside dismiss
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReorder = (order: PastOrder) => {
    setReorderSuccessId(order.id);
    const reorderedItem: PastOrder = {
      ...order,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      orderDate: 'Today (01 Oct 2026)',
      statusKey: 'statusInTransit'
    };
    setPastOrders(prev => [reorderedItem, ...prev]);

    setTimeout(() => {
      setReorderSuccessId(null);
    }, 3000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('farmer_session');
    }
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black text-slate-900 tracking-tight">AgriLock</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-md border border-emerald-200 uppercase">
                    APMC
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
                  {cur.brandSub}
                </p>
              </div>
            </Link>
          </div>

          {/* Right Tools Navigation */}
          <div className="flex items-center gap-2">
            {pathname !== '/dashboard' && (
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {cur.dashboardLink}
              </Link>
            )}

            {/* 1. Language Switcher */}
            <LanguageSwitcher />

            {/* 2. Profile Popover Button */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-2 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
                  isProfileOpen 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                    : 'bg-white text-slate-700 hover:text-emerald-700 border-emerald-200 hover:bg-emerald-50 shadow-sm'
                }`}
                title={cur.profileTitle}
                aria-label="Toggle Farmer Profile"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline-block text-xs font-bold max-w-[90px] truncate">
                  {userSession.name?.split(' ')[0] || 'Profile'}
                </span>
              </button>

              {/* Profile Popover Body */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-emerald-200 shadow-2xl p-5 space-y-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-sm">
                        {userSession.name?.slice(0, 2).toUpperCase() || 'FP'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-black text-slate-900 leading-tight">
                            {userSession.name}
                          </h4>
                          <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-0.5">
                          {cur.verifiedStatus}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {cur.contactLabel}
                      </span>
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{userSession.phone}</span>
                      </div>
                      {userSession.email && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{userSession.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {cur.locationLabel}
                      </span>
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{userSession.location}, {userSession.state}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 pt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{userSession.apmcYard}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {cur.escrowBadge}
                      </span>
                      <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        ₹5,000 Bonded
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
                    >
                      {cur.closeBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition cursor-pointer"
              title={cur.signOutTitle}
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* 4. HISTORY BUTTON (Explicitly triggers modal) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileOpen(false);
                setIsHistoryOpen(true);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center gap-1.5 cursor-pointer"
              title={cur.historyModalTitle}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline-block">{cur.historyBtn}</span>
            </button>

          </div>

        </div>
      </header>

      {/* GLOBAL STANDALONE HISTORY MODAL (Placed outside header so it never clips) */}
      {isHistoryOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsHistoryOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-emerald-100 space-y-5 my-8 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-sm">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">{cur.historyModalTitle}</h3>
                  <p className="text-[11px] text-slate-500">{cur.historySubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Orders Feed */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {pastOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  {cur.emptyHistory}
                </div>
              ) : (
                pastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-sm transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          {cur[order.categoryKey] || order.categoryKey}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          order.statusKey === 'statusDelivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          {cur[order.statusKey] || order.statusKey}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 mt-1">
                        {cur[order.productNameKey] || order.productNameKey}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {cur.orderedOn} {order.orderDate}
                        </span>
                        <span>•</span>
                        <span>Quantity: <strong className="text-slate-800">{order.quantity}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">
                          {cur.totalPaid} {order.price}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-slate-600">Via {order.vendor}</span>
                      </div>
                    </div>

                    {/* Reorder Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>
                          {reorderSuccessId === order.id ? cur.reorderedSuccess : cur.reorderBtn}
                        </span>
                      </button>

                      <a
                        href={order.vendorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                        title="Open Vendor Store"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Bottom Close */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Reorders trigger immediate farm gate dispatch using stored farmer details.
              </span>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm"
              >
                {cur.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}