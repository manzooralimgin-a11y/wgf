import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  BookOpen,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Ambulance,
  Sparkles,
  Send,
  Globe,
  Building2,
  HandHeart,
  GraduationCap,
  Scale,
  Zap,
  CheckCircle2,
  CircleCheck,
  ChevronLeft,
  Gavel,
  Compass,
  Library,
  Activity,
  HeartPulse,
  HandHelping,
  Utensils,
  Thermometer,
  Stethoscope,
  Package,
  Youtube,
  Facebook,
  MessageCircle,
  Star,
  Loader2
} from 'lucide-react';

// --- Gemini API Configuration ---
const apiKey = "AIzaSyBsVvCqYYWF24Grj7tZXM4Sw36nqK8rAJ4";
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

// --- Apple-inspired Motion Design Constants ---
const springTransition = { type: "spring", damping: 28, stiffness: 150 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};
const fadeInUp = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: springTransition }
};

// --- Static Content Data ---
const VISIONARY_IMAGES = [
  "https://i.imgur.com/mwKavZb.png",
  "https://i.imgur.com/6Rq7dJW.png",
  "https://i.imgur.com/JU8bR8P.png",
  "https://i.imgur.com/AmTW4d7.png"
];

const MISSION_PILLARS = [
  { id: "mis-1", title: "Intellectual Prowess", desc: "Nurturing minds through academic support and resources.", icon: GraduationCap, color: "#3b82f6", btnName: "EXPLORE PATHWAY", view: "intellectual-prowess", section: "missions" },
  { id: "mis-2", title: "Moral Integrity", desc: "Cultivating leadership built on ethics and timeless values.", icon: Scale, color: "#f5b800", btnName: "READ ETHOS", view: "moral-integrity", section: "missions" },
  { id: "mis-3", title: "Compassionate Action", desc: "Empowering society through welfare and emergency drives.", icon: Heart, color: "#ef4444", btnName: "VIEW ACTION", view: "compassionate-action", section: "missions" }
];

const IMPACT_PROGRAMS = [
  {
    id: "imp-1", title: "Essential Welfare Drive", desc: "Direct-action response to poverty.",
    details: ["Nutritional meal distribution", "Winter thermal kits", "Basic medical supplies"],
    icon: Heart, color: "#10b981", bgImage: "https://i.imgur.com/SQOlWgU.png", view: "compassionate-action"
  },
  {
    id: "imp-2", title: "Mission Ambulance 24x7", desc: "Lifesaving emergency transport.",
    details: ["Free ICU transport", "Oxygen-equipped fleet", "Rural rescue network"],
    icon: Ambulance, color: "#ef4444", bgImage: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=1200", view: "compassionate-action"
  },
  {
    id: "imp-3", title: "Education Support", desc: "Removing financial barriers.",
    details: ["Academic scholarships", "Vocational training", "School supply drives"],
    icon: BookOpen, color: "#3b82f6", bgImage: "https://i.imgur.com/LGC1M08.png", view: "intellectual-prowess"
  },
  {
    id: "imp-4", title: "Youth Ethics Workshops", desc: "Building future leaders through moral depth.",
    details: ["Integrity seminars", "Ethical leadership camps", "Civic responsibility modules"],
    icon: ShieldCheck, color: "#f5b800", bgImage: "https://i.imgur.com/mhnZYSB.png", view: "moral-integrity"
  }
];

const TEAM_MEMBERS = [
  { id: "tm-1", name: "ALI IMRAN NAQVI", role: "FOUNDER-PRESIDENT, INDIA", img: "https://i.imgur.com/ktLxl4d.png" },
  { id: "tm-4", name: "ENGINEER NEMAT ALI", role: "HONORARY MENTOR, AL KHOBAR SAUDI ARABIA", img: "https://i.imgur.com/IUT5D3L.png" }, // Moved to 2nd place
  { id: "tm-2", name: "Dr AMEER HAIDER ABIDI", role: "HONORARY PATRON, KAMPALA UGANDA", img: "https://i.imgur.com/scRizEZ.png" },
  { id: "tm-3", name: "ENGINEER ALI HAIDER ABIDI", role: "HONORARY COUNSELOR, BERLIN GERMANY", img: "https://i.imgur.com/8uMXS5G.png" },
  { id: "tm-5", name: "Dr ALI AJAZ HAIDER", role: "HONORARY ADVISOR HEALTH & MEDICAL ETHICS, ENGLAND", img: "https://i.imgur.com/QvIWHpv.png" },
  { id: "tm-6", name: "ENGINEER WASEEM ABBAS", role: "INTERNATIONAL RELATIONS ADVISOR, SYDNEY AUSTRALIA", img: "https://i.imgur.com/IQld3tv.png" },
  { id: "tm-7", name: "ENGINEER ALI AKHTAR", role: "STRATEGIC ADVISOR, UNITED ARAB EMIRATES", img: "https://i.imgur.com/qWy2qKf.png" },
  { id: "tm-8", name: "ADVOCATE AJAZ ABBAS", role: "LEGAL ADVISOR, INDIA", img: "https://i.imgur.com/vqoaEGS.png" }
];

const INTERVIEWS = [
  { id: "int-1", title: "The Future of Ethical Leadership", person: "Ali Imran Naqvi", link: "https://youtube.com", img: "https://i.imgur.com/SdUEUCr.png" },
  { id: "int-2", title: "Untold Stories", person: "Prof. Syed Ameer Haider Abidi", link: "https://youtu.be/4XRUTlJjYeE?si=Jm2OHRNjsv0Pj-JR", img: "https://i.imgur.com/4dIbRca.png" },
  { id: "int-3", title: "Youth Empowerment in Digital", person: "Maulana Gulzar Hussain Jafri", link: "https://youtu.be/EGQS7vwd7tA", img: "https://i.imgur.com/WH3WLjY.png" },
  { id: "int-4", title: "Parenting, Mental Health & Modern Education", person: "Dr Ali Ejaz Haider", link: "https://youtu.be/9mFzdtS-MUQ", img: "https://i.imgur.com/tlCNizS.png" }
];

const DONATION_TIERS = [
  { amount: 500, label: "Warmth Kit", desc: "Winter kits for 2 people.", icon: Utensils, color: "#10b981" },
  { amount: 2000, label: "Scholarship", desc: "Funds 1 month of tuition.", icon: GraduationCap, color: "#3b82f6" },
  { amount: 5000, label: "Rescue Fund", desc: "Powers 24/7 ICU Ambulance runs.", icon: Ambulance, color: "#ef4444" },
  { amount: 10000, label: "Guardian", desc: "Supports a family for 3 months.", icon: ShieldCheck, color: "#f5b800" }
];

const DETAIL_CONTENT = {
  'intellectual-prowess': {
    title: "Intellectual Prowess",
    color: "#3b82f6",
    items: [
      { label: "Scholarships", desc: "Financial aid for underserved backgrounds.", icon: GraduationCap },
      { label: "Resource Hubs", desc: "Digital and physical libraries.", icon: Library },
      { label: "Mentorship", desc: "Industry leaders guiding youth.", icon: Compass }
    ]
  },
  'moral-integrity': {
    title: "Moral Integrity",
    color: "#f5b800",
    items: [
      { label: "Ethical Frameworks", desc: "Professional success grounded in character.", icon: Gavel },
      { label: "Leadership Labs", desc: "Honesty and justice workshops.", icon: ShieldCheck },
      { label: "Civic Duty", desc: "Moral participation in governance.", icon: Scale }
    ]
  },
  'compassionate-action': {
    title: "Compassionate Action",
    color: "#ef4444",
    items: [
      { label: "Emergency Response", desc: "24/7 disaster and medical relief.", icon: Ambulance },
      { label: "Welfare Distribution", desc: "Basic needs for vulnerable families.", icon: HandHeart },
      { label: "Healthcare Access", desc: "Free medical checkups and aid.", icon: HeartPulse }
    ]
  },
  'ethical-evolution': {
    title: "Ethical Evolution",
    color: "#F5B800",
    items: [
      { label: "Global Vision", desc: "Transcend regional boundaries for ethics.", icon: Globe },
      { label: "Legacy Building", desc: "Creating systems that outlast individuals.", icon: Building2 },
      { label: "Youth Synergy", desc: "Bridging wisdom and modern energy.", icon: Zap }
    ]
  }
};

const FLOATING_ICONS = [
  { Icon: Ambulance, top: '10%', left: '5%', delay: 0, color: '#ef4444' },
  { Icon: Scale, top: '20%', left: '90%', delay: 1, color: '#f5b800' },
  { Icon: GraduationCap, top: '45%', left: '12%', delay: 2, color: '#3b82f6' },
  { Icon: Heart, top: '60%', left: '85%', delay: 3, color: '#ef4444' },
  { Icon: ShieldCheck, top: '80%', left: '1.5%', delay: 1.5, color: '#10b981' },
  { Icon: BookOpen, top: '35%', left: '78%', delay: 2.5, color: '#6366f1' },
  { Icon: Gavel, top: '55%', left: '3%', delay: 4, color: '#94a3b8' },
  { Icon: Activity, top: '85%', left: '75%', delay: 5, color: '#ec4899' },
];

const OFFICES = [
  { title: "Head Office", loc: "Naugawan Sadat", addr: "Ali Nagar, Ali Chowk, Amroha - 244251", icon: Building2, color: "#F5B800" },
  { title: "Branch Office", loc: "New Delhi", addr: "Okhla, New Delhi - 110025", icon: MapPin, color: "#10b981" }
];

// --- Sub-Components ---

const AuraPod = ({ Icon, color, size = "large" }) => {
  const dim = size === "large" ? "w-14 h-14 md:w-20 md:h-20" : "w-10 h-10 md:w-14 md:h-14";
  const iconSize = size === "large" ? 28 : 20;

  return (
    <div className={`relative ${dim} shrink-0 perspective-1000 group mx-auto`}>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
        className="w-full h-full rounded-2xl md:rounded-3xl flex items-center justify-center border shadow-lg relative preserve-3d"
      >
        <div className="absolute inset-1 rounded-xl md:rounded-2xl bg-white/40 backdrop-blur-sm shadow-inner" />
        <div className="relative z-10" style={{ color: color }}>
          <Icon size={iconSize} />
        </div>
        <div style={{ background: color }} className="absolute -inset-1 blur-2xl rounded-full opacity-[0.05]" />
      </motion.div>
    </div>
  );
};

const PremiumButton = ({ children, onClick, variant = "primary", className = "", type = "button", icon: Icon = Sparkles }) => {
  const variants = {
    primary: "bg-slate-950 text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]",
    gold: "bg-gradient-to-br from-[#F5B800] via-[#FFD700] to-[#D49E00] text-slate-950 shadow-[0_20px_40px_-12px_rgba(245,184,0,0.35)]",
    outline: "bg-white/50 backdrop-blur-md border-2 border-slate-200 text-slate-900",
    ghost: "bg-slate-100 text-slate-600 hover:bg-slate-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      className={`relative flex items-center justify-center gap-3 px-8 py-5 rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.2em] transition-all overflow-hidden group ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon size={16} className={variant === 'gold' ? 'text-slate-950/70' : 'text-yellow-400'} fill={variant === 'ghost' ? 'none' : 'currentColor'} />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

const SuccessState = () => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-6">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 200 }} className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
      <CheckCircle2 size={48} />
    </motion.div>
    <div>
      <h3 className="text-3xl font-black uppercase tracking-tighter">Success!</h3>
      <p className="text-slate-400 font-bold normal-case mt-2">Action initiated. Welcome to the Foundation legacy.</p>
    </div>
  </motion.div>
);

const DetailView = ({ view, onBack }) => {
  const data = DETAIL_CONTENT[view] || DETAIL_CONTENT['intellectual-prowess'];
  return (
    <div className="fixed inset-0 bg-slate-950 text-white z-[250] overflow-y-auto overscroll-contain pb-20">
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <PremiumButton
          onClick={onBack}
          variant="ghost"
          className="mb-12 bg-white/5 border-white/10 text-yellow-500 hover:bg-white/10"
          icon={ChevronLeft}
        >
          Back to Home
        </PremiumButton>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-16 uppercase">{data.title}.</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white/5 backdrop-blur-md p-12 rounded-[4rem] border border-white/5 group hover:bg-white/10 transition-all duration-500 shadow-sm">
              <AuraPod Icon={item.icon} color={data.color} />
              <h3 className="text-3xl font-black uppercase mt-10 mb-4">{item.label}</h3>
              <p className="text-slate-400 text-base leading-relaxed normal-case font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Peace be upon you. How can I guide you concisely today?" }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const systemPrompt = `You are the Wisdom Concierge for the Wisdom Gateway Foundation (WGF). 
    WGF Knowledge Base:
    - Vision: Brilliant minds must meet moral depth to close the chasm of intellectual failure.
    - Founder-President: Ali Imran Naqvi (India).
    - Mission Pillars: 1. Intellectual Prowess (Academic support), 2. Moral Integrity (Ethics/Leadership), 3. Compassionate Action (Welfare).
    - Leadership: Dr Ameer Haider Abidi (Honorary Patron), Engineer Ali Haider Abidi (Honorary Counselor), Maulana Gulzar Hussain Jafri (Guest), etc.
    - Impact: Essential Welfare Drive (Meal distribution, thermal kits), Mission Ambulance 24x7 (Free ICU transport), Education Support (Scholarships), Youth Ethics Workshops.
    - Events: Youth Ethics Summit on Feb 14, 2026, in Amroha.
    - Locations: Head Office (Ali Nagar, Ali Chowk, Amroha, Uttar Pradesh), Branch Office (Okhla, New Delhi).
    - Official Links: Facebook (facebook.com), YouTube (youtube.com), WhatsApp (25D366), Phone (#0EA5E9), Email (#EA4335).
    - Donations: Tiered from ₹500 (Warmth Kit) to ₹10,000 (Guardian).
    
    RULES:
    1. Keep responses extremely short (max 2 sentences).
    2. Provide direct answers using the data above.
    3. If asked for a link, provide the relevant handle/url.
    4. Maintain a formal, polite, and visionary tone.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }],
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        })
      });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am reflecting on your inquiry. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection interrupted. Please try later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={springTransition}
      className="fixed inset-y-0 right-0 w-full lg:w-[450px] bg-white z-[500] shadow-2xl flex flex-col h-[100dvh] overscroll-none"
    >
      <div className="p-5 md:p-8 border-b flex justify-between items-center bg-slate-950 text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 shadow-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-black uppercase tracking-widest text-xs">Wisdom AI</h3>
            <p className="text-[9px] text-yellow-400 font-bold uppercase tracking-widest">Mobile Concierge</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 overscroll-contain scroll-smooth">
        {messages.map((m, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isLoading && <div className="flex justify-start px-4"><Loader2 className="animate-spin text-yellow-500" size={24} /></div>}
      </div>
      <div className="p-4 md:p-6 border-t bg-white shrink-0 pb-safe">
        <div className="relative flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask concisely..." className="flex-1 pl-6 pr-4 py-4 bg-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm font-bold appearance-none" />
          <PremiumButton onClick={handleSend} className="px-6 py-4 rounded-2xl"><Send size={18} /></PremiumButton>
        </div>
      </div>
    </motion.div>
  );
};

const AppModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={springTransition} className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter">{title}</h2>
              <button onClick={onClose} className="p-3 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><X size={24} /></button>
            </div>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main App Component ---

const App = () => {
  const [view, setView] = useState('home');
  const [lastSection, setLastSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visionaryIndex, setVisionaryIndex] = useState(0);

  const heroHighlightGradient = "linear-gradient(to bottom, #78350F 0%, #D97706 60%, #451A03 100%)";

  const smartNavigate = (target) => {
    setIsMenuOpen(false);
    const performScroll = (id) => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 100;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
      }
    };

    // If the view isn't home, we just close the overlay and scroll the homepage background
    if (view !== 'home') {
      setView('home');
      setTimeout(() => performScroll(target), 150);
    } else {
      performScroll(target);
    }
  };

  const enterDetailView = (id, sourceSection) => {
    setLastSection(sourceSection);
    setView(id);
    // Note: We no longer scroll the window to 0 here.
    // The DetailView is an overlay with its own scroll, so the homepage stays where it is.
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setVisionaryIndex((prev) => (prev + 1) % VISIONARY_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Prevent background scrolling when overlay, chat, or modals are open
    if (isChatOpen || isMemberModalOpen || isDonateModalOpen || isEventModalOpen || isMenuOpen || view !== 'home') {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }
  }, [isChatOpen, isMemberModalOpen, isDonateModalOpen, isEventModalOpen, isMenuOpen, view]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsMemberModalOpen(false);
      setIsDonateModalOpen(false);
      setIsEventModalOpen(false);
    }, 2000);
  };

  const GlobalHeader = () => (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-2 px-4' : 'py-6 px-6'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={springTransition} className={`flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border border-slate-200/50' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => smartNavigate('hero')}>
            <img src="https://i.imgur.com/QVYyV6F.png" alt="WGF Logo" className="w-12 h-12 object-cover rounded-full shadow-sm" />
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            {['vision', 'missions', 'impact', 'leadership', 'events'].map(id => (
              <button key={id} onClick={() => smartNavigate(id)} className="hover:text-yellow-600 transition-all active:scale-90">{id}</button>
            ))}
            <PremiumButton onClick={() => setIsChatOpen(true)} className="py-3 px-6 rounded-full">Wisdom AI</PremiumButton>
          </nav>
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setIsChatOpen(true)} className="p-2 text-yellow-600"><Sparkles size={24} /></button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-900"><Menu size={28} /></button>
          </div>
        </motion.div>
      </div>
    </header>
  );

  const GlobalFloatingIcons = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.08]">
      {FLOATING_ICONS.map((item, i) => (
        <motion.div key={i} initial={{ y: 0, x: 0 }} animate={{ y: [0, -40, 0, 40, 0], x: [0, 20, 0, -20, 0] }} transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut", delay: item.delay }} style={{ position: 'absolute', top: item.top, left: item.left, color: item.color }}>
          <div className="md:block hidden"><item.Icon size={48 + (i % 3) * 16} /></div>
          <div className="block md:hidden"><item.Icon size={32 + (i % 2) * 8} /></div>
        </motion.div>
      ))}
    </div>
  );

  const renderHomeContent = () => (
    <div className="relative">
      <GlobalFloatingIcons />
      <GlobalHeader />
      <main className="uppercase overflow-x-hidden relative z-10">
        <section id="hero" className="min-h-screen relative flex items-center justify-center pt-24 pb-12 px-6 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl relative z-10">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-[9px] font-black uppercase mb-8 tracking-[0.3em] border border-yellow-100">Est. 2024</motion.span>
            <motion.h1 variants={fadeInUp} className="text-[clamp(2.5rem,10vw,6.5rem)] font-black tracking-tighter leading-[0.95] mb-8 text-slate-900 text-balance">Building an<br /><span style={{ backgroundImage: heroHighlightGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="inline-block pb-2">Ethical Society.</span></motion.h1>
            <motion.p variants={fadeInUp} className="text-base md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto mb-14 leading-relaxed normal-case px-4">Architecting a future where academic knowledge is anchored in moral depth.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <PremiumButton variant="gold" onClick={() => setIsMemberModalOpen(true)}>JOIN THE MISSION</PremiumButton>
              <PremiumButton onClick={() => setIsDonateModalOpen(true)}>FUEL THE CAUSE</PremiumButton>
            </motion.div>
          </motion.div>
        </section>

        <section id="vision" className="py-32 bg-slate-50/50 backdrop-blur-sm px-6 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.9, x: -50 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={springTransition} className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img key={visionaryIndex} src={VISIONARY_IMAGES[visionaryIndex]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 w-full h-full object-cover" />
                </AnimatePresence>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={springTransition} className="space-y-12 text-left">
                <div className="space-y-3">
                  <h4 className="text-yellow-600 font-black uppercase text-[10px] tracking-[0.5em]">Foundation Heartbeat</h4>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">Ethical <br /><span className="text-slate-300">Evolution</span></h2>
                </div>
                <p className="text-lg md:text-2xl text-slate-700 font-bold leading-relaxed normal-case">Brilliance must meet moral depth to close the chasm of intellectual failure.</p>
                <motion.div whileHover={{ y: -5 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                  <AuraPod Icon={Heart} color="#ef4444" />
                  <div className="text-left flex-1">
                    <h4 className="text-2xl font-black text-slate-900">Impact First.</h4>
                    <p className="text-slate-400 font-bold text-[9px] tracking-widest mt-1">ACTION THAT ECHOES</p>
                  </div>
                  <PremiumButton onClick={() => enterDetailView('ethical-evolution', 'vision')}>Explore</PremiumButton>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="missions" className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-5xl md:text-8xl font-black tracking-tighter mb-24 text-slate-900 uppercase">Missions.</motion.h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {MISSION_PILLARS.map((p) => (
                <motion.div variants={fadeInUp} key={p.id} whileHover={{ y: -10, scale: 1.02 }} className="group p-12 bg-slate-50 rounded-[4rem] hover:bg-white border-2 border-transparent hover:border-yellow-200 transition-all duration-500 flex flex-col items-center text-center shadow-sm">
                  <AuraPod Icon={p.icon} color={p.color} />
                  <h3 className="text-2xl font-black mb-4 mt-10 tracking-tight uppercase">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] normal-case">{p.desc}</p>
                  <PremiumButton variant="ghost" onClick={() => enterDetailView(p.view, 'missions')} className="mt-8">{p.btnName}</PremiumButton>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="impact" className="py-32 px-6 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-8xl font-black tracking-tighter mb-32 text-slate-900 uppercase">Impact.</motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {IMPACT_PROGRAMS.map((prog, idx) => (
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ ...springTransition, delay: idx * 0.1 }} key={prog.id} className="group relative min-h-[600px] rounded-[4rem] overflow-hidden shadow-2xl flex items-end">
                  <div className="absolute inset-0">
                    <img src={prog.bgImage} alt={prog.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                  </div>
                  <div className="relative z-10 w-full p-8">
                    <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] text-left shadow-2xl">
                      <div className="flex items-center justify-between mb-8">
                        <AuraPod Icon={prog.icon} color={prog.color} />
                        <div style={{ color: prog.color }} className="opacity-40"><Sparkles size={32} /></div>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase">{prog.title}</h3>
                      <div className="space-y-3 mb-8">
                        {prog.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-3 text-white/80 text-sm font-bold normal-case"><CircleCheck size={16} className="text-emerald-400 shrink-0" /> {detail}</div>
                        ))}
                      </div>
                      <PremiumButton variant="outline" onClick={() => enterDetailView(prog.view, 'impact')}>LEARN MORE</PremiumButton>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership" className="py-32 bg-white/80 backdrop-blur-sm px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-5xl md:text-8xl font-black tracking-tighter mb-24 text-slate-900 uppercase">Leadership.</motion.h2>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x">
              {TEAM_MEMBERS.map((p, idx) => (
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ ...springTransition, delay: idx * 0.05 }} key={p.id} className="min-w-[300px] snap-center">
                  <motion.div whileHover={{ y: -10 }} className="bg-slate-50 rounded-[3rem] p-6 border border-slate-100 text-center flex flex-col h-full group hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm">
                    <div className="overflow-hidden rounded-[2rem] aspect-[4/5] mb-6 shadow-inner">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105" />
                    </div>
                    <h4 className="font-black text-xl tracking-tighter mt-auto uppercase">{p.name}</h4>
                    <p className="text-yellow-600 group-hover:text-yellow-400 text-[9px] uppercase font-black mt-2 tracking-widest">{p.role}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="py-32 bg-slate-50/80 backdrop-blur-sm px-6">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <h4 className="text-yellow-600 font-black uppercase text-[10px] tracking-[0.6em] mb-4">Foundation Hub</h4>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none uppercase text-balance">Summit & Broadcast.</h2>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={springTransition} className="relative bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row my-20">
              <div className="lg:w-1/2 relative h-[300px] lg:h-auto">
                <img src="https://i.imgur.com/mhnZYSB.png" alt="Summit" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl text-center min-w-[100px] shadow-sm"><span className="block text-4xl font-black text-slate-900">14</span><span className="block text-[10px] font-black text-yellow-600 uppercase tracking-widest">FEB 2026</span></div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-20 text-left">
                <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-6">Summit 2026</span>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6 uppercase">Youth Ethics Summit.</h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 normal-case">Convergence of professional prowess and moral foundations.</p>
                <PremiumButton onClick={() => setIsEventModalOpen(true)}>RESERVE SPOT</PremiumButton>
              </div>
            </motion.div>
            <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x pb-10">
              {INTERVIEWS.map((int, idx) => (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...springTransition, delay: idx * 0.1 }} key={idx} className="min-w-[320px] lg:min-w-[420px] snap-center">
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 h-full flex flex-col group transition-all duration-500 shadow-sm">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={int.img} alt={int.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <motion.a whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} href={int.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white shadow-2xl"><Youtube size={32} /></motion.a>
                      </div>
                    </div>
                    <div className="p-8 text-left flex-1 flex flex-col">
                      <span className="text-[8px] font-black text-yellow-600 uppercase tracking-widest mb-4">Official Broadcast</span>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4 uppercase">{int.title}</h4>
                      <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">{int.person} <Youtube size={20} className="text-slate-900" /></div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="pt-20 pb-12 bg-white px-6 border-t border-slate-100">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
            <div className="lg:w-1/3 space-y-8 text-center lg:text-left">
              <motion.img whileHover={{ rotate: 5, scale: 1.05 }} src="https://i.imgur.com/QVYyV6F.png" alt="WGF Logo" className="w-32 h-32 rounded-full mx-auto lg:mx-0 shadow-xl border-4 border-slate-50" />
              <div><h3 className="text-4xl font-black uppercase tracking-tighter">Wisdom Gateway<br /><span className="text-yellow-500">Foundation</span></h3><p className="text-slate-400 font-black text-[9px] tracking-widest uppercase mt-4">Building an Ethical Society since 2024</p></div>
              <div className="flex justify-center lg:justify-start gap-3">
                {[{ Icon: Phone, c: "#0EA5E9" }, { Icon: Mail, c: "#EA4335" }, { Icon: Facebook, c: "#1877F2" }, { Icon: Youtube, c: "#FF0000" }, { Icon: MessageCircle, c: "#25D366" }].map((btn, i) => (
                  <motion.button key={i} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-4 rounded-2xl text-white shadow-lg" style={{ backgroundColor: btn.c }}>
                    <btn.Icon size={20} />
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3 grid md:grid-cols-2 gap-12">
              {OFFICES.map((off, i) => (
                <div key={i} className="flex gap-6 text-left group">
                  <AuraPod Icon={off.icon} color={off.color} size="small" />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black text-slate-400 tracking-widest uppercase">WGF {off.title}</h4>
                    <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{off.loc}</p>
                    <p className="text-slate-500 text-sm mt-1 normal-case leading-relaxed">{off.addr}</p>
                    <PremiumButton variant="ghost" className="mt-4 py-2 px-4 rounded-xl">NAVIGATE</PremiumButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-12 mt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-black text-slate-400 tracking-[0.4em]">© 2024 WISDOM GATEWAY FOUNDATION. EXCELLENCE IN ETHICS.</p>
            <div className="flex gap-8 text-[9px] font-black text-slate-400 tracking-widest uppercase">
              <button>Privacy</button><button>Terms</button><button>Contact</button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );

  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-yellow-200">
      {/* The Homepage content is rendered constantly. 
        This keeps the component mounted, which preserves the window scroll position 
        automatically when overlays are closed.
      */}
      {renderHomeContent()}

      <AnimatePresence>
        {view !== 'home' && (
          <motion.div
            key="detail-overlay"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={springTransition}
            className="fixed inset-0 z-[250] bg-slate-950"
          >
            <DetailView view={view} onBack={() => setView('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} transition={springTransition} onClick={() => setIsChatOpen(true)} className="fixed bottom-6 right-6 z-[450] w-16 h-16 bg-slate-900 text-yellow-400 rounded-full shadow-2xl flex items-center justify-center border-2 border-yellow-500/20 active:bg-yellow-600 transition-colors">
        <Sparkles size={28} fill="currentColor" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Modals */}
      <AppModal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)} title="Join the Mission">
        {isSubmitted ? <SuccessState /> : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                <input required type="text" className="w-full bg-slate-100 p-4 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">DOB</label>
                <input required type="date" className="w-full bg-slate-100 p-4 rounded-2xl font-bold focus:outline-none" />
              </div>
            </div>
            <PremiumButton variant="gold" type="submit" className="w-full">SUBMIT APPLICATION</PremiumButton>
          </form>
        )}
      </AppModal>

      <AppModal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} title="Fuel the Cause">
        {isSubmitted ? <SuccessState /> : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {DONATION_TIERS.map((tier, i) => (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} key={i} onClick={() => setIsSubmitted(true)} className="p-6 rounded-[2rem] border-2 border-slate-100 hover:border-yellow-400 transition-all text-left">
                  <tier.icon size={20} style={{ color: tier.color }} className="mb-4" />
                  <h4 className="font-black text-xl">₹{tier.amount}</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-black mt-1">{tier.label}</p>
                </motion.button>
              ))}
            </div>
            <PremiumButton onClick={() => setIsSubmitted(true)} className="w-full">CUSTOM DONATION</PremiumButton>
          </div>
        )}
      </AppModal>

      <AppModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="Summit 2026">
        {isSubmitted ? <SuccessState /> : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <input required type="email" className="w-full bg-slate-100 p-5 rounded-2xl font-bold" placeholder="Professional Email" />
            <PremiumButton type="submit" className="w-full">RESERVE MY SEAT</PremiumButton>
          </form>
        )}
      </AppModal>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} transition={springTransition} className="fixed inset-0 z-[400] bg-white p-10 flex flex-col justify-center gap-10">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 p-4 bg-slate-100 rounded-full shadow-sm"><X size={32} /></button>
            {['vision', 'missions', 'impact', 'leadership', 'events'].map((id, idx) => (
              <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.1 }} key={idx} onClick={() => smartNavigate(id)} className="text-6xl font-black tracking-tighter text-left capitalize hover:text-yellow-500 transition-all">{id}.</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
