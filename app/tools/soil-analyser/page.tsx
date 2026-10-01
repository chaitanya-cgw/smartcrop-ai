'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  ArrowLeft, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  Wrench, 
  ShoppingCart, 
  ExternalLink, 
  Building2,
  Send,
  ChevronRight,
  Check,
  MapPin
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface DistrictInfo {
  name: string;
}

interface StateData {
  districts: string[];
  labName: string;
  labAddress: string;
}

export default function SoilAnalyserPage() {
  const { t, lang } = useToolTranslation();

  // Full Dictionary for Soil Analyser across EN, TE, HI, TA
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 3 of 6 • Soil Fitness & Lab Logistics",
      bannerTitle: "Soil Chemistry & Postal Sampling Hub",
      bannerSubtitle: "Soil Health Verification & Laboratory Dispatch",
      bannerDesc: "Calibrate soil metrics to verify agricultural fitness. If soil conditions are degraded, access full restorative procedures with direct e-commerce product links, or generate an India Post laboratory courier docket.",
      
      // Sliders & Metrics
      metricsHeader: "Soil Chemistry Metrics",
      liveCalibration: "Live Calibration",
      phLabel: "Soil pH Level",
      phAcidic: "Acidic (< 5.8)",
      phOptimal: "Optimal (6.0 - 7.8)",
      phAlkaline: "Alkaline (> 8.0)",
      ocLabel: "Organic Carbon (OC %)",
      ocCritical: "Critical (< 0.40%)",
      ocHealthy: "Healthy (> 0.75%)",
      ecLabel: "Electrical Conductivity (EC / Salinity)",
      ecNormal: "Normal (< 1.5)",
      ecSaline: "Saline (> 2.0 dS/m)",

      // Fitness Conditions
      landFitTitle: "Land is 100% Fit for Cultivation",
      landFitSubtitle: "Balanced soil chemistry. Optimal for kharif and rabi sowing.",
      phStatusFit: "Within balanced nutrient uptake range",
      ocStatusFit: "Adequate microbial humus food reserve",
      ecStatusFit: "Safe osmotic root hair moisture absorption",
      proceedMarketBtn: "Proceed to AgriLock Forward Trading",

      landUnfitTitle: "Land is Unfit for Agriculture",
      landUnfitSubtitle: "Soil chemistry prevents standard root uptake and seed germination.",
      defectsTitle: "Identified Critical Soil Defects:",
      fixLandBtn: "Fix Land & View Restoration Protocol",

      // Dynamic Defect Explanations
      defectAcidic: "Severe Soil Acidity: Excess aluminum/iron locks phosphorus availability.",
      defectAlkaline: "High Sodicity / Alkalinity: Induces severe micronutrient and zinc chlorosis.",
      defectLowOC: "Critically Low Organic Carbon: Soil microbiome lacks biological humus reserves.",
      defectSaline: "Elevated Salinity: Osmotic pressure burns root hairs and arrests germination.",

      // Courier & Logistics
      dispatchHeader: "Postal Soil Sample Dispatch Booking",
      dispatchSubtitle: "Route physical soil samples to accredited state ICAR laboratories via rural postal collection.",
      partnerBadge: "SpeedPost Partner",
      selectStateLabel: "Select State",
      selectDistrictLabel: "District / Mandi Zone",
      villageLabel: "Village / Farm Location",
      pincodeLabel: "Postal PIN Code",
      assignedLabLabel: "Assigned Testing Destination:",
      generateDocketBtn: "Generate India Post Dispatch Docket",
      docketReadyBadge: "SpeedPost Token Active",
      docketOrigin: "Pickup Origin:",
      docketInstructions: "Print docket barcode or hand physical soil sample pouch (500g) to your Gram Panchayat Postal Agent.",

      // Modal
      modalTitle: "Land Soil Restoration Protocol",
      modalSubtitle: "Chemical balance corrective steps with direct vendor purchase links",
      protocolStepsTitle: "Step-by-Step Restoration Procedure",
      step1Title: "Chemical Neutralization",
      step1Desc: "Apply Agricultural Lime (if pH < 5.8) or Agricultural Gypsum (if pH > 8.0) 2 weeks before sowing.",
      step2Title: "Humus & Biomass Rebuild",
      step2Desc: "Incorporate 2 tonnes of enriched vermicompost per acre to elevate organic carbon above 0.75%.",
      step3Title: "Leaching & Drainage",
      step3Desc: "Flood irrigate once to leach out displaced sodium salts through deep trench channels.",
      productsHeader: "Approved Soil Amelioration Inputs",
      instantOrderBadge: "Instant Order Links",
      certifiedFootnote: "All products conform to FCO & ICAR agricultural amelioration standards.",
      closeModalBtn: "Close Protocol",

      // Products
      prod1Name: "Agricultural Dolomite / Slaked Lime (CaCO3 90%)",
      prod1Purpose: "Corrects acidic pH below 6.0, neutralizes aluminum toxicity.",
      prod1Dosage: "Dosage: 250 - 350 kg per Acre",

      prod2Name: "Agricultural Gypsum (Calcium Sulfate Dihydrate)",
      prod2Purpose: "Displaces excess sodium in alkaline soils (pH > 8.0) and softens hardpan.",
      prod2Dosage: "Dosage: 400 - 500 kg per Acre",

      prod3Name: "Enriched Vermicompost + Humic Acid 98%",
      prod3Purpose: "Rebuilds depleted organic carbon percentage above 0.75% threshold.",
      prod3Dosage: "Dosage: 1.5 - 2 Tonnes Vermicompost / Acre + 1 kg Humic Acid"
    },
    te: {
      badgeText: "టూల్ 3 / 6 • నేల సారం & ల్యాబ్ రవాణా",
      bannerTitle: "నేల రసాయన పరీక్ష & పోస్టల్ శాంప్లింగ్ హబ్",
      bannerSubtitle: "నేల ఆరోగ్య నిర్ధారణ & ప్రభుత్వ ల్యాబ్ కొరియర్",
      bannerDesc: "మీ భూమి వ్యవసాయానికి అనుకూలమో కాదో తక్షణమే తెలుసుకోండి. సమస్యలు ఉన్నచో పునరుద్ధరణ పద్ధతులు, మందుల కొనుగోలు లింకులు మరియు పోస్టల్ ల్యాబ్ కొరియర్ రసీదు పొందండి.",

      metricsHeader: "నేల రసాయన కొలతలు",
      liveCalibration: "ప్రత్యక్ష కొలత",
      phLabel: "నేల pH విలువ",
      phAcidic: "ఆమ్ల నేల (< 5.8)",
      phOptimal: "అనుకూల నేల (6.0 - 7.8)",
      phAlkaline: "క్షార నేల (> 8.0)",
      ocLabel: "సేంద్రీయ కర్బనం (OC %)",
      ocCritical: "ప్రమాదకరం (< 0.40%)",
      ocHealthy: "ఆరోగ్యకరం (> 0.75%)",
      ecLabel: "విద్యుత్ వాహకత (చౌడు / లవణ సాంద్రత)",
      ecNormal: "సాధారణం (< 1.5)",
      ecSaline: "చౌడు నేల (> 2.0 dS/m)",

      landFitTitle: "భూమి వ్యవసాయానికి 100% అనుకూలంగా ఉంది",
      landFitSubtitle: "రసాయన సమతుల్యత ఉత్తమంగా ఉంది. ఖరీఫ్ మరియు రబీ విత్తడానికి అత్యంత అనుకూలం.",
      phStatusFit: "పోషకాలను సులభంగా గ్రహించే సరైన pH సమతుల్యత",
      ocStatusFit: "సూక్ష్మజీవుల మనుగడకు తగినంత సేంద్రీయ కర్బనం లభ్యం",
      ecStatusFit: "వేర్లు నీటిని పీల్చుకోవడానికి అనుకూలమైన లవణ సాంద్రత",
      proceedMarketBtn: "అగ్రిలాక్ ముందస్తు వ్యాపారానికి వెళ్లండి",

      landUnfitTitle: "భూమి వ్యవసాయానికి అనుకూలంగా లేదు",
      landUnfitSubtitle: "నేల రసాయన లోపాల వలన విత్తనాలు మొలకెత్తవు మరియు పంట దిగుబడి రాదు.",
      defectsTitle: "గుర్తించిన తీవ్రమైన నేల లోపాలు:",
      fixLandBtn: "భూమిని బాగుచేయండి & నివారణ పద్ధతులు చూడండి",

      defectAcidic: "తీవ్రమైన ఆమ్ల నేల: అల్యూమినియం విషపూరితమై భాస్వరం మొక్కకు అందకుండా పోతుంది.",
      defectAlkaline: "తీవ్రమైన క్షార / చౌడు నేల: సూక్ష్మపోషకాలు మరియు జింక్ లోపంతో పైరు పసుపుపచ్చగా మారుతుంది.",
      defectLowOC: "సేంద్రీయ కర్బనం అత్యంత తక్కువ: నేలలో బ్యాక్టీరియా మరియు హ్యూమస్ జీవం నశించింది.",
      defectSaline: "అధిక ఉప్పు / లవణాలు: వేర్లను కాల్చివేసి విత్తన అంకురోత్పత్తిని నిలిపివేస్తుంది.",

      dispatchHeader: "పోస్టల్ సాయిల్ శాంపిల్ బుకింగ్",
      dispatchSubtitle: "మీ ఊరి పోస్ట్ ఆఫీస్ ద్వారా నేరుగా ICAR గుర్తింపు పొందిన వ్యవసాయ ల్యాబ్‌కు శాంపిల్ పంపండి.",
      partnerBadge: "స్పీడ్‌పోస్ట్ భాగస్వామి",
      selectStateLabel: "రాష్ట్రాన్ని ఎంచుకోండి",
      selectDistrictLabel: "జిల్లా / వ్యవసాయ మండలం",
      villageLabel: "గ్రామం / పొలం చిరునామా",
      pincodeLabel: "పోస్టల్ పిన్ కోడ్",
      assignedLabLabel: "కేటాయించిన పరిశోధనా ల్యాబ్:",
      generateDocketBtn: "ఇండియా పోస్ట్ డిస్పాచ్ స్లిప్ రూపొందించండి",
      docketReadyBadge: "స్పీడ్‌పోస్ట్ టోకెన్ సిద్ధం",
      docketOrigin: "సేకరణ ప్రాంతం:",
      docketInstructions: "ఈ బార్‌కోడ్ రసీదుతో పాటు 500 గ్రాముల మట్టి సంచిని మీ గ్రామ పోస్టల్ ఏజెంట్‌కు అందజేయండి.",

      modalTitle: "నేల పునరుద్ధరణ మరియు బాగుచేసే విధానం",
      modalSubtitle: "రసాయన లోపాల సవరణ దశలు మరియు ఆన్‌లైన్ కొనుగోలు లింకులు",
      protocolStepsTitle: "దశలవారీగా నేల బాగుచేసే విధానం",
      step1Title: "రసాయన తటస్థీకరణ",
      step1Desc: "విత్తడానికి 2 వారాల ముందే సున్నం (pH < 5.8 అయితే) లేదా జిప్సం (pH > 8.0 అయితే) వేయండి.",
      step2Title: "సేంద్రీయ కర్బనం పెంపు",
      step2Desc: "ఎకరానికి 2 టన్నుల వర్మీకంపోస్ట్ మరియు హ్యూమిక్ యాసిడ్ వేసి సేంద్రీయ కర్బనాన్ని 0.75% దాటించండి.",
      step3Title: "ఉప్పు నీటిని బయటకు పంపడం",
      step3Desc: "పొలానికి నీరు కట్టి కాలువల ద్వారా బయటకు పంపి వేర్ల వద్ద ఉన్న లవణాలను తొలగించండి.",
      productsHeader: "సిఫార్సు చేసిన భూసార దిద్దుబాటు ఉత్పత్తులు",
      instantOrderBadge: "ఆర్డర్ లింకులు",
      certifiedFootnote: "అన్ని ఉత్పత్తులు ICAR వ్యవసాయ ప్రమాణాలకు అనుగుణంగా ఉంటాయి.",
      closeModalBtn: "విండో మూసివేయండి",

      prod1Name: "వ్యవసాయ సున్నం / డోలమైట్ (CaCO3 90%)",
      prod1Purpose: "ఆమ్ల నేలలను (pH < 6.0) సరిచేసి అల్యూమినియం ప్రభావాన్ని తగ్గిస్తుంది.",
      prod1Dosage: "మోతాదు: ఎకరానికి 250 - 350 కిలోలు",

      prod2Name: "వ్యవసాయ జిప్సం (కాల్షియం సల్ఫేట్)",
      prod2Purpose: "చౌడు నేలలోని (pH > 8.0) సోడియంను తొలగించి గట్టి నేలను గుల్లబారుస్తుంది.",
      prod2Dosage: "మోతాదు: ఎకరానికి 400 - 500 కిలోలు",

      prod3Name: "వర్మీకంపోస్ట్ + హ్యూమిక్ యాసిడ్ 98%",
      prod3Purpose: "సేంద్రీయ కర్బనాన్ని 0.75% స్థాయికి పెంచి నేల సారాన్ని పెంచుతుంది.",
      prod3Dosage: "మోతాదు: ఎకరానికి 1.5 - 2 టన్నులు + 1 కిలో హ్యూమిక్ యాసిడ్"
    },
    hi: {
      badgeText: "टूल 3 / 6 • मृदा स्वास्थ्य एवं लैब कूरियर",
      bannerTitle: "मृदा रसायन एवं डाक नमूना केंद्र",
      bannerSubtitle: "मृदा उर्वरता सत्यापन एवं सरकारी लैब प्रेषण",
      bannerDesc: "अपनी जमीन की कृषि उपयुक्तता जांचें। यदि मिट्टी में दोष हैं, तो विस्तृत सुधार उपाय, सामग्री खरीद लिंक तथा डाक कूरियर रसीद तुरंत प्राप्त करें।",

      metricsHeader: "मिट्टी के रासायनिक मापदंड",
      liveCalibration: "लाइव कैलिब्रेशन",
      phLabel: "मृदा pH स्तर",
      phAcidic: "अम्लीय (< 5.8)",
      phOptimal: "उपयुक्त (6.0 - 7.8)",
      phAlkaline: "क्षारीय (> 8.0)",
      ocLabel: "जैविक कार्बन (OC %)",
      ocCritical: "गंभीर (< 0.40%)",
      ocHealthy: "उत्तम (> 0.75%)",
      ecLabel: "विद्युत चालकता (लवणता EC)",
      ecNormal: "सामान्य (< 1.5)",
      ecSaline: "लवणीय मिट्टी (> 2.0 dS/m)",

      landFitTitle: "जमीन कृषि के लिए 100% उपयुक्त है",
      landFitSubtitle: "रासायनिक संतुलन उत्कृष्ट है। खरीफ और रबी फसलों के लिए उत्तम।",
      phStatusFit: "पोषक तत्व अवशोषण के लिए संतुलित pH स्तर",
      ocStatusFit: "सूक्ष्मजीवों के लिए पर्याप्त जैविक कार्बन उपस्थित",
      ecStatusFit: "जड़ों द्वारा नमी अवशोषण हेतु सुरक्षित लवणता स्तर",
      proceedMarketBtn: "एग्रीलॉक अग्रिम व्यापार के लिए आगे बढ़ें",

      landUnfitTitle: "जमीन कृषि के लिए अनुपयुक्त है",
      landUnfitSubtitle: "मृदा दोषों के कारण बीज अंकुरण एवं फसल वृद्धि बाधित होगी।",
      defectsTitle: "पहचाने गए गंभीर मृदा दोष:",
      fixLandBtn: "जमीन सुधारें और उपचार उपाय देखें",

      defectAcidic: "अत्यधिक अम्लीय मिट्टी: एल्युमिनियम विषाक्तता से फास्फोरस का अवशोषण रुक जाता है।",
      defectAlkaline: "उच्च क्षारीयता / सोडिक मिट्टी: सूक्ष्म पोषक तत्वों व जिंक की भारी कमी से फसल पीली पड़ती है।",
      defectLowOC: "जैविक कार्बन अत्यंत कम: मिट्टी में जैविक खाद एवं रोगाणु जीवन समाप्त हो चुका है।",
      defectSaline: "उच्च लवणता: जड़ों को जलाकर बीज अंकुरण पूरी तरह रोक देती है।",

      dispatchHeader: "डाक द्वारा मिट्टी नमूना बुकिंग",
      dispatchSubtitle: "अपने नजदीकी ग्रामीण डाकघर से मिट्टी का नमूना सीधे ICAR प्रमाणित लैब भेजें।",
      partnerBadge: "स्पीडपोस्ट पार्टनर",
      selectStateLabel: "राज्य चुनें",
      selectDistrictLabel: "जिला / मंडी क्षेत्र",
      villageLabel: "गांव / खेत का पता",
      pincodeLabel: "पिन कोड",
      assignedLabLabel: "निर्धारित परीक्षण प्रयोगशाला:",
      generateDocketBtn: "इंडिया पोस्ट डिस्पैच रसीद बनाएं",
      docketReadyBadge: "स्पीडपोस्ट टोकन सक्रिय",
      docketOrigin: "संग्रह स्थल:",
      docketInstructions: "बारकोड रसीद के साथ 500 ग्राम मिट्टी की थैली अपने ग्राम डाक सेवक को सौंपें।",

      modalTitle: "मृदा सुधार एवं भूमि उपचार प्रोटोकॉल",
      modalSubtitle: "रासायनिक दोष सुधार के चरण और ऑनलाइन खरीद लिंक",
      protocolStepsTitle: "चरणबद्ध भूमि सुधार प्रक्रिया",
      step1Title: "रासायनिक उदासीनीकरण",
      step1Desc: "बुवाई से 2 सप्ताह पूर्व चूना (pH < 5.8 पर) या जिप्सम (pH > 8.0 पर) खेत में मिलाएं।",
      step2Title: "जैविक कार्बन में वृद्धि",
      step2Desc: "प्रति एकड़ 2 टन वर्मीकम्पोस्ट और ह्यूमिक एसिड डालकर जैविक कार्बन 0.75% से ऊपर ले जाएं।",
      step3Title: "अतिरिक्त लवणों की निकासी",
      step3Desc: "खेत में गहरा पानी भरकर नालियों द्वारा बाहर निकालें ताकि हानिकारक सोडियम बह जाए।",
      productsHeader: "अनुमोदित भूमि सुधारक उत्पाद",
      instantOrderBadge: "ऑर्डर लिंक",
      certifiedFootnote: "सभी उत्पाद ICAR एवं कृषि विभाग मानकों के अनुरूप हैं।",
      closeModalBtn: "विंडो बंद करें",

      prod1Name: "कृषि चूना / डोलोमाइट (CaCO3 90%)",
      prod1Purpose: "अम्लीय मिट्टी (pH < 6.0) को सुधारकर एल्युमिनियम विषाक्तता समाप्त करता है।",
      prod1Dosage: "मात्रा: 250 - 350 किग्रा प्रति एकड़",

      prod2Name: "कृषि जिप्सम (कैल्शियम सल्फेट)",
      prod2Purpose: "क्षारीय मिट्टी (pH > 8.0) से सोडियम हटाकर सख्त जमीन को भुरभुरा बनाता है।",
      prod2Dosage: "मात्रा: 400 - 500 किग्रा प्रति एकड़",

      prod3Name: "वर्मीकम्पोस्ट + ह्यूमिक एसिड 98%",
      prod3Purpose: "जैविक कार्बन को 0.75% के सुरक्षित स्तर तक पुनर्स्थापित करता है।",
      prod3Dosage: "मात्रा: 1.5 - 2 टन वर्मीकम्पोस्ट + 1 किग्रा ह्यूमिक एसिड"
    },
    ta: {
      badgeText: "கருவி 3 / 6 • மண் தரம் & ஆய்வக கூரியர்",
      bannerTitle: "மண் வேதியியல் மற்றும் தபால் மாதிரி மையம்",
      bannerSubtitle: "மண் ஆரோக்கிய சோதனை & அரசு ஆய்வக கூரியர்",
      bannerDesc: "உங்கள் நிலம் விவசாயத்திற்கு ஏற்றதா என கண்டறியுங்கள். குறைபாடுகள் இருப்பின், நிலத்தை சீரமைக்கும் வழிகள், பொருட்கள் வாங்கும் இணைப்புகள் மற்றும் தபால் சீட்டைப் பெறுங்கள்.",

      metricsHeader: "மண் வேதியியல் அளவுகள்",
      liveCalibration: "நேரடி அளவீடு",
      phLabel: "மண் pH அளவு",
      phAcidic: "அமில மண் (< 5.8)",
      phOptimal: "சமச்சீர் மண் (6.0 - 7.8)",
      phAlkaline: "கார மண் (> 8.0)",
      ocLabel: "கரிம கரிமச்சத்து (OC %)",
      ocCritical: "ஆபத்தானது (< 0.40%)",
      ocHealthy: "ஆரோக்கியமானது (> 0.75%)",
      ecLabel: "மின்னோட்ட கடத்துதிறன் (உவர்த்தன்மை EC)",
      ecNormal: "இயல்பானது (< 1.5)",
      ecSaline: "உவர் மண் (> 2.0 dS/m)",

      landFitTitle: "நிலம் விவசாயத்திற்கு 100% தகுதியானது",
      landFitSubtitle: "மண் சமநிலை சிறப்பாக உள்ளது. காரீப் மற்றும் ரபி விதைப்புக்கு உகந்தது.",
      phStatusFit: "சத்துக்களை உறிஞ்சும் சரியான pH சமநிலை",
      ocStatusFit: "நுண்ணுயிரிகளுக்கு போதுமான கரிம சத்து உள்ளது",
      ecStatusFit: "வேர்கள் நீர் உறிஞ்ச பாதுகாப்பான உவர்த்தன்மை",
      proceedMarketBtn: "அக்ரிலாக் வர்த்தகத்திற்கு செல்க",

      landUnfitTitle: "நிலம் விவசாயத்திற்கு ஏற்றதல்ல",
      landUnfitSubtitle: "மண் குறைபாடுகளால் விதை முளைப்பு மற்றும் பயிர் வளர்ச்சி பாதிக்கப்படும்.",
      defectsTitle: "கண்டறியப்பட்ட தீவிர மண் குறைபாடுகள்:",
      fixLandBtn: "நிலத்தை சீரமைக்கும் வழிகள்",

      defectAcidic: "அமில மண்: பாஸ்பரஸ் சத்து கிடைப்பதை முழுமையாக தடுக்கிறது.",
      defectAlkaline: "கார மண்: துத்தநாகம் மற்றும் நுண்ணூட்டச் சத்து குறைபாட்டை ஏற்படுத்துகிறது.",
      defectLowOC: "கரிமச்சத்து மிகக் குறைவு: மண்ணில் நுண்ணுயிர்கள் மற்றும் மட்கிய சத்து இல்லை.",
      defectSaline: "அதிக உவர்த்தன்மை: வேர்களை கருகச்செய்து விதை முளைப்பைத் தடுக்கிறது.",

      dispatchHeader: "தபால் மூலம் மண் மாதிரி அனுப்புதல்",
      dispatchSubtitle: "உங்கள் கிராம தபால் அலுவலகம் மூலம் ICAR அரசு ஆய்வகத்திற்கு மண் மாதிரி அனுப்புங்கள்.",
      partnerBadge: "ஸ்பீட்போஸ்ட் பார்ட்னர்",
      selectStateLabel: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
      selectDistrictLabel: "மாவட்டம் / பகுதி",
      villageLabel: "கிராமம் / நிலத்தின் முகவரி",
      pincodeLabel: "அஞ்சல் குறியீட்டு எண் (பின்கோடு)",
      assignedLabLabel: "ஒதுக்கப்பட்ட சோதனை ஆய்வகம்:",
      generateDocketBtn: "இந்தியா போஸ்ட் ரசீது உருவாக்குக",
      docketReadyBadge: "ஸ்பீட்போஸ்ட் டோக்கன் தயார்",
      docketOrigin: "பொருளெடுக்கும் இடம்:",
      docketInstructions: "இந்த பார்கோடு சீட்டுடன் 500 கிராம் மண் பையை கிராம தபால் முகவரிடம் ஒப்படைக்கவும்.",

      modalTitle: "மண் சீரமைப்பு மற்றும் சிகிச்சை முறை",
      modalSubtitle: "மண் குறைபாடுகளை சரிசெய்யும் முறைகள் மற்றும் வாங்கும் இணைப்புகள்",
      protocolStepsTitle: "படிபடியான நில சீரமைப்பு செயல்முறை",
      step1Title: "வேதியியல் சமநிலைப்படுத்துதல்",
      step1Desc: "விதைப்பதற்கு 2 வாரங்களுக்கு முன் சுண்ணாம்பு (pH < 5.8) அல்லது ஜிப்சம் (pH > 8.0) இடுக.",
      step2Title: "மண் கரிமச்சத்து மேம்பாடு",
      step2Desc: "ஏக்கருக்கு 2 டன் மண்புழு உரம் இட்டு கரிமச்சத்தை 0.75% அளவுக்கு உயர்த்தவும்.",
      step3Title: "உப்பு நீரை வடித்தல்",
      step3Desc: "நிலத்தில் தண்ணீர் பாய்ச்சி வடிகால் வழியாக வெளியேற்றி தேவையற்ற சோடியத்தை அகற்றவும்.",
      productsHeader: "அங்கீகரிக்கப்பட்ட நில சீரமைப்பு பொருட்கள்",
      instantOrderBadge: "ஆர்டர் இணைப்புகள்",
      certifiedFootnote: "அனைத்து பொருட்களும் ICAR விவசாய தரநிலைகளுக்கு உட்பட்டவை.",
      closeModalBtn: "சாளரத்தை மூடு",

      prod1Name: "விவசாய சுண்ணாம்பு / டோலமைட் (CaCO3 90%)",
      prod1Purpose: "அமில மண்ணை (pH < 6.0) சரிசெய்து நச்சுத்தன்மையை நீக்குகிறது.",
      prod1Dosage: "அளவு: ஏக்கருக்கு 250 - 350 கிலோ",

      prod2Name: "விவசாய ஜிப்சம் (கால்சியம் சல்பேட்)",
      prod2Purpose: "கார மண்ணில் உள்ள சோடியத்தை அகற்றி நிலத்தை தளர்த்துகிறது.",
      prod2Dosage: "அளவு: ஏக்கருக்கு 400 - 500 கிலோ",

      prod3Name: "மண்புழு உரம் + ஹ்யூமிக் அமிலம் 98%",
      prod3Purpose: "கரிம கரிமச்சத்தை 0.75% அளவுக்கு உயர்த்தி மண்ணை வளப்படுத்துகிறது.",
      prod3Dosage: "அளவு: ஏக்கருக்கு 1.5 - 2 டன் + 1 கிலோ ஹ்யூமிக் அமிலம்"
    }
  };

  const cur = dict[lang] || dict.en;

  // Regional ICAR / Agricultural University Testing Directory
  const regionalData: Record<string, StateData> = {
    'Telangana': {
      districts: ['Nizamabad', 'Warangal', 'Hyderabad (Rangareddy)', 'Khammam', 'Karimnagar', 'Nalgonda', 'Mahabubnagar', 'Adilabad'],
      labName: 'PJTSAU Central Soil & Water Testing Laboratory',
      labAddress: 'Prof. Jayashankar Telangana State Agricultural University, Rajendranagar, Hyderabad - 500030'
    },
    'Andhra Pradesh': {
      districts: ['Guntur', 'Kurnool', 'Vijayawada (Krishna)', 'East Godavari', 'Anantapur', 'Chittoor', 'Visakhapatnam'],
      labName: 'ANGRAU Regional Agricultural Testing Center',
      labAddress: 'Acharya N.G. Ranga Agricultural University Campus, Lam, Guntur - 522034'
    },
    'Maharashtra': {
      districts: ['Pune', 'Nashik', 'Nagpur', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Kolhapur', 'Amravati', 'Solapur'],
      labName: 'MPKV Soil Testing & Quality Control Lab',
      labAddress: 'Mahatma Phule Krishi Vidyapeeth Campus, College of Agriculture, Pune - 411005'
    },
    'Karnataka': {
      districts: ['Bengaluru Rural', 'Belagavi', 'Dharwad', 'Mysuru', 'Ballari', 'Shivamogga', 'Kalaburagi'],
      labName: 'UAS Soil Health & Micronutrient Analysis Hub',
      labAddress: 'University of Agricultural Sciences, GKVK Campus, Bengaluru - 560065'
    }
  };

  // State Management
  const [phValue, setPhValue] = useState<number>(5.2);
  const [organicCarbon, setOrganicCarbon] = useState<number>(0.30);
  const [salinityEC, setSalinityEC] = useState<number>(1.2);

  const [selectedState, setSelectedState] = useState<string>('Telangana');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nizamabad');
  const [villageName, setVillageName] = useState<string>('Bheemgal Village');
  const [pincode, setPincode] = useState<string>('503307');

  const [bookingGenerated, setBookingGenerated] = useState<boolean>(false);
  const [showFixModal, setShowFixModal] = useState<boolean>(false);

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    if (regionalData[stateName]) {
      setSelectedDistrict(regionalData[stateName].districts[0]);
    }
  };

  // Scientific Fitness Engine
  const fitnessAnalysis = useMemo(() => {
    const issues: string[] = [];
    let isFit = true;

    if (phValue < 5.8) {
      isFit = false;
      issues.push(cur.defectAcidic);
    } else if (phValue > 8.0) {
      isFit = false;
      issues.push(cur.defectAlkaline);
    }

    if (organicCarbon < 0.40) {
      isFit = false;
      issues.push(cur.defectLowOC);
    }

    if (salinityEC > 2.0) {
      isFit = false;
      issues.push(cur.defectSaline);
    }

    return { isFit, issues };
  }, [phValue, organicCarbon, salinityEC, cur]);

  // E-Commerce Product Direct Links
  const remediationProducts = [
    {
      name: cur.prod1Name,
      purpose: cur.prod1Purpose,
      dosage: cur.prod1Dosage,
      amazonUrl: 'https://www.amazon.in/s?k=agricultural+lime+for+soil',
      flipkartUrl: 'https://www.flipkart.com/search?q=agricultural+lime',
      agriBegriUrl: 'https://agribegri.com/search?q=agricultural+lime'
    },
    {
      name: cur.prod2Name,
      purpose: cur.prod2Purpose,
      dosage: cur.prod2Dosage,
      amazonUrl: 'https://www.amazon.in/s?k=agricultural+gypsum+for+farming',
      flipkartUrl: 'https://www.flipkart.com/search?q=agricultural+gypsum',
      agriBegriUrl: 'https://agribegri.com/search?q=agricultural+gypsum'
    },
    {
      name: cur.prod3Name,
      purpose: cur.prod3Purpose,
      dosage: cur.prod3Dosage,
      amazonUrl: 'https://www.amazon.in/s?k=vermicompost+fertilizer+farming',
      flipkartUrl: 'https://www.flipkart.com/search?q=vermicompost',
      agriBegriUrl: 'https://agribegri.com/search?q=vermicompost'
    }
  ];

  const activeLab = regionalData[selectedState] || regionalData['Telangana'];

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
            <FlaskConical className="w-4 h-4" />
            {cur.bannerSubtitle}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            {cur.bannerDesc}
          </p>
        </div>

        {/* Main Grid: Parameters & Postal Logistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Metrics & Fitness Engine (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>{cur.metricsHeader}</span>
              <span className="text-[10px] font-bold text-slate-400">{cur.liveCalibration}</span>
            </h3>

            {/* pH Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase">
                  {cur.phLabel}
                </label>
                <span className={`text-xs font-black px-2 py-0.5 rounded ${
                  phValue < 5.8 ? 'bg-amber-100 text-amber-800' :
                  phValue > 8.0 ? 'bg-rose-100 text-rose-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  pH {phValue.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="9.5"
                step="0.1"
                value={phValue}
                onChange={(e) => setPhValue(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>{cur.phAcidic}</span>
                <span className="text-emerald-700 font-bold">{cur.phOptimal}</span>
                <span>{cur.phAlkaline}</span>
              </div>
            </div>

            {/* Organic Carbon Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase">
                  {cur.ocLabel}
                </label>
                <span className={`text-xs font-black px-2 py-0.5 rounded ${
                  organicCarbon < 0.40 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {organicCarbon.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="1.20"
                step="0.05"
                value={organicCarbon}
                onChange={(e) => setOrganicCarbon(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span className="text-rose-600 font-medium">{cur.ocCritical}</span>
                <span className="text-emerald-700 font-bold">{cur.ocHealthy}</span>
              </div>
            </div>

            {/* Salinity EC Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase">
                  {cur.ecLabel}
                </label>
                <span className={`text-xs font-black px-2 py-0.5 rounded ${
                  salinityEC > 2.0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {salinityEC.toFixed(1)} dS/m
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={salinityEC}
                onChange={(e) => setSalinityEC(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span className="text-emerald-700 font-bold">{cur.ecNormal}</span>
                <span className="text-rose-600 font-medium">{cur.ecSaline}</span>
              </div>
            </div>

            {/* Dynamic Fitness Result Display */}
            {fitnessAnalysis.isFit ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-emerald-950 uppercase">{cur.landFitTitle}</h4>
                    <p className="text-[11px] text-emerald-700">{cur.landFitSubtitle}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-700 pt-2 border-t border-emerald-200/60 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{cur.phStatusFit}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{cur.ocStatusFit}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{cur.ecStatusFit}</span>
                  </p>
                </div>

                <Link
                  href="/tools/market-prices"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <span>{cur.proceedMarketBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-rose-950 uppercase">{cur.landUnfitTitle}</h4>
                    <p className="text-[11px] text-rose-700">{cur.landUnfitSubtitle}</p>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-rose-200 text-[11px] text-rose-900 space-y-1">
                  <span className="font-bold block text-[10px] uppercase text-rose-800">{cur.defectsTitle}</span>
                  {fitnessAnalysis.issues.map((issue, idx) => (
                    <p key={idx} className="flex items-start gap-1">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{issue}</span>
                    </p>
                  ))}
                </div>

                <button
                  onClick={() => setShowFixModal(true)}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{cur.fixLandBtn}</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Postal Soil Sample Logistics (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    {cur.dispatchHeader}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{cur.dispatchSubtitle}</p>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                  {cur.partnerBadge}
                </span>
              </div>

              {/* State & Area Cascading Dropdown Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {cur.selectStateLabel}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    {Object.keys(regionalData).map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {cur.selectDistrictLabel}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    {regionalData[selectedState]?.districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {cur.villageLabel}
                  </label>
                  <input
                    type="text"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {cur.pincodeLabel}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Target ICAR Testing Lab Box */}
              <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <Building2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-900 block">
                    {cur.assignedLabLabel}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900">{activeLab.labName}</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">{activeLab.labAddress}</p>
                </div>
              </div>

              <button
                onClick={() => setBookingGenerated(true)}
                className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{cur.generateDocketBtn}</span>
              </button>
            </div>

            {/* Postal Docket Display */}
            {bookingGenerated && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="w-20 h-20 bg-white border border-slate-300 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <QrCode className="w-16 h-16 text-slate-900" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                      #SOIL-PKT-8419-ICAR
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">{cur.docketReadyBadge}</span>
                  </div>
                  <p className="text-slate-700 font-semibold">
                    {cur.docketOrigin} {villageName}, {selectedDistrict}, {selectedState} ({pincode})
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {cur.docketInstructions}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* "FIX LAND" MODAL WITH STEP-BY-STEP RECLAMATION & E-COMMERCE PRODUCTS */}
      {showFixModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-emerald-100 space-y-6 my-8 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">{cur.modalTitle}</h3>
                  <p className="text-[11px] text-slate-500">{cur.modalSubtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFixModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 3 Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                {cur.protocolStepsTitle}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Step 1
                  </span>
                  <h5 className="font-bold text-slate-900 mt-1">{cur.step1Title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {cur.step1Desc}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Step 2
                  </span>
                  <h5 className="font-bold text-slate-900 mt-1">{cur.step2Title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {cur.step2Desc}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Step 3
                  </span>
                  <h5 className="font-bold text-slate-900 mt-1">{cur.step3Title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {cur.step3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Store Products */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>{cur.productsHeader}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{cur.instantOrderBadge}</span>
              </h4>

              <div className="space-y-3">
                {remediationProducts.map((prod, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="max-w-sm">
                      <h5 className="text-xs font-bold text-slate-900">{prod.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">{prod.purpose}</p>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1 inline-block">
                        {prod.dosage}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                      <a
                        href={prod.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3 text-amber-700" />
                        Amazon
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <a
                        href={prod.flipkartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3 text-blue-700" />
                        Flipkart
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <a
                        href={prod.agriBegriUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3 text-emerald-700" />
                        AgriBegri
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {cur.certifiedFootnote}
              </span>
              <button
                onClick={() => setShowFixModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
              >
                {cur.closeModalBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}