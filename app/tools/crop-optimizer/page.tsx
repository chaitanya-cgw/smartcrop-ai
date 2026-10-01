'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  ArrowLeft, 
  ArrowRight, 
  Droplets, 
  Filter
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface CropOption {
  id: string;
  scientificName: string;
  category: 'Nitrogen-Fixer' | 'Low-Water Millet' | 'High-Value Cash' | 'Soil Detox / Green Manure';
  categoryKey: string;
  waterLevel: 'Very Low' | 'Moderate' | 'High';
  durationDays: string;
  expectedYield: string;
  estimatedReturn: string;
  marketStatusKey: string;
  soilCompatibility: string[];
}

export default function CropOptimizerPage() {
  const { t, lang } = useToolTranslation();

  const [soilType, setSoilType] = useState('red_loamy');
  const [previousCrop, setPreviousCrop] = useState('cotton');
  const [targetSeason, setTargetSeason] = useState('rabi');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Complete localized dictionary for this tool
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 1 of 6 • Scientific Agronomy Engine",
      bannerTitle: "Crop Rotation Optimizer",
      bannerSubtitle: "Multi-Season Agronomic Rotation & Soil Balancing",
      bannerDesc: "Select your current soil profile and harvested crop to calculate scientific successor varieties that rebuild soil organic carbon, fix biological nitrogen, and maximize market yield.",
      filterSectionTitle: "Field & Season Parameters",
      soilLabel: "Soil Classification",
      prevCropLabel: "Preceding Crop Harvested",
      seasonLabel: "Upcoming Sowing Cycle",
      filterBy: "Filter Category:",
      allFilters: "All Scientific Options",
      catNitrogen: "Nitrogen-Fixer",
      catMillet: "Low-Water Millet",
      catCash: "High-Value Cash",
      catGreenManure: "Soil Detox / Green Manure",
      recHeader: "Recommended Successor Crops",
      recSubheader: "Options Available for Selected Parameters",
      icarCertified: "ICAR Certified Rotations",
      npkLabel: "NPK Effect",
      waterLabel: "Water Demand",
      durationLabel: "Duration",
      lockPriceBtn: "Lock AgriLock Price",
      waterVeryLow: "Very Low",
      waterModerate: "Moderate",
      waterHigh: "High",

      // Soils
      soil_red_loamy: "Red Loamy (Chalka)",
      soil_black_cotton: "Black Cotton Soil (Regur)",
      soil_alluvial: "Alluvial River Soil",
      soil_sandy_clay: "Sandy Clay Loam",
      soil_sandy_loam: "Sandy Loam / Light Soils",
      soil_laterite: "Laterite Soil",
      soil_saline: "Saline & Alkaline Soils",
      soil_clay_loam: "Clay Loam / Heavy Soils",

      // Previous Crops
      crop_cotton: "Cotton (Heavy Depleting)",
      crop_paddy: "Paddy / Rice (Water & NPK Demanding)",
      crop_maize: "Maize / Corn (Nitrogen Exhaustive)",
      crop_sugarcane: "Sugarcane (Intensive Drain)",
      crop_chilies: "Chilies / Spices (Root-Rot Prone)",
      crop_groundnut: "Groundnut (Oil Residue)",
      crop_tomato: "Tomato / Vegetable Monoculture",
      crop_red_gram: "Red Gram / Pigeon Pea",

      // Seasons
      season_rabi: "Rabi 2026-27 (Winter Planting)",
      season_late_rabi: "Late Rabi / Post-Monsoon Catch",
      season_zaid: "Zaid / Summer 2027 (Low Water)",
      season_kharif: "Kharif 2027 (Early Monsoon)",

      // 8 Crops Details
      crop_soybean_name: "Soybean (JS-335 / Yellow)",
      crop_soybean_npk: "+38 kg/ha Bio-Nitrogen fixed",
      crop_soybean_market: "AgriLock 6-Hr Price Lock Eligible",
      crop_soybean_reason: "Breaks cotton root-rot cycles and replenishes soil micro-nutrients via symbiotic Rhizobium root nodules.",

      crop_chickpea_name: "Chickpea / Bengal Gram (Desi)",
      crop_chickpea_npk: "+32 kg/ha Nitrogen balance",
      crop_chickpea_market: "High Mandi Liquidity",
      crop_chickpea_reason: "Utilizes residual soil moisture after paddy/cotton harvest without requiring deep tube-well irrigation.",

      crop_bajra_name: "Pearl Millet / Bajra (Hybrid)",
      crop_bajra_npk: "Restores organic carbon & deep silica",
      crop_bajra_market: "Subsidized Input Scheme",
      crop_bajra_reason: "Deep root architecture aerates hard soil pans left by intensive tillage while enduring high heat.",

      crop_mustard_name: "Mustard / Rapeseed (Pusa Bold)",
      crop_mustard_npk: "Bio-fumigates soil against nematode pests",
      crop_mustard_market: "AgriLock Forward Contract Available",
      crop_mustard_reason: "Glucosinolate exudates act as natural bio-fumigants, suppressing fungal pathogens in depleted soils.",

      crop_moong_name: "Green Gram / Moong (IPM-205)",
      crop_moong_npk: "+42 kg/ha Nitrogen & rich humus",
      crop_moong_market: "High Commercial Demand",
      crop_moong_reason: "Short 60-day catch crop that enriches organic carbon before main kharif sowing.",

      crop_korra_name: "Foxtail Millet / Korra",
      crop_korra_npk: "Low fertilizer demand, balances salinity",
      crop_korra_market: "Millets Mission Support",
      crop_korra_reason: "High drought endurance; extracts residual phosphorous bound in alkaline or saline topsoil.",

      crop_sesame_name: "Sesame / Gingelly (White)",
      crop_sesame_npk: "Light feeder, conditions topsoil surface",
      crop_sesame_market: "Export & Oil Mill Buying Lock",
      crop_sesame_reason: "Requires minimal input capital while fetching premium prices in domestic oilseed processing hubs.",

      crop_sunhemp_name: "Sunhemp / Dhaincha (Green Manure)",
      crop_sunhemp_npk: "+80 to +110 kg/ha Bio-Mass Nitrogen",
      crop_sunhemp_market: "Soil Health Card Subsidy",
      crop_sunhemp_reason: "Ploughed into soil before flowering to dramatically elevate microbial activity and water retention."
    },
    te: {
      badgeText: "టూల్ 1 / 6 • శాస్త్రీయ వ్యవసాయ ప్రణాళిక",
      bannerTitle: "పంట మార్పిడి ఆప్టిమైజర్",
      bannerSubtitle: "బహుళ-సీజన్ల పంట మార్పిడి & నేల పోషకాల సమతుల్యత",
      bannerDesc: "మీ పొలం నేల స్వభావం మరియు మునుపటి పంట ఆధారంగా నేల సారాన్ని పెంచి, జీవ నత్రజనిని స్థిరీకరించి, మార్కెట్లో అధిక లాభాలు ఇచ్చే ఉత్తమ పంటలను ఎంచుకోండి.",
      filterSectionTitle: "నేల మరియు కాలం పారామితులు",
      soilLabel: "నేల వర్గీకరణ",
      prevCropLabel: "మునుపు సాగు చేసిన పంట",
      seasonLabel: "రాబోయే విత్తే కాలం",
      filterBy: "వర్గం ప్రకారం వడపోత:",
      allFilters: "అన్ని శాస్త్రీయ ఎంపికలు",
      catNitrogen: "నత్రజని స్థిరీకరణ పంటలు",
      catMillet: "తక్కువ నీటి చిరుధాన్యాలు",
      catCash: "అధిక లాభదాయక వాణిజ్య పంటలు",
      catGreenManure: "పచ్చిరొట్ట / నేల శుద్ధి ఎరువులు",
      recHeader: "సిఫార్సు చేయబడిన ప్రత్యామ్నాయ పంటలు",
      recSubheader: "ఎంచుకున్న నేల కోసం అందుబాటులో ఉన్న పంటలు",
      icarCertified: "ICAR ధృవీకరించిన పంట మార్పిడి విధానం",
      npkLabel: "NPK ప్రభావం",
      waterLabel: "నీటి అవసరం",
      durationLabel: "పంట కాలం",
      lockPriceBtn: "అగ్రిలాక్ ధరను లాక్ చేయండి",
      waterVeryLow: "చాలా తక్కువ",
      waterModerate: "మితమైన",
      waterHigh: "ఎక్కువ",

      soil_red_loamy: "ఎర్ర నేలలు / చల్కా నేలలు",
      soil_black_cotton: "నల్లరేగడి నేలలు (రేగర్)",
      soil_alluvial: "ఒండ్రు మట్టి నేలలు",
      soil_sandy_clay: "ఇసుక బంకమట్టి నేలలు",
      soil_sandy_loam: "తేలికపాటి ఇసుక నేలలు",
      soil_laterite: "ఎరుపు రంగు లేటరైట్ నేలలు",
      soil_saline: "చౌడు మరియు క్షార నేలలు",
      soil_clay_loam: "బరువైన బంకమట్టి నేలలు",

      crop_cotton: "పత్తి (పోషకాలను ఎక్కువగా హరించే పంట)",
      crop_paddy: "వరి (అధిక నీరు మరియు ఎరువులు అవసరం)",
      crop_maize: "మొక్కజొన్న (నత్రజనిని అధికంగా తీసుకునే పంట)",
      crop_sugarcane: "చెరకు (నేల సారాన్ని హరించే పంట)",
      crop_chilies: "మిరప (వేరు కుళ్ళు తెగులు వచ్చే అవకాశం)",
      crop_groundnut: "వేరుశనగ",
      crop_tomato: "టమోటా / కూరగాయల ఏక పంట",
      crop_red_gram: "కంది",

      season_rabi: "రబీ 2026-27 (శీతాకాలం విత్తడం)",
      season_late_rabi: "ఆలస్యపు రబీ / వర్షాకాలం తదుపరి",
      season_zaid: "ఎండకాలం / జైద్ 2027 (తక్కువ నీరు)",
      season_kharif: "ఖరీఫ్ 2027 (తొలకరి సీజన్)",

      crop_soybean_name: "సోయాబీన్ (JS-335 / పసుపు)",
      crop_soybean_npk: "+38 కిలోలు/హెక్టారుకు జీవ నత్రజని స్థిరీకరణ",
      crop_soybean_market: "అగ్రిలాక్ 6-గంటల ధర లాక్ అర్హత",
      crop_soybean_reason: "పత్తి తర్వాత వేరు కుళ్ళు తెగుళ్ళ చక్రాన్ని విచ్ఛిన్నం చేసి, రైజోబియం బుడిపెల ద్వారా నేలకు బలాన్నిస్తుంది.",

      crop_chickpea_name: "శనగలు / బెంగాల్ గ్రామ్ (దేశీ)",
      crop_chickpea_npk: "+32 కిలోలు/హెక్టారుకు నత్రజని బ్యాలెన్స్",
      crop_chickpea_market: "మండిలో అధిక డిమాండ్ & MSP",
      crop_chickpea_reason: "వరి లేదా పత్తి కోత తర్వాత నేలలోని తేమను ఉపయోగించుకుని తక్కువ నీటితో పండుతుంది.",

      crop_bajra_name: "సజ్జలు / బాజ్రా (హైబ్రిడ్)",
      crop_bajra_npk: "సేంద్రీయ కర్బనం మరియు సిలికా పెరుగుదల",
      crop_bajra_market: "సబ్సిడీ ఇన్పుట్ పథకం లభ్యం",
      crop_bajra_reason: "లోతైన వేరు వ్యవస్థ ద్వారా గట్టిపడిన నేలను గుల్లబారేలా చేసి నేల ఆరోగ్యాన్ని కాపాడుతుంది.",

      crop_mustard_name: "ఆవాలు / రాయ్ (పూసా బోల్డ్)",
      crop_mustard_npk: "నెమటోడ్ పురుగులను నివారించే సహజ గుణం",
      crop_mustard_market: "అగ్రిలాక్ ముందస్తు ఒప్పందం లభ్యం",
      crop_mustard_reason: "ఆవాల వేర్ల నుండి విడుదలయ్యే ద్రవాలు నేలలోని హానికర శిలీంధ్రాలను సహజంగా నిర్మూలిస్తాయి.",

      crop_moong_name: "పెసలు / ఆకుపచ్చ పెసర (IPM-205)",
      crop_moong_npk: "+42 కిలోలు/హెక్టారుకు నత్రజని & సారవంతమైన హ్యూమస్",
      crop_moong_market: "అధిక మార్కెట్ రేటు & డిమాండ్",
      crop_moong_reason: "కేవలం 60 రోజుల్లో చేతికొచ్చే స్వల్పకాలిక పంట; ప్రధాన ఖరీఫ్ పంటకు ముందు నేలకు బలాన్నిస్తుంది.",

      crop_korra_name: "కొర్రలు (సిరిధాన్యాలు)",
      crop_korra_npk: "తక్కువ ఎరువుల అవసరం, చౌడు నేలకు అనుకూలం",
      crop_korra_market: "మిల్లెట్స్ మిషన్ మద్దతు",
      crop_korra_reason: "అత్యధిక కరువును తట్టుకుంటుంది; క్షార నేలలోని భాస్వరాన్ని గ్రహించి పైరు ఎదిగేలా చేస్తుంది.",

      crop_sesame_name: "నువ్వులు (తెల్ల నువ్వులు)",
      crop_sesame_npk: "తేలికపాటి పంట, పైపొర మట్టి సంరక్షణ",
      crop_sesame_market: "నూనె మిల్లుల ప్రత్యక్ష కొనుగోలు",
      crop_sesame_reason: "తక్కువ పెట్టుబడితో నూనెగింజల మార్కెట్లో అత్యధిక క్వింటాల్ ధరను సంపాదించవచ్చు.",

      crop_sunhemp_name: "జీలుగు / జనపనార (పచ్చిరొట్ట ఎరువు)",
      crop_sunhemp_npk: "+80 నుండి +110 కిలోల సేంద్రీయ నత్రజని",
      crop_sunhemp_market: "సాయిల్ హెల్త్ కార్డ్ సబ్సిడీ",
      crop_sunhemp_reason: "పూత దశలో నేలలో కలియదున్నితే నేల నీటిని నిల్వ ఉంచే సామర్థ్యం, బ్యాక్టీరియా జీవం గణనీయంగా పెరుగుతాయి."
    },
    hi: {
      badgeText: "टूल 1 / 6 • वैज्ञानिक कृषि प्रणाली",
      bannerTitle: "फसल चक्र अनुकूलक (क्रॉप रोटेशन)",
      bannerSubtitle: "बहु-मौसमी वैज्ञानिक फसल चक्र और मृदा संतुलन",
      bannerDesc: "अपनी मिट्टी और पिछली कटी हुई फसल का चयन करें ताकि मिट्टी में जैविक कार्बन और नाइट्रोजन की भरपाई करने वाली उत्तम फसलों की योजना बनाई जा सके।",
      filterSectionTitle: "खेत और मौसम पैरामीटर",
      soilLabel: "मिट्टी का प्रकार",
      prevCropLabel: "पिछली काटी गई फसल",
      seasonLabel: "आगामी बुवाई का चक्र",
      filterBy: "श्रेणी अनुसार फ़िल्टर:",
      allFilters: "सभी वैज्ञानिक विकल्प",
      catNitrogen: "नाइट्रोजन फिक्सिंग दलहन",
      catMillet: "कम पानी वाले मोटे अनाज (मिलेट्स)",
      catCash: "उच्च लाभकारी नकदी फसलें",
      catGreenManure: "हरी खाद / मृदा सुधारक",
      recHeader: "अनुशंसित फसल विकल्प",
      recSubheader: "चयनित परिस्थितियों के लिए उपलब्ध फसलें",
      icarCertified: "ICAR प्रमाणित फसल चक्र",
      npkLabel: "NPK प्रभाव",
      waterLabel: "जल आवश्यकता",
      durationLabel: "फसल अवधि",
      lockPriceBtn: "एग्रीलॉक मूल्य लॉक करें",
      waterVeryLow: "बहुत कम",
      waterModerate: "मध्यम",
      waterHigh: "अधिक",

      soil_red_loamy: "लाल दोमट मिट्टी (चालका)",
      soil_black_cotton: "काली कपास मिट्टी (रेगुर)",
      soil_alluvial: "जलोढ़ नदी मिट्टी",
      soil_sandy_clay: "बलुई चिकनी दोमट मिट्टी",
      soil_sandy_loam: "बलुई दोमट / हल्की मिट्टी",
      soil_laterite: "लैटेराइट मिट्टी",
      soil_saline: "लवणीय एवं क्षारीय मिट्टी",
      soil_clay_loam: "भारी चिकनी दोमट मिट्टी",

      crop_cotton: "कपास (मिट्टी का पोषण अत्यधिक सोखने वाली)",
      crop_paddy: "धान / चावल (अधिक पानी एवं खाद की मांग)",
      crop_maize: "मक्का (नाइट्रोजन शोषक)",
      crop_sugarcane: "गन्ना (गहन पोषक तत्व दोहन)",
      crop_chilies: "मिर्च (जड़ सड़न रोग संभावित)",
      crop_groundnut: "मूंगफली",
      crop_tomato: "टमाटर / सब्जी एकल-फसल",
      crop_red_gram: "अरहर / तुअर",

      season_rabi: "रबी 2026-27 (सर्दियों की बुवाई)",
      season_late_rabi: "उत्तर-रबी / वर्षा उपरांत",
      season_zaid: "जायद / ग्रीष्मकालीन 2027 (कम पानी)",
      season_kharif: "खरीफ 2027 (शुरुआती मानसून)",

      crop_soybean_name: "सोयाबीन (JS-335 / पीला)",
      crop_soybean_npk: "+38 किग्रा/हेक्टेयर जैविक नाइट्रोजन",
      crop_soybean_market: "एग्रीलॉक 6-घंटे मूल्य लॉक पात्र",
      crop_soybean_reason: "कपास की जड़ सड़न बीमारी को तोड़ता है और राइजोबियम ग्रंथियों से मिट्टी को उपजाऊ बनाता है।",

      crop_chickpea_name: "चना / देशी चना (बंगाल ग्राम)",
      crop_chickpea_npk: "+32 किग्रा/हेक्टेयर नाइट्रोजन संतुलन",
      crop_chickpea_market: "मंडी में उच्च मांग एवं एमएसपी",
      crop_chickpea_reason: "धान अथवा कपास के बाद बची हुई नमी में बिना भारी सिंचाई के उत्कृष्ट पैदावार देता है।",

      crop_bajra_name: "बाजरा (संकर बाजरा)",
      crop_bajra_npk: "जैविक कार्बन और सिलिका की बहाली",
      crop_bajra_market: "सब्सिडी बीज योजना उपलब्ध",
      crop_bajra_reason: "गहरी जड़ों द्वारा कठोर मिट्टी को भुरभुरा बनाकर उच्च तापमान में भी टिका रहता है।",

      crop_mustard_name: "सरसों / राई (पूसा बोल्ड)",
      crop_mustard_npk: "निमाटोड एवं कीड़ों से प्राकृतिक सुरक्षा",
      crop_mustard_market: "एग्रीलॉक अग्रिम अनुबंध उपलब्ध",
      crop_mustard_reason: "ग्लूकोसिनोलेट्स स्राव फफूंदनाशक का कार्य करते हैं और मिट्टी को संक्रमण से मुक्त करते हैं।",

      crop_moong_name: "मूंग (IPM-205)",
      crop_moong_npk: "+42 किग्रा/हेक्टेयर नाइट्रोजन एवं ह्यूमस",
      crop_moong_market: "उच्च वाणिज्यिक बाजार भाव",
      crop_moong_reason: "मात्र 60 दिनों की अल्पकालिक फसल, जो मुख्य खरीफ बुवाई से पहले खेत को समृद्ध बनाती है।",

      crop_korra_name: "कंगनी / कोरा (मिलेट्स)",
      crop_korra_npk: "कम खाद की जरूरत, क्षारीयता संतुलन",
      crop_korra_market: "मिलेट्स मिशन प्रोत्साहन",
      crop_korra_reason: "सूखा सहन करने की अद्भुत क्षमता; क्षारीय मिट्टी में दबे फास्फोरस का उपयोग करता है।",

      crop_sesame_name: "तिल (सफेद तिल)",
      crop_sesame_npk: "कम पोषक तत्व खपत, ऊपरी मिट्टी सुधार",
      crop_sesame_market: "तेल मिलों द्वारा प्रीमियम खरीद",
      crop_sesame_reason: "कम लागत में तिलहन बाजारों में सर्वाधिक प्रति क्विंटल लाभ प्रदान करता है।",

      crop_sunhemp_name: "सनई / ढैंचा (हरी खाद)",
      crop_sunhemp_npk: "+80 से +110 किग्रा/हेक्टेयर बायोमास नाइट्रोजन",
      crop_sunhemp_market: "मृदा स्वास्थ्य कार्ड सहायता",
      crop_sunhemp_reason: "फूल आने से पूर्व जुताई कर मिट्टी में मिलाने से मिट्टी की जल धारण क्षमता 25% बढ़ जाती है।"
    },
    ta: {
      badgeText: "கருவி 1 / 6 • அறிவியல் வேளாண் திட்டம்",
      bannerTitle: "பயிர் சுழற்சி அமைப்பாளர்",
      bannerSubtitle: "பருவ கால பயிர் சுழற்சி மற்றும் மண் சத்து சமநிலை",
      bannerDesc: "உங்கள் நிலத்தின் மண் வகை மற்றும் முந்தைய பயிரைத் தேர்ந்தெடுத்து, மண்ணின் இயற்கை சத்துக்களை மீட்டெடுத்து அதிக லாபம் தரும் சிறந்த பயிர்களைத் தேர்வு செய்யுங்கள்.",
      filterSectionTitle: "நிலம் மற்றும் பருவ அளவுருக்கள்",
      soilLabel: "மண் வகைப்பாடு",
      prevCropLabel: "முன்னதாக அறுவடை செய்யப்பட்ட பயிர்",
      seasonLabel: "வரவிருக்கும் விதைப்பு பருவம்",
      filterBy: "வகைப்படி வடிகட்டுக:",
      allFilters: "அனைத்து அறிவியல் தேர்வுகள்",
      catNitrogen: "நைட்ரஜன் நிலைநிறுத்தும் பயிர்கள்",
      catMillet: "குறைந்த நீர் சிறுதானியங்கள்",
      catCash: "அதிக லாப வர்த்தகப் பயிர்கள்",
      catGreenManure: "பசுந்தாள் உரம் / மண் சீரமைப்பு",
      recHeader: "பரிந்துரைக்கப்பட்ட பயிர் தேர்வுகள்",
      recSubheader: "தேர்ந்தெடுக்கப்பட்ட நிலத்திற்கான பயிர்கள்",
      icarCertified: "ICAR சான்றளிக்கப்பட்ட சுழற்சி முறை",
      npkLabel: "NPK தாக்கம்",
      waterLabel: "நீர் தேவை",
      durationLabel: "பயிர் காலம்",
      lockPriceBtn: "அக்ரிலாக் விலையை பூட்டுக",
      waterVeryLow: "மிகக் குறைவு",
      waterModerate: "மிதமான",
      waterHigh: "அதிகம்",

      soil_red_loamy: "செம்மண் நிலங்கள்",
      soil_black_cotton: "கரிசல் மண் நிலங்கள்",
      soil_alluvial: "வண்டல் மண்",
      soil_sandy_clay: "மணல் களிமண்",
      soil_sandy_loam: "மணல் கலந்த செம்மண்",
      soil_laterite: "செம்புறை மண் (லேட்டரைட்)",
      soil_saline: "உவர் மற்றும் கார மண்",
      soil_clay_loam: "களிமண் நிலங்கள்",

      crop_cotton: "பருத்தி (சத்துக்களை அதிகம் உறிஞ்சும் பயிர்)",
      crop_paddy: "நெல் (அதிக நீர் மற்றும் உரம் தேவை)",
      crop_maize: "மக்காச்சோளம் (நைட்ரஜன் உறிஞ்சி)",
      crop_sugarcane: "கரும்பு (அதிக சத்து வடிகால்)",
      crop_chilies: "மிளகாய் (வேர் அழுகல் வாய்ப்பு)",
      crop_groundnut: "வேர்க்கடலை",
      crop_tomato: "தக்காளி / காய்கறி ஒற்றைப்பயிர்",
      crop_red_gram: "துவரை",

      season_rabi: "ரபி 2026-27 (குளிர்கால விதைப்பு)",
      season_late_rabi: "பிற்பகுதி ரபி பருவம்",
      season_zaid: "கோடைக்காலம் / சையத் 2027",
      season_kharif: "காரீப் 2027 (பருவமழை தொடக்கம்)",

      crop_soybean_name: "சோயாபீன் (JS-335)",
      crop_soybean_npk: "+38 கிலோ/ஹெக் இயற்கை நைட்ரஜன்",
      crop_soybean_market: "அக்ரிலாக் 6 மணி நேர விலை பாதுகாப்பு",
      crop_soybean_reason: "பருத்திக்கு பின் வரும் வேர் நோய்களைத் தடுத்து, வேர் முடிச்சுகள் மூலம் மண்ணிற்கு இயற்கை உரம் அளிக்கிறது.",

      crop_chickpea_name: "கொண்டைக்கடலை / பொட்டுக் கடலை",
      crop_chickpea_npk: "+32 கிலோ/ஹெக் நைட்ரஜன் இருப்பு",
      crop_chickpea_market: "சந்தையில் அதிக தேவை மற்றும் MSP",
      crop_chickpea_reason: "நெல் அல்லது பருத்திக்கு பின் நிலத்தில் உள்ள ஈரப்பதத்தை பயன்படுத்தி குறைந்த நீரில் விளைகிறது.",

      crop_bajra_name: "கம்பு (வீரிய ஒட்டு கம்பு)",
      crop_bajra_npk: "கரிம கரிமச்சத்து மற்றும் சிலிக்கா மீட்பு",
      crop_bajra_market: "அரசு மானிய விதை திட்டம்",
      crop_bajra_reason: "ஆழமான வேர்கள் மூலம் கடினமான நிலத்தை தளர்த்தி அதிக வெப்பத்திலும் நிலைத்து வளர்கிறது.",

      crop_mustard_name: "கடுகு / ராய் (பூசா போல்ட்)",
      crop_mustard_npk: "நூற்புழுக்களை அழிக்கும் இயற்கை குணம்",
      crop_mustard_market: "அக்ரிலாக் முன்கூட்டிய ஒப்பந்தம்",
      crop_mustard_reason: "கடுகின் வேர் சுரப்புகள் மண்ணில் உள்ள தீங்கு விளைவிக்கும் பூஞ்சைகளை அழிக்கின்றன.",

      crop_moong_name: "பாசிப்பயறு (IPM-205)",
      crop_moong_npk: "+42 கிலோ/ஹெக் நைட்ரஜன் மற்றும் மட்கிய உரம்",
      crop_moong_market: "அதிக வணிக மதிப்பு",
      crop_moong_reason: "வெறும் 60 நாட்களில் அறுவடைக்கு வரும் குறுகிய கால பயிர்; பிரதான காரீப் பயிருக்கு முன் நிலத்தை வளப்படுத்துகிறது.",

      crop_korra_name: "திணை (சிறு தானியம்)",
      crop_korra_npk: "குறைந்த உரம் தேவை, காரத்தன்மை சமநிலை",
      crop_korra_market: "சிறுதானிய இயக்க ஆதரவு",
      crop_korra_reason: "வறட்சியைத் தாங்கும் ஆற்றல்; கார நிலத்தில் உள்ள சத்துக்களை எளிதாகப் பிரித்து உறிஞ்சுகிறது.",

      crop_sesame_name: "எள் (வெள்ளை எள்)",
      crop_sesame_npk: "குறைந்த சத்து நுகர்வு, மேல்மண் பாதுகாப்பு",
      crop_sesame_market: "எண்ணெய் ஆலைகளின் நேரடி கொள்முதல்",
      crop_sesame_reason: "குறைந்த முதலீட்டில் எண்ணெய் வித்து சந்தைகளில் அதிக குவிண்டால் விலை பெற்றுத்தருகிறது.",

      crop_sunhemp_name: "சணப்பை / தக்கைப்பூண்டு (பசுந்தாள் உரம்)",
      crop_sunhemp_npk: "+80 முதல் +110 கிலோ இயற்கை நைட்ரஜன்",
      crop_sunhemp_market: "மண் வள அட்டை மானியம்",
      crop_sunhemp_reason: "பூக்கும் முன் மடக்கி உழுதால் மண்ணின் நுண்ணுயிர் பெருக்கம் மற்றும் நீர் தேக்கும் திறன் 25% அதிகரிக்கிறது."
    }
  };

  const cur = dict[lang] || dict.en;

  const allCrops: CropOption[] = [
    {
      id: 'soybean',
      scientificName: 'Glycine max',
      category: 'Nitrogen-Fixer',
      categoryKey: cur.catNitrogen,
      waterLevel: 'Moderate',
      durationDays: '90-105 Days',
      expectedYield: '22-26 Qtl/Ha',
      estimatedReturn: '₹5,050 / Qtl',
      marketStatusKey: cur.crop_soybean_market,
      soilCompatibility: ['red_loamy', 'black_cotton', 'alluvial']
    },
    {
      id: 'chickpea',
      scientificName: 'Cicer arietinum',
      category: 'Nitrogen-Fixer',
      categoryKey: cur.catNitrogen,
      waterLevel: 'Very Low',
      durationDays: '100-115 Days',
      expectedYield: '18-22 Qtl/Ha',
      estimatedReturn: '₹5,440 / Qtl',
      marketStatusKey: cur.crop_chickpea_market,
      soilCompatibility: ['black_cotton', 'clay_loam', 'red_loamy']
    },
    {
      id: 'bajra',
      scientificName: 'Pennisetum glaucum',
      category: 'Low-Water Millet',
      categoryKey: cur.catMillet,
      waterLevel: 'Very Low',
      durationDays: '75-85 Days',
      expectedYield: '28-34 Qtl/Ha',
      estimatedReturn: '₹2,625 / Qtl',
      marketStatusKey: cur.crop_bajra_market,
      soilCompatibility: ['sandy_loam', 'red_loamy', 'laterite']
    },
    {
      id: 'mustard',
      scientificName: 'Brassica juncea',
      category: 'High-Value Cash',
      categoryKey: cur.catCash,
      waterLevel: 'Very Low',
      durationDays: '110-120 Days',
      expectedYield: '16-20 Qtl/Ha',
      estimatedReturn: '₹5,950 / Qtl',
      marketStatusKey: cur.crop_mustard_market,
      soilCompatibility: ['alluvial', 'sandy_clay', 'clay_loam']
    },
    {
      id: 'moong',
      scientificName: 'Vigna radiata',
      category: 'Nitrogen-Fixer',
      categoryKey: cur.catNitrogen,
      waterLevel: 'Moderate',
      durationDays: '60-70 Days',
      expectedYield: '12-15 Qtl/Ha',
      estimatedReturn: '₹8,550 / Qtl',
      marketStatusKey: cur.crop_moong_market,
      soilCompatibility: ['red_loamy', 'black_cotton', 'sandy_loam']
    },
    {
      id: 'korra',
      scientificName: 'Setaria italica',
      category: 'Low-Water Millet',
      categoryKey: cur.catMillet,
      waterLevel: 'Very Low',
      durationDays: '70-80 Days',
      expectedYield: '15-18 Qtl/Ha',
      estimatedReturn: '₹3,800 / Qtl',
      marketStatusKey: cur.crop_korra_market,
      soilCompatibility: ['saline', 'sandy_loam', 'red_loamy']
    },
    {
      id: 'sesame',
      scientificName: 'Sesamum indicum',
      category: 'High-Value Cash',
      categoryKey: cur.catCash,
      waterLevel: 'Very Low',
      durationDays: '85-90 Days',
      expectedYield: '8-10 Qtl/Ha',
      estimatedReturn: '₹8,200 / Qtl',
      marketStatusKey: cur.crop_sesame_market,
      soilCompatibility: ['sandy_clay', 'red_loamy', 'laterite']
    },
    {
      id: 'sunhemp',
      scientificName: 'Crotalaria juncea',
      category: 'Soil Detox / Green Manure',
      categoryKey: cur.catGreenManure,
      waterLevel: 'Moderate',
      durationDays: '45-50 Days',
      expectedYield: '15-20 T/Ha',
      estimatedReturn: '+25% Bio Yield',
      marketStatusKey: cur.crop_sunhemp_market,
      soilCompatibility: ['alluvial', 'black_cotton', 'red_loamy', 'saline']
    }
  ];

  const filteredCrops = allCrops.filter(c => {
    if (selectedFilter !== 'All' && c.category !== selectedFilter) return false;
    return true;
  });

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
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold mb-2">
            <Sprout className="w-4 h-4" />
            {cur.bannerSubtitle}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            {cur.bannerDesc}
          </p>
        </div>

        {/* Parameter Inputs */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            {cur.filterSectionTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {cur.soilLabel}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold outline-none focus:border-emerald-600"
              >
                <option value="red_loamy">{cur.soil_red_loamy}</option>
                <option value="black_cotton">{cur.soil_black_cotton}</option>
                <option value="alluvial">{cur.soil_alluvial}</option>
                <option value="sandy_clay">{cur.soil_sandy_clay}</option>
                <option value="sandy_loam">{cur.soil_sandy_loam}</option>
                <option value="laterite">{cur.soil_laterite}</option>
                <option value="saline">{cur.soil_saline}</option>
                <option value="clay_loam">{cur.soil_clay_loam}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {cur.prevCropLabel}
              </label>
              <select
                value={previousCrop}
                onChange={(e) => setPreviousCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold outline-none focus:border-emerald-600"
              >
                <option value="cotton">{cur.crop_cotton}</option>
                <option value="paddy">{cur.crop_paddy}</option>
                <option value="maize">{cur.crop_maize}</option>
                <option value="sugarcane">{cur.crop_sugarcane}</option>
                <option value="chilies">{cur.crop_chilies}</option>
                <option value="groundnut">{cur.crop_groundnut}</option>
                <option value="tomato">{cur.crop_tomato}</option>
                <option value="red_gram">{cur.crop_red_gram}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {cur.seasonLabel}
              </label>
              <select
                value={targetSeason}
                onChange={(e) => setTargetSeason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold outline-none focus:border-emerald-600"
              >
                <option value="rabi">{cur.season_rabi}</option>
                <option value="late_rabi">{cur.season_late_rabi}</option>
                <option value="zaid">{cur.season_zaid}</option>
                <option value="kharif">{cur.season_kharif}</option>
              </select>
            </div>
          </div>

          {/* Filter Category Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 mr-2">{cur.filterBy}</span>
            <button
              onClick={() => setSelectedFilter('All')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedFilter === 'All' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cur.allFilters}
            </button>
            <button
              onClick={() => setSelectedFilter('Nitrogen-Fixer')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedFilter === 'Nitrogen-Fixer' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cur.catNitrogen}
            </button>
            <button
              onClick={() => setSelectedFilter('Low-Water Millet')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedFilter === 'Low-Water Millet' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cur.catMillet}
            </button>
            <button
              onClick={() => setSelectedFilter('High-Value Cash')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedFilter === 'High-Value Cash' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cur.catCash}
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {cur.recHeader} ({filteredCrops.length} {cur.recSubheader})
              </h3>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {cur.icarCertified}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCrops.map((cropItem) => {
              const nameKey = `crop_${cropItem.id}_name`;
              const npkKey = `crop_${cropItem.id}_npk`;
              const reasonKey = `crop_${cropItem.id}_reason`;

              return (
                <div 
                  key={cropItem.id} 
                  className="bg-white rounded-3xl p-6 border-2 border-emerald-100 hover:border-emerald-300 shadow-sm transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">
                            {cropItem.categoryKey}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono italic">
                            {cropItem.scientificName}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mt-1">
                          {cur[nameKey] || cropItem.id}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 block">
                          {cropItem.estimatedReturn}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                          {cropItem.expectedYield}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">{cur.npkLabel}</span>
                        <span className="font-bold text-emerald-800">{cur[npkKey]}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">{cur.waterLabel}</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-cyan-600" />
                          {cropItem.waterLevel === 'Very Low' ? cur.waterVeryLow : cropItem.waterLevel === 'Moderate' ? cur.waterModerate : cur.waterHigh}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">{cur.durationLabel}</span>
                        <span className="font-bold text-slate-800">{cropItem.durationDays}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cur[reasonKey]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
                      {cropItem.marketStatusKey}
                    </span>
                    <Link
                      href="/tools/market-prices"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>{cur.lockPriceBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}