'use client';

import React, { useState, useEffect } from 'react';
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
  Quote,
  Loader2,
  BadgeCheck,
  FileCheck,
  Briefcase,
  Wallet,
  User,
  ArrowLeft,
  ShieldAlert,
  Accessibility,
  Activity,
  LifeBuoy,
  TrendingUp,
  Award,
  Check,
  Building2,
  FileText
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
  badge: string;
}

interface TriageResult {
  id: string;
  task: string;
  tier: 'CRITICAL' | 'FUNCTIONAL' | 'AESTHETIC';
  reason: string;
}

// --- Constants & Config ---
const TIERS: Record<string, Tier> = {
  CRITICAL: {
    id: 'critical',
    name: 'Tier 1: Protect the House',
    desc: 'Prevents structural rot, mold, or safety hazards.',
    color: 'border-red-200 bg-red-50 text-red-700',
    badge: 'bg-red-100 text-red-600',
  },
  FUNCTIONAL: {
    id: 'functional',
    name: 'Tier 2: System Health',
    desc: 'Essential daily comforts (HVAC, Water, Power).',
    color: 'border-blue-200 bg-blue-50 text-blue-700',
    badge: 'bg-blue-100 text-blue-600',
  },
  AESTHETIC: {
    id: 'aesthetic',
    name: 'Tier 3: Aesthetic (Optional)',
    desc: 'Purely visual. You have permission to ignore these.',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-600',
  }
};

const PRICE_GRID: PriceItem[] = [
  { job: 'Handyperson Task', price: '158', detail: 'Up to 2 hours' },
  { job: 'Leaky Faucet Fix', price: '226', detail: 'Parts included' },
  { job: 'Outlet Replacement', price: '185', detail: 'Safety checked' },
  { job: 'Gutter Cleaning', price: '199', detail: 'Single story' }
];

const AGING_MODS = [
  { title: 'Grab Bar Install', price: '125', icon: Activity, desc: 'Stud-mounted safety bars' },
  { title: 'Ramp Construction', price: '850', icon: Accessibility, desc: 'Modular or custom wood' },
  { title: 'Walk-in Tub', price: '3200', icon: LifeBuoy, desc: 'Hydrotherapy & safety' },
  { title: 'Smart Lighting', price: '450', icon: Zap, desc: 'Voice controlled paths' }
];

const KEYWORDS = {
  CRITICAL: ['leak', 'roof', 'water', 'mold', 'crack', 'foundation', 'rot', 'smoke', 'fire', 'structural', 'gas'],
  FUNCTIONAL: ['ac', 'hvac', 'heater', 'drain', 'toilet', 'power', 'outlet', 'light', 'faucet', 'sink'],
  AESTHETIC: ['paint', 'cabinet', 'carpet', 'floor', 'tile', 'color', 'handle', 'decor', 'trim']
};

// --- Interactive Components ---

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void; initialTask?: string }> = ({ isOpen, onClose, initialTask }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', homeAge: '', concern: initialTask || '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {step < 4 && (
          <div className="absolute top-0 left-0 right-0 h-1.5 flex gap-1 p-1">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-full flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-500' : 'bg-slate-100'}`} />
            ))}
          </div>
        )}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="p-10">
          {step === 1 && (
            <div className="animate-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Video className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">10-Min Expert Sync</h3>
              <p className="text-slate-500 mb-8 font-medium italic">"The shortest path to peace of mind."</p>
              <button onClick={() => setStep(2)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Project Details</h3>
              <div className="space-y-4 mb-8">
                <select className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-emerald-500" value={formData.homeAge} onChange={(e) => setFormData({...formData, homeAge: e.target.value})}>
                  <option value="">Home Age...</option>
                  <option value="new">0-10 Years</option>
                  <option value="mid">10-30 Years</option>
                  <option value="old">30+ Years</option>
                </select>
                <textarea className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-emerald-500" placeholder="What's happening?" rows={3} value={formData.concern} onChange={(e) => setFormData({...formData, concern: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 font-black text-slate-400">Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black">Next</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Contact Info</h3>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Full Name" required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-emerald-500" />
                <input type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Confirm Consultation'}
              </button>
            </form>
          )}
          {step === 4 && (
            <div className="text-center animate-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Sync Confirmed</h3>
              <p className="text-slate-500 mb-8 font-medium">An expert will reach out shortly to review your triage list.</p>
              <button onClick={onClose} className="w-full py-4 border-2 border-slate-100 rounded-2xl font-black hover:bg-slate-50 transition-colors">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Section 4: Cost Guides Component ---

const COST_DATA = {
  Roofing: [
    { item: 'Shingle Repair', low: 350, high: 800, unit: 'sq ft' },
    { item: 'Full Replacement', low: 8500, high: 16000, unit: 'avg home' },
    { item: 'Gutter Cleaning', low: 150, high: 400, unit: 'visit' }
  ],
  Electrical: [
    { item: 'Panel Upgrade', low: 1800, high: 4500, unit: 'panel' },
    { item: 'Outlet Install', low: 150, high: 300, unit: 'unit' },
    { item: 'EV Charger Circ', low: 600, high: 1200, unit: 'install' }
  ],
  Plumbing: [
    { item: 'Water Heater', low: 1200, high: 3200, unit: 'unit' },
    { item: 'Pipe Leak Fix', low: 250, high: 900, unit: 'area' },
    { item: 'Faucet Install', low: 150, high: 450, unit: 'fixture' }
  ]
};

const CostGuideSection = ({ onBack }: { onBack: () => void }) => {
  const [category, setCategory] = useState<keyof typeof COST_DATA>('Roofing');

  return (
    <div className="min-h-screen bg-[#F8FAF9] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 font-bold text-slate-500 mb-8 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight">Real pricing, <span className="text-emerald-600 italic">verified.</span></h1>
            <p className="text-slate-600 font-medium mb-10">We aggregate thousands of real invoices from Hometrust Pros to give you accurate ranges, not "estimates."</p>
            
            <div className="flex flex-col gap-2">
              {Object.keys(COST_DATA).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as any)}
                  className={`p-4 text-left rounded-2xl font-bold transition-all ${category === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-2xl text-slate-900">{category} Cost Table</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Updated Weekly • Local Data</p>
                </div>
                <TrendingUp className="text-emerald-500 w-8 h-8" />
              </div>
              
              <div className="p-4 sm:p-8">
                <div className="space-y-4">
                  {COST_DATA[category].map((item, idx) => (
                    <div key={idx} className="group p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-black text-lg text-slate-800">{item.item}</h4>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Typical {item.unit} rate</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-black text-slate-900">
                            ${item.low.toLocaleString()} — ${item.high.toLocaleString()}
                          </div>
                          <div className="text-[10px] font-bold text-emerald-600 uppercase">Fair Market Price</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- New Component: ProApplicationModal ---

const ProApplicationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualifications, setQualifications] = useState({
    licensed: false,
    insured: false,
    bonded: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  const allQualificationsMet = qualifications.licensed && qualifications.insured && qualifications.bonded;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="p-8 pb-0 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-900">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span className="font-black text-lg uppercase tracking-tighter">Pro Verification</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-10 pt-6 overflow-y-auto">
          {step === 1 && (
            <div className="animate-in slide-in-from-right-8">
              <h3 className="text-3xl font-black text-slate-900 mb-2">Gatekeeper Check</h3>
              <p className="text-slate-500 mb-8 font-medium">We only accept the top 5% of applicants. Please confirm your standing.</p>
              
              <div className="space-y-4 mb-8">
                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-emerald-500 transition-all group">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-md accent-emerald-600"
                    checked={qualifications.licensed} 
                    onChange={(e) => setQualifications({...qualifications, licensed: e.target.checked})}
                  />
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-emerald-700">Active State License</div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Mandatory</div>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-emerald-500 transition-all group">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-md accent-emerald-600"
                    checked={qualifications.insured} 
                    onChange={(e) => setQualifications({...qualifications, insured: e.target.checked})}
                  />
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-emerald-700">$1M+ Liability Insurance</div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Mandatory</div>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-emerald-500 transition-all group">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-md accent-emerald-600"
                    checked={qualifications.bonded} 
                    onChange={(e) => setQualifications({...qualifications, bonded: e.target.checked})}
                  />
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-emerald-700">Surety Bond Active</div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Mandatory</div>
                  </div>
                </label>
              </div>

              <button 
                onClick={() => setStep(2)} 
                disabled={!allQualificationsMet}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all"
              >
                Start Verification <ArrowRight className="w-5 h-5" />
              </button>
              {!allQualificationsMet && (
                <p className="text-center text-xs font-bold text-red-500 mt-4 uppercase tracking-wide">All qualifications required to proceed</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right-8">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Credential Upload</h3>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">License Number</label>
                  <div className="relative">
                    <FileCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="State License #" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Insurance Provider</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Carrier Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Trade Specialty</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:border-emerald-500 transition-colors appearance-none">
                      <option>Select Trade...</option>
                      <option>Electrical</option>
                      <option>Plumbing</option>
                      <option>HVAC</option>
                      <option>General Contracting</option>
                      <option>Roofing</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600">Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-emerald-600 transition-colors">Next Step</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-in slide-in-from-right-8">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Business Details</h3>
              <div className="space-y-4 mb-8">
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" placeholder="Business Name" required className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" placeholder="Owner Full Name" required className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" placeholder="Business Email" required className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold outline-none focus:border-emerald-500 transition-colors" />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600">Back</button>
                <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Submit for Review'}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center animate-in zoom-in-95 duration-500 py-8">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <BadgeCheck className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Application Received</h3>
              <p className="text-slate-500 mb-8 font-medium max-w-sm mx-auto">
                Our vetting team will review your license and COI. You will receive a status update within <span className="text-slate-900 font-bold">48 hours</span>.
              </p>
              <button onClick={onClose} className="w-full py-4 border-2 border-slate-100 rounded-2xl font-black text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                Return to Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Pro Portal View ---

const ProPortalView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-white animate-in fade-in duration-500">
      {/* Pro Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-slate-400 text-sm">Back to Homeowner View</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">HomeTrust <span className="text-emerald-500">Pro</span></span>
          </div>
        </div>
      </nav>

      {/* Pro Hero */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 font-bold text-xs uppercase tracking-widest mb-8">
              <BadgeCheck className="w-4 h-4" /> Application Status: Open
            </div>
            <h1 className="text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
              Stop paying for <span className="text-emerald-500">bad leads.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              We aren't a lead-gen site. We are a triage platform that assigns verified, scoped work to Master Tradespeople.
            </p>
            
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shrink-0">
                  <Wallet className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">0% Lead Fees</h4>
                  <p className="text-slate-500 text-sm">You never pay to bid. We take a flat success fee only when you get paid.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shrink-0">
                  <FileCheck className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Pre-Triaged Scopes</h4>
                  <p className="text-slate-500 text-sm">No more "tire kickers." Every job comes with photos, urgency level, and budget tier.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsAppModalOpen(true)}
              className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/20"
            >
              Apply for Verification
            </button>
            <p className="mt-4 text-xs text-slate-500 font-bold uppercase tracking-widest">Est. Verification time: 48 Hours</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[2.5rem] blur opacity-20"></div>
            <div className="relative bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                The Gatekeeper Standard
              </h3>
              <p className="text-slate-400 mb-8 font-medium">To maintain trust, we reject 40% of applicants. You must meet these standards to join:</p>
              
              <div className="space-y-4">
                {[
                  { label: 'Active State License', status: 'Required' },
                  { label: '$1M Liability Insurance', status: 'Required' },
                  { label: 'Surety Bond', status: 'Required' },
                  { label: 'Background Check', status: 'Required' },
                  { label: '3 Verified References', status: 'Required' }
                ].map((req, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                    <span className="font-bold text-slate-300">{req.label}</span>
                    <div className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4" /> {req.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-5xl font-black text-white mb-2">$85<span className="text-2xl text-slate-500">/hr</span></div>
            <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Avg. Effective Rate</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-5xl font-black text-white mb-2">12<span className="text-2xl text-slate-500">hrs</span></div>
            <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Saved Admin Time / Mo</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-5xl font-black text-white mb-2">0<span className="text-2xl text-slate-500">%</span></div>
            <p className="text-purple-500 font-bold uppercase tracking-widest text-xs">Payment Delays</p>
          </div>
        </div>
      </section>

      <ProApplicationModal isOpen={isAppModalOpen} onClose={() => setIsAppModalOpen(false)} />
    </div>
  );
};

// --- Aging in Place View ---
const AgingInPlaceView: React.FC<{ onBack: () => void; onBook: (task?: string) => void }> = ({ onBack, onBook }) => (
  <div className="animate-in fade-in slide-in-from-right-8 bg-white min-h-screen">
    <div className="bg-blue-600 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-200 font-bold mb-8 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to HomeTrust
        </button>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/30 px-4 py-1.5 rounded-full border border-blue-400/50 mb-6">
              <HeartPulse className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Longevity Services</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">Independence <br />At Home.</h1>
            <p className="text-xl text-blue-100 mb-10 max-w-lg leading-relaxed">
              80 million homeowners are entering their peak usage years. We specialize in modifications that maintain independence without sacrificing style.
            </p>
            <button onClick={() => onBook('Aging Safety Audit')} className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:shadow-xl hover:-translate-y-1 transition-all">Book Safety Audit</button>
          </div>
          <div className="bg-white/10 p-10 rounded-[3rem] border border-white/20 backdrop-blur-md">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><ShieldAlert className="w-6 h-6 text-yellow-400" /> Priority Longevity Fixes</h3>
            <div className="space-y-4">
               {[
                { label: 'Bathroom Transitions', level: 'Critical', desc: 'Zero-entry shower conversions.' },
                { label: 'Lighting Luminance', level: 'Functional', desc: 'High-contrast path lighting for nighttime safety.' },
                { label: 'Lever Hardware', level: 'Functional', desc: 'ADA compliant door and faucet handles.' }
              ].map((fix, idx) => (
                <div key={idx} className="bg-white/10 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg">{fix.label}</span>
                    <span className="text-[10px] font-black uppercase bg-blue-500 px-2 py-0.5 rounded">{fix.level}</span>
                  </div>
                  <p className="text-sm text-blue-100 opacity-80">{fix.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-12">Modification Guide</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {AGING_MODS.map((mod, i) => (
            <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-blue-500 transition-all group">
              <mod.icon className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-slate-900 mb-2">{mod.title}</h4>
              <p className="text-xs text-slate-500 mb-6 font-medium">{mod.desc}</p>
              <div className="text-3xl font-black text-slate-900 mb-8">${mod.price} <span className="text-xs text-slate-400 uppercase">est</span></div>
              <button onClick={() => onBook(mod.title)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black hover:bg-blue-600 transition-colors">Inquire</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// --- Page Components ---

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-slate-200 shadow-sm">
    <Icon className="w-3.5 h-3.5 text-emerald-600" />
    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{text}</span>
  </div>
);

const Navbar = ({ onOpenBooking, onJoinPro, onViewChange, currentView }: any) => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">Hometrust</span>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-500">
          <button 
            onClick={() => onViewChange('home')} 
            className={`transition-colors ${currentView === 'home' ? 'text-emerald-600' : 'hover:text-emerald-600'}`}
          >
            Triage Tools
          </button>
          <button 
            onClick={() => onViewChange('costs')} 
            className={`transition-colors ${currentView === 'costs' ? 'text-emerald-600' : 'hover:text-emerald-600'}`}
          >
            Cost Guides
          </button>
          <button className="hover:text-emerald-600 transition-colors">Pro Directory</button>
          <div className="h-4 w-px bg-slate-200" />
          <button 
            onClick={() => onViewChange('aging')} 
            className={`flex items-center gap-1 transition-colors ${currentView === 'aging' ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
          >
            <HeartPulse className="w-4 h-4" /> Aging-in-Place
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onJoinPro} className="hidden sm:block text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
          Join as a Pro
        </button>
        <button onClick={() => onOpenBooking('Emergency Support')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">
          Emergency Support
        </button>
      </div>
    </div>
  </nav>
);

const Hero: React.FC<{ onOpenBooking: (task?: string) => void }> = ({ onOpenBooking }) => {
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
              <button 
                onClick={() => onOpenBooking(triageInput)}
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all"
              >
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
              <button 
                onClick={() => onOpenBooking('Expert Call from Summary')}
                className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-emerald-50 transition-colors"
              >
                Book Expert Call
              </button>
            </div>
          </div>
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

const PricingGrid: React.FC<{ onOpenBooking: (task: string) => void }> = ({ onOpenBooking }) => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">No-Surprise Pricing</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto italic font-medium">
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
            <button 
              onClick={() => onOpenBooking(item.job)}
              className="w-full py-3 rounded-xl border-2 border-slate-900 font-bold text-sm group-hover:bg-slate-900 group-hover:text-white transition-all"
            >
              Book Now
            </button>
          </div>
        ))}
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
// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'pro' | 'aging'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<string | undefined>(undefined);

  const openBooking = (task?: string) => {
    setActiveTask(task);
    setIsModalOpen(true);
  };

  if (view === 'pro') {
    return <ProPortalView onBack={() => setView('home')} />;
  }

  if (view === 'aging') {
    return <AgingInPlaceView onBack={() => setView('home')} onBook={openBooking} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 bg-white">
      <Navbar onOpenBooking={() => openBooking('Emergency Triage')} onJoinPro={() => setView('pro')} onViewChange={setView} />
      <main>
        <Hero onOpenBooking={openBooking} />
        <PricingGrid onOpenBooking={openBooking} />
        
        {/* Psychology Section */}
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
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
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

        {/* Directory Section */}
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
                <div className="max-w-xl">
                  <h2 className="text-5xl font-black mb-6 text-slate-900">Verified-Only Directory</h2>
                  <p className="text-slate-500 font-bold text-lg leading-relaxed">We don't sell leads. We verify technical skills. Only pros who pass our rigorous triage standards are allowed on the platform.</p>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center font-bold text-slate-400 shadow-sm">
                         <User className="w-6 h-6" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-black text-xl text-slate-900">128 Pros</div>
                    <div className="text-slate-500 text-xs font-black uppercase tracking-widest">Available Near You</div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: 'Marcus R.', trade: 'Master Plumber', rating: '4.9', icon: BadgeCheck, color: 'text-emerald-500' },
                  { name: 'Sarah L.', trade: 'Electrical Lead', rating: '5.0', icon: Zap, color: 'text-blue-500' },
                  { name: 'David K.', trade: 'Structural Tech', rating: '4.8', icon: HardHat, color: 'text-orange-500' }
                ].map((pro, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-lg transition-all group">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <pro.icon className={`w-10 h-10 ${pro.color}`} />
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-slate-900">{pro.name}</h4>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">{pro.trade}</p>
                      <div className="flex items-center gap-1.5 text-yellow-500 font-black">
                        <Star className="w-4 h-4 fill-current" /> {pro.rating} <span className="text-slate-300 text-xs uppercase tracking-tighter">Verified Review</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </section>        
        
        {/* Blunder Prevention CTA */}
        <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-emerald-500/20">
              <HardHat className="text-white w-10 h-10" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">
              Avoid the 77% DIY blunder rate.
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mb-12 font-medium">
              Before you start a project you're "pretty sure" you can handle, talk to a 20-year Master Contractor for 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
              <button 
                onClick={() => openBooking('Blunder Prevention Call')}
                className="flex-1 bg-white text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-3"
              >
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

        {/* Verticals Section */}
        <section className="py-24 px-6 bg-[#F8FAF9]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 text-white hover:shadow-2xl transition-all">
                <div className="relative z-10">
                  <HeartPulse className="w-16 h-16 text-blue-400 mb-8" />
                  <h3 className="text-3xl font-black mb-4 leading-tight">Aging-in-Place <br />Specialists</h3>
                  <p className="text-slate-400 text-lg mb-8 max-w-sm font-medium">Dedicated mobility modifications designed for the 80 million homeowners entering peak usage years.</p>
                  <button onClick={() => setView('aging')} className="flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300">
                    Learn about modifications <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
              </div>
              
              <div className="group relative overflow-hidden bg-white rounded-[3rem] p-12 border border-slate-100 hover:shadow-2xl transition-all">
                <div className="relative z-10">
                  <HomeIcon className="w-16 h-16 text-emerald-600 mb-8" />
                  <h3 className="text-3xl font-black mb-4 leading-tight text-slate-900">Eco-Efficient <br />Home Systems</h3>
                  <p className="text-slate-500 text-lg mb-8 max-w-sm font-medium">Combat rising utility costs with solar integration, smart HVAC, and high-efficiency retrofitting.</p>
                  <button className="flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700">
                    View energy audits <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
              </div>
            </div>
          </div>
        </section>
        
        <FounderNote />
      </main>

          {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 text-white mb-6">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <span className="font-black uppercase tracking-tighter">Hometrust</span>
            </div>
            <p className="text-sm leading-relaxed">The triage-first platform for modern homeowners.</p>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Services</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button onClick={() => openBooking('Triage')} className="hover:text-emerald-500">Repair Triage</button></li>
              <li><button onClick={() => setView('aging')} className="hover:text-blue-500">Aging-in-Place</button></li>
              <li><button onClick={() => openBooking('Consult')} className="hover:text-emerald-500">Expert Sync</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Trust</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>Verified Directory</li>
              <li>Pricing Standards</li>
              <li>Blunder Protection</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Support</h4>
            <div className="bg-slate-900 p-4 rounded-xl text-xs flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>24/7 Triage Helpline</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-900 text-center text-[10px] font-black uppercase tracking-[0.2em]">
          © 2026 HomeTrust Platform • Licensed • Bonded • Insured
        </div>
      </footer>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialTask={activeTask} />
    </div>
  );
}