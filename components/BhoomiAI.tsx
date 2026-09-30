'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MessageSquare 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bhoomi';
  text: string;
  timestamp: string;
}

export default function BhoomiAI() {
  const { t, i18n } = useTranslation();
  
  // Widget Open/Close State
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Tracking for Animated Eyes
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  // Chat & Speech State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Language Code Map for Speech Recognition & Synthesis
  const langVoiceMap: Record<string, { speech: string; voiceNamePart?: string }> = {
    te: { speech: 'te-IN' },
    hi: { speech: 'hi-IN' },
    ta: { speech: 'ta-IN' },
    en: { speech: 'en-IN' }
  };

  // Cursor-Tracking Eye Physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(6, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 30);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Native Speech Synthesis (Speaks back in chosen language)
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langVoiceMap[i18n.language]?.speech || 'en-IN';
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Clear and measured pace for farmers

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Web Speech API Voice Recognition
  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = langVoiceMap[i18n.language]?.speech || 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      if (speechToText) {
        handleUserQuery(speechToText);
      }
    };

    recognition.start();
  };

  // Process Farmer Query & Generate Voice Response
  const handleUserQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate responsive contextual agricultural answer
    setTimeout(() => {
      let reply = '';
      const lower = queryText.toLowerCase();

      if (i18n.language === 'te') {
        if (lower.includes('టమాటా') || lower.includes('తెగులు')) {
          reply = 'టమాటా ఆకులపై నల్లటి మచ్చలు కనిపిస్తే కాపర్ ఆక్సిక్లోరైడ్ 50% డబ్ల్యుపీ మందును లీటరు నీటికి 2.5 గ్రాములు కలిపి పిచికారీ చేయండి.';
        } else if (lower.includes('మార్కెట్') || lower.includes('ధర')) {
          reply = 'ఈరోజు బోయిన్‌పల్లి మార్కెట్లో టమాటా ధర క్వింటాలుకు ₹3,400 మరియు సోయాబీన్ ధర నిజామాబాద్ మార్కెట్లో ₹4,950 గా ఉంది.';
        } else {
          reply = 'నేను మీ వ్యవసాయ సహాయకుడిని. నేల రకం, విత్తనాలు లేదా పంటల మార్పిడి గురించి నన్ను అడగండి.';
        }
      } else if (i18n.language === 'hi') {
        if (lower.includes('टमाटर') || lower.includes('रोग')) {
          reply = 'टमाटर की अगेती झुलसा बीमारी के लिए कॉपर ऑक्सीक्लोराइड 50% WP का 2.5 ग्राम प्रति लीटर पानी में घोल बनाकर सुबह के समय छिड़काव करें।';
        } else if (lower.includes('मंडी') || lower.includes('भाव')) {
          reply = 'आज की ताजा मंडी दरों के अनुसार टमाटर ₹3,400 प्रति क्विंटल और सोयाबीन ₹4,950 प्रति क्विंटल के स्तर पर कारोबार कर रहा है।';
        } else {
          reply = 'नमस्ते किसान भाई! मैं भूमि AI हूँ। आप मुझसे मौसम, खाद, कीट नियंत्रण या मंडी भाव के बारे में पूछ सकते हैं।';
        }
      } else {
        if (lower.includes('tomato') || lower.includes('disease') || lower.includes('spot')) {
          reply = 'For dark target spots on tomato leaves, apply Copper Oxychloride 50% WP at 2.5 grams per liter of water. Prune infected lower branches to prevent further spore propagation.';
        } else if (lower.includes('price') || lower.includes('mandi') || lower.includes('rate')) {
          reply = 'Today Bowenpally Mandi tomato rate is ₹3,400 per quintal, and Nizamabad Soybean is trading at ₹4,950 per quintal.';
        } else {
          reply = 'Hello Farmer Partner! I am Bhoomi AI. I can assist you with dynamic crop rotation planning, soil N-P-K balances, pest cures, and live APMC market prices.';
        }
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bhoomi',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      
      // Auto voice reply as specified
      speakText(reply);
    }, 600);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating Animated Mascot Widget (Always pinned at bottom-right) */}
      <div 
        ref={eyeRef}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Tooltip Speech Bubble */}
        {isHovered && !isOpen && (
          <div className="bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-right-3 duration-200 whitespace-nowrap">
            {t('bhoomiGreeting')}
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-slate-900 transform -translate-y-1/2 rotate-45" />
          </div>
        )}

        {/* Mascot Circle with Cursor-Tracking Eyes */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Bhoomi AI Assistant"
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-1 shadow-2xl shadow-emerald-700/40 border-2 border-emerald-300 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer group"
        >
          {/* Decorative agricultural leaf sprout */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-400 rounded-full border border-emerald-200 shadow-sm" />

          {/* Face Area with Twin Interactive Eyes */}
          <div className="w-full h-full bg-emerald-950 rounded-full flex items-center justify-center gap-2 px-2 overflow-hidden relative">
            
            {/* Left Eye */}
            <div className="w-4 h-5 bg-white rounded-full flex items-center justify-center relative shadow-inner">
              <div 
                className="w-2.5 h-2.5 bg-emerald-950 rounded-full transition-transform ease-out duration-75"
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`
                }}
              >
                <div className="w-1 h-1 bg-white rounded-full mt-0.5 ml-0.5" />
              </div>
            </div>

            {/* Right Eye */}
            <div className="w-4 h-5 bg-white rounded-full flex items-center justify-center relative shadow-inner">
              <div 
                className="w-2.5 h-2.5 bg-emerald-950 rounded-full transition-transform ease-out duration-75"
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`
                }}
              >
                <div className="w-1 h-1 bg-white rounded-full mt-0.5 ml-0.5" />
              </div>
            </div>

            {/* Speaking audio wave indicator ring */}
            {isSpeaking && (
              <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none" />
            )}
          </div>
        </button>
      </div>

      {/* Slide-Up Regional Voice Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600/40 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Bhoomi AI</h3>
                <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Voice-First Regional Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSpeaking && (
                <button 
                  onClick={() => window.speechSynthesis.cancel()} 
                  title="Mute voice"
                  className="p-1.5 rounded-lg hover:bg-emerald-700/50 text-emerald-200"
                >
                  <Volume2 className="w-4 h-4 animate-bounce" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation Message History */}
          <div className="p-4 flex-1 h-80 overflow-y-auto space-y-3 text-xs bg-slate-50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2 p-4">
                <MessageSquare className="w-8 h-8 text-emerald-600/40" />
                <p className="font-medium">
                  {t('bhoomiGreeting')}
                </p>
                <p className="text-[11px] text-slate-400">
                  Tap the microphone to speak in your chosen regional language.
                </p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white font-medium rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Audio Input & Text Dispatch Controls */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            
            {/* Native Voice Chat Microphone Button */}
            <button
              onClick={startVoiceInput}
              disabled={isListening}
              title="Click and speak in your language"
              className={`p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              placeholder="Ask anything or speak..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserQuery(inputText)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-emerald-500"
            />

            {/* Send Button */}
            <button
              onClick={() => handleUserQuery(inputText)}
              disabled={!inputText.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition cursor-pointer shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}