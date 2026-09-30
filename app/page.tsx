'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [authMethod, setAuthMethod] = useState<'phone' | 'google'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Phone OTP Flow simulation / trigger
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      alert('Please enter a valid verification code');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Store mock farmer session
      if (typeof window !== 'undefined') {
        localStorage.setItem('farmer_session', JSON.stringify({
          name: 'Farmer Partner',
          phone: phoneNumber,
          state: 'Telangana',
          location: 'Hyderabad'
        }));
      }
      router.push('/dashboard');
    }, 600);
  };

  // Google OAuth Flow
  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('farmer_session', JSON.stringify({
          name: 'Farmer Partner',
          email: 'farmer@smartcrop.ai',
          state: 'Telangana',
          location: 'Hyderabad'
        }));
      }
      router.push('/dashboard');
    }, 600);
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 overflow-hidden">
      {/* Background organic glow circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Header with Language Switcher */}
      <header className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </header>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 z-10 relative">
        {/* Brand identity */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-3 shadow-emerald-500/30">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {t('appName')}
          </h1>
          <p className="text-xs text-emerald-700 font-semibold tracking-wide uppercase mt-1">
            {t('tagline')}
          </p>
        </div>

        {/* Auth method tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setAuthMethod('phone'); setOtpSent(false); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
              authMethod === 'phone'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            {t('phoneLogin')}
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('google')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
              authMethod === 'google'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('googleLogin')}
          </button>
        </div>

        {/* Phone OTP Section */}
        {authMethod === 'phone' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    {t('enterPhone')}
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all bg-slate-50">
                    <span className="text-sm font-bold text-slate-500 mr-2 border-r border-slate-300 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="w-full bg-transparent text-sm text-slate-800 outline-none font-medium"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 10}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {loading ? 'Sending...' : t('sendOtp')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>OTP sent to +91 {phoneNumber}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    {t('enterOtp')}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • • • •"
                    className="w-full text-center text-xl tracking-widest py-2.5 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none bg-slate-50 font-bold text-slate-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 4}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {loading ? 'Verifying...' : t('verifyOtp')}
                  <ShieldCheck className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-xs text-slate-500 hover:text-emerald-700 font-medium text-center"
                >
                  Change phone number
                </button>
              </form>
            )}
          </div>
        )}

        {/* Google Sign-In Section */}
        {authMethod === 'google' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 text-center">
              Sign in securely using your registered Google account
            </p>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-xl text-slate-700 font-bold text-sm shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              {loading ? 'Connecting...' : t('googleLogin')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}