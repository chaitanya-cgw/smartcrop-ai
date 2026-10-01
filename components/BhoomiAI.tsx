'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Loader2, 
  Sprout, 
  ShieldCheck, 
  TrendingUp, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';
import { useToolTranslation } from '@/lib/useAppLanguage';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function BhoomiAI() {
  const { lang } = useToolTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Localized UI dictionary
  const uiText: Record<string, Record<string, string>> = {
    en: {
      botName: "Bhoomi AI",
      botSubtitle: "Agronomy & AgriLock Trade Specialist",
      statusBadge: "EN • LIVE",
      placeholder: "Ask about crops, fertilizers, price locks...",
      welcome: "Namaste! I am Bhoomi AI, your agronomy & AgriLock trade specialist. Ask me anything about crop diseases, fertilizers, or our 6-hour transit price lock guarantee!",
      listen: "Listen",
      stop: "Stop",
      chip1: "Mango Care",
      chip2: "NPK Fertilizers",
      chip3: "Price Lock",
      q1: "How to protect mango flowering from hoppers?",
      q2: "What is the recommended NPK ratio for paddy?",
      q3: "How does the AgriLock 6-hour transit price lock work?"
    },
    te: {
      botName: "భూమి AI",
      botSubtitle: "వ్యవసాయ & అగ్రిలాక్ వాణిజ్య నిపుణుడు",
      statusBadge: "TE • LIVE",
      placeholder: "పంటలు, ఎరువులు, ధర లాక్ గురించి అడగండి...",
      welcome: "నమస్కారం! నేను భూమి AI. పంటల సాగు, ఎరువులు, ఆకు తెగుళ్ళు మరియు అగ్రిలాక్ 6 గంటల ధర లాక్ రక్షణపై నన్ను ఏదైనా అడగండి!",
      listen: "వినండి",
      stop: "ఆపండి",
      chip1: "మామిడి సాగు",
      chip2: "ఎరువుల వాడకం",
      chip3: "ధర లాక్ రక్షణ",
      q1: "మామిడి పూత రాలకుండా ఎలాంటి జాగ్రత్తలు తీసుకోవాలి?",
      q2: "వరి పంటకు సిఫార్సు చేసిన ఎరువుల మోతాదు ఎంత?",
      q3: "అగ్రిలాక్ 6-గంటల రవాణా ధర లాక్ ఎలా పనిచేస్తుంది?"
    },
    hi: {
      botName: "भूमि AI",
      botSubtitle: "कृषि एवं एग्रीलॉक व्यापार विशेषज्ञ",
      statusBadge: "HI • LIVE",
      placeholder: "फसल, खाद, मूल्य लॉक के बारे में पूछें...",
      welcome: "नमस्ते! मैं भूमि AI हूँ। फसल सुरक्षा, उर्वरक, और एग्रीलॉक 6-घंटे मूल्य सुरक्षा पर मुझसे कोई भी प्रश्न पूछें!",
      listen: "सुनें",
      stop: "रोकें",
      chip1: "आम की देखभाल",
      chip2: "NPK उर्वरक",
      chip3: "भाव लॉक",
      q1: "आम के बौर को कीटों से कैसे बचाएं?",
      q2: "धान की फसल के लिए संतुलित खाद की मात्रा क्या है?",
      q3: "एग्रीलॉक 6-घंटे मंडी भाव लॉक कैसे काम करता है?"
    },
    ta: {
      botName: "பூமி AI",
      botSubtitle: "வேளாண் & அக்ரிலாக் சந்தை ஆலோசகர்",
      statusBadge: "TA • LIVE",
      placeholder: "பயிர்கள், உரங்கள், விலை பூட்டு பற்றி கேட்கவும்...",
      welcome: "வணக்கம்! நான் பூமி AI. பயிர் நோய்கள், உரங்கள் மற்றும் அக்ரிலாக் 6 மணி நேர விலை பாதுகாப்பு பற்றி என்னிடம் கேட்கலாம்!",
      listen: "கேட்க",
      stop: "நிறுத்து",
      chip1: "மாம்பழ பராமரிப்பு",
      chip2: "NPK உரங்கள்",
      chip3: "விலை பாதுகாப்பு",
      q1: "மா மரத்தில் பூ உதிர்வதை தடுப்பது எப்படி?",
      q2: "நெல் பயிருக்கான பரிந்துரைக்கப்பட்ட உர அளவு என்ன?",
      q3: "அக்ரிலாக் 6 மணி நேர விலை பாதுகாப்பு எப்படி செயல்படுகிறது?"
    }
  };

  const cur = uiText[lang] || uiText.en;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: cur.welcome
    }
  ]);

  // Update welcome message if language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', sender: 'ai', text: cur.welcome }];
      }
      return prev;
    });
  }, [lang, cur.welcome]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice speech synthesis (TTS)
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voiceLangMap: Record<string, string> = {
      te: 'te-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      en: 'en-IN'
    };
    utterance.lang = voiceLangMap[lang] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Web Speech recognition (STT)
  const toggleListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const sttLangMap: Record<string, string> = {
        te: 'te-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        en: 'en-IN'
      };
      recognition.lang = sttLangMap[lang] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const query = (textOverride || input).trim();
    if (!query || isLoading) return;

    setInput('');
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/bhoomi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language: lang })
      });

      const data = await res.json();

      if (data.reply) {
        const aiMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          sender: 'ai', 
          text: data.reply 
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.error || "Unable to retrieve response. Please check API credentials."
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } catch (err: any) {
      console.error("Bhoomi client error:", err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Connection to server was interrupted. Please verify your internet connection and try again."
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 group cursor-pointer border border-emerald-400/30"
          aria-label="Open Bhoomi AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <span className="hidden sm:inline font-black text-sm tracking-tight">
            {cur.botName} ({lang.toUpperCase()})
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
            isExpanded 
              ? 'inset-4 sm:inset-10' 
              : 'bottom-4 right-4 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base leading-tight">{cur.botName}</h3>
                  <span className="text-[10px] bg-white/20 text-emerald-100 px-2 py-0.5 rounded-full font-bold border border-white/20">
                    {cur.statusBadge}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 font-medium">
                  {cur.botSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition hidden sm:inline-block cursor-pointer"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  if (isSpeaking) {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                  setIsOpen(false);
                }}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-emerald-50/70 border-b border-emerald-100 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend(cur.q1)}
              className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-full text-xs font-bold whitespace-nowrap shadow-xs transition flex items-center gap-1 cursor-pointer"
            >
              <Sprout className="w-3 h-3 text-emerald-600" />
              {cur.chip1}
            </button>
            <button
              onClick={() => handleSend(cur.q2)}
              className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-full text-xs font-bold whitespace-nowrap shadow-xs transition flex items-center gap-1 cursor-pointer"
            >
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {cur.chip2}
            </button>
            <button
              onClick={() => handleSend(cur.q3)}
              className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-full text-xs font-bold whitespace-nowrap shadow-xs transition flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              {cur.chip3}
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none font-normal'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {/* Text to Speech button for AI responses */}
                {m.sender === 'ai' && (
                  <button
                    onClick={() => speakText(m.text)}
                    className="mt-1 ml-1 text-[11px] font-bold text-slate-500 hover:text-emerald-700 flex items-center gap-1 transition cursor-pointer"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3 h-3 text-rose-500" />
                        <span className="text-rose-600">{cur.stop}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-emerald-600" />
                        <span>{cur.listen}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-2xl px-4 py-3 w-fit">
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Bhoomi is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-2xl border transition cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
              }`}
              title={isListening ? "Listening..." : "Click to speak"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={cur.placeholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-2xl transition shadow-md shadow-emerald-700/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}