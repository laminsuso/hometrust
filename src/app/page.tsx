'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Hammer, 
  Paintbrush, 
  Info, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Zap, 
  Home as HomeIcon, 
  ChevronRight,
  Calculator,
  HardHat,
  HeartPulse,
  Search,
  Video,
  Star,
  ArrowRight,
  Menu,
  X,
  LucideIcon,
  Quote
} from 'lucide-react';

// --- Types ---
interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
}

interface PriceItem {
  job: string;
  price: string;
  detail: string;
}

interface Tier {
  id: string;
  name: string;
  desc: string;
  color: string;
}

// --- Constants & Config ---
const TIERS: Record<string, Tier> = {
  CRITICAL: {
    id: 'critical',
    name: 'Tier 1: Protect the House',
    desc: 'Prevents structural rot, mold, or safety hazards.',
    color: 'border-red-200 bg-red-50 text-red-700',
  },
  FUNCTIONAL: {
    id: 'functional',
    name: 'Tier 2: System Health',
    desc: 'Essential daily comforts (HVAC, Water, Power).',
    color: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  AESTHETIC: {
    id: 'aesthetic',
    name: 'Tier 3: Aesthetic (Optional)',
    desc: 'Purely visual. You have permission to ignore these.',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  }
};

const PRICE_GRID: PriceItem[] = [
  { job: 'Handyperson Task', price: '158', detail: 'Up to 2 hours' },
  { job: 'Leaky Faucet Fix', price: '226', detail: 'Parts included' },
  { job: 'Outlet Replacement', price: '185', detail: 'Safety checked' },
  { job: 'Gutter Cleaning', price: '199', detail: 'Single story' }
];

// --- Sub-Components ---

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-slate-200 shadow-sm">
    <Icon className="w-3.5 h-3.5 text-emerald-600" />
    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{text}</span>
  </div>
);

const Navbar: React.FC = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">Hometrust</span>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-500">
          <a href="#" className="hover:text-emerald-600 transition-colors">Triage Tools</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Cost Guides</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Pro Directory</a>
          <div className="h-4 w-px bg-slate-200" />
          <a href="#" className="text-blue-600 flex items-center gap-1">
            <HeartPulse className="w-4 h-4" /> Aging-in-Place
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-slate-900">Join as a Pro</a>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">
          Emergency Support
        </button>
      </div>
    </div>
  </nav>
);

const Hero: React.FC = () => {
  const [triageInput, setTriageInput] = useState('');

  return (
    <section className="pt-40 pb-20 px-6 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex gap-3 mb-6">
            <TrustBadge icon={CheckCircle2} text="Happiness Pledge" />
            <TrustBadge icon={ShieldCheck} text="Verified Only" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-6">
            Home repair <br /><span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">made simple.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
            Stop the overwhelm. Triage your project list in seconds, get "No-Surprise" pricing, and talk to experts before you hire.
          </p>
          
          <div className="relative max-w-xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
              <Search className="ml-4 text-slate-400 w-6 h-6" />
              <input 
                type="text" 
                placeholder="Enter your projects (e.g. 'Leaking sink, Paint kitchen')"
                className="flex-1 p-4 bg-transparent outline-none text-slate-900 font-medium"
                value={triageInput}
                onChange={(e) => setTriageInput(e.target.value)}
              />
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all">
                Triage Now
              </button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Prioritization</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Obligation</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-900 text-xl tracking-tight">Your Triage Summary</h3>
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Updated Just Now</div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border-l-4 border-red-500 bg-red-50 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-black text-red-600 uppercase mb-1">Tier 1: Critical</div>
                  <div className="font-bold text-slate-800">Roof Leak Detection</div>
                </div>
                <ArrowRight className="w-5 h-5 text-red-400" />
              </div>
              <div className="p-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 flex justify-between items-center grayscale opacity-60">
                <div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase mb-1">Tier 3: Aesthetic</div>
                  <div className="font-bold text-slate-800">Cabinet Painting</div>
                </div>
                <div className="text-[10px] font-bold bg-white px-2 py-1 rounded border whitespace-nowrap">Permission to Ignore</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-2">
                <Video className="w-5 h-5 text-emerald-400" />
                <span className="font-bold">Next Step: Expert Sync</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">Avoid common DIY blunders. Speak with a 20-year pro for 10 minutes, free.</p>
              <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-emerald-50 transition-colors">
                Book Expert Call
              </button>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 max-w-xs">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Calculator className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">System Debt Saved</div>
              <div className="text-lg font-black text-slate-900">$12,400+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingGrid: React.FC = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">No-Surprise Pricing</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto italic">
          We battle "information asymmetry" by providing upfront digital pricing on small jobs before you even call.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICE_GRID.map((item, idx) => (
          <div key={idx} className="group p-8 rounded-3xl border border-slate-100 bg-[#F8FAF9] hover:bg-white hover:shadow-2xl hover:border-emerald-500 transition-all">
            <h4 className="font-bold text-slate-900 mb-1">{item.job}</h4>
            <p className="text-xs text-slate-500 mb-6">{item.detail}</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-sm font-bold text-slate-400">From</span>
              <span className="text-4xl font-black text-slate-900">${item.price}</span>
            </div>
            <button className="w-full py-3 rounded-xl border-2 border-slate-900 font-bold text-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProSection: React.FC = () => (
  <section className="py-24 px-6 bg-slate-50">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
      <div className="lg:w-1/3">
        <h2 className="text-4xl font-black text-slate-900 mb-6">Verified-Only Directory</h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Every pro on our platform is personally vetted. We check licenses, insurance, and bonding so you can sleep at night.
        </p>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Current COIs</h5>
              <p className="text-sm text-slate-500">We verify Certificate of Insurance every 6 months.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900">Bonded Protection</h5>
              <p className="text-sm text-slate-500">Financial guarantees for every project completion.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white">
                 <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Master Electrician</div>
                 <h4 className="text-xl font-bold">Davis Electrical Group</h4>
               </div>
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-emerald-600 font-bold flex items-center gap-1 shadow-lg">
                 <Star className="w-4 h-4 fill-current" /> 4.9
               </div>
            </div>
            <div className="p-6">
               <div className="flex gap-2 mb-6">
                 <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">Licensed</div>
                 <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">Bonded</div>
                 <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">Insured</div>
               </div>
               <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-colors">
                 View Recent Projects
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Verticals: React.FC = () => (
  <section className="py-24 px-6 bg-[#F8FAF9]">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="group relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 text-white hover:shadow-2xl transition-all">
          <div className="relative z-10">
            <HeartPulse className="w-16 h-16 text-blue-400 mb-8" />
            <h3 className="text-3xl font-black mb-4 leading-tight">Aging-in-Place <br />Specialists</h3>
            <p className="text-slate-400 text-lg mb-8 max-w-sm">Dedicated mobility modifications designed for the 80 million homeowners entering peak usage years.</p>
            <button className="flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300">
              Learn about modifications <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="group relative overflow-hidden bg-white rounded-[3rem] p-12 border border-slate-100 hover:shadow-2xl transition-all">
          <div className="relative z-10">
            <HomeIcon className="w-16 h-16 text-emerald-600 mb-8" />
            <h3 className="text-3xl font-black mb-4 leading-tight text-slate-900">Eco-Efficient <br />Home Systems</h3>
            <p className="text-slate-500 text-lg mb-8 max-w-sm">Combat rising utility costs with solar integration, smart HVAC, and high-efficiency retrofitting.</p>
            <button className="flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700">
              View energy audits <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </div>
  </section>
);

const FounderNote: React.FC = () => (
  <section className="py-24 px-6 bg-white border-t border-slate-100">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative shrink-0">
          <div className="w-48 h-48 rounded-[2rem] bg-slate-200 overflow-hidden shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-500">
            {/* Placeholder for Paul A. Martino image */}
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white font-black text-2xl">
              PM
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-3 rounded-2xl shadow-xl">
            <Quote className="w-6 h-6 fill-current" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-black text-slate-900 mb-6">A Note from our Founder</h3>
          <div className="space-y-4 text-slate-600 leading-relaxed italic text-lg">
            <p>
              "I started HomeTrust because I was tired of seeing my friends and neighbors get paralyzed by the sheer volume of home maintenance. The industry thrives on confusion—on 'information asymmetry' that leaves the homeowner guessing."
            </p>
            <p>
              "Our mission is simple: we provide the triage you need to protect your biggest asset, and the vetted pros you need to actually sleep at night. We're not just a directory; we're your home's defense system."
            </p>
          </div>
          <div className="mt-8">
            <div className="font-black text-slate-900 uppercase tracking-widest">Paul A. Martino</div>
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-tighter">Founder & CEO, HomeTrust</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
      <div className="col-span-1 lg:col-span-2">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase">Hometrust</span>
        </div>
        <p className="text-lg max-w-md leading-relaxed mb-8">
          The only home service platform built for your mental health. We triage the list so you can find the peace of mind you deserve.
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
            <Star className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Platform</h4>
        <ul className="space-y-4 font-bold text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Maintenance Triage</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pricing Engine</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pro Directory</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Blunder Prevention</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Resources</h4>
        <ul className="space-y-4 font-bold text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Happiness Pledge</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Technical Debt Guide</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Safety Standards</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-xs font-medium">© 2026 HomeTrust Platform. Licensed, Bonded, Insured Providers Only.</p>
      <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
        <a href="#" className="hover:text-white">Privacy</a>
        <a href="#" className="hover:text-white">Terms</a>
        <a href="#" className="hover:text-white">Cookies</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <PricingGrid />
        
        {/* The "Permission to Ignore" Visualization Section */}
        <section className="py-24 px-6 bg-white overflow-hidden border-y border-slate-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="bg-slate-100 rounded-[3rem] p-12 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  {Object.values(TIERS).map((tier) => (
                    <div key={tier.id} className={`${tier.color} p-6 rounded-3xl border-2 transition-all hover:scale-105`}>
                      <h4 className="font-black text-sm mb-2">{tier.name}</h4>
                      <p className="text-[10px] leading-relaxed font-bold opacity-80">{tier.desc}</p>
                    </div>
                  ))}
                  <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-center items-center text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
                    <div className="text-[10px] font-black uppercase">Decision Fatigue</div>
                    <div className="font-bold text-xl">-80%</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div>
              <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Psychology of Service
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                We give you permission to ignore the small stuff.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Most homeowners are paralyzed by an "incredibly long" list of repairs. Our algorithm prioritizes what <strong>protects your home equity first</strong>. 
                If it's aesthetic, we'll tell you it can wait.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm">1</div>
                  <span className="font-bold text-slate-700">Prevent future damage (Tier 1)</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">2</div>
                  <span className="font-bold text-slate-700">Restore vital systems (Tier 2)</span>
                </div>
                <div className="flex gap-4 items-center opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-sm">3</div>
                  <span className="font-bold text-slate-400 italic text-sm">Optional visual upgrades (Tier 3)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProSection />
        
        {/* Expert Call Section */}
        <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-emerald-500/20">
              <HardHat className="text-white w-10 h-10" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">
              Avoid the 77% DIY blunder rate.
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mb-12">
              Before you start a project you're "pretty sure" you can handle, talk to a 20-year Master Contractor for 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
              <button className="flex-1 bg-white text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-3">
                <PhoneCall className="w-6 h-6 shrink-0" />
                Book Free Call
              </button>
              <button className="flex-1 bg-slate-800 text-white py-5 rounded-2xl font-black text-lg border border-slate-700 hover:bg-slate-700 transition-all">
                Learn Why
              </button>
            </div>
            <p className="mt-8 text-sm text-slate-500 font-bold uppercase tracking-widest">No credit card required • No sales pitch</p>
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </section>

        <Verticals />
        
        <FounderNote />
      </main>
      <Footer />
    </div>
  );
}