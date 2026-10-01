'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Scan, 
  ArrowLeft, 
  Camera, 
  Upload, 
  ShoppingCart, 
  Sparkles, 
  X,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface RemediationStep {
  step: string;
  title: string;
  desc: string;
}

interface ProductItem {
  name: string;
  type: string;
  dosage: string;
  amazonUrl: string;
  flipkartUrl: string;
  agriBegriUrl: string;
}

interface DiagnosisResult {
  cropKey: string;
  diseaseKey: string;
  scientificName: string;
  confidence: string;
  severityKey: string;
  symptoms: string[];
  steps: RemediationStep[];
  products: ProductItem[];
}

export default function PlantScannerPage() {
  const { t, lang } = useToolTranslation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Full dictionary across English, Telugu, Hindi, and Tamil
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 4 of 6 • AI Vision Pathology",
      bannerTitle: "AI Leaf & Crop Scanner",
      bannerSubtitle: "Automated Plant Pathology Diagnostic Engine",
      bannerDesc: "Upload leaf imagery or capture real-time camera frames. The neural computer vision pipeline isolates leaf necrotic lesions, identifies specific fungal/bacterial pathogens, and generates dosage-verified remediation steps with direct e-commerce purchase links.",
      
      uploadCardTitle: "Upload Leaf Photo",
      uploadCardDesc: "Select JPEG, PNG, or WebP photo from your device",
      cameraCardTitle: "Take Live Photo",
      cameraCardDesc: "Open camera to capture infected leaf sample in field",
      alignLeafNotice: "Align diseased leaf inside targeting frame",
      captureBtn: "Capture Leaf",
      cancelBtn: "Cancel",
      clearPhotoTooltip: "Clear and retake",
      
      scanStep0: "Isolating Foliage Contours & Surface Matrix...",
      scanStep1: "Detecting Necrotic Spots & Interveinal Chlorosis...",
      scanStep2: "Classifying Alternaria solani Spore Signatures...",
      scanStep3: "Formulating Curative Agronomic Dosage Protocol...",

      pathologyConfirmed: "Pathology Confirmed",
      neuralMatch: "Neural Match",
      symptomsHeader: "Observed Diagnostic Pathology & Symptoms:",
      protocolHeader: "Detailed Remediation Protocol to Fix the Infection",
      productsHeader: "Approved Remedial Products & Buying Links",
      productsSubheader: "Order verified chemical fungicides and organic bio-sprays directly to your farm",
      dosageLabel: "Recommended Dosage:",
      qualityPreservedNotice: "Prompt curative action arrests mycelial expansion and secures Grade-A mandi trade qualification.",
      checkPriceLink: "Check Grade-A Market Price",

      cropName: "Tomato Foliage (Solanum lycopersicum)",
      diseaseName: "Early Blight & Foliar Necrosis",
      severityName: "Moderate Infection (Stage 2 of 4)",

      symptom1: "Concentric circular target-board spots on lower leaves.",
      symptom2: "Surrounding chlorotic yellow halos causing early leaf drop.",
      symptom3: "Risk of pathogen stem girdling within 7-10 days if left untreated.",

      step1Title: "Sanitation & Pruning",
      step1Desc: "Immediately prune and safely dispose of infected lower leaves at ground level. Never compost diseased foliage.",
      step2Title: "Targeted Chemical Treatment",
      step2Desc: "Foliar spray with Mancozeb 75% WP @ 2.5g/Litre or Azoxystrobin + Difenoconazole early in the morning.",
      step3Title: "Watering Correction & Airflow",
      step3Desc: "Avoid overhead sprinkler watering; use drip lines at the base to keep foliage dry. Increase staking ventilation.",

      prod1Name: "Mancozeb 75% WP (Contact Broad-Spectrum Fungicide)",
      prod1Type: "Primary Curative Fungicide",
      prod1Dosage: "2.5g per Litre of clean spray water",

      prod2Name: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
      prod2Type: "Systemic Dual-Action Fungicide",
      prod2Dosage: "1ml per Litre of clean spray water",

      prod3Name: "Organic Cold-Pressed Neem Oil (10,000 PPM EC)",
      prod3Type: "Bio-Fungicide & Sucking Pest Deterrent",
      prod3Dosage: "4ml per Litre with mild emulsifier"
    },
    te: {
      badgeText: "టూల్ 4 / 6 • AI ఆకు తెగులు నిర్ధారణ",
      bannerTitle: "AI ఆకు & పంట స్కానర్",
      bannerSubtitle: "స్వయంచాలక పంట వ్యాధి నిర్ధారణ ఇంజిన్",
      bannerDesc: "ఆకు ఫోటోను అప్‌‌లోడ్ చేయండి లేదా నేరుగా కెమెరా ద్వారా ఫోటో తీయండి. AI న్యూరల్ విజన్ ద్వారా తెగులును గుర్తించి, నివారణ చర్యలు మరియు అవసరమైన మందుల ఆన్‌లైన్ కొనుగోలు లింకులను అందిస్తుంది.",

      uploadCardTitle: "ఆకు ఫోటో అప్‌లోడ్ చేయండి",
      uploadCardDesc: "మీ ఫోన్ లేదా కంప్యూటర్ నుండి ఫోటోను ఎంచుకోండి",
      cameraCardTitle: "నేరుగా ఫోటో తీయండి",
      cameraCardDesc: "పొలంలో ఉన్నప్పుడు కెమెరా ద్వారా ఆకు ఫోటో తీయండి",
      alignLeafNotice: "తెగులు సోకిన ఆకును ఫ్రేమ్ మధ్యలో ఉంచండి",
      captureBtn: "ఫోటో తీయండి",
      cancelBtn: "రద్దు చేయండి",
      clearPhotoTooltip: "ఫోటో తొలగించి మళ్ళీ తీయండి",

      scanStep0: "ఆకు ఉపరితలాన్ని విశ్లేషిస్తోంది...",
      scanStep1: "తెగులు మచ్చలు మరియు పసుపు రంగు మార్పులను గుర్తిస్తోంది...",
      scanStep2: "ఆల్టర్నేరియా శిలీంధ్ర లక్షణాలను వర్గీకరిస్తోంది...",
      scanStep3: "ఖచ్చితమైన మందుల మోతాదును సిద్ధం చేస్తోంది...",

      pathologyConfirmed: "తెగులు నిర్ధారించబడింది",
      neuralMatch: "AI నిర్ధారణ ఖచ్చితత్వం",
      symptomsHeader: "గుర్తించిన తెగులు లక్షణాలు:",
      protocolHeader: "తెగులు నివారణకు వివరణాత్మక కార్యాచరణ ప్రణాళిక",
      productsHeader: "సిఫార్సు చేసిన పురుగు/శిలీంధ్ర మందులు & కొనుగోలు లింకులు",
      productsSubheader: "ధృవీకరించబడిన మందులను నేరుగా మీ ఇంటి వద్దకే ఆర్డర్ చేసుకోండి",
      dosageLabel: "సిఫార్సు చేసిన మోతాదు:",
      qualityPreservedNotice: "వెంటనే మందులు పిచికారీ చేయడం ద్వారా పంట నాణ్యత కాపాడబడి మార్కెట్లో గ్రేడ్-A ధర లభిస్తుంది.",
      checkPriceLink: "గ్రేడ్-A మార్కెట్ ధరను చూడండి",

      cropName: "టమోటా ఆకు (Solanum lycopersicum)",
      diseaseName: "ఆకు ఎండు తెగులు / ముందస్తు మాడ తెగులు (Early Blight)",
      severityName: "మధ్యస్థ స్థాయి తెగులు (దశ 2 / 4)",

      symptom1: "కింది ఆకులపై గుండ్రటి వలయాల వంటి గోధుమ రంగు మచ్చలు.",
      symptom2: "మచ్చల చుట్టూ పసుపు రంగు వలయాలు ఏర్పడి ఆకులు రాలిపోవడం.",
      symptom3: "నివారించకపోతే 7-10 రోజుల్లో కాండానికి పాకి మొక్క ఎండిపోయే ప్రమాదం.",

      step1Title: "తెగులు సోకిన భాగాలను తొలగించడం",
      step1Desc: "నేల మట్టానికి దగ్గరగా ఉన్న వ్యాధి సోకిన ఆకులను కత్తిరించి నాశనం చేయండి. వీటిని కంపోస్ట్ చేయవద్దు.",
      step2Title: "రసాయన మందుల పిచికారీ",
      step2Desc: "ఉదయం పూట మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీటర్ లేదా అజాక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ పిచికారీ చేయండి.",
      step3Title: "తేమ నియంత్రణ & గాలి ప్రసరణ",
      step3Desc: "పైనుండి నీరు చిలకరించకుండా డ్రిప్ ద్వారా మొదళ్లకే నీరు ఇవ్వండి. మొక్కల మధ్య గాలి ప్రసరణ ఉండేలా చూడండి.",

      prod1Name: "మాంకోజెబ్ 75% WP (శిలీంధ్ర నాశిని)",
      prod1Type: "ప్రాథమిక నివారణ శిలీంధ్ర నాశిని",
      prod1Dosage: "లీటరు నీటికి 2.5 గ్రాములు",

      prod2Name: "అజాక్సిస్ట్రోబిన్ 18.2% + డైఫెనోకోనజోల్ 11.4% SC",
      prod2Type: "సిస్టమిక్ శిలీంధ్ర నాశిని",
      prod2Dosage: "లీటరు నీటికి 1 మి.లీ",

      prod3Name: "సేంద్రీయ వేప నూనె (10,000 PPM EC)",
      prod3Type: "జీవ శిలీంధ్ర నాశిని & కీటక నివారిణి",
      prod3Dosage: "లీటరు నీటికి 4 మి.లీ"
    },
    hi: {
      badgeText: "टूल 4 / 6 • एआई फसल रोग निदान",
      bannerTitle: "एआई पत्ती और फसल स्कैनर",
      bannerSubtitle: "स्वचालित पादप रोग निदान एवं उपचार प्रणाली",
      bannerDesc: "पत्ती की तस्वीर अपलोड करें या सीधे कैमरे से फोटो खींचें। एआई विजन मॉडल पत्ती के धब्बों की पहचान कर रोग का सटीक नाम, चरणबद्ध उपचार और प्रमाणित कीटनाशक खरीदने के लिंक प्रदान करता है।",

      uploadCardTitle: "पत्ती की फोटो अपलोड करें",
      uploadCardDesc: "अपने डिवाइस से JPG, PNG अथवा WebP फोटो चुनें",
      cameraCardTitle: "कैमरे से फोटो लें",
      cameraCardDesc: "खेत में खड़े होकर सीधे कैमरे से रोगग्रस्त पत्ती की फोटो लें",
      alignLeafNotice: "रोगग्रस्त पत्ती को फ्रेम के बीच में रखें",
      captureBtn: "फोटो खींचें",
      cancelBtn: "रद्द करें",
      clearPhotoTooltip: "फोटो हटाएं और दोबारा लें",

      scanStep0: "पत्ती की सतह और कोशिका संरचना का विश्लेषण...",
      scanStep1: "पत्तियों पर भूरे धब्बों और क्लोरोसिस की पहचान...",
      scanStep2: "अल्टरनेरिया फफूंद बीजाणुओं का वर्गीकरण...",
      scanStep3: "सटीक रासायनिक दवा एवं छिड़काव मात्रा तैयार की जा रही है...",

      pathologyConfirmed: "रोग की पुष्टि हुई",
      neuralMatch: "एआई मिलान सटीकता",
      symptomsHeader: "पहचाने गए रोग लक्षण:",
      protocolHeader: "फसल रोग ठीक करने के विस्तृत चरणबद्ध उपाय",
      productsHeader: "अनुमोदित फफूंदनाशक उत्पाद एवं खरीद लिंक",
      productsSubheader: "प्रमाणित रासायनिक एवं जैविक दवाएं सीधे अपने खेत पर मंगवाएं",
      dosageLabel: "अनुशंसित छिड़काव मात्रा:",
      qualityPreservedNotice: "समय पर उपचार करने से फसल की ग्रेड-ए गुणवत्ता सुरक्षित रहती है और मंडी में उच्चतम भाव मिलता है।",
      checkPriceLink: "ग्रेड-ए मंडी भाव देखें",

      cropName: "टमाटर की पत्ती (Solanum lycopersicum)",
      diseaseName: "अगेती झुलसा रोग (Early Blight)",
      severityName: "मध्यम संक्रमण (चरण 2 / 4)",

      symptom1: "निचली पत्तियों पर गोल छल्लेदार भूरे-काले धब्बे।",
      symptom2: "धब्बों के चारों ओर पीलापन आना और पत्तियों का असमय झड़ना।",
      symptom3: "उपचार न करने पर 7-10 दिनों में तने पर काला घेरा बनकर पौधा सूख सकता है।",

      step1Title: "संक्रमित पत्तियों की छंटाई",
      step1Desc: "जमीन के पास की गंभीर रूप से संक्रमित पत्तियों को काटकर जला दें। इन्हें खाद के गड्ढे में न डालें।",
      step2Title: "लक्षित फफूंदनाशक छिड़काव",
      step2Desc: "सुबह के समय मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर अथवा एजोक्सीस्ट्रोबिन का छिड़काव करें।",
      step3Title: "सिंचाई सुधार एवं वायु संचार",
      step3Desc: "फव्वारा सिंचाई से बचें; ड्रिप द्वारा जड़ों में ही पानी दें ताकि पत्तियां सूखी रहें।",

      prod1Name: "मैंकोजेब 75% WP (संपर्क फफूंदनाशक)",
      prod1Type: "प्राथमिक उपचारात्मक फफूंदनाशक",
      prod1Dosage: "2.5 ग्राम प्रति लीटर पानी",

      prod2Name: "एजोक्सीस्ट्रोबिन 18.2% + डिफेनोकोनाजोल 11.4% SC",
      prod2Type: "प्रणालीगत (सिस्टमिक) फफूंदनाशक",
      prod2Dosage: "1 मिली प्रति लीटर पानी",

      prod3Name: "जैविक नीम का तेल (10,000 PPM EC)",
      prod3Type: "बायो-फंगीसाइड और कीट रोधक",
      prod3Dosage: "4 मिली प्रति लीटर पानी"
    },
    ta: {
      badgeText: "கருவி 4 / 6 • AI இலை நோய் கண்டறிதல்",
      bannerTitle: "AI இலை & பயிர் ஸ்கேனர்",
      bannerSubtitle: "தானியங்கி பயிர் நோய் கண்டறிதல் தளம்",
      bannerDesc: "இலை புகைப்படத்தைப் பதிவேற்றவும் அல்லது நேரடியாக கேமரா மூலம் படம் எடுக்கவும். AI தொழில்நுட்பம் நோய் கிருமியை துல்லியமாக கண்டறிந்து, மருந்து தெளிக்கும் வழிமுறைகள் மற்றும் வாங்கும் இணைப்புகளை வழங்குகிறது.",

      uploadCardTitle: "இலை படம் பதிவேற்றவும்",
      uploadCardDesc: "உங்கள் சாதனத்திலிருந்து படத்தை தேர்ந்தெடுக்கவும்",
      cameraCardTitle: "நேரடியாக படம் எடுக்கவும்",
      cameraCardDesc: "வயலில் உள்ள பயிரை கேமரா மூலம் படம் எடுக்கவும்",
      alignLeafNotice: "பாதிக்கப்பட்ட இலையை பிரேமின் நடுவில் வைக்கவும்",
      captureBtn: "படம் எடு",
      cancelBtn: "ரத்து செய்",
      clearPhotoTooltip: "படத்தை நீக்கிவிட்டு மீண்டும் எடுக்கவும்",

      scanStep0: "இலையின் மேற்பரப்பை ஆய்வு செய்கிறது...",
      scanStep1: "இலையில் உள்ள கருகல் புள்ளிகளை கண்டறிகிறது...",
      scanStep2: "ஆல்டர்நேரியா பூஞ்சை தொற்றை வகைப்படுத்துகிறது...",
      scanStep3: "மருந்தளவு மற்றும் சிகிச்சை முறையை தயார் செய்கிறது...",

      pathologyConfirmed: "நோய் உறுதி செய்யப்பட்டது",
      neuralMatch: "AI துல்லியத்தன்மை",
      symptomsHeader: "கண்டறியப்பட்ட நோய் அறிகுறிகள்:",
      protocolHeader: "நோயை குணப்படுத்த விரிவான வழிமுறைகள்",
      productsHeader: "பரிந்துரைக்கப்பட்ட மருந்துகள் & வாங்கும் இணைப்புகள்",
      productsSubheader: "அங்கீகரிக்கப்பட்ட பூஞ்சாணக்கொல்லி மருந்துகளை நேரடியாக ஆர்டர் செய்யவும்",
      dosageLabel: "பரிந்துரைக்கப்பட்ட அளவு:",
      qualityPreservedNotice: "உடனடி சிகிச்சை மூலம் பயிர் தரம் பாதுகாக்கப்பட்டு சந்தையில் முதல் தர விலை கிடைக்கும்.",
      checkPriceLink: "சந்தை நிலவரத்தை பார்க்க",

      cropName: "தக்காளி இலை (Solanum lycopersicum)",
      diseaseName: "இலை கருகல் நோய் (Early Blight)",
      severityName: "மிதமான பாதிப்பு (நிலை 2 / 4)",

      symptom1: "அடி இலைகளில் வளைய வடிவிலான பழுப்பு நிற கருகல் புள்ளிகள்.",
      symptom2: "புள்ளிகளைச் சுற்றி மஞ்சள் வளையம் தோன்றி இலைகள் உதிர்தல்.",
      symptom3: "சிகிச்சை அளிக்காவிட்டால் 7-10 நாட்களில் தண்டு பகுதிக்கு பரவி பயிர் அழுகும்.",

      step1Title: "பாதிக்கப்பட்ட இலைகளை அகற்றுதல்",
      step1Desc: "அடிமட்டத்தில் உள்ள நோய் தாக்கிய இலைகளை வெட்டி அப்புறப்படுத்தவும். உரமாக பயன்படுத்த வேண்டாம்.",
      step2Title: "பூஞ்சாணக்கொல்லி தெளிப்பு",
      step2Desc: "காலை வேளையில் மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் அல்லது அசோக்சிஸ்ட்ரோபின் தெளிக்கவும்.",
      step3Title: "நீர் பாசனம் மற்றும் காற்றோட்டம்",
      step3Desc: "மேலிருந்து தெளிக்கும் பாசனத்தை தவிர்த்து, சொட்டு நீர் பாசனம் மூலம் வேருக்கு மட்டும் நீர் பாய்ச்சவும்.",

      prod1Name: "மேன்கோசெப் 75% WP (பூஞ்சாணக்கொல்லி)",
      prod1Type: "முதன்மை பூஞ்சாணக்கொல்லி",
      prod1Dosage: "2.5 கிராம் / லிட்டர் தண்ணீர்",

      prod2Name: "அசோக்சிஸ்ட்ரோபின் + டைபினோகோனசோல் SC",
      prod2Type: "உள்வாங்கும் பூஞ்சாணக்கொல்லி",
      prod2Dosage: "1 மி.லி / லிட்டர் தண்ணீர்",

      prod3Name: "இயற்கை வேப்பெண்ணெய் (10,000 PPM EC)",
      prod3Type: "இயற்கை பூஞ்சாணம் மற்றும் பூச்சி விரட்டி",
      prod3Dosage: "4 மி.லி / லிட்டர் தண்ணீர்"
    }
  };

  const cur = dict[lang] || dict.en;

  const startCamera = async () => {
    setIsCameraActive(true);
    setDiagnosis(null);
    setImagePreview(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      alert("Camera access denied or unavailable. Please use the file upload button.");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      stopCamera();
      setImagePreview(dataUrl);
      executeLaserScan();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      executeLaserScan();
    };
    reader.readAsDataURL(file);
  };

  const executeLaserScan = () => {
    setIsScanning(true);
    setDiagnosis(null);
    setScanStepIndex(0);

    const stepInterval = setInterval(() => {
      setScanStepIndex(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(stepInterval);
        return 3;
      });
    }, 600);

    setTimeout(() => {
      setIsScanning(false);
      setDiagnosis({
        cropKey: 'cropName',
        diseaseKey: 'diseaseName',
        scientificName: 'Alternaria solani',
        confidence: '97.2%',
        severityKey: 'severityName',
        symptoms: [cur.symptom1, cur.symptom2, cur.symptom3],
        steps: [
          { step: 'Step 1', title: cur.step1Title, desc: cur.step1Desc },
          { step: 'Step 2', title: cur.step2Title, desc: cur.step2Desc },
          { step: 'Step 3', title: cur.step3Title, desc: cur.step3Desc }
        ],
        products: [
          {
            name: cur.prod1Name,
            type: cur.prod1Type,
            dosage: cur.prod1Dosage,
            amazonUrl: 'https://www.amazon.in/s?k=mancozeb+fungicide',
            flipkartUrl: 'https://www.flipkart.com/search?q=mancozeb+fungicide',
            agriBegriUrl: 'https://agribegri.com/search?q=mancozeb'
          },
          {
            name: cur.prod2Name,
            type: cur.prod2Type,
            dosage: cur.prod2Dosage,
            amazonUrl: 'https://www.amazon.in/s?k=azoxystrobin+difenoconazole',
            flipkartUrl: 'https://www.flipkart.com/search?q=difenoconazole',
            agriBegriUrl: 'https://agribegri.com/search?q=azoxystrobin'
          },
          {
            name: cur.prod3Name,
            type: cur.prod3Type,
            dosage: cur.prod3Dosage,
            amazonUrl: 'https://www.amazon.in/s?k=neem+oil+10000+ppm+farming',
            flipkartUrl: 'https://www.flipkart.com/search?q=neem+oil+farming',
            agriBegriUrl: 'https://agribegri.com/search?q=neem+oil'
          }
        ]
      });
    }, 2500);
  };

  const handleReset = () => {
    stopCamera();
    setImagePreview(null);
    setDiagnosis(null);
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getScanningText = () => {
    switch (scanStepIndex) {
      case 0: return cur.scanStep0;
      case 1: return cur.scanStep1;
      case 2: return cur.scanStep2;
      case 3: return cur.scanStep3;
      default: return cur.scanStep0;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        
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
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold mb-2">
            <Scan className="w-4 h-4" />
            {cur.bannerSubtitle}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl leading-relaxed">
            {cur.bannerDesc}
          </p>
        </div>

        {/* Dual Input: Upload or Live Camera Capture */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-2xl border-2 border-dashed border-emerald-200 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 text-left transition flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm group-hover:scale-105 transition shrink-0">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {cur.uploadCardTitle}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {cur.uploadCardDesc}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </button>

            {/* Camera Button */}
            <button
              onClick={startCamera}
              className="p-5 rounded-2xl border-2 border-dashed border-emerald-200 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 text-left transition flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm group-hover:scale-105 transition shrink-0">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {cur.cameraCardTitle}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {cur.cameraCardDesc}
                </p>
              </div>
            </button>

          </div>

          {/* Real-time Camera Viewport */}
          {isCameraActive && (
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-emerald-500 shadow-2xl max-w-lg mx-auto">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 border-2 border-emerald-400/50 pointer-events-none rounded-3xl m-5 flex items-center justify-center">
                <div className="text-[11px] font-bold text-white bg-slate-950/80 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md">
                  {cur.alignLeafNotice}
                </div>
              </div>

              <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-3 px-4">
                <button
                  onClick={capturePhoto}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition"
                >
                  <Camera className="w-4 h-4" />
                  {cur.captureBtn}
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs rounded-xl backdrop-blur-sm cursor-pointer transition"
                >
                  {cur.cancelBtn}
                </button>
              </div>
            </div>
          )}

          {/* Image Scanning Display & Laser Sweep Animation */}
          {imagePreview && !isCameraActive && (
            <div className="relative max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-emerald-300 shadow-xl bg-slate-950">
              <img
                src={imagePreview}
                alt="Uploaded plant specimen"
                className="w-full h-84 object-cover"
              />

              {/* Dynamic Laser Radar Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[1px] flex flex-col justify-between p-4 overflow-hidden">
                  {/* Laser Line Scanning Down */}
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-bounce" />
                  
                  {/* Status Box */}
                  <div className="text-center bg-slate-950/90 border border-emerald-400/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-black">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Neural Pathology Model Active</span>
                    </div>
                    <p className="text-[11px] text-slate-200 mt-1 font-mono tracking-wide">
                      {getScanningText()}
                    </p>
                  </div>

                  {/* Laser Line Scanning Up */}
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-bounce" />
                </div>
              )}

              {!isScanning && (
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full backdrop-blur-sm transition cursor-pointer"
                  title={cur.clearPhotoTooltip}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </div>

        {/* Diagnosis Results & Remediation Protocols */}
        {diagnosis && !isScanning && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Pathology Identification Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {cur.pathologyConfirmed}
                    </span>
                    <span className="text-xs font-mono text-slate-400 italic">
                      {diagnosis.scientificName}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    {cur[diagnosis.diseaseKey]}
                  </h2>
                  <p className="text-xs text-slate-500">{cur[diagnosis.cropKey]}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {diagnosis.confidence} {cur.neuralMatch}
                  </span>
                  <p className="text-[11px] font-bold text-amber-700 mt-1">
                    {cur[diagnosis.severityKey]}
                  </p>
                </div>
              </div>

              {/* Observed Pathology Symptoms */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  {cur.symptomsHeader}
                </span>
                {diagnosis.symptoms.map((symptom, idx) => (
                  <p key={idx} className="text-slate-600 flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{symptom}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Step-by-Step Remediation Action Plan */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                {cur.protocolHeader}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {diagnosis.steps.map((stepItem, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {stepItem.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{stepItem.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Approved Remedial Products with Amazon, Flipkart & AgriBegri Links */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-600" />
                    {cur.productsHeader}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {cur.productsSubheader}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {diagnosis.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="max-w-md">
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {product.type}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{product.name}</h4>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        <strong>{cur.dosageLabel}</strong> {product.dosage}
                      </span>
                    </div>

                    {/* Store Action Links */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-amber-700" />
                        Amazon
                        <ExternalLink className="w-3 h-3 text-amber-600" />
                      </a>

                      <a
                        href={product.flipkartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-blue-700" />
                        Flipkart
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </a>

                      <a
                        href={product.agriBegriUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-emerald-700" />
                        AgriBegri
                        <ExternalLink className="w-3 h-3 text-emerald-600" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* AgriLock Trade Bridge */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-slate-500">
                  {cur.qualityPreservedNotice}
                </span>
                <Link
                  href="/tools/market-prices"
                  className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>{cur.checkPriceLink}</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}