export type Language = 'en' | 'te' | 'hi' | 'ta';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    backToDashboard: "Back to Dashboard",
    dashboard: "Dashboard",
    signOut: "Sign Out",
    tagline: "Farmer Forward-Contract Protocol",
    activeProtocol: "AgriLock Protocol Active",
    heroBadge: "Primary Trading Protocol • 6-Hour Transit Guarantee",
    heroTitle: "AgriLock Market & Digital Contract Hub",
    heroDesc: "Protecting farmers from mandi price crashes during vehicle transit and preventing merchant payment refusals via escrow-bonded APMC digital deal slips.",
    lockPricesBtn: "Lock Prices & Book Deals",
    farmOpsTitle: "Farm Operations & Production Planning",
    launchTool: "Launch Tool",
    
    // Tools
    tool1Title: "Crop Rotation Optimizer",
    tool1Desc: "Balance multi-season N-P-K soil depletion and forecast harvest dates.",
    tool1Badge: "Seasonal Planning",
    
    tool2Title: "Multi-Plot Calendar",
    tool2Desc: "Manage summer and winter rotation schedules to break pathogen cycles.",
    tool2Badge: "Plot Schedules",
    
    tool3Title: "Soil Analyser & Lab Courier",
    tool3Desc: "Measure soil chemistry and dispatch samples to testing labs via India Post.",
    tool3Badge: "Lab Logistics",
    
    tool4Title: "AI Plant Scanner",
    tool4Desc: "Detect leaf diseases and automate curative chemical reorders.",
    tool4Badge: "Vision Health",
    
    tool5Title: "Smart Market & Enforceable Trade Hub",
    tool5Desc: "6-Hour transit price locking and escrow-backed merchant commitments.",
    tool5Badge: "Mandi Trading",

    tool6Title: "Verified Farmer Forum & Schemes",
    tool6Desc: "Connect with verified farmers and apply directly for PM-Kisan & Rythu Bharosa.",
    tool6Badge: "Subsidies",
    
    tool7Title: "Risk & Weather Alerts",
    tool7Desc: "Real-time IMD hazard notifications and sudden frost/cyclone warnings.",
    tool7Badge: "Live Radar",

    // Soil Analyser
    soilFit: "Land is 100% Fit for Cultivation",
    soilUnfit: "Land is Unfit for Agriculture",
    fixLandBtn: "Fix Land & View Restoration Protocol",
    dispatchSampleBtn: "Dispatch Soil Sample to ICAR Govt Lab",
    selectState: "Select State",
    selectDistrict: "District / Area",

    // Plant Scanner
    uploadPhoto: "Upload Leaf Photo",
    takePhoto: "Take Live Photo",
    captureBtn: "Capture Leaf",
    diagnosing: "Analyzing Neural Vision Layer...",
    stepsToFix: "Detailed Remediation Protocol to Fix the Infection",
    buyProducts: "Approved Remedial Products & Buying Links",

    // Market Hub
    mandiBenchmark: "Mandi Benchmark Prices with Price-Lock Protection",
    verifiedBuyers: "Bonded APMC Buyers with Security Collateral",
    digitalContracts: "Active Legal Deal Contracts & Security Tokens",
    lockRateBtn: "Lock Rate & Book"
  },
  te: {
    backToDashboard: "డ్యాష్‌బోర్డుకు తిరిగి వెళ్ళండి",
    dashboard: "డ్యాష్‌బోర్డు",
    signOut: "లాగ్ అవుట్",
    tagline: "రైతు ముందస్తు ఒప్పంద విధానం",
    activeProtocol: "అగ్రిలాక్ విధానం అమలులో ఉంది",
    heroBadge: "ప్రాథమిక వాణిజ్య విధానం • 6 గంటల రవాణా ధర రక్షణ",
    heroTitle: "అగ్రిలాక్ మార్కెట్ & డిజిటల్ ఒప్పంద కేంద్రం",
    heroDesc: "రవాణా సమయంలో మార్కెట్ ధరలు తగ్గకుండా 6 గంటల ధర లాక్ మరియు వ్యాపారులు మోసం చేయకుండా APMC డిజిటల్ డీల్ స్లిప్‌ల భద్రత.",
    lockPricesBtn: "ధరను లాక్ చేయండి & డీల్ బుక్ చేయండి",
    farmOpsTitle: "వ్యవసాయ కార్యకలాపాలు & ప్రణాళిక",
    launchTool: "టూల్ ప్రారంభించండి",
    
    tool1Title: "పంట మార్పిడి ఆప్టిమైజర్",
    tool1Desc: "నేలలో N-P-K పోషకాల సమతుల్యత మరియు దిగుబడి అంచనా.",
    tool1Badge: "సీజన్ ప్రణాళిక",
    
    tool2Title: "మల్టీ-ప్లాట్ క్యాలెండర్",
    tool2Desc: "విత్తే సమయం, ఎరువుల షెడ్యూల్ మరియు పంట మార్పిడి తేదీలు.",
    tool2Badge: "ప్లాట్ ప్రణాళిక",
    
    tool3Title: "నేల పరీక్ష & ల్యాబ్ కొరియర్",
    tool3Desc: "నేల సారాన్ని కొలవండి మరియు పోస్టల్ ద్వారా ల్యాబ్‌కు పంపండి.",
    tool3Badge: "ల్యాబ్ సేవలు",
    
    tool4Title: "AI ఆకు & పంట స్కానర్",
    tool4Desc: "ఆకు తెగుళ్లను గుర్తించండి మరియు సరైన మందులను ఆర్డర్ చేయండి.",
    tool4Badge: "రోగ నిర్ధారణ",
    
    tool5Title: "స్మార్ట్ మార్కెట్ & ట్రేడ్ హబ్",
    tool5Desc: "6 గంటల ధర లాక్ గ్యారెంటీ మరియు డిజిటల్ కాంట్రాక్టులు.",
    tool5Badge: "మండి వ్యాపారం",

    tool6Title: "రైతు సంఘం & ప్రభుత్వ పథకాలు",
    tool6Desc: "పీఎం-కిసాన్ మరియు రైతు భరోసా పథకాలకు దరఖాస్తు చేసుకోండి.",
    tool6Badge: "సబ్సిడీలు",
    
    tool7Title: "వాతావరణ & రిస్క్ హెచ్చరికలు",
    tool7Desc: "వర్షాలు, తుఫానులు మరియు వాతావరణ సమాచార హెచ్చరికలు.",
    tool7Badge: "లైవ్ రాడార్",

    soilFit: "భూమి వ్యవసాయానికి 100% అనుకూలంగా ఉంది",
    soilUnfit: "భూమి వ్యవసాయానికి అనుకూలంగా లేదు",
    fixLandBtn: "భూమిని బాగుచేయండి & నివారణ పద్ధతులు చూడండి",
    dispatchSampleBtn: "ICAR ప్రభుత్వ ల్యాబ్‌కు నేల నమూనా పంపండి",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrict: "జిల్లా / ప్రాంతం",

    uploadPhoto: "ఆకు ఫోటో అప్‌‌లోడ్ చేయండి",
    takePhoto: "నేరుగా ఫోటో తీయండి",
    captureBtn: "ఫోటో తీయండి",
    diagnosing: "రోగ నిర్ధారణ జరుగుతోంది...",
    stepsToFix: "తెగులు నివారణకు వివరణాత్మక చర్యలు",
    buyProducts: "సిఫార్సు చేసిన మందులు & కొనుగోలు లింకులు",

    mandiBenchmark: "ధర లాక్ రక్షణతో కూడిన తాజా మండి ధరలు",
    verifiedBuyers: "ధరావతు డిపాజిట్ కలిగిన ధృవీకృత APMC వ్యాపారులు",
    digitalContracts: "చట్టబద్ధమైన డిజిటల్ ఒప్పందాలు & రవాణా స్లిప్‌లు",
    lockRateBtn: "ధరను లాక్ చేయండి"
  },
  hi: {
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    dashboard: "डैशबोर्ड",
    signOut: "साइन आउट",
    tagline: "किसान अग्रिम अनुबंध प्रणाली",
    activeProtocol: "एग्रीलॉक प्रोटोकॉल सक्रिय",
    heroBadge: "मुख्य व्यापार प्रोटोकॉल • 6 घंटे की पारगमन मूल्य सुरक्षा",
    heroTitle: "एग्रीलॉक मंडी बाजार और डिजिटल अनुबंध केंद्र",
    heroDesc: "परिवहन के दौरान मंडी भाव में गिरावट से सुरक्षा और व्यापारी मुकर जाने से बचाव के लिए डिजिटल APMC डील स्लिप।",
    lockPricesBtn: "भाव लॉक करें और सौदा पक्का करें",
    farmOpsTitle: "कृषि कार्य और उत्पादन योजना",
    launchTool: "टूल खोलें",
    
    tool1Title: "फसल चक्र अनुकूलक",
    tool1Desc: "मिट्टी के N-P-K पोषक तत्वों का संतुलन और पैदावार का पूर्वानुमान।",
    tool1Badge: "मौसमी योजना",
    
    tool2Title: "खेत कैलेंडर",
    tool2Desc: "बुवाई, सिंचाई और रोग नियंत्रण के लिए विस्तृत समय सारणी।",
    tool2Badge: "खेत अनुसूची",
    
    tool3Title: "मृदा विश्लेषक और लैब कूरियर",
    tool3Desc: "मिट्टी की उर्वरता जांचें और डाक द्वारा लैब में नमूना भेजें।",
    tool3Badge: "प्रयोगशाला",
    
    tool4Title: "एआई पत्ता और पौधा स्कैनर",
    tool4Desc: "पत्तियों के रोगों की पहचान करें और तुरंत उपचार मंगवाएं।",
    tool4Badge: "रोग पहचान",
    
    tool5Title: "मंडी व्यापार और अनुबंध केंद्र",
    tool5Desc: "6 घंटे की मूल्य गारंटी और प्रमाणित डिजिटल डील स्लिप।",
    tool5Badge: "मंडी भाव",

    tool6Title: "किसान मंच और सरकारी योजनाएं",
    tool6Desc: "पीएम-किसान और राज्य कृषि सहायता योजनाओं के लिए आवेदन करें।",
    tool6Badge: "सरकारी लाभ",
    
    tool7Title: "मौसम और जोखिम अलर्ट",
    tool7Desc: "मौसम विभाग की भारी बारिश और ओलावृष्टि की समय पूर्व चेतावनी।",
    tool7Badge: "मौसम रडार",

    soilFit: "जमीन कृषि के लिए 100% उपयुक्त है",
    soilUnfit: "जमीन कृषि के लिए अनुपयुक्त है",
    fixLandBtn: "जमीन सुधारें और उपचार उपाय देखें",
    dispatchSampleBtn: "सरकारी प्रयोगशाला में मिट्टी नमूना भेजें",
    selectState: "राज्य चुनें",
    selectDistrict: "जिला / क्षेत्र",

    uploadPhoto: "पत्ते की फोटो अपलोड करें",
    takePhoto: "सीधे कैमरा से फोटो लें",
    captureBtn: "फोटो खींचें",
    diagnosing: "एआई रोग विश्लेषण कर रहा है...",
    stepsToFix: "फसल रोग ठीक करने के विस्तृत चरण",
    buyProducts: "प्रमाणित कीटनाशक और खरीदने के लिंक",

    mandiBenchmark: "मूल्य-लॉक गारंटी के साथ ताज़ा मंडी भाव",
    verifiedBuyers: "जमानत राशि जमा करने वाले सत्यापित APMC व्यापारी",
    digitalContracts: "सक्रिय कानूनी डिजिटल सौदे और रसीदें",
    lockRateBtn: "भाव लॉक करें"
  },
  ta: {
    backToDashboard: "முகப்புக்குத் திரும்பு",
    dashboard: "முகப்பு",
    signOut: "வெளியேறு",
    tagline: "விவசாயிகள் முன்கூட்டிய வர்த்தக ஒப்பந்தம்",
    activeProtocol: "அக்ரிலாக் சேவை செயலில் உள்ளது",
    heroBadge: "முதன்மை வர்த்தக முறை • 6 மணி நேர விலை பாதுகாப்பு",
    heroTitle: "அக்ரிலாக் சந்தை & டிஜிட்டல் ஒப்பந்த மையம்",
    heroDesc: "சரக்கு போக்குவரத்தின் போது விலை சரிவிலிருந்து 6 மணி நேரப் பாதுகாப்பு மற்றும் வியாபாரிகள் ஏமாற்றாமல் இருக்க APMC டிஜிட்டல் ஒப்பந்தம்.",
    lockPricesBtn: "விலையை பூட்டி ஒப்பந்தம் செய்க",
    farmOpsTitle: "பண்ணை பணிகள் மற்றும் திட்டமிடல்",
    launchTool: "தொடங்குக",
    
    tool1Title: "பயிர் சுழற்சி அமைப்பாளர்",
    tool1Desc: "மண்ணின் சத்துக்களை மீட்கவும் விளைச்சலை அதிகரிக்கவும் வழிகாட்டி.",
    tool1Badge: "பயிர் திட்டம்",
    
    tool2Title: "பண்ணை காலண்டர்",
    tool2Desc: "விதைப்பு, நீர் பாய்ச்சுதல் மற்றும் மருந்து தெளிக்கும் அட்டவணை.",
    tool2Badge: "அட்டவணை",
    
    tool3Title: "மண் பரிசோதனை & கூரியர்",
    tool3Desc: "மண் தரத்தை அளவிட்டு தபால் மூலம் அரசு ஆய்வகத்திற்கு அனுப்புக.",
    tool3Badge: "ஆய்வகம்",
    
    tool4Title: "AI இலை & பயிர் ஸ்கேனர்",
    tool4Desc: "இலை நோய்களைக் கண்டறிந்து சரியான மருந்துகளை ஆர்டர் செய்க.",
    tool4Badge: "நோய் கண்டறிதல்",
    
    tool5Title: "சந்தை & வர்த்தக மையம்",
    tool5Desc: "6 மணி நேர விலை பாதுகாப்பு மற்றும் உறுதிசெய்யப்பட்ட ஒப்பந்தங்கள்.",
    tool5Badge: "சந்தை வர்த்தகம்",

    tool6Title: "விவசாயிகள் மன்றம் & மானியங்கள்",
    tool6Desc: "பிஎம்-கிசான் மற்றும் அரசு மானியங்களுக்கு விண்ணப்பிக்கவும்.",
    tool6Badge: "மானியங்கள்",
    
    tool7Title: "வானிலை & அவசர எச்சரிக்கைகள்",
    tool7Desc: "மழை, புயல் மற்றும் பூச்சி தாக்குதல் பற்றிய உடனடி எச்சரிக்கைகள்.",
    tool7Badge: "வானிலை",

    soilFit: "நிலம் விவசாயத்திற்கு 100% தகுதியானது",
    soilUnfit: "நிலம் விவசாயத்திற்கு ஏற்றதல்ல",
    fixLandBtn: "நிலத்தை சீரமைக்கும் வழிகள்",
    dispatchSampleBtn: "அரசு ஆய்வகத்திற்கு மண் மாதிரி அனுப்புக",
    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrict: "மாவட்டம் / பகுதி",

    uploadPhoto: "புகைப்படம் பதிவேற்றவும்",
    takePhoto: "நேரடியாக படம் எடுக்கவும்",
    captureBtn: "படம் எடு",
    diagnosing: "நோய் பகுப்பாய்வு செய்யப்படுகிறது...",
    stepsToFix: "நோயை குணப்படுத்த விரிவான வழிகள்",
    buyProducts: "பரிந்துரைக்கப்பட்ட மருந்துகள் & வாங்கும் இணைப்புகள்",

    mandiBenchmark: "விலை பாதுகாப்புடன் கூடிய சந்தை நிலவரம்",
    verifiedBuyers: "வைப்புத்தொகை செலுத்திய அங்கீகரிக்கப்பட்ட APMC வியாபாரிகள்",
    digitalContracts: "டிஜிட்டல் ஒப்பந்தங்கள் & ரசீதுகள்",
    lockRateBtn: "விலையை பூட்டுக"
  }
};