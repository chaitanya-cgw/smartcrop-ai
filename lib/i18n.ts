'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      appName: 'SmartCrop AI',
      tagline: 'Multi-Season Agricultural Optimization & Farmer Assistant',
      ruralEngine: 'Rural Innovation Engine',
      verifiedFarmer: 'Verified Farmer',
      startRotationBtn: 'Start Rotation Optimizer',
      toolsTitle: 'Farming Tools',
      toolsSubtitle: 'Access all agricultural intelligence systems',
      openTool: 'Open Tool',
      
      // Tools list
      tool1Title: 'Crop Optimizer',
      tool1Desc: 'Multi-season dynamic crop rotation optimizer based on soil, budget & water.',
      tool1Tag: 'Core Engine',

      tool2Title: 'Calendar Organizer',
      tool2Desc: 'Multi-crop planting and harvest scheduling across summer and winter plots.',
      tool2Tag: 'Planning',

      tool3Title: 'Soil Analyser',
      tool3Desc: 'Direct N-P-K soil report evaluator or courier sample to nearest testing pharmacy.',
      tool3Tag: 'Soil Health',

      tool4Title: 'AI Plant Scanner',
      tool4Desc: 'Instant leaf pest and disease detection with certified remedies & buying links.',
      tool4Tag: 'Vision AI',

      tool5Title: 'Mandi Market & Transport',
      tool5Desc: 'Live Mandi prices, direct merchant trade agreements, and farm transport logistics.',
      tool5Tag: 'Trade',

      tool6Title: 'Farmer Community',
      tool6Desc: 'Verified farmer discussions, community events, and government subsidy schemes.',
      tool6Tag: 'Network',

      tool7Title: 'Alerts & Notifications',
      tool7Desc: 'Severe weather alerts, drought predictions, and commodity price surge warnings.',
      tool7Tag: 'Advisory',

      tool8Title: 'Bhoomi AI Voice',
      tool8Desc: 'Native regional voice assistant that answers your agricultural queries automatically.',
      tool8Tag: 'Voice AI',

      // Re-order Hub
      reorderTitle: 'Treatment & Soil Fix Re-Order Hub',
      reorderSubtitle: 'Quickly repurchase previous remedies and soil conditioners',
      reorderBtn: 'Re-Order',
      purchasedOn: 'Purchased on',
      via: 'via',

      // Notifications
      heavyRainTitle: 'Heavy Rainfall Warning',
      heavyRainDesc: 'Heavy rains expected in next 48 hrs. Ensure field drainage channels are clear.',
      priceHikeTitle: 'Tomato & Onion Price Hike',
      priceHikeDesc: 'Mandi rates increased by +18% today. Good window to harvest and sell.',
      irrigationTitle: 'Irrigation Alert',
      irrigationDesc: 'Ground moisture levels optimal. Delay irrigation by 2 days.'
    }
  },
  te: {
    translation: {
      appName: 'స్మార్ట్‌క్రాప్ AI',
      tagline: 'బహుళ-సీజన్ల పంట ప్రణాళిక మరియు రైతు సహకారి',
      ruralEngine: 'గ్రామీణ ఆవిష్కరణ ఇంజిన్',
      verifiedFarmer: 'ధృవీకరించబడిన రైతు',
      startRotationBtn: 'పంట మార్పిడి ప్లానర్ ప్రారంభించండి',
      toolsTitle: 'వ్యవసాయ సాధనాలు',
      toolsSubtitle: 'అన్ని వ్యవసాయ AI పరికరాలను ఉపయోగించండి',
      openTool: 'టూల్ తెరవండి',

      tool1Title: 'పంట సిఫార్సు ఇంజిన్',
      tool1Desc: 'నేల రకం, బడ్జెట్ మరియు నీటి లభ్యత ఆధారంగా ఉత్తమ పంటల ఎంపిక.',
      tool1Tag: 'ప్రధాన ఇంజిన్',

      tool2Title: 'క్యాలెండర్ ఆర్గనైజర్',
      tool2Desc: 'వేసవి మరియు శీతాకాలంలో బహుళ భూములలో పంటల కాలపట్టిక నిర్వహణ.',
      tool2Tag: 'ప్రణాళిక',

      tool3Title: 'నేల విశ్లేషణ',
      tool3Desc: 'నేల పోషకాల విశ్లేషణ లేదా సమీప ల్యాబ్‌‌కు కొరియర్ పంపి రిపోర్టు పొందండి.',
      tool3Tag: 'నేల ఆరోగ్యం',

      tool4Title: 'AI మొక్కల స్కానర్',
      tool4Desc: 'ఆకుల ఫోటో తీసి చీడపీడలను గుర్తించి మందుల వివరాలు పొందండి.',
      tool4Tag: 'విజన్ AI',

      tool5Title: 'లైవ్ మార్కెట్ & రవాణా',
      tool5Desc: 'తాజా మార్కెట్ ధరలు, వ్యాపారులతో నేరుగా అమ్మకం మరియు రవాణా సదుపాయం.',
      tool5Tag: 'వ్యాపారం',

      tool6Title: 'రైతు సంఘం',
      tool6Desc: 'రైతుల చర్చలు, వ్యవసాయ కార్యక్రమాలు మరియు ప్రభుత్వ పథకాల వివరాలు.',
      tool6Tag: 'నెట్‌వర్క్',

      tool7Title: 'హెచ్చరికలు',
      tool7Desc: 'భారీ వర్షాలు, తుఫాను మరియు కూరగాయల ధరల పెరుగుదల హెచ్చరికలు.',
      tool7Tag: 'హెచ్చరిక',

      tool8Title: 'భూమి AI వాయిస్',
      tool8Desc: 'మీ సొంత భాషలో మాట్లాడి సమాధానాలు పొందే వాయిస్ అసిస్టెంట్.',
      tool8Tag: 'వాయిస్ AI',

      reorderTitle: 'మందులు & ఎరువుల రీ-ఆర్డర్ హబ్',
      reorderSubtitle: 'మునుపటి మందులు మరియు పోషకాలను సులభంగా తిరిగి ఆర్డర్ చేయండి',
      reorderBtn: 'మళ్లీ ఆర్డర్',
      purchasedOn: 'కొనుగోలు తేదీ',
      via: 'ద్వారా',

      heavyRainTitle: 'భారీ వర్షపాతం హెచ్చరిక',
      heavyRainDesc: 'రాబోయే 48 గంటల్లో భారీ వర్షాలు కురిసే అవకాశం ఉంది. కాలువలను సరిచేసుకోండి.',
      priceHikeTitle: 'టమాటా & ఉల్లి ధరల పెరుగుదల',
      priceHikeDesc: 'మార్కెట్ ధరలు +18% పెరిగాయి. పంట విక్రయించడానికి అనుకూల సమయం.',
      irrigationTitle: 'నీటిపారుదల సమాచారం',
      irrigationDesc: 'నేలలో తేమ అనుకూలంగా ఉంది. నీటి తడిని 2 రోజులు వాయిదా వేయండి.'
    }
  },
  hi: {
    translation: {
      appName: 'स्मार्टक्रॉप AI',
      tagline: 'बहु-सीजन कृषि अनुकूलन और किसान सहायक',
      ruralEngine: 'ग्रामीण नवाचार इंजन',
      verifiedFarmer: 'सत्यापित किसान',
      startRotationBtn: 'फसल चक्र अनुकूलक शुरू करें',
      toolsTitle: 'कृषि उपकरण',
      toolsSubtitle: 'सभी कृषि बुद्धिमत्ता प्रणालियों का उपयोग करें',
      openTool: 'टूल खोलें',

      tool1Title: 'फसल सिफारिश इंजन',
      tool1Desc: 'मिट्टी, बजट और पानी के आधार पर बहु-सीजन फसल चक्र का चयन करें।',
      tool1Tag: 'मुख्य इंजन',

      tool2Title: 'कैलेंडर आयोजक',
      tool2Desc: 'गर्मी और सर्दी के मौसम के लिए बहु-फसल रोपण और कटाई कार्यक्रम।',
      tool2Tag: 'नियोजन',

      tool3Title: 'मिट्टी विश्लेषक',
      tool3Desc: 'सीधे मिट्टी की रिपोर्ट जांचें या नजदीकी लैब में कूरियर द्वारा सैंपल भेजें।',
      tool3Tag: 'मृदा स्वास्थ्य',

      tool4Title: 'AI प्लांट स्कैनर',
      tool4Desc: 'पत्तियों की फोटो खींचकर कीट और बीमारियों की तुरंत पहचान और उपचार।',
      tool4Tag: 'विज़न AI',

      tool5Title: 'लाइव मंडी भाव व परिवहन',
      tool5Desc: 'लाइव मंडी दरें, व्यापारियों के साथ सीधे सौदे और वाहन परिवहन सुविधा।',
      tool5Tag: 'व्यापार',

      tool6Title: 'किसान समुदाय',
      tool6Desc: 'सत्यापित किसान चर्चाएं, कार्यक्रम और सरकारी योजनाओं की जानकारी।',
      tool6Tag: 'नेटवर्क',

      tool7Title: 'मौसम व मूल्य अलर्ट',
      tool7Desc: 'भारी बारिश, सूखे की चेतावनी और फसल की कीमतों में उछाल के अलर्ट।',
      tool7Tag: 'सलाहकार',

      tool8Title: 'भूमि AI वॉयस',
      tool8Desc: 'अपनी क्षेत्रीय भाषा में बोलकर कृषि संबंधी सभी सवालों के जवाब पाएं।',
      tool8Tag: 'वॉयस AI',

      reorderTitle: 'उपचार और उर्वरक पुनः ऑर्डर हब',
      reorderSubtitle: 'पिछले उपयोग किए गए उपचार और उर्वरकों को फिर से ऑर्डर करें',
      reorderBtn: 'पुनः ऑर्डर',
      purchasedOn: 'खरीद तिथि',
      via: 'द्वारा',

      heavyRainTitle: 'भारी बारिश की चेतावनी',
      heavyRainDesc: 'अगले 48 घंटों में भारी बारिश की संभावना है। जल निकासी की व्यवस्था रखें।',
      priceHikeTitle: 'टमाटर और प्याज के दामों में उछाल',
      priceHikeDesc: 'मंडी भाव में आज +18% की तेजी आई है। फसल बेचने का यह अच्छा अवसर है।',
      irrigationTitle: 'सिंचाई अलर्ट',
      irrigationDesc: 'मिट्टी में नमी का स्तर सही है। सिंचाई को 2 दिन के लिए टालें।'
    }
  },
  ta: {
    translation: {
      appName: 'ஸ்மார்ட்கிராப் AI',
      tagline: 'பல பருவ பயிர் சுழற்சி மற்றும் உழவர் உதவியாளர்',
      ruralEngine: 'கிராமப்புற கண்டுபிடிப்பு தளம்',
      verifiedFarmer: 'சரிபார்க்கப்பட்ட விவசாயி',
      startRotationBtn: 'பயிர் சுழற்சி திட்டமிடலைத் தொடங்கு',
      toolsTitle: 'விவசாயக் கருவிகள்',
      toolsSubtitle: 'அனைத்து விவசாய நுண்ணறிவு அமைப்புகளையும் அணுகவும்',
      openTool: 'கருவியைத் திறக்க',

      tool1Title: 'பயிர் பரிந்துரை இயந்திரம்',
      tool1Desc: 'மண், பட்ஜெட் மற்றும் நீரின் அடிப்படையில் சிறந்த பயிர் சுழற்சி தேர்வு.',
      tool1Tag: 'முக்கிய இயந்திரம்',

      tool2Title: 'நாள்காட்டி அமைப்பாளர்',
      tool2Desc: 'கோடை மற்றும் குளிர்காலத்திற்கான பல பயிர் சாகுபடி கால அட்டவணை.',
      tool2Tag: 'திட்டமிடல்',

      tool3Title: 'மண் பகுப்பாய்வி',
      tool3Desc: 'மண் பரிசோதனை அறிக்கை அல்லது அருகிலுள்ள ஆய்வகத்திற்கு கூரியர் அனுப்பவும்.',
      tool3Tag: 'மண் வளம்',

      tool4Title: 'AI தாவர ஸ்கேனர்',
      tool4Desc: 'இலை நோய்கள் மற்றும் பூச்சிகளை உடனடியாக கண்டறிந்து தீர்வு காணுங்கள்.',
      tool4Tag: 'விஷன் AI',

      tool5Title: 'நேரலை சந்தை & போக்குவரத்து',
      tool5Desc: 'நேரலை மண்டி விலைகள், வியாபாரிகளுடன் நேரடி ஒப்பந்தம் & போக்குவரத்து.',
      tool5Tag: 'வணிகம்',

      tool6Title: 'விவசாயிகள் சமூகம்',
      tool6Desc: 'விவசாயிகளின் கலந்துரையாடல் மற்றும் அரசு நலத்திட்டங்கள்.',
      tool6Tag: 'நெட்வொர்க்',

      tool7Title: 'வானிலை எச்சரிக்கைகள்',
      tool7Desc: 'கனமழை, வறட்சி மற்றும் விலை ஏற்றம் குறித்த உடனடி எச்சரிக்கைகள்.',
      tool7Tag: 'ஆலோசனை',

      tool8Title: 'பூமி AI குரல்',
      tool8Desc: 'உங்கள் தாய்மொழியில் பேசி வேளாண்மை ஆலோசனைகளைப் பெறுங்கள்.',
      tool8Tag: 'குரல் AI',

      reorderTitle: 'மறு ஆர்டர் தளம்',
      reorderSubtitle: 'முந்தைய மருந்துகள் மற்றும் உரங்களை எளிதாக மீண்டும் ஆர்டர் செய்யவும்',
      reorderBtn: 'மறு ஆர்டர்',
      purchasedOn: 'வாங்கிய தேதி',
      via: 'வழியாக',

      heavyRainTitle: 'கனமழை எச்சரிக்கை',
      heavyRainDesc: 'அடுத்த 48 மணி நேரத்தில் கனமழை பெய்யக்கூடும். வடிகால் அமைப்பைச் சரிபார்க்கவும்.',
      priceHikeTitle: 'தக்காளி & வெங்காய விலை உயர்வு',
      priceHikeDesc: 'மண்டி விலைகள் +18% உயர்ந்துள்ளன. அறுவடை செய்து விற்க நல்ல வாய்ப்பு.',
      irrigationTitle: 'நீர்ப்பாசன எச்சரிக்கை',
      irrigationDesc: 'மண்ணில் ஈரப்பதம் போதுமானதாக உள்ளது. நீர்ப்பாசனத்தை 2 நாட்களுக்கு ஒத்திவைக்கவும்.'
    }
  }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('app_lang') || 'en' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
}

export default i18n;