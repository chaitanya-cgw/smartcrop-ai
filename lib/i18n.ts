import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'SmartCrop AI',
      tagline: 'Multi-Season Farm Optimization Engine',
      backToDashboard: 'Back to Dashboard',
      nav: {
        dashboard: 'Dashboard',
        optimizer: 'Crop Optimizer',
        calendar: 'Farm Calendar',
        soil: 'Soil Analyser',
        scanner: 'Plant Scanner',
        market: 'Market & Logistics',
        community: 'Community',
        alerts: 'Threat Alerts'
      },
      dashboard: {
        welcome: 'Namaste',
        verifiedFarm: 'Verified Farm',
        heroTitle: 'Lock Mandi Price Before Transit',
        heroSub: 'Guaranteed 6-Hour frozen rates + APMC Escrow Slips. Zero price drops on arrival.',
        launchProtection: 'Launch Protection',
        openMarket: 'Open Market & Lock Price',
        coreTools: 'Core Farming Toolkit'
      },
      market: {
        toolBadge: 'Tool 5 of 8',
        tag: 'Guaranteed Price Lock & Verified Contracts',
        title: 'Smart Market & Enforceable Trade Hub',
        sub: 'Protects farmers from transit price crashes via 6-hour Price Lock Guarantees and APMC Digital Deal Slips.',
        tabMandi: 'Live Mandi Rates',
        tabMerchants: 'Verified Buyers',
        tabDeals: 'Digital Contracts',
        lockRateBtn: 'Lock Rate & Book',
        signDealBtn: 'Sign Deal Lock',
        protectPriceTitle: '1. Transit Price Crash Protection',
        protectPriceDesc: 'Agreed price is locked for 6 hours upon dispatch. The buyer is contractually bound even if market prices plunge during transit.',
        protectEscrowTitle: '2. Anti-Default Escrow Security',
        protectEscrowDesc: 'Every deal generates a tamper-proof Contract ID. Merchants commit advance collateral tokens under APMC regulations.'
      },
      scanner: {
        toolBadge: 'Tool 4 of 8',
        tag: 'Vision AI Leaf Diagnostics',
        title: 'AI Plant Scanner & Leaf Pathology',
        sub: 'Instant diagnosis of crop leaf diseases and automated treatment prescriptions.',
        uploadBox: 'Click or Drag Leaf Photo Here',
        uploadHint: 'Supports JPG, PNG up to 10MB',
        diagnoseBtn: 'Run AI Disease Diagnosis',
        severity: 'Infection Severity',
        prescribedRemedy: 'Prescribed Treatment Action',
        orderCure: 'Order Curative Supplies'
      },
      soil: {
        toolBadge: 'Tool 3 of 8',
        tag: 'Soil Chemistry & Courier Logistics',
        title: 'Soil Analyser & Postal Courier',
        sub: 'Evaluate soil N-P-K chemistry and courier samples to verified district labs via WhatsApp.',
        phLabel: 'Soil pH Level',
        nitrogenLabel: 'Nitrogen (N)',
        phosphorusLabel: 'Phosphorus (P)',
        potassiumLabel: 'Potassium (K)',
        courierTitle: 'Dispatch Sample to District Testing Lab',
        courierDesc: 'Send collected soil packets to local Krishi Vigyan Kendra testing centers.',
        bookCourierBtn: 'Book Sample Courier via WhatsApp'
      },
      optimizer: {
        toolBadge: 'Tool 1 of 8',
        tag: 'Multi-Season Rotational Engine',
        title: 'Crop Rotation Optimizer',
        sub: 'Constraint-based engine balancing soil nutrients, water availability, and seasonal profits.',
        soilType: 'Soil Type',
        season: 'Target Season',
        waterFacility: 'Water Facility',
        budget: 'Capital Budget',
        generateBtn: 'Generate Optimal Sequence',
        addToCalendar: 'Add Recommended Crop to Farm Calendar'
      }
    }
  },
  te: {
    translation: {
      appName: 'స్మార్ట్‌‌క్రాప్ AI',
      tagline: 'రైతుల బహుళ-కాల పంటల ప్రణాళికా వేదిక',
      backToDashboard: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
      nav: {
        dashboard: 'డాష్‌బోర్డ్',
        optimizer: 'పంట ఎంపిక',
        calendar: 'రైతు క్యాలెండర్',
        soil: 'నేల పరీక్ష',
        scanner: 'ఆకు స్కాన్',
        market: 'మార్కెట్ & రవాణా',
        community: 'రైతు వేదిక',
        alerts: 'హెచ్చరికలు'
      },
      dashboard: {
        welcome: 'నమస్కారం',
        verifiedFarm: 'ధృవీకరించబడిన పొలం',
        heroTitle: 'రవాణాకు ముందే మార్కెట్ ధరను లాక్ చేయండి',
        heroSub: '6 గంటల ధర రక్షణ హామీ + APMC డిజిటల్ ఒప్పందాలు. మార్కెట్ వద్ద ధర తగ్గే ప్రమాదం లేదు.',
        launchProtection: 'రక్షణ ప్రారంభించండి',
        openMarket: 'ధరను లాక్ చేయండి',
        coreTools: 'రైతు ప్రధాన సాధనాలు'
      },
      market: {
        toolBadge: 'సాధనం 5/8',
        tag: 'ధర లాక్ హామీ & ధృవీకరించిన ఒప్పందాలు',
        title: 'స్మార్ట్ మార్కెట్ & డిజిటల్ ట్రేడ్ హబ్',
        sub: '6 గంటల ప్రైస్ లాక్ మరియు APMC డీల్ స్లిప్‌ల ద్వారా రైతులకు ధర తగ్గే నష్టం లేకుండా రక్షణ.',
        tabMandi: 'లైవ్ మార్కెట్ ధరలు',
        tabMerchants: 'నమ్మకమైన వ్యాపారులు',
        tabDeals: 'డిజిటల్ ఒప్పందాలు',
        lockRateBtn: 'ధర లాక్ చేసి బుక్ చేయండి',
        signDealBtn: 'ఒప్పందం ఖరారు చేయండి',
        protectPriceTitle: '1. రవాణా సమయంలో ధర పతనం నుండి రక్షణ',
        protectPriceDesc: 'రవాణా ప్రారంభమైన వెంటనే ధర 6 గంటల పాటు లాక్ చేయబడుతుంది. మార్కెట్ ధర తగ్గినా కొనుగోలుదారుడు పూర్తి రేటు చెల్లించాలి.',
        protectEscrowTitle: '2. వ్యాపారి ఎస్క్రో భద్రత & గ్యారెంటీ',
        protectEscrowDesc: 'ప్రతి లావాదేవీకి డిజిటల్ కాంట్రాక్ట్ ID కేటాయించబడుతుంది. వ్యాపారి డిపాజిట్ చేసిన సెక్యూరిటీ టోకెన్ ద్వారా చెల్లింపు రక్షణ.'
      },
      scanner: {
        toolBadge: 'సాధనం 4/8',
        tag: 'విజన్ AI ఆకు తెగుళ్ల గుర్తింపు',
        title: 'AI ప్లాంట్ & ఆకు రోగ నిర్ధారణ',
        sub: 'ఆకుల ఫోటో తీసి వెంటనే తెగుళ్లను గుర్తించి సరైన చికిత్స మందులను తెలుసుకోండి.',
        uploadBox: 'ఆకు ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి',
        uploadHint: 'JPG, PNG ఫార్మాట్లలో గరిష్టంగా 10MB',
        diagnoseBtn: 'తెగులు నిర్ధారణ ప్రారంభించండి',
        severity: 'తెగులు తీవ్రత',
        prescribedRemedy: 'సిఫార్సు చేసిన మందు పిచికారీ',
        orderCure: 'చికిత్స మందులను ఆర్డర్ చేయండి'
      },
      soil: {
        toolBadge: 'సాధనం 3/8',
        tag: 'నేల రసాయన పరీక్ష & కొరియర్ సేవ',
        title: 'నేల పరీక్ష & ల్యాబ్ కొరియర్',
        sub: 'నేలలోని N-P-K శాతాన్ని లెక్కించి దగ్గరలోని ల్యాబ్‌కు సులభంగా కొరియర్ చేయండి.',
        phLabel: 'నేల pH విలువ',
        nitrogenLabel: 'నత్రజని (N)',
        phosphorusLabel: 'భాస్వరం (P)',
        potassiumLabel: 'పొటాషియం (K)',
        courierTitle: 'జిల్లా పరీక్షా కేంద్రానికి నేల నమూనా పంపండి',
        courierDesc: 'సేకరించిన నేల ప్యాకెట్లను కృషి విజ్ఞాన కేంద్రం ల్యాబ్‌కు సురక్షితంగా చేరవేయండి.',
        bookCourierBtn: 'WhatsApp ద్వారా కొరియర్ బుక్ చేయండి'
      },
      optimizer: {
        toolBadge: 'సాధనం 1/8',
        tag: 'బహుళ-కాల పంటల భ్రమణ ఇంజిన్',
        title: 'పంటల భ్రమణ ఇంజిన్',
        sub: 'నేల సారం, నీటి లభ్యత మరియు గరిష్ట లాభం కోసం శాస్త్రీయ పంటల ప్రణాళిక.',
        soilType: 'నేల రకం',
        season: 'పంట కాలం',
        waterFacility: 'నీటి వసతి',
        budget: 'పెట్టుబడి బడ్జెట్',
        generateBtn: 'ఉత్తమ పంటను సూచించండి',
        addToCalendar: 'క్యాలెండర్‌కు జత చేయండి'
      }
    }
  },
  hi: {
    translation: {
      appName: 'स्मार्टक्रॉप AI',
      tagline: 'बहु-फसली कृषि योजना एवं सुरक्षा मंच',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      nav: {
        dashboard: 'डैशबोर्ड',
        optimizer: 'फसल चयन',
        calendar: 'कृषि कैलेंडर',
        soil: 'मिट्टी परीक्षण',
        scanner: 'पौधा स्कैनर',
        market: 'मंडी भाव व व्यापार',
        community: 'किसान समुदाय',
        alerts: 'मौसम चेतावनी'
      },
      dashboard: {
        welcome: 'नमस्ते',
        verifiedFarm: 'प्रमाणित किसान',
        heroTitle: 'मंडी जाने से पहले भाव लॉक करें',
        heroSub: '6 घंटे का गारंटीकृत भाव लॉक + APMC डिजिटल अनुबंध। मंडी पहुंचने पर भाव गिरने की चिंता खत्म।',
        launchProtection: 'सुरक्षा शुरू करें',
        openMarket: 'भाव लॉक करें',
        coreTools: 'प्रमुख कृषि उपकरण'
      },
      market: {
        toolBadge: 'उपकरण 5/8',
        tag: 'गारंटीकृत भाव लॉक व प्रमाणित अनुबंध',
        title: 'स्मार्ट मंडी व सुरक्षित व्यापार केंद्र',
        sub: '6 घंटे के प्राइस लॉक और कानूनी APMC डील स्लिप से किसानों को मूल्य गिरावट से पूर्ण सुरक्षा।',
        tabMandi: 'लाइव मंडी भाव',
        tabMerchants: 'प्रमाणित व्यापारी',
        tabDeals: 'डिजिटल अनुबंध',
        lockRateBtn: 'भाव लॉक व बुक करें',
        signDealBtn: 'अनुबंध सुरक्षित करें',
        protectPriceTitle: '1. परिवहन के दौरान भाव गिरावट से सुरक्षा',
        protectPriceDesc: 'ट्रक रवाना होते ही तय भाव 6 घंटे के लिए लॉक हो जाता है। मंडी में भाव गिरने पर भी व्यापारी पूरा भाव देने के लिए बाध्य है।',
        protectEscrowTitle: '2. व्यापारी एस्क्रो गारंटी',
        protectEscrowDesc: 'प्रत्येक सौदे के लिए डिजिटल अनुबंध ID बनता है। व्यापारी की अग्रिम जमानत राशि द्वारा सुरक्षित भुगतान।'
      },
      scanner: {
        toolBadge: 'उपकरण 4/8',
        tag: 'विज़न AI पत्ती रोग निदान',
        title: 'AI पौधा रोग स्कैनर',
        sub: 'पत्ती के रोगों की तुरंत पहचान और प्रमाणित दवा उपचार।',
        uploadBox: 'पत्ती की तस्वीर यहाँ अपलोड करें',
        uploadHint: 'JPG, PNG फॉर्मेट, अधिकतम 10MB',
        diagnoseBtn: 'रोग का विश्लेषण करें',
        severity: 'रोग गंभीरता',
        prescribedRemedy: 'अनुशंसित कीटनाशक छिड़काव',
        orderCure: 'उपचार दवा ऑर्डर करें'
      },
      soil: {
        toolBadge: 'उपकरण 3/8',
        tag: 'मृदा रसायन एवं कूरियर रसद',
        title: 'मृदा परीक्षण एवं कूरियर सेवा',
        sub: 'मिट्टी के N-P-K तत्वों की जांच और प्रयोगशाला कूरियर सेवा।',
        phLabel: 'मिट्टी का pH',
        nitrogenLabel: 'नाइट्रोजन (N)',
        phosphorusLabel: 'फास्फोरस (P)',
        potassiumLabel: 'पोटेशियम (K)',
        courierTitle: 'जिला परीक्षण केंद्र को मिट्टी का नमूना भेजें',
        courierDesc: 'कृषि विज्ञान केंद्र की परीक्षण प्रयोगशाला में नमूना सुरक्षित रूप से भेजें।',
        bookCourierBtn: 'WhatsApp से कूरियर बुक करें'
      },
      optimizer: {
        toolBadge: 'उपकरण 1/8',
        tag: 'फसल चक्र अनुकूलन इंजन',
        title: 'वैज्ञानिक फसल चक्र योजना',
        sub: 'मिट्टी की उर्वरता, पानी और अधिकतम लाभ के लिए संतुलित फसल अनुक्रम।',
        soilType: 'मिट्टी का प्रकार',
        season: 'फसल मौसम',
        waterFacility: 'सिंचाई का साधन',
        budget: 'लागत बजट',
        generateBtn: 'सर्वश्रेष्ठ फसल अनुक्रम खोजें',
        addToCalendar: 'कैलेंडर में जोड़ें'
      }
    }
  },
  ta: {
    translation: {
      appName: 'ஸ்மார்ட்கிராப் AI',
      tagline: 'விவசாயிகளுக்கான பல-பருவ பயிர் திட்டமிடல் தளம்',
      backToDashboard: 'முகப்பு பக்கத்திற்கு திரும்பு',
      nav: {
        dashboard: 'முகப்பு',
        optimizer: 'பயிர் திட்டம்',
        calendar: 'பயிர் காலண்டர்',
        soil: 'மண் பரிசோதனை',
        scanner: 'இலை ஸ்கேனர்',
        market: 'சந்தை & போக்குவரத்து',
        community: 'விவசாயிகள் சங்கம்',
        alerts: 'எச்சரிக்கைகள்'
      },
      dashboard: {
        welcome: 'வணக்கம்',
        verifiedFarm: 'சரிபார்க்கப்பட்ட பண்ணை',
        heroTitle: 'போக்குவரத்திற்கு முன் சந்தை விலையை லாக் செய்யவும்',
        heroSub: '6 மணி நேர விலை பாதுகாப்பு உத்தரவாதம் + APMC ஒப்பந்தங்கள். விலை வீழ்ச்சி இல்லை.',
        launchProtection: 'பாதுகாப்பை தொடங்கு',
        openMarket: 'விலையை லாக் செய்க',
        coreTools: 'முதன்மை விவசாய கருவிகள்'
      },
      market: {
        toolBadge: 'கருவி 5/8',
        tag: 'விலை லாக் உத்தரவாதம் & APMC ஒப்பந்தங்கள்',
        title: 'ஸ்மார்ட் சந்தை & வர்த்தக தளம்',
        sub: '6 மணி நேர விலை லாக் மற்றும் APMC டிஜிட்டல் ஒப்பந்தங்கள் மூலம் விவசாயிகளுக்கு முழு பாதுகாப்பு.',
        tabMandi: 'நேரடி சந்தை விலை',
        tabMerchants: 'சரிபார்க்கப்பட்ட வியாபாரிகள்',
        tabDeals: 'டிஜிட்டல் ஒப்பந்தங்கள்',
        lockRateBtn: 'விலை லாக் செய்து புக் செய்க',
        signDealBtn: 'ஒப்பந்தத்தை உறுதிசெய்க',
        protectPriceTitle: '1. போக்குவரத்து விலை வீழ்ச்சி தடுப்பு',
        protectPriceDesc: 'வாகனம் புறப்பட்டதும் 6 மணி நேரம் விலை பூட்டப்படும். சந்தையில் விலை குறைந்தாலும் ஒப்புக்கொண்ட விலை கிடைக்கும்.',
        protectEscrowTitle: '2. வியாபாரி பாதுகாப்பு வைப்பு',
        protectEscrowDesc: 'ஒவ்வொரு வர்த்தகத்திற்கும் டிஜிட்டல் ஒப்பந்த ID உருவாக்கப்படுகிறது. வியாபாரியின் வைப்புத்தொகை மூலம் முழு பாதுகாப்பு.'
      },
      scanner: {
        toolBadge: 'கருவி 4/8',
        tag: 'AI இலை நோய் கண்டறிதல்',
        title: 'AI இலை நோய் ஸ்கேனர்',
        sub: 'பயிர் இலை நோய்களை உடனடியாக கண்டறிந்து சிகிச்சை பெறவும்.',
        uploadBox: 'இலை படத்தை இங்கே பதிவேற்றவும்',
        uploadHint: 'JPG, PNG வடிவங்கள், அதிகபட்சம் 10MB',
        diagnoseBtn: 'நோய் கண்டறிதலை தொடங்கு',
        severity: 'நோயின் தீவிரம்',
        prescribedRemedy: 'மருந்து தெளிக்கும் முறை',
        orderCure: 'மருந்தை ஆர்டர் செய்க'
      },
      soil: {
        toolBadge: 'கருவி 3/8',
        tag: 'மண் வேதியியல் & கூரியர் சேவை',
        title: 'மண் பரிசோதனை & கூரியர்',
        sub: 'மண்ணின் N-P-K ஊட்டச்சத்துக்களை ஆய்வு செய்து ஆய்வகத்திற்கு அனுப்பவும்.',
        phLabel: 'மண் pH மதிப்பு',
        nitrogenLabel: 'நைட்ரஜன் (N)',
        phosphorusLabel: 'பாஸ்பரஸ் (P)',
        potassiumLabel: 'பொட்டாசியம் (K)',
        courierTitle: 'மாவட்ட ஆய்வகத்திற்கு மண் மாதிரி அனுப்பவும்',
        courierDesc: 'வேளாண் அறிவியல் மைய ஆய்வகத்திற்கு மண் மாதிரிகளை அனுப்பவும்.',
        bookCourierBtn: 'WhatsApp மூலம் கூரியர் முன்பதிவு செய்க'
      },
      optimizer: {
        toolBadge: 'கருவி 1/8',
        tag: 'பல-பருவ பயிர் சுழற்சி முறை',
        title: 'பயிர் சுழற்சி முறை',
        sub: 'மண் வளம், நீர் ஆதாரம் மற்றும் அதிக லாபத்திற்கான சிறந்த பயிர் தேர்வு.',
        soilType: 'மண் வகை',
        season: 'பயிர் பருவம்',
        waterFacility: 'நீர் ஆதாரம்',
        budget: 'மூலதன செலவு',
        generateBtn: 'சிறந்த பயிரை காண்க',
        addToCalendar: 'காலண்டரில் சேர்க்க'
      }
    }
  }
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'en' : 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
}

export default i18n;