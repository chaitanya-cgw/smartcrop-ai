'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ArrowLeft, 
  ShieldCheck, 
  Landmark, 
  Plus, 
  MessageSquare, 
  Heart, 
  Share2, 
  Lock, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Post {
  id: string;
  author: string;
  role: string;
  isVerified: boolean;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: 'Event' | 'Advice' | 'Scheme Alert';
}

interface Scheme {
  id: string;
  title: string;
  desc: string;
  benefit: string;
  deadline: string;
  applyUrl: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'forum' | 'schemes' | 'verify'>('forum');
  const [isFarmerVerified, setIsFarmerVerified] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p1',
      author: 'Dr. K. Venkateshwarlu',
      role: 'Agri Extension Scientist, PJTSAU',
      isVerified: true,
      time: '2 hours ago',
      content: 'Farmers in Warangal & Karimnagar: Fall Armyworm infestation is reported in early Kharif maize. Spray Emamectin Benzoate 5% SG at 0.4g per liter of water immediately.',
      likes: 38,
      comments: 12,
      category: 'Advice'
    },
    {
      id: 'p2',
      author: 'Telangana Organic Farmers Collective',
      role: 'Registered Farmers Producer Organization (FPO)',
      isVerified: true,
      time: '5 hours ago',
      content: 'Organic Soil Conditioning & Seed Treatment Workshop this Saturday (10:00 AM) at Nizamabad Krishi Bhavan. Free bio-fertilizer starter culture packets will be distributed.',
      likes: 64,
      comments: 19,
      category: 'Event'
    }
  ]);

  const schemes: Scheme[] = [
    {
      id: 's1',
      title: 'PM-Kisan Samman Nidhi (19th Installment)',
      desc: 'Direct financial assistance of ₹6,000 per year transferred in three equal installments to eligible farmer families.',
      benefit: '₹2,000 / Quarter Direct DBT',
      deadline: 'Ongoing eKYC Renewal',
      applyUrl: 'https://pmkisan.gov.in'
    },
    {
      id: 's2',
      title: 'Rythu Bharosa / Farmer Investment Support',
      desc: 'State agricultural investment grant per acre per season for seeds, fertilizers, and operational field costs.',
      benefit: '₹7,500 / Acre per Season',
      deadline: 'Winter Season Registration',
      applyUrl: 'https://rythubharosa.telangana.gov.in'
    },
    {
      id: 's3',
      title: 'PM-KUSUM Solar Irrigation Pump Subsidy',
      desc: 'Up to 60% subsidy for setting up 3HP - 7.5HP solar agricultural water pumps on standalone borewells.',
      benefit: '60% Central + State Subsidy',
      deadline: 'October 31, 2026',
      applyUrl: 'https://pmkusum.mnre.gov.in'
    }
  ];

  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'Advice' | 'Event' | 'Scheme Alert'>('Advice');
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFarmerVerified) {
      alert('Posting is restricted to verified agricultural accounts. Please complete authority verification first.');
      return;
    }
    if (!postContent.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: 'Farmer Partner',
      role: 'Verified Farm Owner',
      isVerified: true,
      time: 'Just now',
      content: postContent,
      likes: 0,
      comments: 0,
      category: postCategory
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <span className="text-xs font-semibold bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
            Tool 6 of 8
          </span>
        </div>

        {/* Title Banner */}
        <div className="bg-gradient-to-r from-rose-700 via-pink-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-500/20 px-3 py-1 rounded-full text-rose-300 text-xs font-bold mb-2">
              <Users className="w-4 h-4" />
              Verified Agricultural Network
            </div>
            <h1 className="text-2xl font-black">Farmer Community & Schemes</h1>
            <p className="text-xs text-rose-100/80 mt-1 max-w-xl">
              Connect with fellow farmers, discover verified agricultural events, and claim direct state & central subsidies.
            </p>
          </div>

          <div className="flex bg-rose-950/60 p-1 rounded-2xl border border-rose-700/50 text-xs font-bold">
            <button
              onClick={() => setActiveTab('forum')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'forum' ? 'bg-white text-rose-900 shadow' : 'text-rose-200 hover:text-white'
              }`}
            >
              Verified Forum
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'schemes' ? 'bg-white text-rose-900 shadow' : 'text-rose-200 hover:text-white'
              }`}
            >
              Govt Schemes
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'verify' ? 'bg-white text-rose-900 shadow' : 'text-rose-200 hover:text-white'
              }`}
            >
              Get Verified
            </button>
          </div>
        </div>

        {/* Tab 1: Forum Posts */}
        {activeTab === 'forum' && (
          <div className="space-y-6">
            
            {/* Create Post Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Post an Update or Event Notice
                </span>
                <button
                  onClick={() => setIsFarmerVerified(!isFarmerVerified)}
                  className="text-[10px] font-bold text-slate-500 hover:text-emerald-700 underline"
                  title="Click to toggle test mode verification state"
                >
                  [Demo Mode: Toggle {isFarmerVerified ? 'Unverified' : 'Verified'}]
                </button>
              </div>

              {!isFarmerVerified ? (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-900">Only Verified Farmers & Agronomists Can Post</p>
                      <p className="text-[11px] text-amber-700 mt-0.5">To prevent spam and false crop advice, submit your farmer ID to get a verified badge.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('verify')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreatePost} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Share seasonal observations, alert nearby farmers about pest attacks, or announce community events..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-rose-500 font-medium"
                    required
                  />
                  <div className="flex items-center justify-between">
                    <select
                      aria-label="Category for Post"
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value as any)}
                      className="text-xs font-semibold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                    >
                      <option value="Advice">Farming Advice</option>
                      <option value="Event">Community Event</option>
                      <option value="Scheme Alert">Government Scheme</option>
                    </select>

                    <button
                      type="submit"
                      className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Publish Update
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Posts Stream */}
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-slate-900">{post.author}</h3>
                        {post.isVerified && (
                          <span title="Verified Authority" className="inline-flex">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">{post.role} • {post.time}</p>
                    </div>

                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    <button className="flex items-center gap-1.5 hover:text-rose-600 transition">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-rose-600 transition">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-slate-800 transition ml-auto">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Government Schemes */}
        {activeTab === 'schemes' && (
          <div className="space-y-4">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-600" />
                      {scheme.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{scheme.desc}</p>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shrink-0">
                    {scheme.benefit}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-medium">Timeline: {scheme.deadline}</span>
                  <a
                    href={scheme.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition"
                  >
                    Official Portal Application
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Verification Request Flow */}
        {activeTab === 'verify' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                Identity & Credential Check
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">
                Apply for Verified Community Organizer Badge
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verified badges allow farmers and agricultural specialists to publish community alerts, schedule village workshops, and organize regional farmer meetups.
              </p>
            </div>

            {verificationSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Verification Application Submitted!</p>
                  <p className="text-emerald-700 mt-0.5">The SmartCrop AI administrative panel is reviewing your documentation. You will receive an SMS confirmation within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setVerificationSubmitted(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    defaultValue="Chaitanya"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kisan Credit Card (KCC) or Pattadar Passbook No.</label>
                    <input
                      type="text"
                      placeholder="e.g. TS/HYD/2026/9821"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-rose-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Primary State & District</label>
                    <input
                      type="text"
                      defaultValue="Telangana, Hyderabad"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-rose-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason for Community Verification</label>
                  <textarea
                    rows={2}
                    placeholder="Describe your role (e.g., FPO leader, Progressive organic farmer, Village cooperative coordinator)..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md transition cursor-pointer"
                >
                  Submit Credential Review to Website Authorities
                </button>
              </form>
            )}
          </div>
        )}

      </main>
    </div>
  );
}