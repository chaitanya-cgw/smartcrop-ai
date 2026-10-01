'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  CalendarCheck,
  Sprout,
  Droplets,
  Layers,
  MapPin,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface ScheduleItem {
  id: string;
  plotId: string;
  date: string;
  title: string;
  crop: string;
  type: 'Fertilizer' | 'Irrigation' | 'Pest Control' | 'Sowing' | 'Harvest';
  desc: string;
}

interface PlotInfo {
  id: string;
  nameKey: string;
  defaultCropKey: string;
  area: string;
}

export default function CalendarPage() {
  const { t, lang } = useToolTranslation();

  // Complete localized dictionary for Tool 2
  const dict: Record<string, Record<string, string>> = {
    en: {
      badgeText: "Tool 2 of 6 • Cultivation Planner",
      bannerTitle: "Multi-Plot Cultivation Calendar",
      bannerSubtitle: "Farm Stage Management & Crop Scheduling",
      bannerDesc: "Schedule customized field stages, fertigation cycles, and harvest plans per plot. Add, edit, or remove plans dynamically across assigned crops.",
      activePlotLabel: "Active Plot:",
      assignedCropLabel: "Current Crop:",
      tasksHeader: "Scheduled Activities",
      forPlot: "Managing operations on",
      addNewPlanBtn: "Add New Plan",
      noTasksTitle: "No scheduled tasks for this plot",
      noTasksDesc: "Click 'Add New Plan' above to schedule fertigation, sowing, or spray cycles.",
      editModalTitle: "Edit Cultivation Plan",
      addModalTitle: "Schedule New Field Plan",
      modalActivityTitle: "Activity / Task Title",
      modalCropLabel: "Target Crop Variety",
      modalStageLabel: "Activity Stage Type",
      modalDateLabel: "Execution Date (e.g., 15 Oct 2026)",
      modalDescLabel: "Operational Instructions / Dosage Details",
      modalCancelBtn: "Cancel",
      modalSaveBtn: "Save Plan",
      deleteConfirmTooltip: "Delete this plan",
      editTooltip: "Edit this plan",

      // Plots
      plot_a_name: "Plot A (North Acre)",
      plot_b_name: "Plot B (East Well)",
      plot_c_name: "Plot C (River Basin)",

      // Crops
      crop_soybean: "Soybean (JS-335)",
      crop_chickpea: "Chickpea / Bengal Gram",
      crop_tomato: "Tomato (Hybrid Arka Rakshak)",
      crop_cotton: "Cotton (Bt-II)",

      // Stage Types
      type_fertilizer: "Fertilizer",
      type_irrigation: "Irrigation",
      type_pest_control: "Pest Control",
      type_sowing: "Sowing",
      type_harvest: "Harvest",

      // Default Task Descriptions
      task_1_title: "Basal Fertilizer Application",
      task_1_desc: "Apply DAP @ 50kg/acre + Rhizobium bio-fertilizer seed inoculation.",
      task_2_title: "First Vegetative Irrigation",
      task_2_desc: "Drip check: 3-hour cycle before root node establishment.",
      task_3_title: "Prophylactic Fungicide Spray",
      task_3_desc: "Spray Mancozeb @ 2g/litre to defend against seedling collar rot.",
      task_4_title: "Pre-Sowing Ridge Preparation",
      task_4_desc: "Till soil with rotary harrow and furrow for 30cm row spacing."
    },
    te: {
      badgeText: "టూల్ 2 / 6 • సాగు ప్రణాళిక క్యాలెండర్",
      bannerTitle: "మల్టీ-ప్లాట్ పంట సాగు క్యాలెండర్",
      bannerSubtitle: "వ్యవసాయ దశల నిర్వహణ & షెడ్యూలింగ్",
      bannerDesc: "ప్రతి ప్లాట్‌కు నిర్దిష్ట పంట దశలు, ఎరువుల సమయాలు మరియు పంట కోత ప్రణాళికలను రూపొందించుకోండి. అవసరమైన పనులను జోడించండి, సవరించండి లేదా తొలగించండి.",
      activePlotLabel: "ఎంచుకున్న ప్లాట్:",
      assignedCropLabel: "సాగులో ఉన్న పంట:",
      tasksHeader: "షెడ్యూల్ చేసిన పనులు",
      forPlot: "నిర్వహిస్తున్న ప్లాట్:",
      addNewPlanBtn: "కొత్త ప్లాన్ జోడించండి",
      noTasksTitle: "ఈ ప్లాట్‌లో ఎలాంటి పనులు షెడ్యూల్ చేయలేదు",
      noTasksDesc: "ఎరువులు వేయడం, నీరు పెట్టడం లేదా మందులు పిచికారీ పనులను జోడించడానికి పై బటన్ నొక్కండి.",
      editModalTitle: "సాగు ప్రణాళికను సవరించండి",
      addModalTitle: "కొత్త పొలం పనిని షెడ్యూల్ చేయండి",
      modalActivityTitle: "పని / కార్యకలాపం పేరు",
      modalCropLabel: "లక్ష్య పంట రకం",
      modalStageLabel: "పని యొక్క దశ / వర్గం",
      modalDateLabel: "చేయవలసిన తేదీ (ఉదా: 15 Oct 2026)",
      modalDescLabel: "సూచనలు / మోతాదు వివరాలు",
      modalCancelBtn: "రద్దు చేయండి",
      modalSaveBtn: "ప్లాన్ భద్రపరచండి",
      deleteConfirmTooltip: "ఈ పనిని తొలగించండి",
      editTooltip: "ఈ పనిని సవరించండి",

      plot_a_name: "ప్లాట్ A (ఉత్తర ఎకరం)",
      plot_b_name: "ప్లాట్ B (తూర్పు బావి చేను)",
      plot_c_name: "ప్లాట్ C (నది పరివాహక చేను)",

      crop_soybean: "సోయాబీన్ (JS-335)",
      crop_chickpea: "శనగలు / బెంగాల్ గ్రామ్",
      crop_tomato: "టమోటా (అర్క రక్షక్)",
      crop_cotton: "పత్తి (Bt-II)",

      type_fertilizer: "ఎరువులు",
      type_irrigation: "నీటి పారుదల",
      type_pest_control: "పురుగు మందులు",
      type_sowing: "విత్తనం నాటడం",
      type_harvest: "పంట కోత",

      task_1_title: "ప్రాథమిక ఎరువుల వేతనం",
      task_1_desc: "ఎకరానికి 50 కిలోల DAP మరియు రైజోబియం జీవన ఎరువుల విత్తన శుద్ధి.",
      task_2_title: "మొదటి దశ నీటి తడుపు",
      task_2_desc: "డ్రిప్ ద్వారా 3 గంటల నీటి తడుపు; వేర్లు బలంగా నాటుకోవడానికి.",
      task_3_title: "శిలీంధ్ర నివారణ మందు పిచికారీ",
      task_3_desc: "మొక్క మొదలు కుళ్ళు తెగులు నివారణకు మాంకోజెబ్ 2 గ్రా/లీటరు పిచికారీ చేయండి.",
      task_4_title: "విత్తడానికి నేల సిద్ధం చేయడం",
      task_4_desc: "నేలను లోతుగా దున్ని 30 సెం.మీ సాళ్ల అంతరంతో బోదెలు ఏర్పాటు చేయండి."
    },
    hi: {
      badgeText: "टूल 2 / 6 • खेत कार्य कैलेंडर",
      bannerTitle: "खेत प्लॉट एवं फसल प्रबंधन कैलेंडर",
      bannerSubtitle: "फसल चक्र चरण प्रबंधन और कार्य योजना",
      bannerDesc: "प्रत्येक प्लॉट के लिए बुवाई, उर्वरक प्रयोग, सिंचाई और कटाई की अनुकूलित समय सारणी बनाएं। कार्यों को कभी भी जोड़ें, संपादित करें या हटाएं।",
      activePlotLabel: "सक्रिय प्लॉट:",
      assignedCropLabel: "वर्तमान फसल:",
      tasksHeader: "निर्धारित कृषि कार्य",
      forPlot: "खेत कार्य संचालन:",
      addNewPlanBtn: "नया कार्य जोड़ें",
      noTasksTitle: "इस प्लॉट के लिए कोई कार्य निर्धारित नहीं है",
      noTasksDesc: "सिंचाई, बुवाई अथवा छिड़काव कार्य जोड़ने के लिए ऊपर दिए गए बटन पर क्लिक करें।",
      editModalTitle: "कार्य योजना संपादित करें",
      addModalTitle: "नया कृषि कार्य निर्धारित करें",
      modalActivityTitle: "कार्य / गतिविधि का नाम",
      modalCropLabel: "फसल की किस्म",
      modalStageLabel: "कार्य की श्रेणी",
      modalDateLabel: "निष्पादन तिथि (उदा. 15 Oct 2026)",
      modalDescLabel: "निर्देश / मात्रा का विवरण",
      modalCancelBtn: "रद्द करें",
      modalSaveBtn: "योजना सुरक्षित करें",
      deleteConfirmTooltip: "इस कार्य को हटाएं",
      editTooltip: "इस कार्य को संपादित करें",

      plot_a_name: "प्लॉट A (उत्तरी एकड़)",
      plot_b_name: "प्लॉट B (पूर्वी कुआं खेत)",
      plot_c_name: "प्लॉट C (नदी किनारा खेत)",

      crop_soybean: "सोयाबीन (JS-335)",
      crop_chickpea: "चना / देशी चना",
      crop_tomato: "टमाटर (संकर अर्क रक्षक)",
      crop_cotton: "कपास (Bt-II)",

      type_fertilizer: "उर्वरक",
      type_irrigation: "सिंचाई",
      type_pest_control: "कीट नियंत्रण",
      type_sowing: "बुवाई",
      type_harvest: "कटाई",

      task_1_title: "आधार उर्वरक प्रयोग",
      task_1_desc: "डीएकपी 50 किग्रा/एकड़ और राइजोबियम जैव उर्वरक से बीज उपचार।",
      task_2_title: "वानस्पतिक अवस्था में प्रथम सिंचाई",
      task_2_desc: "ड्रिप सिंचाई: जड़ों के विकास हेतु 3 घंटे का जल चक्र।",
      task_3_title: "फफूंदनाशक छिड़काव",
      task_3_desc: "कॉलर रॉट रोग से बचाव के लिए मैंकोजेब 2 ग्राम/लीटर का छिड़काव।",
      task_4_title: "बुवाई पूर्व मेड़ एवं खेत तैयारी",
      task_4_desc: "रोटावेटर से गहरी जुताई कर 30 सेमी कतार दूरी बनाएं।"
    },
    ta: {
      badgeText: "கருவி 2 / 6 • பண்ணை காலண்டர் திட்டம்",
      bannerTitle: "பண்ணை மற்றும் பயிர் காலண்டர்",
      bannerSubtitle: "பயிர் வளர்ச்சி நிலை மற்றும் அட்டவணை மேலாண்மை",
      bannerDesc: "ஒவ்வொரு நிலத்திற்கும் விதைப்பு, நீர் பாய்ச்சுதல், உரமிடுதல் மற்றும் அறுவடை திட்டங்களை அமைத்துக் கொள்ளுங்கள். பணிகளை எளிதாக சேர்க்கலாம், திருத்தலாம் அல்லது நீக்கலாம்.",
      activePlotLabel: "தேர்ந்தெடுக்கப்பட்ட நிலம்:",
      assignedCropLabel: "பயிரிடப்பட்ட பயிர்:",
      tasksHeader: "திட்டமிடப்பட்ட பண்ணை பணிகள்",
      forPlot: "பணிகள் நடக்கும் நிலம்:",
      addNewPlanBtn: "புதிய பணி சேர்க்க",
      noTasksTitle: "இந்த நிலத்திற்கு பணிகள் ஏதும் இல்லை",
      noTasksDesc: "உரமிடுதல், நீர் பாய்ச்சுதல் அல்லது மருந்து தெளிக்கும் பணிகளைச் சேர்க்க மேலே உள்ள பொத்தானை அழுத்தவும்.",
      editModalTitle: "பணியைத் திருத்துக",
      addModalTitle: "புதிய பண்ணைப் பணியை திட்டமிடுக",
      modalActivityTitle: "பணி / செயல்பாட்டின் தலைப்பு",
      modalCropLabel: "பயிர் வகை",
      modalStageLabel: "பணியின் வகை",
      modalDateLabel: "செய்ய வேண்டிய தேதி (எ.கா. 15 Oct 2026)",
      modalDescLabel: "வழிமுறைகள் / மருந்தளவு விவரம்",
      modalCancelBtn: "ரத்து செய்",
      modalSaveBtn: "திட்டத்தை சேமி",
      deleteConfirmTooltip: "இப்பணியை நீக்கு",
      editTooltip: "இப்பணியைத் திருத்து",

      plot_a_name: "நிலம் A (வடக்கு பகுதி)",
      plot_b_name: "நிலம் B (கிழக்கு கிணற்று பகுதி)",
      plot_c_name: "நிலம் C (ஆற்றுப்படுகை பகுதி)",

      crop_soybean: "சோயாபீன் (JS-335)",
      crop_chickpea: "கொண்டைக்கடலை",
      crop_tomato: "தக்காளி (அர்கா ரக்ஷக்)",
      crop_cotton: "பருத்தி (Bt-II)",

      type_fertilizer: "உரமிடுதல்",
      type_irrigation: "நீர் பாய்ச்சுதல்",
      type_pest_control: "பூச்சி கட்டுப்பாடு",
      type_sowing: "விதைப்பு",
      type_harvest: "அறுவடை",

      task_1_title: "அடிப்படை உரமிடுதல்",
      task_1_desc: "ஏக்கருக்கு 50 கிலோ டிஏபி மற்றும் ரைசோபியம் நுண்ணுயிர் விதை நேர்த்தி.",
      task_2_title: "முதல் வளர்ச்சி நீர் பாய்ச்சுதல்",
      task_2_desc: "சொட்டு நீர் பாசனம்: வேர் பிடிப்பதற்கு 3 மணி நேர சுழற்சி.",
      task_3_title: "பூஞ்சாணக்கொல்லி தெளிப்பு",
      task_3_desc: "நாற்று அழுகல் நோயைத் தடுக்க மேன்கோசெப் 2 கிராம்/லிட்டர் தெளிக்கவும்.",
      task_4_title: "விதைப்புக்கு நிலம் தயாரித்தல்",
      task_4_desc: "நிலத்தை நன்கு உழுது 30 செ.மீ இடைவெளியில் பார் அமைக்கவும்."
    }
  };

  const cur = dict[lang] || dict.en;

  const plots: PlotInfo[] = [
    { id: 'plot_a', nameKey: 'plot_a_name', defaultCropKey: 'crop_soybean', area: '2.5 Acres' },
    { id: 'plot_b', nameKey: 'plot_b_name', defaultCropKey: 'crop_chickpea', area: '1.8 Acres' },
    { id: 'plot_c', nameKey: 'plot_c_name', defaultCropKey: 'crop_tomato', area: '1.2 Acres' }
  ];

  const [selectedPlotId, setSelectedPlotId] = useState<string>('plot_a');
  
  // Custom crop assignment per plot
  const [plotCrops, setPlotCrops] = useState<Record<string, string>>({
    plot_a: 'crop_soybean',
    plot_b: 'crop_chickpea',
    plot_c: 'crop_tomato'
  });

  // Master schedule items list with full persistence state
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: 'sch-1',
      plotId: 'plot_a',
      date: '05 Oct 2026',
      title: cur.task_1_title,
      crop: cur.crop_soybean,
      type: 'Fertilizer',
      desc: cur.task_1_desc
    },
    {
      id: 'sch-2',
      plotId: 'plot_a',
      date: '12 Oct 2026',
      title: cur.task_2_title,
      crop: cur.crop_soybean,
      type: 'Irrigation',
      desc: cur.task_2_desc
    },
    {
      id: 'sch-3',
      plotId: 'plot_a',
      date: '28 Oct 2026',
      title: cur.task_3_title,
      crop: cur.crop_soybean,
      type: 'Pest Control',
      desc: cur.task_3_desc
    },
    {
      id: 'sch-4',
      plotId: 'plot_b',
      date: '08 Oct 2026',
      title: cur.task_4_title,
      crop: cur.crop_chickpea,
      type: 'Sowing',
      desc: cur.task_4_desc
    }
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<{
    title: string;
    crop: string;
    date: string;
    type: ScheduleItem['type'];
    desc: string;
  }>({
    title: '',
    crop: cur[plotCrops[selectedPlotId]] || cur.crop_soybean,
    date: '15 Oct 2026',
    type: 'Fertilizer',
    desc: ''
  });

  const activePlot = plots.find(p => p.id === selectedPlotId) || plots[0];
  const activeCropKey = plotCrops[selectedPlotId] || activePlot.defaultCropKey;
  const activeCropName = cur[activeCropKey] || activeCropKey;

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      crop: activeCropName,
      date: '15 Oct 2026',
      type: 'Fertilizer',
      desc: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ScheduleItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      crop: item.crop,
      date: item.date,
      type: item.type,
      desc: item.desc
    });
    setIsModalOpen(true);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      setSchedules(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, plotId: selectedPlotId }
          : item
      ));
    } else {
      const newItem: ScheduleItem = {
        id: `sch-${Date.now()}`,
        plotId: selectedPlotId,
        ...formData
      };
      setSchedules(prev => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeletePlan = (id: string) => {
    setSchedules(prev => prev.filter(item => item.id !== id));
  };

  const handlePlotCropChange = (cropKey: string) => {
    setPlotCrops(prev => ({
      ...prev,
      [selectedPlotId]: cropKey
    }));
  };

  const activePlotSchedules = schedules.filter(item => item.plotId === selectedPlotId);

  const getStageTypeLabel = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'Fertilizer': return cur.type_fertilizer;
      case 'Irrigation': return cur.type_irrigation;
      case 'Pest Control': return cur.type_pest_control;
      case 'Sowing': return cur.type_sowing;
      case 'Harvest': return cur.type_harvest;
      default: return type;
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
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold">
              <CalendarIcon className="w-4 h-4" />
              {cur.bannerSubtitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{cur.bannerTitle}</h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              {cur.bannerDesc}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">{cur.activePlotLabel}</span>
              <span className="text-sm font-black text-white">{cur[activePlot.nameKey]}</span>
            </div>
          </div>
        </div>

        {/* Plot & Crop Configuration Controls */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Plot Switcher */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {cur.activePlotLabel}
            </label>
            <select
              value={selectedPlotId}
              onChange={(e) => setSelectedPlotId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold outline-none focus:border-emerald-600 cursor-pointer"
            >
              {plots.map(p => (
                <option key={p.id} value={p.id}>
                  {cur[p.nameKey]} ({p.area})
                </option>
              ))}
            </select>
          </div>

          {/* Crop Selector for Selected Plot */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              {cur.assignedCropLabel}
            </label>
            <select
              value={activeCropKey}
              onChange={(e) => handlePlotCropChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="crop_soybean">{cur.crop_soybean}</option>
              <option value="crop_chickpea">{cur.crop_chickpea}</option>
              <option value="crop_tomato">{cur.crop_tomato}</option>
              <option value="crop_cotton">{cur.crop_cotton}</option>
            </select>
          </div>

        </div>

        {/* Scheduled Activities Timeline Section */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  {cur.tasksHeader} ({activePlotSchedules.length})
                </h2>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                  {activeCropName}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {cur.forPlot} {cur[activePlot.nameKey]} ({activePlot.area})
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{cur.addNewPlanBtn}</span>
            </button>
          </div>

          {activePlotSchedules.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-2">
              <CalendarCheck className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">{cur.noTasksTitle}</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">{cur.noTasksDesc}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activePlotSchedules.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 hover:border-emerald-300 transition group"
                >
                  {/* Date Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-900 flex flex-col items-center justify-center shrink-0 border border-emerald-200 shadow-sm">
                    <span className="text-[10px] uppercase font-black text-emerald-800">
                      {item.date.split(' ')[1] || 'OCT'}
                    </span>
                    <span className="text-lg font-black leading-tight text-emerald-900">
                      {item.date.split(' ')[0] || '01'}
                    </span>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] bg-white border border-emerald-200 text-emerald-800 font-extrabold px-2 py-0.5 rounded">
                          {item.crop}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100">
                          {getStageTypeLabel(item.type)}
                        </span>

                        {/* Action Buttons: Edit and Delete */}
                        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                            title={cur.editTooltip}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(item.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title={cur.deleteConfirmTooltip}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Add / Edit Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">
                  {editingId ? cur.editModalTitle : cur.addModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  {cur.modalActivityTitle}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Micronutrient Spray, Sowing, Soil Tilth"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {cur.modalCropLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    {cur.modalStageLabel}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="Fertilizer">{cur.type_fertilizer}</option>
                    <option value="Irrigation">{cur.type_irrigation}</option>
                    <option value="Pest Control">{cur.type_pest_control}</option>
                    <option value="Sowing">{cur.type_sowing}</option>
                    <option value="Harvest">{cur.type_harvest}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  {cur.modalDateLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 18 Oct 2026"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  {cur.modalDescLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Apply DAP @ 50kg/acre before 4 PM. Irrigate lightly after application."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition cursor-pointer"
                >
                  {cur.modalCancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer"
                >
                  {cur.modalSaveBtn}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}