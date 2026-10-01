'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Landmark, 
  HelpCircle,
  FileText,
  BadgeCheck,
  ChevronRight,
  Filter,
  Heart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface SchemeItem {
  id: string;
  nameKey: string;
  benefitKey: string;
  categoryKey: string;
  statusKey: string;
  eligibilityKey: string;
  portalUrl: string;
  directHelpline: string;
}

interface ForumPost {
  id: string;
  author: string;
  location: string;
  verifiedBadge: boolean;
  cropTag: string;
  questionKey: string;
  replyKey: string;
  likes: number;
  timeAgo: string;
}

export default function CommunityPage() {
  const { t, lang } = useToolTranslation();

  const [activeTab, setActiveTab] = useState<'schemes' | 'forum'>('schemes');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>('All');
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: 'fp-1',
      author: 'Mallesh Goud',
      location: 'Nizamabad, Telangana',
      verifiedBadge: true,
      cropTag: 'Soybean',
      questionKey: 'q1',
      replyKey: 'r1',
      likes: 18,
      timeAgo: '2 hours ago'
    },
    {
      id: 'fp-2',
      author: 'Venkatesh Rao',
      location: 'Warangal, Telangana',
      verifiedBadge: true,
      cropTag: 'Chilies',
      questionKey: 'q2',
      replyKey: 'r2',
      likes: 24,
      timeAgo: '5 hours ago'
    }
  ]);

  // Complete localized dictionary for Community & Government Schemes across EN, TE, HI, TA
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 6 of 6 • Verified Farmer Forum & Welfare Hub",
      bannerTitle: "Verified Farmer Forum & Subsidies",
      bannerSubtitle: "Government DBT Schemes & Peer Agronomy Network",
      bannerDesc: "Access direct central and state farmer subsidy portals, verify PM-Kisan & Rythu Bharosa disbursement criteria, and interact with verified local farmers on crop management and APMC trade execution.",

      tabSchemes: "Central & State Welfare Schemes",
      tabForum: "Verified Agronomy Q&A Forum",

      filterAll: "All Programs",
      filterDirectCash: "Direct Income Support",
      filterInfrastructure: "Solar & Irrigation",
      filterInsurance: "Crop Insurance & Credit",

      applyPortalBtn: "Apply on Official Portal",
      helplineLabel: "Toll-Free Kisan Desk:",
      eligibilityHeader: "Eligibility & Disbursement Criteria:",
      verifiedFarmerPill: "Verified APMC Farmer",

      // Forum
      askCommunityHeader: "Ask the Verified Farmer Community",
      askPlaceholder: "Ask about crop diseases, mandi arrival timings, or AgriLock price lock experiences...",
      postQuestionBtn: "Post Query",
      agronomistVerifiedReply: "Agronomist Verified Solution",
      likeBtn: "Helpful",

      // Schemes Content
      s1_name: "PM-Kisan Samman Nidhi Yojana",
      s1_benefit: "₹6,000 / year via Direct Benefit Transfer (3 instalments of ₹2,000)",
      s1_status: "Active 19th Instalment Window",
      s1_eligibility: "All landholding farmer families across India with verified Aadhaar e-KYC and land record seeding.",

      s2_name: "Rythu Bharosa / Farmer Investment Support",
      s2_benefit: "₹7,500 / acre per season for agricultural input procurement",
      s2_status: "Direct Treasury Bank Transfer",
      s2_eligibility: "Pattadar passbook holders and verified tenant farmers cultivating in Telangana state.",

      s3_name: "PM-KUSUM Component-B (Solar Water Pumping)",
      s3_benefit: "Up to 60% Capital Subsidy on Standalone 3HP to 7.5HP Solar Pumps",
      s3_status: "State Portal Enrolment Open",
      s3_eligibility: "Individual farmers and water user associations with tube-wells lacking reliable grid connections.",

      s4_name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      s4_benefit: "Comprehensive Crop Loss Compensation (1.5% - 2% Premium Ceiling)",
      s4_status: "Rabi Enrolment Active",
      s4_eligibility: "Loanee and non-loanee farmers against localized calamities, unseasonal cyclones, and post-harvest losses.",

      s5_name: "Kisan Credit Card (KCC) Low-Interest Loan",
      s5_benefit: "Short-term credit up to ₹3,00,000 @ 4% effective interest with subvention",
      s5_status: "Bank Branch Processing",
      s5_eligibility: "All farmers, tenant cultivators, and oral lessees cultivating approved field crops.",

      // Forum Q&A
      q1: "What is the best prophylactic spray for soybean yellow mosaic virus in red loamy soils?",
      r1: "Spray Thiamethoxam 25% WG @ 80g/acre mixed with 150 liters of water early morning to control whitefly vectors before infestation spreads.",
      q2: "Did anyone lock chili prices on AgriLock before transporting to Bowenpally market today?",
      r2: "Yes, locked at ₹3,250/qtl at 6 AM. Truck reached at 11 AM and the APMC merchant accepted the digital deal slip without any price markdown."
    },
    te: {
      badgeText: "టూల్ 6 / 6 • ధృవీకృత రైతు సంఘం & సంక్షేమ పథకాలు",
      bannerTitle: "రైతు సంఘం & ప్రభుత్వ సంక్షేమ పథకాలు",
      bannerSubtitle: "ప్రభుత్వ ప్రత్యక్ష నగదు బదిలీ & వ్యవసాయ సలహా వేదిక",
      bannerDesc: "కేంద్ర, రాష్ట్ర ప్రభుత్వాల రైతు పథకాలకు దరఖాస్తు చేసుకోండి. పీఎం-కిసాన్, రైతు భరోసా అర్హతలను పరిశీలించి, తోటి రైతులతో పంట సలహాలు మరియు అగ్రిలాక్ ధరల అనుభవాలను పంచుకోండి.",

      tabSchemes: "ప్రభుత్వ సంక్షేమ & సబ్సిడీ పథకాలు",
      tabForum: "ధృవీకృత రైతు చర్చా వేదిక",

      filterAll: "అన్ని పథకాలు",
      filterDirectCash: "ప్రత్యక్ష నగదు సహాయం",
      filterInfrastructure: "సోలార్ పంపులు & సాగునీరు",
      filterInsurance: "పంట బీమా & రుణాలు",

      applyPortalBtn: "అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి",
      helplineLabel: "కిసాన్ హెల్ప్‌‌లైన్ నంబర్:",
      eligibilityHeader: "అర్హత & నిబంధనల వివరాలు:",
      verifiedFarmerPill: "ధృవీకృత APMC రైతు",

      askCommunityHeader: "రైతు సంఘాన్ని ప్రశ్న అడగండి",
      askPlaceholder: "పంట తెగుళ్లు, మండి తాజా ధరలు లేదా అగ్రిలాక్ ధర లాక్ అనుభవాల గురించి ఇక్కడ అడగండి...",
      postQuestionBtn: "సందేశం పంపండి",
      agronomistVerifiedReply: "వ్యవసాయ నిపుణుడు ధృవీకరించిన సమాధానం",
      likeBtn: "ఉపయోగపడింది",

      s1_name: "పీఎం-కిసాన్ సమ్మాన్ నిధి యోజన",
      s1_benefit: "సంవత్సరానికి ₹6,000 ప్రత్యక్ష నగదు బదిలీ (3 విడతల్లో ₹2,000 చొప్పున)",
      s1_status: "19వ విడత నిధుల విండో అందుబాటులో ఉంది",
      s1_eligibility: "ఆధార్ e-KYC మరియు పట్టాదారు పాస్ పుస్తకం బ్యాంక్ ఖాతాకు లింక్ అయిన ప్రతి రైతు కుటుంబం.",

      s2_name: "రైతు భరోసా / పంట పెట్టుబడి సాయం",
      s2_benefit: "ఎకరానికి ప్రతి సీజన్‌కు ₹7,500 పెట్టుబడి సహాయం",
      s2_status: "ట్రెజరీ ద్వారా ప్రత్యక్ష బ్యాంక్ జమ",
      s2_eligibility: "తెలంగాణ రాష్ట్రంలో వ్యవసాయ భూమి కలిగి ఉన్న పట్టాదారులు మరియు ధృవీకరించిన కౌలు రైతులు.",

      s3_name: "పీఎం-కుసుమ్ (సోలార్ పంప్ సెట్ సబ్సిడీ)",
      s3_benefit: "3HP నుండి 7.5HP సోలార్ పంపులపై 60% వరకు ప్రభుత్వ రాయితీ",
      s3_status: "రాష్ట్ర పోర్టల్ దరఖాస్తులు ప్రారంభం",
      s3_eligibility: "కరెంట్ కనెక్షన్ లేని వ్యవసాయ బావులు, బోరుబావులు కలిగిన రైతులు మరియు రైతు సంఘాలు.",

      s4_name: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)",
      s4_benefit: "సమగ్ర పంట నష్ట పరిహారం (కేవలం 1.5% నుండి 2% అతి తక్కువ ప్రీమియం)",
      s4_status: "రబీ నమోదు ప్రక్రియ అమలులో ఉంది",
      s4_eligibility: "అకాల వర్షాలు, తుఫానులు మరియు వాతావరణ వైపరీత్యాల వల్ల పంట నష్టపోయిన రైతులందరికీ వర్తిస్తుంది.",

      s5_name: "కిసాన్ క్రెడిట్ కార్డ్ (KCC) తక్కువ వడ్డీ రుణం",
      s5_benefit: "రూ. 3,00,000 వరకు కేవలం 4% రాయితీ వడ్డీకే స్వల్పకాలిక పంట రుణం",
      s5_status: "బ్యాంకు శాఖల్లో దరఖాస్తు లభ్యం",
      s5_eligibility: "వ్యవసాయం చేస్తున్న పట్టాదారులు, కౌలు రైతులు మరియు స్వయం సహాయక రైతు గ్రూపులు.",

      q1: "ఎర్ర నేలల్లో సోయాబీన్ పల్లాకు తెగులు (Yellow Mosaic) రాకుండా ముందస్తుగా ఏ మందు పిచికారీ చేయాలి?",
      r1: "తెల్లదోమ వ్యాప్తిని అరికట్టడానికి ఉదయం వేళ థయామెథాక్సమ్ 25% WG మందును ఎకరానికి 80 గ్రాములు 150 లీటర్ల నీటిలో కలిపి పిచికారీ చేయండి.",
      q2: "ఈరోజు బోయిన్‌పల్లి మార్కెట్‌కు వెళ్లే ముందు ఎవరైనా అగ్రిలాక్‌లో మిర్చి ధరను లాక్ చేసుకున్నారా?",
      r2: "అవును, ఉదయం 6 గంటలకు క్వింటాలుకు ₹3,250 వద్ద లాక్ చేసుకున్నాను. 11 గంటలకు బండి మార్కెట్ చేరగానే వ్యాపారి డిజిటల్ స్లిప్ చూసి ఎలాంటి కోత లేకుండా అదే రేటు ఇచ్చారు."
    },
    hi: {
      badgeText: "टूल 6 / 6 • सत्यापित किसान मंच एवं कल्याणकारी योजनाएं",
      bannerTitle: "किसान मंच एवं सरकारी योजनाएं",
      bannerSubtitle: "प्रत्यक्ष लाभ अंतरण (DBT) एवं कृषि परामर्श केंद्र",
      bannerDesc: "केंद्र एवं राज्य सरकार की कृषि योजनाओं के लिए आवेदन करें। पीएम-किसान, फसल बीमा पात्रता की जांच करें और स्थानीय सत्यापित किसानों के साथ कृषि अनुभव साझा करें।",

      tabSchemes: "सरकारी कल्याणकारी एवं सब्सिडी योजनाएं",
      tabForum: "सत्यापित किसान चर्चा मंच",

      filterAll: "सभी योजनाएं",
      filterDirectCash: "प्रत्यक्ष आय सहायता",
      filterInfrastructure: "सौर ऊर्जा एवं सिंचाई",
      filterInsurance: "फसल बीमा एवं ऋण",

      applyPortalBtn: "आधिकारिक पोर्टल पर आवेदन करें",
      helplineLabel: "किसान कॉल सेंटर हेल्पलाइन:",
      eligibilityHeader: "पात्रता एवं लाभ के नियम:",
      verifiedFarmerPill: "सत्यापित मंडी किसान",

      askCommunityHeader: "किसान समुदाय से प्रश्न पूछें",
      askPlaceholder: "फसल रोग, ताज़ा मंडी भाव अथवा एग्रीलॉक मूल्य सुरक्षा के बारे में पूछें...",
      postQuestionBtn: "प्रश्न पोस्ट करें",
      agronomistVerifiedReply: "कृषि वैज्ञानिक द्वारा प्रमाणित समाधान",
      likeBtn: "मददगार",

      s1_name: "पीएम-किसान सम्मान निधि योजना",
      s1_benefit: "प्रत्यक्ष लाभ अंतरण द्वारा ₹6,000 प्रति वर्ष (₹2,000 की 3 समान किश्तें)",
      s1_status: "19वीं किश्त हेतु पोर्टल खुला है",
      s1_eligibility: "सभी भूमिधारक किसान परिवार जिनका आधार ई-केवाईसी और भूमि रिकॉर्ड पोर्टल पर दर्ज है।",

      s2_name: "रैतु भरोसा / राज्य कृषि निवेश सहायता",
      s2_benefit: "बीज एवं खाद खरीद हेतु ₹7,500 प्रति एकड़ प्रति मौसम",
      s2_status: "सीधे बैंक खाते में अंतरण",
      s2_eligibility: "पट्टेदार पासबुक धारक एवं पंजीकृत काश्तकार किसान।",

      s3_name: "पीएम-कुसुम योजना (सौर ऊर्जा पंप सेट)",
      s3_benefit: "3HP से 7.5HP सौर पंपों पर 60% तक पूंजीगत सब्सिडी",
      s3_status: "राज्य पोर्टल पर पंजीकरण सक्रिय",
      s3_eligibility: "ग्रिड बिजली से वंचित नलकूप एवं कुओं वाले किसान।",

      s4_name: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
      s4_benefit: "प्राकृतिक आपदाओं पर पूर्ण मुआवजा (मात्र 1.5% से 2% न्यूनतम प्रीमियम)",
      s4_status: "रबी सीजन नामांकन सक्रिय",
      s4_eligibility: "ओलावृष्टि, सूखा अथवा चक्रवात से फसल क्षति झेलने वाले सभी ऋणी एवं गैर-ऋणी किसान।",

      s5_name: "किसान क्रेडिट कार्ड (KCC) रियायती ऋण",
      s5_benefit: "₹3,00,000 तक का अल्पकालिक कृषि ऋण मात्र 4% प्रभावी ब्याज दर पर",
      s5_status: "बैंक शाखा स्तर पर प्रसंस्करण",
      s5_eligibility: "फसल उत्पादन में संलग्न सभी किसान, पट्टेदार और मौखिक काश्तकार।",

      q1: "लाल दोमट मिट्टी में सोयाबीन के पीले मोज़ेक रोग की रोकथाम हेतु सबसे उत्तम स्प्रे कौन सा है?",
      r1: "सफेद मक्खी की रोकथाम हेतु सुबह के समय थायमेथोक्सम 25% WG @ 80 ग्राम प्रति एकड़ 150 लीटर पानी में मिलाकर छिड़काव करें।",
      q2: "क्या आज किसी ने मंडी जाने से पहले एग्रीलॉक पर भाव लॉक किया था?",
      r2: "हां, सुबह 6 बजे ₹3,250 पर भाव लॉक किया था। मंडी पहुंचते ही व्यापारी ने डिजिटल डील स्लिप स्वीकार कर बिना कटौती के भुगतान किया।"
    },
    ta: {
      badgeText: "கருவி 6 / 6 • விவசாயிகள் மன்றம் & நலத்திட்டங்கள்",
      bannerTitle: "விவசாயிகள் மன்றம் & அரசு மானியங்கள்",
      bannerSubtitle: "நேரடி வங்கி மானியங்கள் & வேளாண் ஆலோசனை தளம்",
      bannerDesc: "மத்திய மற்றும் மாநில அரசின் விவசாய நலத்திட்டங்களுக்கு விண்ணப்பிக்கவும். பிஎம்-கிசான் மற்றும் பயிர் காப்பீட்டு விவரங்களை சரிபார்த்து சக விவசாயிகளுடன் அனுபவங்களை பகிர்ந்து கொள்ளுங்கள்.",

      tabSchemes: "அரசு நலத்திட்டங்கள் & மானியங்கள்",
      tabForum: "விவசாயிகள் விவாத அரங்கம்",

      filterAll: "அனைத்து திட்டங்கள்",
      filterDirectCash: "நேரடி வருவாய் உதவி",
      filterInfrastructure: "சூரிய சக்தி & பாசனம்",
      filterInsurance: "பயிர் காப்பீடு & கடன்கள்",

      applyPortalBtn: "அரசு இணையதளத்தில் விண்ணப்பிக்க",
      helplineLabel: "விவசாயிகள் உதவி எண்:",
      eligibilityHeader: "தகுதி மற்றும் விதிமுறைகள்:",
      verifiedFarmerPill: "சான்றளிக்கப்பட்ட APMC விவசாயி",

      askCommunityHeader: "விவசாயிகளிடம் கேள்வி கேட்க",
      askPlaceholder: "பயிர் பூச்சிகள், சந்தை வரத்து அல்லது அக்ரிலாக் விலை பாதுகாப்பு பற்றி கேளுங்கள்...",
      postQuestionBtn: "கேள்வி அனுப்புக",
      agronomistVerifiedReply: "வேளாண் நிபுணர் உறுதிசெய்த தீர்வு",
      likeBtn: "பயனுள்ளது",

      s1_name: "பிஎம்-கிசான் சம்மான் நிதி திட்டம்",
      s1_benefit: "நேரடி வங்கி பரிமாற்றம் மூலம் ஆண்டுக்கு ₹6,000 (3 தவணைகளில்)",
      s1_status: "19வது தவணை பதிவு செயலில் உள்ளது",
      s1_eligibility: "ஆதார் e-KYC இணைக்கப்பட்ட நில உரிமையுள்ள அனைத்து விவசாய குடும்பங்கள்.",

      s2_name: "பயிர் முதலீட்டு உதவி திட்டம்",
      s2_benefit: "விதை மற்றும் உரங்களுக்கு ஏக்கருக்கு ₹7,500 உதவித்தொகை",
      s2_status: "நேரடி வங்கி வரவு",
      s2_eligibility: "பட்டா நில உரிமையாளர்கள் மற்றும் பதிவுசெய்யப்பட்ட குத்தகை விவசாயிகள்.",

      s3_name: "பிஎம்-குசும் சோலார் பம்ப் திட்டம்",
      s3_benefit: "தனித்து இயங்கும் சோலார் பம்புகளுக்கு 60% வரை அரசு மானியம்",
      s3_status: "விண்ணப்பங்கள் வரவேற்கப்படுகின்றன",
      s3_eligibility: "மின் இணைப்பு இல்லாத விவசாய பாசன கிணறுகளை கொண்ட விவசாயிகள்.",

      s4_name: "பிரதம மந்திரி பயிர் காப்பீட்டு திட்டம் (PMFBY)",
      s4_benefit: "இயற்கை பேரிடர்களுக்கு முழுமையான இழப்பீடு (1.5% குறைந்த பிரீமியம்)",
      s4_status: "ரபி பருவ பதிவு செயலில் உள்ளது",
      s4_eligibility: "திடீர் மழை, வெள்ளம் மற்றும் புயலால் பாதிக்கப்பட்ட அனைத்து விவசாயிகள்.",

      s5_name: "கிசான் கிரெடிட் கார்டு (KCC) குறைந்த வட்டி கடன்",
      s5_benefit: "ரூ. 3,00,000 வரை குறுகிய கால கடன் வெறும் 4% வட்டி விகிதத்தில்",
      s5_status: "வங்கி கிளைகளில் விண்ணப்பிக்கலாம்",
      s5_eligibility: "விவசாயம் செய்யும் அனைத்து நில உரிமையாளர்கள் மற்றும் குத்தகைதாரர்கள்.",

      q1: "சோயாபீன் பயிரில் மஞ்சள் மொசைக் நோய் வராமல் தடுக்க என்ன மருந்து தெளிக்க வேண்டும்?",
      r1: "வெள்ளை ஈக்களை கட்டுப்படுத்த தயாமெத்தாக்சம் 25% WG ஏக்கருக்கு 80 கிராம் வீதம் 150 லிட்டர் தண்ணீரில் கலந்து காலையில் தெளிக்கவும்.",
      q2: "இன்று சந்தைக்கு கிளம்பும் முன் அக்ரிலாக் மூலம் விலையை பூட்டி ஒப்பந்தம் செய்தீர்களா?",
      r2: "ஆம், காலை 6 மணிக்கு குவிண்டால் ₹3,250 என பூட்டினேன். சந்தையை அடைந்ததும் வியாபாரி டிஜிட்டல் ரசீதை ஏற்று அதே விலையை வழங்கினார்."
    }
  };

  const cur = dict[lang] || dict.en;

  // Master Schemes Database
  const schemes: SchemeItem[] = [
    {
      id: 'sch-1',
      nameKey: 's1_name',
      benefitKey: 's1_benefit',
      categoryKey: 'Direct Income Support',
      statusKey: 's1_status',
      eligibilityKey: 's1_eligibility',
      portalUrl: 'https://pmkisan.gov.in',
      directHelpline: '155261 / 011-24300606'
    },
    {
      id: 'sch-2',
      nameKey: 's2_name',
      benefitKey: 's2_benefit',
      categoryKey: 'Direct Income Support',
      statusKey: 's2_status',
      eligibilityKey: 's2_eligibility',
      portalUrl: 'https://rythubharosa.telangana.gov.in',
      directHelpline: '040-23383520'
    },
    {
      id: 'sch-3',
      nameKey: 's3_name',
      benefitKey: 's3_benefit',
      categoryKey: 'Solar & Irrigation',
      statusKey: 's3_status',
      eligibilityKey: 's3_eligibility',
      portalUrl: 'https://pmkusum.mnre.gov.in',
      directHelpline: '1800-180-3333'
    },
    {
      id: 'sch-4',
      nameKey: 's4_name',
      benefitKey: 's4_benefit',
      categoryKey: 'Crop Insurance & Credit',
      statusKey: 's4_status',
      eligibilityKey: 's4_eligibility',
      portalUrl: 'https://pmfby.gov.in',
      directHelpline: '1800-180-1551'
    },
    {
      id: 'sch-5',
      nameKey: 's5_name',
      benefitKey: 's5_benefit',
      categoryKey: 'Crop Insurance & Credit',
      statusKey: 's5_status',
      eligibilityKey: 's5_eligibility',
      portalUrl: 'https://myscheme.gov.in',
      directHelpline: '1800-11-2211'
    }
  ];

  const filteredSchemes = schemes.filter(s => {
    if (selectedSchemeFilter === 'All') return true;
    return s.categoryKey === selectedSchemeFilter;
  });

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newPost: ForumPost = {
      id: `fp-${Date.now()}`,
      author: 'You (Farmer Partner)',
      location: 'Telangana',
      verifiedBadge: true,
      cropTag: 'Field Operations',
      questionKey: 'custom',
      replyKey: 'pending',
      likes: 1,
      timeAgo: 'Just now'
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewQuestionText('');
  };

  const handleLike = (id: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
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
              <Users className="w-4 h-4" />
              {cur.bannerSubtitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {cur.bannerDesc}
            </p>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab('schemes')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'schemes' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>{cur.tabSchemes}</span>
            </button>
            <button
              onClick={() => setActiveTab('forum')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'forum' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{cur.tabForum}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: WELFARE SCHEMES SECTION */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-slate-700 mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                Category:
              </span>
              <button
                onClick={() => setSelectedSchemeFilter('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSchemeFilter === 'All' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cur.filterAll}
              </button>
              <button
                onClick={() => setSelectedSchemeFilter('Direct Income Support')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSchemeFilter === 'Direct Income Support' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cur.filterDirectCash}
              </button>
              <button
                onClick={() => setSelectedSchemeFilter('Solar & Irrigation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSchemeFilter === 'Solar & Irrigation' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cur.filterInfrastructure}
              </button>
              <button
                onClick={() => setSelectedSchemeFilter('Crop Insurance & Credit')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSchemeFilter === 'Crop Insurance & Credit' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cur.filterInsurance}
              </button>
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredSchemes.map((scheme) => (
                <div 
                  key={scheme.id} 
                  className="bg-white rounded-3xl p-6 border-2 border-emerald-100 hover:border-emerald-300 shadow-sm transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {cur[scheme.statusKey]}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 mt-2">
                          {cur[scheme.nameKey]}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                        <Landmark className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs">
                      <span className="text-emerald-950 font-black block text-sm">
                        {cur[scheme.benefitKey]}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <span className="text-[11px] font-bold text-slate-800 uppercase block tracking-wider">
                        {cur.eligibilityHeader}
                      </span>
                      <p className="leading-relaxed">
                        {cur[scheme.eligibilityKey]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      {cur.helplineLabel} <strong className="text-slate-800">{scheme.directHelpline}</strong>
                    </span>

                    <a
                      href={scheme.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{cur.applyPortalBtn}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: VERIFIED FARMER FORUM */}
        {activeTab === 'forum' && (
          <div className="space-y-6">
            
            {/* Ask Query Box */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                {cur.askCommunityHeader}
              </h3>

              <form onSubmit={handlePostQuestion} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  placeholder={cur.askPlaceholder}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 transition"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    Answers are moderated by regional Krishi Vigyan Kendra agronomists.
                  </span>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{cur.postQuestionBtn}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Threaded Discussion Cards */}
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4"
                >
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-black text-sm flex items-center justify-center border border-emerald-200">
                        {post.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-slate-900">{post.author}</h4>
                          {post.verifiedBadge && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.2 rounded-full">
                              <BadgeCheck className="w-3 h-3 text-emerald-700" />
                              {cur.verifiedFarmerPill}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {post.location} • {post.timeAgo}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                      {post.cropTag}
                    </span>
                  </div>

                  {/* Question */}
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    "{cur[post.questionKey] || newQuestionText || post.questionKey}"
                  </p>

                  {/* Verified Solution Reply */}
                  {post.replyKey !== 'pending' ? (
                    <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-xs space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-emerald-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        {cur.agronomistVerifiedReply}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {cur[post.replyKey]}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 shrink-0" />
                      <span>Query forwarded to local Agricultural Officer (AO) for verified agronomic feedback.</span>
                    </div>
                  )}

                  {/* Footer Reaction */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 font-bold transition cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{post.likes} {cur.likeBtn}</span>
                    </button>

                    <Link
                      href="/tools/market-prices"
                      className="text-emerald-700 font-bold hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      <span>Check Mandi Price Lock</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>
    </div>
  );
}