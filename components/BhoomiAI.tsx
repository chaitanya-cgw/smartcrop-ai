'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Sprout
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bhoomi' | 'user';
  text: string;
  timestamp: string;
}

export default function BhoomiAI() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const localizedContent: Record<string, { welcome: string; prompt1: string; prompt2: string; prompt3: string }> = {
    te: {
      welcome: "నమస్కారం! నేను భూమి AI. పంటల సాగు, ఎరువులు, ఆకు తెగుళ్లు మరియు అగ్రిలాక్ 6 గంటల ధర లాక్ రక్షణపై నన్ను ఏదైనా అడగండి!",
      prompt1: "మామిడి చెట్టు సాగు విధానం ఏమిటి?",
      prompt2: "ఎరువులు మరియు NPK వాడకం ఏమిటి?",
      prompt3: "అగ్రిలాక్ 6 గంటల ధర లాక్ ఎలా పనిచేస్తుంది?"
    },
    hi: {
      welcome: "नमस्ते! मैं भूमि AI हूँ। फसल पोषण, कीट उपचार और एग्रीलॉक 6-घंटे मंडी मूल्य गारंटी के बारे में कुछ भी पूछें!",
      prompt1: "आम की खेती और देखभाल कैसे करें?",
      prompt2: "उर्वरक और NPK का उपयोग क्या है?",
      prompt3: "एग्रीलॉक मूल्य लॉक कैसे काम करता है?"
    },
    ta: {
      welcome: "வணக்கம்! நான் பூமி AI. பயிர் உரங்கள், பூச்சி மேலாண்மை மற்றும் அக்ரிலாக் விலை பாதுகாப்பு பற்றி எதையும் கேளுங்கள்!",
      prompt1: "மாமரம் வளர்ப்பது எப்படி?",
      prompt2: "உரங்கள் மற்றும் NPK பயன்பாடு என்ன?",
      prompt3: "அக்ரிலாக் விலை பாதுகாப்பு எப்படி செயல்படுகிறது?"
    },
    en: {
      welcome: "Namaste! I am Bhoomi AI, your agronomy & AgriLock trade specialist. Ask me anything about crop diseases, fertilizers, or our 6-hour transit price lock guarantee!",
      prompt1: "How to grow healthy mango trees?",
      prompt2: "What is the use of fertilizers and balanced NPK?",
      prompt3: "How does the 6-hour price lock protect against mandi crashes?"
    }
  };

  const currentContent = localizedContent[currentLang] || localizedContent.en;

  useEffect(() => {
    setMessages([
      {
        id: `m-init-${currentLang}`,
        sender: 'bhoomi',
        text: currentContent.welcome,
        timestamp: 'Just now'
      }
    ]);
  }, [currentLang]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(4, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 25);
      setMousePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const speakText = (text: string) => {
    if (!isSpeakingEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const langLocaleMap: Record<string, string> = {
      te: 'te-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      en: 'en-IN'
    };

    const targetLocale = langLocaleMap[currentLang] || 'en-IN';
    utterance.lang = targetLocale;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang === targetLocale || v.lang.startsWith(targetLocale.slice(0, 2)));
    if (matchingVoice) utterance.voice = matchingVoice;

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const langLocaleMap: Record<string, string> = {
        te: 'te-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        en: 'en-IN'
      };
      recognition.lang = langLocaleMap[currentLang] || 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/bhoomi', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: query,
          language: currentLang 
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const answer = data.reply || "Could not retrieve answer. Please try again.";

      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bhoomi',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(answer);
    } catch (err) {
      console.error(err);
      const fallback = currentLang === 'te' 
        ? "సాంకేతిక సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి." 
        : "Network issue. Please try again.";

      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bhoomi',
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Floating Mascot Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-bold px-3.5 py-2 rounded-2xl border border-emerald-200 shadow-xl cursor-pointer hover:border-emerald-500 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Bhoomi AI ({currentLang.toUpperCase()})</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Bhoomi AI Assistant"
          className="relative w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-700/30 flex items-center justify-center p-2.5 transition-all border-2 border-white cursor-pointer"
        >
          {/* Pupil tracking */}
          <div ref={eyeRef} className="w-full h-full relative flex items-center justify-center gap-1.5">
            <div className="w-3.5 h-4 bg-white rounded-full relative flex items-center justify-center overflow-hidden shadow-inner">
              <div 
                className="w-2 h-2 bg-emerald-950 rounded-full"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
              />
            </div>
            <div className="w-3.5 h-4 bg-white rounded-full relative flex items-center justify-center overflow-hidden shadow-inner">
              <div 
                className="w-2 h-2 bg-emerald-950 rounded-full"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
              />
            </div>
          </div>

          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      </div>

      {/* Slide-Up White Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[550px] bg-white rounded-3xl border border-emerald-100 shadow-2xl flex flex-col overflow-hidden font-sans">
          
          {/* Green Accent Header */}
          <div className="p-4 border-b border-emerald-100 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold">Bhoomi AI</h3>
                  <span className="text-[10px] bg-white/20 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                    {currentLang} • Live
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100">Agronomy & AgriLock Trade Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
                className="p-1.5 text-emerald-100 hover:text-white rounded-lg hover:bg-white/10 transition"
                title={isSpeakingEnabled ? 'Mute' : 'Unmute'}
              >
                {isSpeakingEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-100 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Suggested Chips */}
          <div className="px-4 py-2.5 bg-emerald-50/60 border-b border-emerald-100 flex gap-2 overflow-x-auto no-scrollbar text-[11px]">
            <button
              onClick={() => handleSendMessage(currentContent.prompt1)}
              className="whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-100/60 text-emerald-900 font-bold rounded-lg border border-emerald-200 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              {currentLang === 'te' ? 'మామిడి సాగు' : 'Mango Care'}
            </button>
            <button
              onClick={() => handleSendMessage(currentContent.prompt2)}
              className="whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-100/60 text-emerald-900 font-bold rounded-lg border border-emerald-200 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              {currentLang === 'te' ? 'ఎరువుల వాడకం' : 'NPK Fertilizers'}
            </button>
            <button
              onClick={() => handleSendMessage(currentContent.prompt3)}
              className="whitespace-nowrap px-3 py-1 bg-white hover:bg-emerald-100/60 text-emerald-900 font-bold rounded-lg border border-emerald-200 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {currentLang === 'te' ? 'ధర లాక్ రక్షణ' : 'Price Lock'}
            </button>
          </div>

          {/* Chat Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs leading-relaxed bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-emerald-100/80 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                {m.sender === 'bhoomi' && (
                  <button
                    onClick={() => speakText(m.text)}
                    className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 mt-1 pl-1 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{currentLang === 'te' ? 'వినండి' : 'Listen'}</span>
                  </button>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold bg-white p-2.5 rounded-xl border border-emerald-100 w-fit shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>{currentLang === 'te' ? 'భూమి సమాధానం వెతుకుతోంది...' : 'Bhoomi is consulting Gemini AI...'}</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 border-t border-emerald-100 bg-white flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Speak"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={currentLang === 'te' ? 'పంటలు, ధర లాక్ గురించి అడగండి...' : 'Ask about crops, fertilizers, price locks...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 transition"
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}