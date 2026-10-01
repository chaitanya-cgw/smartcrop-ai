'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Clock, 
  FileText, 
  QrCode, 
  ArrowUpRight, 
  ArrowDownRight, 
  MapPin, 
  CheckCircle2,
  Truck,
  Download,
  Printer,
  Building2,
  User,
  Phone,
  Calendar,
  AlertCircle,
  TrendingUp,
  X,
  BadgeCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface TransportOption {
  vehicleType: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  estimatedCost: string;
  etaToMandi: string;
}

interface MerchantInfo {
  id: string;
  name: string;
  firmName: string;
  apmcLicense: string;
  phone: string;
  mandiLocation: string;
  cropBought: string;
  offeredPrice: number;
  escrowDeposit: string;
  rating: string;
  transportProvided: boolean;
  transportDetails: TransportOption;
}

interface DealSlip {
  contractId: string;
  timestamp: string;
  crop: string;
  quantity: string;
  lockedPrice: number;
  totalEstimatedValue: number;
  farmerName: string;
  farmerPhone: string;
  merchantName: string;
  merchantFirm: string;
  merchantPhone: string;
  merchantApmc: string;
  mandiLocation: string;
  lockExpiryTime: string;
  advanceDeposit: string;
  includeTransport: boolean;
  transportDetails?: TransportOption;
  status: 'In Transit - Price Locked' | 'Arrived & Verified' | 'Settled';
}

export default function MarketPricesPage() {
  const { t, lang } = useToolTranslation();

  const [activeTab, setActiveTab] = useState<'mandi' | 'merchants' | 'deals'>('mandi');
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantInfo | null>(null);
  const [includeTransportBooking, setIncludeTransportBooking] = useState<boolean>(true);
  const [selectedCropRate, setSelectedCropRate] = useState<any>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(25); // Quintals
  const [activeDeals, setActiveDeals] = useState<DealSlip[]>([
    {
      contractId: 'AGRI-DL-8042',
      timestamp: '01 Oct 2026, 08:30 AM',
      crop: lang === 'te' ? 'సోయాబీన్ (JS-335)' : lang === 'hi' ? 'सोयाबीन (पीला)' : lang === 'ta' ? 'சோயாபீன்' : 'Soybean (JS-335)',
      quantity: '25 Quintals',
      lockedPrice: 5050,
      totalEstimatedValue: 126250,
      farmerName: 'Chaitanya (Farmer Partner)',
      farmerPhone: '+91 98765 43210',
      merchantName: 'Ramesh Reddy',
      merchantFirm: 'Sri Balaji Agro Commodities',
      merchantPhone: '+91 94401 22334',
      merchantApmc: 'APMC/NZB/2026/8912',
      mandiLocation: 'Nizamabad APMC Market Yard',
      lockExpiryTime: '6 Hours Transit Guarantee',
      advanceDeposit: '₹5,000 Advance Token in Escrow',
      includeTransport: true,
      transportDetails: {
        vehicleType: 'Tata Ace (4-Wheeler Mini Truck)',
        driverName: 'Suresh Yadav',
        driverPhone: '+91 91234 56789',
        vehicleNumber: 'TS 16 UB 4402',
        estimatedCost: '₹1,400 (Deducted from Settlement)',
        etaToMandi: '45 mins from farm gate'
      },
      status: 'In Transit - Price Locked'
    }
  ]);

  const [viewingReceiptDeal, setViewingReceiptDeal] = useState<DealSlip | null>(null);
  const receiptPrintRef = useRef<HTMLDivElement>(null);

  // Localization Dictionary
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 5 of 6 • 6-Hour Transit Price Lock Protocol",
      bannerTitle: "Smart Market & Enforceable Trade Hub",
      bannerSubtitle: "Guaranteed APMC Forward Contracts with Merchant Escrow Collateral",
      bannerDesc: "Lock guaranteed mandi sale prices for 6 hours before vehicle dispatch to prevent transit market crashes. Select certified APMC merchants offering tied vehicle transport, generate legally enforceable deal slips, and print official receipts.",
      
      tabMandi: "Mandi Benchmark Rates",
      tabMerchants: "Verified APMC Merchants",
      tabContracts: "My Locked Deal Slips",

      mandiHeader: "Live Mandi Benchmarks with 6-Hour Price-Lock Protection",
      merchantsHeader: "Licensed APMC Merchants with Escrow Deposits & Transport",
      dealsHeader: "Active Legal Contracts & Digital Deal Slips",

      cropCol: "Crop Specimen",
      mandiCol: "APMC Market Yard",
      modalCol: "Current Modal Rate",
      trendCol: "Trend",
      actionCol: "Price Protection",

      merchantFirmCol: "Merchant & Firm Name",
      licenseCol: "APMC License ID",
      offeredPriceCol: "Offered Locked Rate",
      transportCol: "Transport Status",
      lockDealBtn: "Lock Rate & Contract",
      availableTransport: "Merchant Vehicle Transport Included",
      selfTransport: "Farmer Self-Transport",

      receiptTitle: "APMC Guaranteed Deal Slip & Waybill",
      receiptSubtitle: "Government Recognized E-Contract & Forward Price Guarantee",
      contractIdLabel: "Contract Serial ID:",
      timestampLabel: "Locked Timestamp:",
      farmerDetailsLabel: "Farmer / Consignor Details",
      merchantDetailsLabel: "Merchant / Consignee Details",
      tradeSpecsLabel: "Commodity & Agreed Trade Specs",
      transportHeader: "Tied Merchant Transportation Waybill",
      vehicleNumLabel: "Vehicle Number:",
      driverLabel: "Assigned Driver:",
      costLabel: "Freight Cost:",
      escrowSecurityTitle: "APMC Escrow Settlement Protection",
      escrowSecurityDesc: "Merchant has deposited advance collateral token into the APMC bank escrow account. If the buyer defaults on delivery arrival, the escrow collateral is automatically forfeited to the farmer.",
      printReceiptBtn: "Print / Save Official PDF Receipt",
      closeBtn: "Close Window",

      // Modal
      bookingModalTitle: "Confirm 6-Hour Price Lock Forward Contract",
      enterQuantityLabel: "Dispatch Quantity (in Quintals):",
      totalPayoutLabel: "Total Guaranteed Consignment Value:",
      includeTransportCheckbox: "Include Merchant-Assigned Transport Pickup from Village Gate",
      confirmLockBtn: "Confirm Lock & Generate Legal Deal Slip"
    },
    te: {
      badgeText: "టూల్ 5 / 6 • 6 గంటల రవాణా ధర లాక్ విధానం",
      bannerTitle: "స్మార్ట్ మార్కెట్ & వాణిజ్య ఒప్పంద కేంద్రం",
      bannerSubtitle: "వ్యాపారుల ఎస్క్రో డిపాజిట్‌తో కూడిన APMC ఒప్పందాలు",
      bannerDesc: "రవాణా సమయంలో మార్కెట్ ధరలు తగ్గకుండా 6 గంటల పాటు ధరను స్థిరీకరించుకోండి. వాహన రవాణా సౌకర్యం ఉన్న వ్యాపారులను ఎంచుకోండి, డిజిటల్ డీల్ స్లిప్‌లను రూపొందించి రసీదులను ప్రింట్ చేసుకోండి.",

      tabMandi: "తాజా మండి ధరలు",
      tabMerchants: "ధృవీకృత వ్యాపారులు",
      tabContracts: "నా ధర లాక్ ఒప్పందాలు",

      mandiHeader: "ధర లాక్ రక్షణతో కూడిన ప్రత్యక్ష మండి మార్కెట్ ధరలు",
      merchantsHeader: "రవాణా సౌకర్యం కలిగిన లైసెన్స్ పొందిన APMC వ్యాపారులు",
      dealsHeader: "చట్టబద్ధమైన డిజిటల్ ఒప్పందాలు & రవాణా స్లిప్‌లు",

      cropCol: "పంట రకం",
      mandiCol: "APMC మార్కెట్ యార్డ్",
      modalCol: "ప్రస్తుత సగటు ధర",
      trendCol: "ధర ధోరణి",
      actionCol: "ధర రక్షణ చర్య",

      merchantFirmCol: "వ్యాపారి & సంస్థ వివరాలు",
      licenseCol: "APMC లైసెన్స్ నంబర్",
      offeredPriceCol: "ఆఫర్ చేసిన లాక్ ధర",
      transportCol: "రవాణా సౌకర్యం",
      lockDealBtn: "ధర లాక్ చేసి డీల్ బుక్ చేయండి",
      availableTransport: "వ్యాపారి వాహన రవాణా అందుబాటులో ఉంది",
      selfTransport: "రైతు సొంత రవాణా",

      receiptTitle: "APMC గ్యారెంటీడ్ డిజిటల్ డీల్ స్లిప్ & రవాణా రసీదు",
      receiptSubtitle: "ప్రభుత్వ గుర్తింపు పొందిన ఈ-కాంట్రాక్ట్ & ధర హామీ పత్రం",
      contractIdLabel: "ఒప్పంద ఐడీ:",
      timestampLabel: "లాక్ చేసిన సమయం:",
      farmerDetailsLabel: "రైతు / విక్రేత వివరాలు",
      merchantDetailsLabel: "కొనుగోలుదారు / వ్యాపారి వివరాలు",
      tradeSpecsLabel: "పంట పరిమాణం & ధర వివరాలు",
      transportHeader: "కేటాయించిన వాహన రవాణా పత్రం",
      vehicleNumLabel: "వాహనం నంబర్:",
      driverLabel: "డ్రైవర్ వివరాలు:",
      costLabel: "రవాణా చార్జీ:",
      escrowSecurityTitle: "APMC ఎస్క్రో భద్రతా రక్షణ",
      escrowSecurityDesc: "వ్యాపారి ముందస్తు ధరావతు మొత్తాన్ని APMC బ్యాంకు ఖాతాలో జమ చేశారు. సరుకు చేరిన తర్వాత కొనుగోలు నిరాకరిస్తే, ఆ మొత్తం రైతుకే చెందుతుంది.",
      printReceiptBtn: "రసీదును ప్రింట్ / PDF లో సేవ్ చేయండి",
      closeBtn: "విండో మూసివేయండి",

      bookingModalTitle: "6-గంటల ధర లాక్ ఒప్పందాన్ని నిర్ధారించండి",
      enterQuantityLabel: "సరుకు పరిమాణం (క్వింటాళ్లలో):",
      totalPayoutLabel: "మొత్తం హామీ ఇవ్వబడిన పంట విలువ:",
      includeTransportCheckbox: "పొలం వద్దకే వ్యాపారి వాహనాన్ని పంపే సదుపాయాన్ని చేర్చండి",
      confirmLockBtn: "లాక్ చేసి డిజిటల్ స్లిప్ రూపొందించండి"
    },
    hi: {
      badgeText: "टूल 5 / 6 • 6 घंटे की पारगमन मूल्य सुरक्षा",
      bannerTitle: "मंडी बाजार एवं डिजिटल अनुबंध केंद्र",
      bannerSubtitle: "व्यापारी जमानत राशि के साथ गारंटीकृत APMC सौदे",
      bannerDesc: "मंडी ले जाते समय रास्ते में भाव गिरने से बचने हेतु 6 घंटे के लिए भाव पक्का करें। वाहन सुविधा देने वाले व्यापारियों को चुनें, डिजिटल डील स्लिप बनाएं और पक्की रसीद सहेजें।",

      tabMandi: "लाइव मंडी भाव",
      tabMerchants: "सत्यापित APMC व्यापारी",
      tabContracts: "मेरे मूल्य लॉक सौदे",

      mandiHeader: "मूल्य-लॉक गारंटी के साथ ताज़ा मंडी भाव",
      merchantsHeader: "जमानत राशि एवं परिवहन सुविधा युक्त पंजीकृत व्यापारी",
      dealsHeader: "सक्रिय कानूनी डिजिटल सौदे और रसीदें",

      cropCol: "फसल",
      mandiCol: "APMC मंडी यार्ड",
      modalCol: "वर्तमान मॉडल भाव",
      trendCol: "रुझान",
      actionCol: "मूल्य सुरक्षा",

      merchantFirmCol: "व्यापारी एवं फर्म का नाम",
      licenseCol: "APMC लाइसेंस आईडी",
      offeredPriceCol: "प्रस्तावित लॉक भाव",
      transportCol: "परिवहन स्थिति",
      lockDealBtn: "भाव लॉक करें और सौदा करें",
      availableTransport: "व्यापारी द्वारा वाहन पिकअप उपलब्ध",
      selfTransport: "किसान का स्वयं का वाहन",

      receiptTitle: "APMC गारंटीकृत डिजिटल डील स्लिप एवं वे-बिल",
      receiptSubtitle: "सरकार द्वारा मान्यता प्राप्त ई-अनुबंध एवं भाव सुरक्षा पत्र",
      contractIdLabel: "अनुबंध क्रमांक:",
      timestampLabel: "लॉक करने का समय:",
      farmerDetailsLabel: "किसान / विक्रेता विवरण",
      merchantDetailsLabel: "व्यापारी / क्रेता विवरण",
      tradeSpecsLabel: "फसल मात्रा एवं तय भाव",
      transportHeader: "आवंटित वाहन परिवहन वे-बिल",
      vehicleNumLabel: "गाड़ी नंबर:",
      driverLabel: "चालक का नाम:",
      costLabel: "भाड़ा शुल्क:",
      escrowSecurityTitle: "APMC एस्क्रो खाता सुरक्षा गारंटी",
      escrowSecurityDesc: "व्यापारी ने अग्रिम जमानत राशि APMC बैंक खाते में जमा कर दी है। माल पहुंचने पर यदि व्यापारी खरीदने से मना करता है, तो जमानत राशि किसान को दे दी जाएगी।",
      printReceiptBtn: "रसीद प्रिंट करें / PDF सहेजें",
      closeBtn: "बंद करें",

      bookingModalTitle: "6-घंटे का अग्रिम मूल्य अनुबंध पक्का करें",
      enterQuantityLabel: "फसल मात्रा (क्विंटल में):",
      totalPayoutLabel: "कुल गारंटीकृत फसल भुगतान राशि:",
      includeTransportCheckbox: "खेत से ही व्यापारी द्वारा वाहन पिकअप शामिल करें",
      confirmLockBtn: "सौदा पक्का करें और कानूनी रसीद बनाएं"
    },
    ta: {
      badgeText: "கருவி 5 / 6 • 6 மணி நேர விலை பாதுகாப்பு முறை",
      bannerTitle: "சந்தை & வர்த்தக ஒப்பந்த மையம்",
      bannerSubtitle: "வியாபாரிகள் வைப்புத்தொகையுடன் கூடிய APMC ஒப்பந்தங்கள்",
      bannerDesc: "போக்குவரத்தின் போது விலை வீழ்ச்சியிலிருந்து தப்ப 6 மணி நேரம் விலையை பூட்டுங்கள். சரக்கு வண்டி வசதி தரும் வியாபாரிகளை தேர்ந்தெடுத்து, டிஜிட்டல் ஒப்பந்த ரசீதுகளை அச்சிடுங்கள்.",

      tabMandi: "சந்தை நிலவரம்",
      tabMerchants: "சான்றளிக்கப்பட்ட வியாபாரிகள்",
      tabContracts: "பூட்டப்பட்ட ஒப்பந்தங்கள்",

      mandiHeader: "விலை பாதுகாப்புடன் கூடிய நேரடி சந்தை நிலவரம்",
      merchantsHeader: "வாகன வசதியுடன் கூடிய பதிவுபெற்ற APMC வியாபாரிகள்",
      dealsHeader: "சட்டபூர்வ ஒப்பந்தங்கள் மற்றும் ரசீதுகள்",

      cropCol: "பயிர்",
      mandiCol: "APMC சந்தை",
      modalCol: "தற்போதைய விலை",
      trendCol: "போக்கு",
      actionCol: "விலை பாதுகாப்பு",

      merchantFirmCol: "வியாபாரி & நிறுவன விவரம்",
      licenseCol: "APMC உரிம எண்",
      offeredPriceCol: "உறுதிசெய்த விலை",
      transportCol: "வாகன வசதி",
      lockDealBtn: "விலையை பூட்டி ஒப்பந்தம் செய்",
      availableTransport: "வியாபாரியின் வாகன வசதி உண்டு",
      selfTransport: "விவசாயியின் சொந்த வாகனம்",

      receiptTitle: "APMC டிஜிட்டல் ஒப்பந்தம் & போக்குவரத்து ரசீது",
      receiptSubtitle: "அரசு அங்கீகாரம் பெற்ற மின்-ஒப்பந்தம் மற்றும் விலை உறுதி ஆவணம்",
      contractIdLabel: "ஒப்பந்த எண்:",
      timestampLabel: "பூட்டப்பட்ட நேரம்:",
      farmerDetailsLabel: "விவசாயி விவரங்கள்",
      merchantDetailsLabel: "வியாபாரி விவரங்கள்",
      tradeSpecsLabel: "அளவு மற்றும் விலை விவரங்கள்",
      transportHeader: "ஒதுக்கப்பட்ட வாகன போக்குவரத்து ரசீது",
      vehicleNumLabel: "வாகன எண்:",
      driverLabel: "ஓட்டுநர் விவரம்:",
      costLabel: "வாடகை கட்டணம்:",
      escrowSecurityTitle: "APMC வைப்புத்தொகை பாதுகாப்பு",
      escrowSecurityDesc: "வியாபாரி தனது முன்பணத்தை வங்கி கணக்கில் செலுத்தியுள்ளார். சரக்கு வந்த பின் வாங்க மறுத்தால், அந்த முன்பணம் விவசாயிக்கு வழங்கப்படும்.",
      printReceiptBtn: "ரசீதை அச்சிடு / PDF சேமி",
      closeBtn: "மூடு",

      bookingModalTitle: "6 மணி நேர விலை ஒப்பந்தத்தை உறுதிப்படுத்துக",
      enterQuantityLabel: "சரக்கு அளவு (குவிண்டாலில்):",
      totalPayoutLabel: "மொத்த உறுதிசெய்யப்பட்ட தொகை:",
      includeTransportCheckbox: "வியாபாரியின் வாகன வசதியை சேர்க்கவும்",
      confirmLockBtn: "உறுதிசெய்து ரசீதை உருவாக்கு"
    }
  };

  const cur = dict[lang] || dict.en;

  // Live Mandi Rates
  const mandiRates = [
    {
      id: 'm1',
      crop: lang === 'te' ? 'సోయాబీన్ (JS-335)' : lang === 'hi' ? 'सोयाबीन (पीला)' : lang === 'ta' ? 'சோயாபீன்' : 'Soybean (Yellow)',
      mandi: 'Nizamabad APMC',
      modalPrice: 5050,
      trend: 'up',
      change: '+4.2%'
    },
    {
      id: 'm2',
      crop: lang === 'te' ? 'టమోటా (హైబ్రిడ్)' : lang === 'hi' ? 'टमाटर (हाइब्रिड)' : lang === 'ta' ? 'தக்காளி' : 'Tomato (Hybrid)',
      mandi: 'Bowenpally, Hyderabad',
      modalPrice: 3100,
      trend: 'up',
      change: '+12.5%'
    },
    {
      id: 'm3',
      crop: lang === 'te' ? 'శనగలు (దేశీ)' : lang === 'hi' ? 'चना / देशी चना' : lang === 'ta' ? 'கொண்டைக்கடலை' : 'Bengal Gram (Desi)',
      mandi: 'Guntur APMC Yard',
      modalPrice: 5440,
      trend: 'up',
      change: '+1.8%'
    },
    {
      id: 'm4',
      crop: lang === 'te' ? 'పత్తి (Bt-II)' : lang === 'hi' ? 'कपास (मध्यम रेशा)' : lang === 'ta' ? 'பருத்தி' : 'Cotton (Medium Staple)',
      mandi: 'Warangal Enkoor Yard',
      modalPrice: 7150,
      trend: 'down',
      change: '-2.4%'
    }
  ];

  // Verified APMC Merchants with Tied Transportation Fleet
  const merchants: MerchantInfo[] = [
    {
      id: 'mer-1',
      name: 'Ramesh Reddy',
      firmName: 'Sri Balaji Agro Commodities Ltd.',
      apmcLicense: 'APMC/NZB/2026/8912',
      phone: '+91 94401 22334',
      mandiLocation: 'Nizamabad APMC Yard',
      cropBought: 'Soybean, Maize & Pulses',
      offeredPrice: 5050,
      escrowDeposit: '₹50,000 Maintained Escrow Balance',
      rating: '4.9/5 (182 Verified Deals)',
      transportProvided: true,
      transportDetails: {
        vehicleType: 'Tata Ace (4-Wheeler Mini Truck)',
        driverName: 'Suresh Yadav',
        driverPhone: '+91 91234 56789',
        vehicleNumber: 'TS 16 UB 4402',
        estimatedCost: '₹1,400 (Adjusted at Mandi Gate)',
        etaToMandi: '45 mins from farm gate'
      }
    },
    {
      id: 'mer-2',
      name: 'K. Srinivasan',
      firmName: 'Deccan Fresh Produce Trading Co.',
      apmcLicense: 'APMC/HYD/2025/3340',
      phone: '+91 98852 11990',
      mandiLocation: 'Bowenpally Wholesale Yard, Hyderabad',
      cropBought: 'Tomato, Chilies & Vegetables',
      offeredPrice: 3200,
      escrowDeposit: '₹75,000 Maintained Escrow Balance',
      rating: '4.8/5 (240 Verified Deals)',
      transportProvided: true,
      transportDetails: {
        vehicleType: 'Mahindra Bolero Maxi Truck',
        driverName: 'Mohammed Rafi',
        driverPhone: '+91 97003 44812',
        vehicleNumber: 'TS 08 YA 9811',
        estimatedCost: '₹1,850 (Adjusted at Mandi Gate)',
        etaToMandi: '1 hr 15 mins from farm gate'
      }
    },
    {
      id: 'mer-3',
      name: 'G. Venkatramaiah',
      firmName: 'Guntur Spices & Grains Syndicate',
      apmcLicense: 'APMC/GNT/2026/1029',
      phone: '+91 98480 77112',
      mandiLocation: 'Guntur Commercial Market Yard',
      cropBought: 'Bengal Gram, Red Gram & Chilies',
      offeredPrice: 5440,
      escrowDeposit: '₹1,00,000 Maintained Escrow Balance',
      rating: '4.9/5 (310 Verified Deals)',
      transportProvided: true,
      transportDetails: {
        vehicleType: 'Ashok Leyland Dost Truck',
        driverName: 'P. Anji Reddy',
        driverPhone: '+91 93910 88231',
        vehicleNumber: 'AP 07 TJ 1124',
        estimatedCost: '₹2,100 (Adjusted at Mandi Gate)',
        etaToMandi: '1 hr 30 mins from farm gate'
      }
    }
  ];

  // Initiate booking from either Mandi tab or Merchants tab
  const handleInitiateLock = (cropObj: any, merchantObj: MerchantInfo) => {
    setSelectedCropRate(cropObj);
    setSelectedMerchant(merchantObj);
    setIncludeTransportBooking(merchantObj.transportProvided);
  };

  // Confirm booking & create Deal Slip
  const handleConfirmLockContract = () => {
    if (!selectedMerchant || !selectedCropRate) return;

    const lockedPrice = selectedMerchant.offeredPrice;
    const totalVal = lockedPrice * bookingQuantity;

    const newDeal: DealSlip = {
      contractId: `AGRI-DL-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      crop: selectedCropRate.crop,
      quantity: `${bookingQuantity} Quintals`,
      lockedPrice: lockedPrice,
      totalEstimatedValue: totalVal,
      farmerName: 'Chaitanya (Farmer Partner)',
      farmerPhone: '+91 98765 43210',
      merchantName: selectedMerchant.name,
      merchantFirm: selectedMerchant.firmName,
      merchantPhone: selectedMerchant.phone,
      merchantApmc: selectedMerchant.apmcLicense,
      mandiLocation: selectedMerchant.mandiLocation,
      lockExpiryTime: '6 Hours Transit Guarantee',
      advanceDeposit: '₹5,000 Advance Token in Escrow',
      includeTransport: includeTransportBooking,
      transportDetails: includeTransportBooking ? selectedMerchant.transportDetails : undefined,
      status: 'In Transit - Price Locked'
    };

    setActiveDeals([newDeal, ...activeDeals]);
    setSelectedMerchant(null);
    setSelectedCropRate(null);
    setViewingReceiptDeal(newDeal);
    setActiveTab('deals');
  };

  // Print Receipt handler
  const handlePrintReceipt = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToDashboard}
          </Link>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            {cur.badgeText}
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              {cur.bannerSubtitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {cur.bannerDesc}
            </p>
          </div>

          {/* Tab Navigation Pill */}
          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab('mandi')}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'mandi' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{cur.tabMandi}</span>
            </button>

            <button
              onClick={() => setActiveTab('merchants')}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'merchants' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{cur.tabMerchants}</span>
            </button>

            <button
              onClick={() => setActiveTab('deals')}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'deals' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{cur.tabContracts} ({activeDeals.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MANDI BENCHMARK PRICES */}
        {activeTab === 'mandi' && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">{cur.mandiHeader}</h2>
                <p className="text-xs text-slate-500">Live APMC modal rates with immediate 6-hour transit rate freeze.</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1 w-fit">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> 6-Hr Price Guarantee Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[11px]">
                    <th className="py-3 px-3">{cur.cropCol}</th>
                    <th className="py-3 px-3">{cur.mandiCol}</th>
                    <th className="py-3 px-3">{cur.modalCol}</th>
                    <th className="py-3 px-3">{cur.trendCol}</th>
                    <th className="py-3 px-3 text-right">{cur.actionCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {mandiRates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-3 font-bold text-slate-900 text-sm">{rate.crop}</td>
                      <td className="py-4 px-3 text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {rate.mandi}
                        </span>
                      </td>
                      <td className="py-4 px-3 font-black text-slate-900 text-sm">₹{rate.modalPrice} / Qtl</td>
                      <td className="py-4 px-3">
                        <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
                          rate.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {rate.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {rate.change}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-right">
                        <button
                          onClick={() => handleInitiateLock(rate, merchants[0])}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-700/20 transition inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{cur.lockDealBtn}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFIED MERCHANTS & TIED TRANSPORTATION FLEET */}
        {activeTab === 'merchants' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">{cur.merchantsHeader}</h2>
                <p className="text-xs text-slate-500">Merchants with deposited bank escrow collateral and dispatched pickup vehicles.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {merchants.map((merchant) => (
                <div 
                  key={merchant.id}
                  className="bg-white rounded-3xl p-6 border-2 border-emerald-100 hover:border-emerald-300 shadow-sm transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {merchant.apmcLicense}
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-1.5">{merchant.firmName}</h3>
                        <p className="text-xs text-slate-500 font-semibold">{merchant.name}</p>
                      </div>
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        {merchant.rating}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Yard Destination:</span>
                        <strong className="text-slate-800">{merchant.mandiLocation}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Commodities:</span>
                        <strong className="text-slate-800">{merchant.cropBought}</strong>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-slate-200">
                        <span>Offered Lock Rate:</span>
                        <span className="text-sm font-black">₹{merchant.offeredPrice} / Qtl</span>
                      </div>
                    </div>

                    {/* Tied Vehicle Transportation Details */}
                    {merchant.transportProvided && (
                      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1.5">
                        <span className="text-[10px] font-black uppercase text-emerald-900 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-emerald-700" />
                          {cur.availableTransport}
                        </span>
                        <p className="text-slate-800 font-bold">{merchant.transportDetails.vehicleType} ({merchant.transportDetails.vehicleNumber})</p>
                        <p className="text-slate-600 text-[11px]">
                          Driver: {merchant.transportDetails.driverName} • ETA: {merchant.transportDetails.etaToMandi}
                        </p>
                        <span className="text-[10px] text-emerald-800 font-semibold block">
                          Freight: {merchant.transportDetails.estimatedCost}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleInitiateLock(mandiRates[0], merchant)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{cur.lockDealBtn}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVE LOCKED DEALS & RECEIPTS */}
        {activeTab === 'deals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">{cur.dealsHeader}</h2>
                <p className="text-xs text-slate-500">Legal forward commitments protected by 6-hour time-lock and merchant bank collateral.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeDeals.map((deal) => (
                <div 
                  key={deal.contractId}
                  className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            {deal.contractId}
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                            {deal.status}
                          </span>
                        </div>
                        <h3 className="font-black text-lg text-slate-900 mt-2">{deal.crop} ({deal.quantity})</h3>
                        <p className="text-xs text-slate-600 font-medium">Buyer: {deal.merchantFirm} ({deal.merchantName})</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Locked Rate</span>
                        <span className="text-xl font-black text-emerald-700">₹{deal.lockedPrice} / Qtl</span>
                        <span className="text-[11px] text-slate-500 block font-semibold">Total: ₹{deal.totalEstimatedValue.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Guarantee Window:</span>
                        <strong className="text-emerald-700">{deal.lockExpiryTime}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Escrow Guarantee:</span>
                        <strong className="text-slate-800">{deal.advanceDeposit}</strong>
                      </div>
                      {deal.includeTransport && deal.transportDetails && (
                        <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                          <span>Assigned Transport:</span>
                          <strong className="text-slate-800">{deal.transportDetails.vehicleType} ({deal.transportDetails.vehicleNumber})</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => setViewingReceiptDeal(deal)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{cur.printReceiptBtn}</span>
                    </button>

                    <button
                      onClick={() => setViewingReceiptDeal(deal)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View APMC QR Slip</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: BOOKING & TRANSPORTATION CONFIRMATION */}
      {selectedMerchant && selectedCropRate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">{cur.bookingModalTitle}</h3>
              </div>
              <button 
                onClick={() => { setSelectedMerchant(null); setSelectedCropRate(null); }}
                className="p-1 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Crop:</span>
                  <strong className="text-slate-900">{selectedCropRate.crop}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Selected Merchant:</span>
                  <strong className="text-slate-900">{selectedMerchant.firmName} ({selectedMerchant.name})</strong>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Guaranteed Price Lock:</span>
                  <span className="text-sm font-black">₹{selectedMerchant.offeredPrice} / Quintal</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  {cur.enterQuantityLabel}
                </label>
                <input 
                  type="number"
                  min="5"
                  max="200"
                  value={bookingQuantity}
                  onChange={(e) => setBookingQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold outline-none focus:border-emerald-600"
                />
              </div>

              {/* Total guaranteed payout calculation */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex justify-between items-center">
                <span className="font-bold text-emerald-900">{cur.totalPayoutLabel}</span>
                <span className="text-base font-black text-emerald-800">
                  ₹{(selectedMerchant.offeredPrice * bookingQuantity).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Transport Checkbox */}
              {selectedMerchant.transportProvided && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={includeTransportBooking}
                      onChange={(e) => setIncludeTransportBooking(e.target.checked)}
                      className="mt-0.5 accent-emerald-600 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{cur.includeTransportCheckbox}</span>
                      <p className="text-[11px] text-slate-500">
                        Vehicle: {selectedMerchant.transportDetails.vehicleType} ({selectedMerchant.transportDetails.vehicleNumber}) • Driver: {selectedMerchant.transportDetails.driverName}
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => { setSelectedMerchant(null); setSelectedCropRate(null); }}
                className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLockContract}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-700/20 transition cursor-pointer"
              >
                {cur.confirmLockBtn}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL PRINTABLE / SAVABLE DEAL SLIP RECEIPT */}
      {viewingReceiptDeal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-emerald-100 space-y-5 my-8">
            
            {/* Modal Controls Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-sm text-slate-900">APMC Forward Contract Receipt</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print PDF</span>
                </button>
                <button
                  onClick={() => setViewingReceiptDeal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRINTABLE RECEIPT BODY */}
            <div ref={receiptPrintRef} className="space-y-5 text-xs text-slate-800 bg-white p-2">
              
              {/* Receipt Brand Banner */}
              <div className="flex justify-between items-start border-b-2 border-emerald-600 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black">
                      AL
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">AgriLock Trade Protocol</h2>
                      <p className="text-[10px] text-slate-500 font-semibold">{cur.receiptSubtitle}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-bold mt-2">
                    {cur.receiptTitle}
                  </p>
                </div>

                <div className="text-right">
                  <div className="w-16 h-16 bg-white border border-slate-300 rounded-xl p-1 flex items-center justify-center shadow-inner ml-auto">
                    <QrCode className="w-14 h-14 text-slate-900" />
                  </div>
                  <span className="font-mono font-bold text-emerald-800 block text-[11px] mt-1">
                    {viewingReceiptDeal.contractId}
                  </span>
                </div>
              </div>

              {/* Timestamp & Status */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{cur.timestampLabel}</span>
                  <span className="font-bold text-slate-900">{viewingReceiptDeal.timestamp}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Enforcement Guarantee:</span>
                  <span className="font-bold text-emerald-700">{viewingReceiptDeal.lockExpiryTime}</span>
                </div>
              </div>

              {/* Farmer and Merchant 2-Column Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-800 block">{cur.farmerDetailsLabel}</span>
                  <p className="font-bold text-slate-900 text-xs">{viewingReceiptDeal.farmerName}</p>
                  <p className="text-slate-600 text-[11px]">{viewingReceiptDeal.farmerPhone}</p>
                  <p className="text-slate-500 text-[10px]">Consignment Origin: Farm Gate, Telangana</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-800 block">{cur.merchantDetailsLabel}</span>
                  <p className="font-bold text-slate-900 text-xs">{viewingReceiptDeal.merchantFirm}</p>
                  <p className="text-slate-600 text-[11px]">Contact: {viewingReceiptDeal.merchantName} ({viewingReceiptDeal.merchantPhone})</p>
                  <p className="text-slate-500 text-[10px]">APMC Yard: {viewingReceiptDeal.mandiLocation}</p>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold block">{viewingReceiptDeal.merchantApmc}</span>
                </div>
              </div>

              {/* Trade Commodity Specs */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Agreed Commodity</th>
                      <th className="p-2.5">Weight / Lot Size</th>
                      <th className="p-2.5">Locked Unit Price</th>
                      <th className="p-2.5 text-right">Total Payable Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-bold">
                      <td className="p-2.5 text-slate-900">{viewingReceiptDeal.crop}</td>
                      <td className="p-2.5 text-slate-700">{viewingReceiptDeal.quantity}</td>
                      <td className="p-2.5 text-emerald-700">₹{viewingReceiptDeal.lockedPrice} / Quintal</td>
                      <td className="p-2.5 text-right text-emerald-800 text-sm font-black">
                        ₹{viewingReceiptDeal.totalEstimatedValue.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Transportation Waybill Section */}
              {viewingReceiptDeal.includeTransport && viewingReceiptDeal.transportDetails && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-emerald-900 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-700" />
                    {cur.transportHeader}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">{cur.vehicleNumLabel}</span>
                      <strong className="text-slate-900">{viewingReceiptDeal.transportDetails.vehicleNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">{cur.driverLabel}</span>
                      <strong className="text-slate-900">{viewingReceiptDeal.transportDetails.driverName} ({viewingReceiptDeal.transportDetails.driverPhone})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">{cur.costLabel}</span>
                      <strong className="text-emerald-800">{viewingReceiptDeal.transportDetails.estimatedCost}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Escrow Collateral Legal Text */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block uppercase">{cur.escrowSecurityTitle}</span>
                <p className="leading-relaxed">{cur.escrowSecurityDesc}</p>
                <div className="pt-1 flex justify-between font-bold text-slate-700">
                  <span>Merchant Collateral: {viewingReceiptDeal.advanceDeposit}</span>
                  <span className="text-emerald-700 font-mono">Verification Hash: SHA256-VERIFIED-APMC</span>
                </div>
              </div>

            </div>

            {/* Modal Bottom Close */}
            <div className="pt-2 border-t border-slate-100 flex justify-end print:hidden">
              <button
                onClick={() => setViewingReceiptDeal(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                {cur.closeBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}