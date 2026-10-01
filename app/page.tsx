'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  Truck,
  Phone,
  BadgeCheck,
  Sprout
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { auth, googleProvider } from '@/lib/firebase';
import { 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  ConfirmationResult 
} from 'firebase/auth';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [authMethod, setAuthMethod] = useState<'phone' | 'google'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const setupRecaptcha = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
      }
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && (window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch {}
      }
    };
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const formattedPhone = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!confirmationResult) {
      setErrorMessage('Session expired. Please request OTP again.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;

      if (typeof window !== 'undefined') {
        localStorage.setItem('farmer_session', JSON.stringify({
          name: user.displayName || 'Farmer Partner',
          phone: user.phoneNumber || `+91 ${phoneNumber}`,
          state: 'Telangana',
          location: 'Hyderabad'
        }));
      }
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Incorrect OTP or verification expired.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (typeof window !== 'undefined') {
        localStorage.setItem('farmer_session', JSON.stringify({
          name: user.displayName || 'Farmer Partner',
          email: user.email || '',
          state: 'Telangana',
          location: 'Hyderabad'
        }));
      }
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Google sign-in cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/50 font-sans selection:bg-emerald-600 selection:text-white">
      <div id="recaptcha-container"></div>

      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-emerald-100/60 to-transparent pointer-events-none" />

      {/* Floating Language Switcher */}
      <header className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </header>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 py-10">
        
        {/* Left Value Proposition */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-sm">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>APMC Guaranteed Price-Lock & Forward Trade Protocol</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Stop Mandi Price Crashes. <br />
              <span className="text-emerald-600">
                Lock In Your Rate Before Transit.
              </span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Insulate your crop value from sudden afternoon price drops. Lock agreed rates for a 6-hour travel window with digital APMC deal slips backed by merchant security deposits.
            </p>
          </div>

          {/* Assurance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white border border-emerald-100 shadow-sm p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">6-Hr Price Lock</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Frozen rates during truck transit to the mandi.</p>
            </div>

            <div className="bg-white border border-emerald-100 shadow-sm p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Escrow Security</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Merchants deposit advance tokens to prevent default.</p>
            </div>

            <div className="bg-white border border-emerald-100 shadow-sm p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">APMC Deal Slips</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">QR-verified contracts prevent buyer refusal on arrival.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold pt-1">
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero middleman commission • APMC Yard Registered</span>
          </div>
        </div>

        {/* Right White Card Sign-In Box */}
        <div className="lg:col-span-5 w-full bg-white rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 p-6 sm:p-8">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-3">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Farmer Sign In</h2>
            <p className="text-xs text-slate-500 mt-1">Access your forward deals and farm planning suite</p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Auth Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => { setAuthMethod('phone'); setOtpSent(false); setErrorMessage(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                authMethod === 'phone'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('google'); setErrorMessage(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                authMethod === 'google'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Google
            </button>
          </div>

          {/* Mobile Phone Form */}
          {authMethod === 'phone' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Enter Mobile Number
                    </label>
                    <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition bg-slate-50/50">
                      <span className="text-sm font-bold text-slate-500 mr-2 border-r border-slate-200 pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phoneNumber.length < 10}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {loading ? 'Sending Code...' : 'Send SMS OTP'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>OTP sent to +91 {phoneNumber}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full text-center text-xl tracking-widest py-2 border border-slate-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-slate-50 font-bold text-slate-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {loading ? 'Verifying...' : 'Verify & Enter Dashboard'}
                    <ShieldCheck className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setErrorMessage(''); }}
                    className="w-full text-xs text-slate-500 hover:text-emerald-700 font-medium text-center cursor-pointer pt-1"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Google Sign In */}
          {authMethod === 'google' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 text-center">
                Instant sign-in via your verified Google Account
              </p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-xl text-slate-700 font-bold text-xs shadow-sm flex items-center justify-center gap-3 transition cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                {loading ? 'Connecting...' : 'Continue with Google'}
              </button>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}