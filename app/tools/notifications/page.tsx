'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  ArrowLeft, 
  AlertTriangle, 
  CloudRain, 
  Wind, 
  ThermometerSnowflake, 
  Bug, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Filter, 
  ChevronRight,
  ExternalLink,
  Volume2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface AlertItem {
  id: string;
  category: 'Weather Hazard' | 'Pest Outbreak' | 'Mandi Price Shock' | 'Advisory';
  severity: 'Critical' | 'Warning' | 'Advisory';
  timeKey: string;
  titleKey: string;
  messageKey: string;
  impactKey: string;
  actionKey: string;
  actionHref: string;
  regionKey: string;
}

export default function NotificationsPage() {
  const { t, lang } = useToolTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Complete localized dictionary across EN, TE, HI, TA
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 7 of 7 • Early Warning & Risk Broadcasts",
      bannerTitle: "Risk & Weather Warning Center",
      bannerSubtitle: "Meteorological Hazards & Biosecurity Alerts",
      bannerDesc: "Real-time meteorological warnings, pest outbreak advisories, and APMC mandi volatility signals. Take preventative field measures or trigger guaranteed 6-hour transit price locks before market crashes occur.",

      filterAll: "All Alerts",
      filterWeather: "Weather Hazards",
      filterPest: "Pest Outbreaks",
      filterMandi: "Mandi Price Shocks",

      liveRadarBadge: "IMD Doppler Radar Connected",
      activeAlertsCount: "Active Regional Advisories",
      criticalBadge: "High Priority Alert",
      warningBadge: "Regional Warning",
      advisoryBadge: "Agronomy Advisory",
      impactLabel: "Projected Farm Impact:",
      recommendedAction: "Action Required:",
      lockPriceBtn: "Lock Transit Price Now",
      viewRemedyBtn: "Open Plant Scanner Diagnostic",
      checkCalendarBtn: "Adjust Plot Schedule",

      // Alert 1: Unseasonal Rainfall & Cyclonic Wind
      a1_title: "Unseasonal Cyclonic Hail & Rain Storm in 48 Hours",
      a1_msg: "IMD Doppler radar tracking intense depression over the Bay of Bengal. Gusts of 45-55 km/h and localized hail expected across Northern Telangana and Coastal AP.",
      a1_impact: "Open-air drying paddy grain discolouration, open cotton boll shedding, and lodging in tall maize crops.",
      a1_action: "Expedite harvest bagging and lock transport transit rate on AgriLock before mandi arrivals crash.",
      a1_time: "Issued 35 mins ago",
      a1_region: "Warangal, Nizamabad & Khammam Belt",

      // Alert 2: Fall Armyworm Pest Alert
      a2_title: "Spodoptera frugiperda (Fall Armyworm) Surge",
      a2_msg: "State Entomology survey detected 16% vegetative whorl damage in late-sown maize and sorghum fields in neighboring mandals.",
      a2_impact: "Severe foliar windowing and central whorl destruction reducing photosynthesis by up to 35%.",
      a2_action: "Install 5 pheromone traps per acre and apply Emamectin Benzoate 5% SG @ 80g/acre.",
      a2_time: "Issued 3 hours ago",
      a2_region: "Karimnagar & Medak Districts",

      // Alert 3: Mandi Price Crash
      a3_title: "Tomato Mandi Supply Glut & Volatility Alert",
      a3_msg: "Excessive truck arrivals (over 850 tonnes) entering Bowenpally & Madanapalle APMC yards. Spot auction prices dropping sharply.",
      a3_impact: "Unhedged open consignments risk selling below production cost (under ₹12/kg).",
      a3_action: "Exercise 6-hour transit price protection on AgriLock to guarantee your pre-dispatch locked rate.",
      a3_time: "Issued 5 hours ago",
      a3_region: "Bowenpally & Madanapalle APMC Markets",

      // Alert 4: Cold Wave & Dew Condensation
      a4_title: "Ground Dew Condensation & Fungal Blight Risk",
      a4_msg: "Night temperatures dipping to 13°C with morning relative humidity exceeding 92%. Ideal micro-climate for Alternaria foliar blight.",
      a4_impact: "High risk of rapid blight spread on tomato, potato, and chili crops within 3-5 days.",
      a4_action: "Perform preventative foliar spray with Mancozeb 75% WP @ 2.5g/L before morning dew settles.",
      a4_time: "Issued Yesterday",
      a4_region: "Rangareddy & Mahabubnagar"
    },
    te: {
      badgeText: "టూల్ 7 / 7 • ముందస్తు ప్రమాద హెచ్చరికలు",
      bannerTitle: "వాతావరణ & రిస్క్ హెచ్చరికల కేంద్రం",
      bannerSubtitle: "వాతావరణ వైపరీత్యాలు & తెగుళ్ల సమాచార వేదిక",
      bannerDesc: "వాతావరణ శాఖ (IMD) హెచ్చరికలు, పురుగుల ఉధృతి మరియు మార్కెట్ ధరల హెచ్చుతగ్గుల ప్రత్యక్ష సమాచారం. పంట నష్టాన్ని నివారించండి మరియు అగ్రిలాక్ 6-గంటల ధర లాక్ ద్వారా నష్టాల నుండి రక్షణ పొందండి.",

      filterAll: "అన్ని హెచ్చరికలు",
      filterWeather: "వాతావరణ ముప్పు",
      filterPest: "తెగుళ్ల వ్యాప్తి",
      filterMandi: "మార్కెట్ ధరల ఒడిదుడుకులు",

      liveRadarBadge: "IMD రాడార్ అనుసంధానమైంది",
      activeAlertsCount: "ప్రస్తుతం అమల్లో ఉన్న హెచ్చరికలు",
      criticalBadge: "అత్యవసర హెచ్చరిక",
      warningBadge: "ప్రాంతీయ హెచ్చరిక",
      advisoryBadge: "వ్యవసాయ సలహా",
      impactLabel: "పంటపై పడే ప్రభావం:",
      recommendedAction: "చేయవలసిన తక్షణ చర్య:",
      lockPriceBtn: "ధరను ఇప్పుడే లాక్ చేయండి",
      viewRemedyBtn: "ఆకు స్కానర్‌లో మందులు చూడండి",
      checkCalendarBtn: "క్యాలెండర్ షెడ్యూల్ మార్చండి",

      a1_title: "రాబోయే 48 గంటల్లో అకాల ఉరుములు మరియు వడగండ్ల వాన",
      a1_msg: "బంగాళాఖాతంలో వాయుగుండం తీవ్రమై 45-55 కి.మీ వేగంతో ఈదురు గాలులు మరియు వడగండ్ల వర్షం కురిసే అవకాశం ఉంది.",
      a1_impact: "కల్లాల్లో ఉన్న ధాన్యం తడవడం, పత్తి కాయలు నేలరాలడం మరియు మొక్కజొన్న పైరు పడిపోయే ప్రమాదం ఉంది.",
      a1_action: "ధాన్యాన్ని గోతాల్లో భద్రపరచండి మరియు మార్కెట్ ధర తగ్గకముందే అగ్రిలాక్‌లో రవాణా ధరను లాక్ చేయండి.",
      a1_time: "35 నిమిషాల క్రితం జారీ చేయబడింది",
      a1_region: "వరంగల్, నిజామాబాద్ & ఖమ్మం బెల్ట్",

      a2_title: "మొక్కజొన్నలో కత్తెర పురుగు (Fall Armyworm) ఉధృతి",
      a2_msg: "పొరుగు మండలాల్లోని ఆలస్యపు మొక్కజొన్న మరియు జొన్న పైర్లలో 16% వరకు కత్తెర పురుగు ఆశించినట్లు గుర్తించారు.",
      a2_impact: "ఆకుల సుడులను పురుగులు తినేయడం వల్ల మొక్క ఎదుగుదల ఆగిపోయి 35% వరకు దిగుబడి తగ్గే ప్రమాదం.",
      a2_action: "ఎకరానికి 5 లింగాకర్షక బుట్టలు అమర్చండి మరియు ఎమామెక్టిన్ బెంజోయేట్ 5% SG @ 80 గ్రా/ఎకరానికి పిచికారీ చేయండి.",
      a2_time: "3 గంటల క్రితం జారీ చేయబడింది",
      a2_region: "కరీంనగర్ & మెదక్ జిల్లాలు",

      a3_title: "టమోటా మార్కెట్‌కు భారీ రాక & ధర పతనం హెచ్చరిక",
      a3_msg: "బోయిన్‌పల్లి మరియు మదనపల్లె మార్కెట్లకు భారీగా (850 టన్నులకు పైగా) టమోటా రాక పెరగడం వల్ల వేలం ధరలు పడిపోతున్నాయి.",
      a3_impact: "రక్షణ లేని సాధారణ సరుకు రవాణాలో క్వింటాల్ ధర తీవ్రంగా తగ్గి నష్టపోయే ప్రమాదం ఉంది.",
      a3_action: "అగ్రిలాక్ 6-గంటల ధర లాక్ ఉపయోగించి మీ ముందస్తు ధరను భద్రపరుచుకుని మాత్రమే వాహనాన్ని పంపండి.",
      a3_time: "5 గంటల క్రితం జారీ చేయబడింది",
      a3_region: "బోయిన్‌పల్లి & మదనపల్లె మార్కెట్లు",

      a4_title: "రాత్రి చలిగాలులు & ఆకు మచ్చ తెగులు ముప్పు",
      a4_msg: "రాత్రి ఉష్ణోగ్రతలు 13°C పడిపోవడం మరియు ఉదయం తేమ 92% మించడం వల్ల ఆల్టర్నేరియా ఆకు తెగులు వ్యాపించే అవకాశం ఉంది.",
      a4_impact: "టమోటా, బంగాళాదుంప మరియు మిరప పంటలలో 3-5 రోజుల్లో తెగులు వేగంగా వ్యాపించే ప్రమాదం.",
      a4_action: "ఉదయం మంచు ఆరిన వెంటనే మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీటరు చొప్పున ముందుజాగ్రత్తగా పిచికారీ చేయండి.",
      a4_time: "నిన్న జారీ చేయబడింది",
      a4_region: "రంగారెడ్డి & మహబూబ్‌నగర్"
    },
    hi: {
      badgeText: "टूल 7 / 7 • प्रारंभिक चेतावनी एवं मौसम रडार",
      bannerTitle: "जोखिम एवं मौसम चेतावनी केंद्र",
      bannerSubtitle: "मौसम विभाग चेतावनी एवं जैव-सुरक्षा अलर्ट",
      bannerDesc: "मौसम विभाग (IMD) की भारी बारिश की चेतावनियां, कीट प्रकोप और मंडी भाव में गिरावट के संकेत। समय रहते खेत में बचाव के उपाय करें और एग्रीलॉक 6-घंटे मूल्य सुरक्षा द्वारा नुकसान से बचें।",

      filterAll: "सभी चेतावनियां",
      filterWeather: "मौसम का खतरा",
      filterPest: "कीट प्रकोप",
      filterMandi: "मंडी भाव में उतार-चढ़ाव",

      liveRadarBadge: "IMD डॉपलर रडार सक्रिय",
      activeAlertsCount: "सक्रिय क्षेत्रीय चेतावनियां",
      criticalBadge: "अत्यधिक गंभीर चेतावनी",
      warningBadge: "क्षेत्रीय चेतावनी",
      advisoryBadge: "कृषि परामर्श",
      impactLabel: "फसल पर संभावित प्रभाव:",
      recommendedAction: "आवश्यक त्वरित कदम:",
      lockPriceBtn: "मंडी भाव तुरंत लॉक करें",
      viewRemedyBtn: "प्लांट स्कैनर से दवा देखें",
      checkCalendarBtn: "कैलेंडर कार्य बदलें",

      a1_title: "अगले 48 घंटों में बेमौसम ओलावृष्टि एवं चक्रवाती तूफान",
      a1_msg: "बंगाल की खाड़ी में बने गहरे दबाव से 45-55 किमी/घंटे की आंधी और ओले गिरने की संभावना है।",
      a1_impact: "खलिहान में रखी धान भीगने, कपास के डोडे झड़ने और मक्का की फसल गिरने का गंभीर खतरा।",
      a1_action: "कटी फसल को बोरों में सुरक्षित करें और मंडी भाव गिरने से पहले एग्रीलॉक पर भाव लॉक करें।",
      a1_time: "35 मिनट पहले जारी",
      a1_region: "वारंगल, निजामाबाद एवं खम्मम क्षेत्र",

      a2_title: "मक्का में फॉल आर्मीवर्म कीट प्रकोप का अलर्ट",
      a2_msg: "पड़ोसी मंडलों में देर से बोई गई मक्का की फसल में 16% तक पत्तियों के चक्र को नुकसान पहुंचा है।",
      a2_impact: "पत्तियों के छेद होने से प्रकाश संश्लेषण रुक जाएगा और पैदावार में 35% तक गिरावट आ सकती है।",
      a2_action: "प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं और इमामेक्टिन बेंजोएट 5% SG @ 80 ग्राम/एकड़ का छिड़काव करें।",
      a2_time: "3 घंटे पहले जारी",
      a2_region: "करीमनगर एवं मेदक जिले",

      a3_title: "टमाटर मंडी में भारी आवक एवं भाव गिरावट अलर्ट",
      a3_msg: "बोवेनपल्ली एवं मदनपल्ले मंडियों में 850 टन से अधिक टमाटर आने से थोक नीलामी भाव तेजी से गिर रहे हैं।",
      a3_impact: "खुले सौदे लागत मूल्य (₹12/किग्रा से कम) पर बिकने का गंभीर आर्थिक जोखिम।",
      a3_action: "एग्रीलॉक 6-घंटे मूल्य सुरक्षा लेकर ही वाहन रवाना करें ताकि रास्ते में भाव गिरने पर नुकसान न हो।",
      a3_time: "5 घंटे पहले जारी",
      a3_region: "बोवेनपल्ली एवं मदनपल्ले मंडियां",

      a4_title: "रात का ठंडा मौसम और झुलसा रोग की आशंका",
      a4_msg: "रात का तापमान 13°C तक गिरने और सुबह 92% आर्द्रता रहने से फफूंद जनित झुलसा रोग पनपने की आदर्श स्थिति।",
      a4_impact: "टमाटर और मिर्च की फसल में 3 से 5 दिनों में रोग तेजी से फैलने की आशंका।",
      a4_action: "बचाव हेतु सुबह ओस सूखते ही मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर का छिड़काव करें।",
      a4_time: "कल जारी किया गया",
      a4_region: "रंगारेड्डी एवं महबूबनगर"
    },
    ta: {
      badgeText: "கருவி 7 / 7 • வானிலை மற்றும் அவசர எச்சரிக்கைகள்",
      bannerTitle: "வானிலை மற்றும் ஆபத்து எச்சரிக்கை மையம்",
      bannerSubtitle: "வானிலை பேரிடர் மற்றும் பயிர் பாதுகாப்பு எச்சரிக்கைகள்",
      bannerDesc: "வானிலை ஆய்வு மைய எச்சரிக்கைகள், பூச்சி தாக்குதல் மற்றும் சந்தை விலை சரிவு பற்றிய உடனடி தகவல்கள். பயிர் இழப்பைத் தடுத்து அக்ரிலாக் 6 மணி நேர விலை பாதுகாப்பு மூலம் இழப்பிலிருந்து தப்பவும்.",

      filterAll: "அனைத்து எச்சரிக்கைகள்",
      filterWeather: "வானிலை ஆபத்து",
      filterPest: "பூச்சி தாக்குதல்",
      filterMandi: "சந்தை விலை சரிவு",

      liveRadarBadge: "வானிலை ரேடார் இணைப்பு",
      activeAlertsCount: "செயலில் உள்ள எச்சரிக்கைகள்",
      criticalBadge: "அதிதீவிர எச்சரிக்கை",
      warningBadge: "மண்டல எச்சரிக்கை",
      advisoryBadge: "வேளாண் ஆலோசனை",
      impactLabel: "பயிரில் ஏற்படும் பாதிப்பு:",
      recommendedAction: "செய்ய வேண்டிய நடவடிக்கை:",
      lockPriceBtn: "விலையை உடனே பூட்டுக",
      viewRemedyBtn: "மருந்து விவரங்களை பார்க்க",
      checkCalendarBtn: "அட்டவணையை மாற்றுக",

      a1_title: "அடுத்த 48 மணி நேரத்தில் திடீர் ஆலங்கட்டி மழை மற்றும் பலத்த காற்று",
      a1_msg: "வங்கக்கடலில் நிலைகொண்டுள்ள காற்றழுத்த தாழ்வு மண்டலத்தால் 45-55 கி.மீ வேகத்தில் காற்றுடன் பலத்த மழை பெய்யக்கூடும்.",
      a1_impact: "களத்தில் உள்ள நெல் நனைதல், பருத்தி பஞ்சு உதிர்தல் மற்றும் மக்காச்சோள பயிர் சாயும் அபாயம்.",
      a1_action: "அறுவடை செய்த தானியங்களை பாதுகாப்பான இடத்திற்கு மாற்றவும்; அக்ரிலாக் மூலம் சந்தை விலையை பூட்டவும்.",
      a1_time: "35 நிமிடங்களுக்கு முன்",
      a1_region: "வாரங்கல், நிஜாமாபாத் மண்டலம்",

      a2_title: "மக்காச்சோளத்தில் படைப்புழு தாக்குதல் எச்சரிக்கை",
      a2_msg: "அண்டை பகுதிகளில் தாமதமாக பயிரிடப்பட்ட மக்காச்சோளத்தில் 16% குருத்து சேதம் ஏற்பட்டுள்ளது.",
      a2_impact: "இலைகள் சேதமடைவதால் வளர்ச்சி பாதிக்கப்பட்டு விளைச்சல் 35% குறையும் அபாயம்.",
      a2_action: "ஏக்கருக்கு 5 இனக்கவர்ச்சி பொறிகளை வைக்கவும்; எமாமெக்டின் பென்சோயேட் 5% SG மருந்தினை தெளிக்கவும்.",
      a2_time: "3 மணி நேரத்திற்கு முன்",
      a2_region: "கரீம்நகர் மற்றும் மேடக்",

      a3_title: "தக்காளி வரத்து அதிகரிப்பு மற்றும் விலை சரிவு எச்சரிக்கை",
      a3_msg: "சந்தைக்கு அதிக அளவில் (850 டன்னுக்கு மேல்) தக்காளி வருவதால் ஏல விலைகள் வேகமாக சரிய வாய்ப்புள்ளது.",
      a3_impact: "விலை பாதுகாப்பு இல்லாத சரக்குகள் உற்பத்தி செலவை விட குறைவாக விற்கப்படும் ஆபத்து.",
      a3_action: "அக்ரிலாக் 6 மணி நேர விலை பாதுகாப்பை செயல்படுத்தி உறுதிசெய்யப்பட்ட விலையில் சரக்கை அனுப்பவும்.",
      a3_time: "5 மணி நேரத்திற்கு முன்",
      a3_region: "போவன்பள்ளி சந்தை",

      a4_title: "இரவு பனிப்பொழிவு மற்றும் இலைக்கருகல் நோய் அபாயம்",
      a4_msg: "இரவு வெப்பநிலை 13°C ஆக குறைந்து அதிகாலை காற்றில் 92% ஈரப்பதம் இருப்பதால் பூஞ்சை நோய் பரவ வாய்ப்பு.",
      a4_impact: "தக்காளி மற்றும் மிளகாய் பயிர்களில் 3-5 நாட்களில் நோய் வேகமாக பரவக்கூடும்.",
      a4_action: "முன்னெச்சரிக்கையாக காலையில் மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் தெளிக்கவும்.",
      a4_time: "நேற்று",
      a4_region: "ரெங்காரெட்டி மண்டலம்"
    }
  };

  const cur = dict[lang] || dict.en;

  const alerts: AlertItem[] = [
    {
      id: 'alt-1',
      category: 'Weather Hazard',
      severity: 'Critical',
      timeKey: 'a1_time',
      titleKey: 'a1_title',
      messageKey: 'a1_msg',
      impactKey: 'a1_impact',
      actionKey: 'a1_action',
      actionHref: '/tools/market-prices',
      regionKey: 'a1_region'
    },
    {
      id: 'alt-2',
      category: 'Pest Outbreak',
      severity: 'Warning',
      timeKey: 'a2_time',
      titleKey: 'a2_title',
      messageKey: 'a2_msg',
      impactKey: 'a2_impact',
      actionKey: 'a2_action',
      actionHref: '/tools/plant-scanner',
      regionKey: 'a2_region'
    },
    {
      id: 'alt-3',
      category: 'Mandi Price Shock',
      severity: 'Critical',
      timeKey: 'a3_time',
      titleKey: 'a3_title',
      messageKey: 'a3_msg',
      impactKey: 'a3_impact',
      actionKey: 'a3_action',
      actionHref: '/tools/market-prices',
      regionKey: 'a3_region'
    },
    {
      id: 'alt-4',
      category: 'Advisory',
      severity: 'Advisory',
      timeKey: 'a4_time',
      titleKey: 'a4_title',
      messageKey: 'a4_msg',
      impactKey: 'a4_impact',
      actionKey: 'a4_action',
      actionHref: '/tools/calendar',
      regionKey: 'a4_region'
    }
  ];

  const filteredAlerts = alerts.filter(a => {
    if (selectedFilter === 'All') return true;
    return a.category === selectedFilter;
  });

  const getSeverityBadge = (sev: AlertItem['severity']) => {
    switch (sev) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            {cur.criticalBadge}
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            {cur.warningBadge}
          </span>
        );
      case 'Advisory':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
            <Bell className="w-3 h-3 text-blue-600" />
            {cur.advisoryBadge}
          </span>
        );
    }
  };

  const getCategoryIcon = (category: AlertItem['category']) => {
    switch (category) {
      case 'Weather Hazard':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'Pest Outbreak':
        return <Bug className="w-5 h-5 text-rose-600" />;
      case 'Mandi Price Shock':
        return <Lock className="w-5 h-5 text-amber-600" />;
      case 'Advisory':
        return <ThermometerSnowflake className="w-5 h-5 text-cyan-600" />;
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
              <Bell className="w-4 h-4" />
              {cur.bannerSubtitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {cur.bannerDesc}
            </p>
          </div>

          {/* Live Radar Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0 flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">{cur.liveRadarBadge}</span>
              <span className="text-xs font-black text-white">{alerts.length} {cur.activeAlertsCount}</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-700 mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            Filter:
          </span>
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedFilter === 'All' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cur.filterAll}
          </button>
          <button
            onClick={() => setSelectedFilter('Weather Hazard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedFilter === 'Weather Hazard' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cur.filterWeather}
          </button>
          <button
            onClick={() => setSelectedFilter('Pest Outbreak')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedFilter === 'Pest Outbreak' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cur.filterPest}
          </button>
          <button
            onClick={() => setSelectedFilter('Mandi Price Shock')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedFilter === 'Mandi Price Shock' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cur.filterMandi}
          </button>
        </div>

        {/* Alert Cards Feed */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-l-4 shadow-sm transition space-y-4 ${
                alert.severity === 'Critical' 
                  ? 'border-l-rose-600 border border-slate-200' 
                  : alert.severity === 'Warning' 
                  ? 'border-l-amber-500 border border-slate-200' 
                  : 'border-l-blue-600 border border-slate-200'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    {getCategoryIcon(alert.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(alert.severity)}
                      <span className="text-[11px] font-bold text-slate-500">
                        {cur[alert.regionKey]}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                      {cur[alert.titleKey]}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  {cur[alert.timeKey]}
                </span>
              </div>

              {/* Message */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {cur[alert.messageKey]}
              </p>

              {/* Impact Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                  {cur.impactLabel}
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {cur[alert.impactKey]}
                </p>
              </div>

              {/* Action Trigger Box */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900">{cur.recommendedAction}</strong>{' '}
                  {cur[alert.actionKey]}
                </div>

                <Link
                  href={alert.actionHref}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>
                    {alert.actionHref === '/tools/market-prices' 
                      ? cur.lockPriceBtn 
                      : alert.actionHref === '/tools/plant-scanner' 
                      ? cur.viewRemedyBtn 
                      : cur.checkCalendarBtn}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}