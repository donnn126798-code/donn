import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Users,
  CheckSquare,
  FileText,
  Compass,
  Search,
  MessageSquare,
  ThumbsUp,
  ChevronRight,
  Menu,
  X,
  Plus,
  Trash2,
  Printer,
  Check,
  Send,
  Building,
  UserCheck,
  MapPin,
  Star,
  PlusCircle,
  FileCheck,
  LogOut,
  Sliders,
  DollarSign,
  Percent,
  Quote
} from 'lucide-react';
import { FORUMS_DATA, FREELANCERS_DIRECTORY, TESTIMONIALS, Thread, Freelancer } from './data';

export default function App() {
  // UI & Loading Simulation States
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isTabLoading, setIsTabLoading] = useState(false);

  // Navigation & Scroll State
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  
  // Interactive Sandbox Tab ('directory' | 'forum' | 'projects' | 'invoice' | 'dashboard')
  const [activeTab, setActiveTab] = useState<'directory' | 'forum' | 'projects' | 'invoice' | 'dashboard'>('directory');

  // Trigger high-fidelity loading simulation with luxury duration and ease-out
  useEffect(() => {
    let start = Date.now();
    const duration = 2800; // 2.8 seconds of premium load time
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      // Progress non-linearly with slight realistic friction towards the end
      setLoadingProgress(() => {
        if (calculatedProgress < 99) {
          return calculatedProgress;
        }
        return 99; // pause momentarily at 99 for a satisfying completion strike
      });
    }, 30);

    const finalTimer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      
      // Give the 100% full bar and gold glow transition 1 second to play out before unmounting
      const exitTimer = setTimeout(() => {
        setIsAppLoading(false);
      }, 1000);
      
      return () => clearTimeout(exitTimer);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(finalTimer);
    };
  }, []);
  
  // Auth/Signup Simulated State
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Quick Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContactTalent, setSelectedContactTalent] = useState<Freelancer | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactChannel, setContactChannel] = useState<'WhatsApp' | 'Email' | 'NEXUS Chat' | 'LinkedIn'>('NEXUS Chat');
  const [contactModalSuccess, setContactModalSuccess] = useState(false);
  
  // Dynamic Real-Time States from Express Server Memory
  const [onlineUsers, setOnlineUsers] = useState<number>(14);
  const [sentInboundOffers, setSentInboundOffers] = useState<{ id: string; sender: string; receiver: string; message: string; channel: string; date: string }[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; type: 'freelancer' | 'umkm'; brand: string } | null>(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Registration form inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regType, setRegType] = useState<'freelancer' | 'umkm'>('freelancer');
  const [regBrand, setRegBrand] = useState('');
  const [regBio, setRegBio] = useState('');
  const [regRole, setRegRole] = useState('');
  const [regLocation, setRegLocation] = useState('Jakarta, Indonesia');

  // Directory interactivity
  const [searchQuery, setSearchQuery] = useState('');
  const [directoryCategory, setDirectoryCategory] = useState<'Semua' | 'Desainer' | 'Developer' | 'Copywriter' | 'UMKM'>('Semua');
  const [freelancerList, setFreelancerList] = useState<Freelancer[]>([]);

  // Forum interactivity
  const [activeForum, setActiveForum] = useState<'umum' | 'umkm' | 'freelance'>('umum');
  const [forumThreads, setForumThreads] = useState<{ [key: string]: Thread[] }>({
    umum: [],
    umkm: [],
    freelance: []
  });
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [likedThreads, setLikedThreads] = useState<string[]>(() => {
    const saved = localStorage.getItem('nexus_liked_threads');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeThreadReplies, setActiveThreadReplies] = useState<{ [key: string]: { author: string; text: string; time: string }[] }>({});
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [newReplyText, setNewReplyText] = useState('');

  // Kanban interactivity
  const [projectTasks, setProjectTasks] = useState<{ id: string; title: string; stage: "Rencana" | "Berjalan" | "Selesai"; priority: string; deadline: string }[]>([]);
  const [new_task_title, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Sedang');

  // Invoice creator interactivity
  const [invoiceClient, setInvoiceClient] = useState('PT Nusantara Jaya');
  const [invoiceProject, setInvoiceProject] = useState('Pengembangan Desain Identitas Brand & Kemasan');
  const [invoiceNo, setInvoiceNo] = useState('INV/2026/004');
  const [invoiceDate, setInvoiceDate] = useState('2026-05-21');
  const [invoiceDue, setInvoiceDue] = useState('2026-06-04');
  const [invoicePPN, setInvoicePPN] = useState(true);
  const [invoiceItems, setInvoiceItems] = useState<{ id: string; description: string; qty: number; price: number }[]>([]);
  const [newInvoiceDesc, setNewInvoiceDesc] = useState('');
  const [newInvoiceQty, setNewInvoiceQty] = useState(1);
  const [newInvoicePrice, setNewInvoicePrice] = useState(150000);

  // Monitor Scroll for Premium Sticky Glassmorphism Navbar Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync user state with localStorage
  useEffect(() => {
    localStorage.setItem('nexus_user', user ? JSON.stringify(user) : '');
  }, [user]);

  // Sync Liked threads indices with localStorage
  useEffect(() => {
    localStorage.setItem('nexus_liked_threads', JSON.stringify(likedThreads));
  }, [likedThreads]);

  // Integrated Real-time fetcher
  const fetchServerState = async (silently = false) => {
    try {
      if (!silently) setIsTabLoading(true);
      const res = await fetch("/api/state");
      const data = await res.json();
      if (data.success) {
        setFreelancerList(data.freelancers);
        setForumThreads(data.forumThreads);
        setActiveThreadReplies(data.activeThreadReplies);
        setProjectTasks(data.projectTasks);
        setSentInboundOffers(data.sentOffers);
        setOnlineUsers(data.onlineCount);
        
        // Hydrate invoice fields on non-silent (initial) load to avoid overwriting typed draft state
        if (!silently) {
          setInvoiceClient(data.invoiceDetails.client);
          setInvoiceProject(data.invoiceDetails.project);
          setInvoiceNo(data.invoiceDetails.no);
          setInvoiceDate(data.invoiceDetails.date);
          setInvoiceDue(data.invoiceDetails.due);
          setInvoicePPN(data.invoiceDetails.ppn);
          setInvoiceItems(data.invoiceDetails.items);
        }
      }
    } catch (err) {
      console.error("Kesalahan sinkronisasi real-time NEXUS:", err);
    } finally {
      if (!silently) setIsTabLoading(false);
    }
  };

  // Setup live background syncing
  useEffect(() => {
    fetchServerState(false);
    const interval = setInterval(() => {
      fetchServerState(true);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Async helper to push invoice adjustments seamlessly to the Express server
  const syncInvoiceWithServer = async (updatedFields: any) => {
    try {
      await fetch("/api/invoice/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
    } catch (err) {
      console.error("Gagal menyinkronkan data invoice ke server:", err);
    }
  };

  // Format currency directly with IDR
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Sign up simulation
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;
    
    const formattedBrand = regBrand || (regType === 'umkm' ? 'Toko Mandiri' : 'Studio Digital');
    const newUser = {
      name: regName,
      email: regEmail,
      type: regType,
      brand: formattedBrand
    };

    setUser(newUser);
    setIsSignupModalOpen(false);

    const payload = {
      name: regName,
      role: regRole || (regType === 'umkm' ? `Owner ${formattedBrand}` : 'Profesional Digital'),
      bgGradient: regType === 'umkm' ? 'from-amber-300 to-amber-500 text-amber-950' : 'from-yellow-105 to-amber-300 text-stone-900',
      rating: 5.0,
      rate: regType === 'umkm' ? 'Supplier UMKM' : 'Rp 150k - 300k / jam',
      location: regLocation,
      tags: regType === 'umkm' ? ["Produk Lokal", "UMKM Baru", "Grosir"] : ["Desain", "Freelancer Baru", "Konsultasi"],
      bio: regBio || 'Masih baru merintis karir profesional bersama NEXUS Indonesia.'
    };

    // Optimistic UI state update
    const tempId = `custom_${Date.now()}`;
    const opCard: Freelancer = {
      id: tempId,
      ...payload,
      avatarInitials: regName.substring(0, 2).toUpperCase(),
      portfolio: [{ title: 'Proyek Perdana NEXUS', client: 'Klien Percobaan', year: '2026' }]
    };
    setFreelancerList(prev => [opCard, ...prev]);

    // Backend synchronization
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setFreelancerList(data.freelancers);
      }
    } catch (err) {
      console.error(err);
    }

    setRegName('');
    setRegEmail('');
    setRegBrand('');
    setRegBio('');
    setRegRole('');
  };

  // Filter freelancer directory
  const filteredFreelancers = freelancerList.filter(fl => {
    const matchesSearch = fl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          fl.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fl.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (directoryCategory === 'Semua') return matchesSearch;
    if (directoryCategory === 'Desainer' && fl.role.toLowerCase().includes('design')) return matchesSearch;
    if (directoryCategory === 'Developer' && (fl.role.toLowerCase().includes('dev') || fl.role.toLowerCase().includes('web'))) return matchesSearch;
    if (directoryCategory === 'Copywriter' && fl.role.toLowerCase().includes('write')) return matchesSearch;
    if (directoryCategory === 'UMKM' && fl.role.toLowerCase().includes('umkm')) return matchesSearch;
    
    return matchesSearch;
  });

  // Like forum thread
  const handleLikeThread = async (threadId: string, category: string) => {
    const hasLiked = likedThreads.includes(threadId);
    let newLiked = [...likedThreads];
    if (hasLiked) {
      newLiked = newLiked.filter(id => id !== threadId);
    } else {
      newLiked.push(threadId);
    }
    setLikedThreads(newLiked);

    // Optimistic UI update
    setForumThreads(prev => ({
      ...prev,
      [category]: prev[category].map(t => {
        if (t.id === threadId) {
          return { ...t, likes: t.likes + (hasLiked ? -1 : 1) };
        }
        return t;
      })
    }));

    try {
      const res = await fetch("/api/forum/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, category, hasLiked })
      });
      const data = await res.json();
      if (data.success) {
        setForumThreads(data.forumThreads);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit new forum thread
  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle) return;

    const authorName = user ? user.name : "Pengguna Anonim";
    const avatarInitials = authorName.substring(0, 2).toUpperCase();
    const threadId = `th_${Date.now()}`;

    const newThread: Thread = {
      id: threadId,
      title: newThreadTitle,
      author: authorName,
      avatarInitials,
      replies: 0,
      likes: 1,
      time: "Baru saja",
      category: activeForum
    };

    // Optimistic UI update
    setForumThreads(prev => ({
      ...prev,
      [activeForum]: [newThread, ...prev[activeForum]]
    }));
    setNewThreadTitle('');

    try {
      const res = await fetch("/api/forum/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newThread.title,
          author: newThread.author,
          category: activeForum
        })
      });
      const data = await res.json();
      if (data.success) {
        setForumThreads(data.forumThreads);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit forum reply
  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText || !selectedThreadId) return;

    const authorName = user ? user.name : "Tamu NEXUS";
    const newReply = {
      author: authorName,
      text: newReplyText,
      time: "Baru saja"
    };

    // Optimistic UI updates
    setActiveThreadReplies(prev => ({
      ...prev,
      [selectedThreadId]: [...(prev[selectedThreadId] || []), newReply]
    }));
    
    setForumThreads(prev => {
      const updated: { [key: string]: Thread[] } = {};
      Object.keys(prev).forEach(cat => {
        updated[cat] = prev[cat].map(t => t.id === selectedThreadId ? { ...t, replies: t.replies + 1 } : t);
      });
      return updated;
    });
    setNewReplyText('');

    try {
      const res = await fetch("/api/forum/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId: selectedThreadId,
          author: authorName,
          text: newReply.text
        })
      });
      const data = await res.json();
      if (data.success) {
        setActiveThreadReplies(data.activeThreadReplies);
        setForumThreads(data.forumThreads);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Project Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!new_task_title) return;

    const newTask = {
      id: `task_${Date.now()}`,
      title: new_task_title,
      stage: 'Rencana' as 'Rencana' | 'Berjalan' | 'Selesai',
      priority: newTaskPriority,
      deadline: 'Segera'
    };

    // Optimistic UI updates
    setProjectTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');

    try {
      const res = await fetch("/api/projects/task/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask.title,
          priority: newTaskPriority
        })
      });
      const data = await res.json();
      if (data.success) {
        setProjectTasks(data.projectTasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Move Project Task stage
  const handleMoveTask = async (taskId: string, direction: 'forward' | 'backward') => {
    // Optimistic UI updates
    setProjectTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let currentStage = task.stage;
        let newStage = currentStage;
        if (direction === 'forward') {
          if (currentStage === 'Rencana') newStage = 'Berjalan';
          else if (currentStage === 'Berjalan') newStage = 'Selesai';
        } else {
          if (currentStage === 'Selesai') newStage = 'Berjalan';
          else if (currentStage === 'Berjalan') newStage = 'Rencana';
        }
        return { ...task, stage: newStage };
      }
      return task;
    }));

    try {
      const res = await fetch("/api/projects/task/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, direction })
      });
      const data = await res.json();
      if (data.success) {
        setProjectTasks(data.projectTasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Project Task
  const handleDeleteTask = async (taskId: string) => {
    // Optimistic UI updates
    setProjectTasks(prev => prev.filter(t => t.id !== taskId));

    try {
      const res = await fetch("/api/projects/task/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId })
      });
      const data = await res.json();
      if (data.success) {
        setProjectTasks(data.projectTasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Invoice Calculator items
  const handleAddInvoiceItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceDesc) return;

    const newItem = {
      id: `inv_${Date.now()}`,
      description: newInvoiceDesc,
      qty: newInvoiceQty,
      price: newInvoicePrice
    };

    const newItems = [...invoiceItems, newItem];
    setInvoiceItems(newItems);
    setNewInvoiceDesc('');
    setNewInvoiceQty(1);
    setNewInvoicePrice(150000);

    syncInvoiceWithServer({ items: newItems });
  };

  const handleSubInvoiceItem = (itemId: string) => {
    const newItems = invoiceItems.filter(i => i.id !== itemId);
    setInvoiceItems(newItems);
    syncInvoiceWithServer({ items: newItems });
  };

  // Subtotal calculations
  const invoiceSubtotal = invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const invoiceTax = invoicePPN ? Math.round(invoiceSubtotal * 0.11) : 0;
  const invoiceGrandTotal = invoiceSubtotal + invoiceTax;

  // Jump to specific sandbox tool from navbar/herocta
  const openSandboxTab = (tab: 'directory' | 'forum' | 'projects' | 'invoice' | 'dashboard') => {
    setIsTabLoading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 450);
    const element = document.getElementById('sandbox-tool');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAppLoading) {
    return (
      <div 
        className={`fixed inset-0 bg-[#F7F4EE] flex flex-col items-center justify-center z-[9999] font-sans select-none bg-[radial-gradient(ellipse_at_top,#C8A96E12,transparent_60%)] transition-all duration-[900ms] ease-in-out ${
          loadingProgress >= 100 ? 'opacity-0 scale-[1.02] -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8A96E06_1px,transparent_1px),linear-gradient(to_bottom,#C8A96E06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 pointer-events-none" />
        <div className="noise-overlay" />
        <div className="flex flex-col items-center gap-5 text-center relative z-10">
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Outer luxury dashed spinner (slow rotation) */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C8A96E]/40 animate-spin" style={{ animationDuration: '8s' }} />
            
            {/* Solid background trace track */}
            <div className="absolute inset-2 rounded-full border-[3px] border-[#1A1814]/10" />
            
            {/* High-visibility active spinning ring with gold glow */}
            <div className="absolute inset-2 rounded-full border-[3px] border-t-[#C8A96E] border-r-transparent border-b-transparent border-l-transparent animate-spin shadow-[0_0_15px_rgba(200,169,110,0.3)]" style={{ animationDuration: '1.2s' }} />
            
            {/* Central static logo badge with shadow */}
            <div className="relative flex items-center justify-center w-12 h-12 bg-[#1A1814] rounded-xl border border-[#C8A96E]/30 shadow-[0_8px_20px_rgba(26,24,20,0.25)]">
              <NexusLogo className="w-6 h-6 text-[#E8D5A8]" />
            </div>
          </div>
          <div className="space-y-2 px-4">
            <h2 className="text-xs font-black uppercase tracking-[0.35em] text-[#1A1814]">NEXUS</h2>
            <p className="text-[9px] text-[#C8A96E] uppercase tracking-[0.2em] font-bold">PREMIUM WORKSPACE FOR INDONESIAN PARTNERS</p>
          </div>
          
          {/* Dynamic Progress Engine */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="w-52 bg-stone-300/40 h-[4px] rounded-full overflow-hidden relative border border-stone-300/10 shadow-inner">
              <div 
                className="bg-gradient-to-r from-[#C8A96E] via-[#E8D5A8] to-[#C8A96E] h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(200,169,110,0.5)]" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-500 font-mono tracking-[0.2em] uppercase select-none flex items-center gap-1.5 mt-0.5">
              <span className="font-bold text-[#C8A96E]">{loadingProgress}%</span> 
              <span>SINKRONISASI INTAN...</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F7F4EE] text-[#1A1814] selection:bg-[#E8D5A8] selection:text-[#1A1814]">
      {/* Texture grain overlay */}
      <div className="noise-overlay" id="noise-layer" />

      {/* Decorative Gold Glow Circles */}
      <div className="fixed top-24 right-[-10vw] w-[50vw] h-[50vw] rounded-full glow-spot-1 opacity-60 pointer-events-none z-0" />
      <div className="fixed bottom-10 left-[-15vw] w-[60vw] h-[60vw] rounded-full glow-spot-2 opacity-50 pointer-events-none z-0" />

      {/* FIXED BANNER (PERSONAL GREETING FOR USER) */}
      {user && (
        <div className="bg-[#1A1814] text-[#E8D5A8] py-2 px-4 text-xs font-sans tracking-wide text-center uppercase border-b border-[#C8A96E]/20 relative z-50 flex items-center justify-center gap-3">
          <span>👑 Anda terdaftar sebagai <strong>{user.name}</strong> ({user.type === 'umkm' ? `⭐ UMKM: ${user.brand}` : 'Freelancer'})</span>
          <span className="hidden md:inline-block">| Semua simulator terisi otomatis dengan data profil Anda!</span>
          <button 
            onClick={() => setUser(null)}
            className="ml-4 text-white hover:text-[#C8A96E] flex items-center gap-1 transition-all"
            title="Keluar"
          >
            <LogOut className="w-3.5 h-3.5" /> <span className="text-[10px]">Keluar</span>
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <nav 
        id="nexus-navbar"
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#C8A96E]/20 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 font-sans text-sm tracking-[0.2em] font-black uppercase text-stone-900 group" id="nav-logo">
            <NexusLogo className="w-6 h-6 text-stone-900 transition-transform group-hover:rotate-12 duration-300" />
            <span className="text-stone-900 transition-colors group-hover:text-[#8A6D3B]">NEXUS</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-sans tracking-wider text-[#3D3A33]" id="nav-links">
            <a href="#" className="hover:text-[#C8A96E] transition-colors font-medium">Beranda</a>
            <a href="#fitur" className="hover:text-[#C8A96E] transition-colors font-medium">Fitur</a>
            <a href="#sandbox-tool" className="hover:text-[#C8A96E] transition-colors font-medium flex items-center gap-1 bg-[#C8A96E]/10 px-2.5 py-1 rounded text-[#8A6D3B]">
              <Sparkles className="w-3.5 h-3.5" /> Coba Sandbox Platform
            </a>
            <a href="#cara-kerja" className="hover:text-[#C8A96E] transition-colors font-medium">Tentang & Cara Kerja</a>
            <a href="#testimoni" className="hover:text-[#C8A96E] transition-colors font-medium">Testimoni</a>
          </div>

          {/* User Sign In and Registration Controls */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/40 text-emerald-800 text-[10px] font-mono font-extrabold tracking-wider animate-pulse select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"></span>
              LIVE: {onlineUsers} MITRA ONLINE
            </div>

            {user ? (
              <button 
                onClick={() => openSandboxTab('dashboard')}
                className="bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-[12px] uppercase tracking-wider font-semibold py-2.5 px-5 rounded transition-all duration-300 shadow-md border border-black"
              >
                Dashboard Saya
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginModalOpen(true)} 
                  className="text-[#3D3A33] hover:text-[#C8A96E] text-xs font-semibold tracking-wider uppercase font-sans mr-2 transition-colors"
                >
                  Masuk
                </button>
                <button 
                  onClick={() => setIsSignupModalOpen(true)}
                  className="bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-[12px] uppercase tracking-wider font-semibold py-2.5 px-5.5 rounded transition-all duration-300 shadow-md"
                >
                  Daftar Gratis
                </button>
              </>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setActiveMobileMenu(!activeMobileMenu)}
            className="md:hidden text-[#1A1814] hover:text-[#C8A96E] p-1.5 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {activeMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        {activeMobileMenu && (
          <div className="md:hidden bg-[#F7F4EE] border-b border-[#C8A96E]/20 absolute top-full left-0 w-full p-6 flex flex-col gap-5 shadow-xl animate-fade-down z-50">
            <a 
              href="#" 
              onClick={() => setActiveMobileMenu(false)}
              className="text-stone-900 font-medium pb-2 border-b border-[#1A1814]/5 text-sm"
            >
              Beranda
            </a>
            <a 
              href="#fitur" 
              onClick={() => setActiveMobileMenu(false)}
              className="text-stone-900 font-medium pb-2 border-b border-[#1A1814]/5 text-sm"
            >
              Fitur Utama
            </a>
            <a 
              href="#sandbox-tool" 
              onClick={() => {
                setActiveMobileMenu(false);
                const element = document.getElementById('sandbox-tool');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#8A6D3B] font-semibold pb-2 border-b border-[#1A1814]/5 text-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Coba Sandbox Platform
            </a>
            <a 
              href="#cara-kerja" 
              onClick={() => setActiveMobileMenu(false)}
              className="text-stone-900 font-medium pb-2 border-b border-[#1A1814]/5 text-sm"
            >
              Cara Kerja
            </a>
            <a 
              href="#testimoni" 
              onClick={() => setActiveMobileMenu(false)}
              className="text-stone-900 font-medium pb-4 text-sm"
            >
              Testimoni
            </a>
            
            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <button 
                  onClick={() => {
                    setActiveMobileMenu(false);
                    openSandboxTab('dashboard');
                  }}
                  className="w-full text-center bg-[#1A1814] text-white py-3 rounded text-xs tracking-widest font-semibold uppercase"
                >
                  Buka Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setActiveMobileMenu(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="w-full text-center border border-[#1A1814]/15 py-3 rounded text-xs font-semibold tracking-wide uppercase text-stone-750 hover:bg-[#1A1814]/5 transition-all"
                  >
                    Masuk Akun
                  </button>
                  <button 
                    onClick={() => {
                      setActiveMobileMenu(false);
                      setIsSignupModalOpen(true);
                    }}
                    className="w-full text-center bg-[#1A1814] text-white hover:bg-[#C8A96E]/90 py-3 rounded text-xs tracking-widest font-semibold uppercase transition-all"
                  >
                    Daftar Akun Gratis
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION WITH MODERN SAAS GRID & AMBIENT BLURS */}
      <section id="hero-section" className="relative pt-36 pb-28 md:pt-48 md:pb-40 overflow-hidden bg-[radial-gradient(ellipse_at_top,#C8A96E12,transparent_60%)]">
        {/* Sleek Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8A96E06_1px,transparent_1px),linear-gradient(to_bottom,#C8A96E06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 pointer-events-none" />
        
        {/* Floating Glowing Orbs */}
        <div className="absolute top-1/4 -left-16 w-96 h-96 rounded-full glow-spot-1 blur-[120px] pointer-events-none mix-blend-multiply opacity-80" />
        <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full glow-spot-2 blur-[120px] pointer-events-none mix-blend-multiply opacity-80" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-7">
            {/* Elegant pill badge representing startup standard */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 backdrop-blur-sm text-stone-900 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold uppercase animate-fade-down shadow-xs border border-stone-200/80">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A96E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A96E]"></span>
              </span>
              PLATFORM PROFESIONAL SAAS INDONESIA
            </div>
 
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-serif tracking-tight text-[#1A1814] font-normal leading-[1.08] text-balance" id="hero-title">
              Satu Media untuk <span className="italic font-light text-[#C8A96E] relative">
                Tumbuh,
                <span className="absolute bottom-0.5 left-0 w-full h-[6px] bg-[#C8A96E]/15 rounded-full -skew-x-12" />
              </span> & Berkembang Bersama.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-stone-750 max-w-xl font-sans font-normal leading-relaxed text-balance" id="hero-subtext">
              NEXUS adalah ruang kerja modern khusus untuk UMKM & Freelancer premium di Indonesia. Kelola klien, luncurkan invoice siap cetak, pantau proyek digital, dan diskusikan ide-ide visioner di satu wadah terintegrasi.
            </p>

            {/* Redesigned Standout CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full sm:w-auto" id="hero-actions">
              <button 
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-[12px] font-sans font-bold uppercase tracking-wider py-4.5 px-9 rounded-xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 group border border-stone-950"
              >
                Mulai Sekarang — Gratis 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#sandbox-tool"
                className="text-stone-800 hover:text-[#C8A96E] bg-white/40 hover:bg-white/80 border border-stone-200 hover:border-[#C8A96E]/50 text-[12px] font-sans font-semibold uppercase tracking-wider py-4.5 px-7.5 rounded-xl text-center shadow-xs transition-all flex items-center justify-center gap-1.5 backdrop-blur-xs"
              >
                Coba Simulator Platform ↓
              </a>
            </div>

            {/* Premium Social Proof Indicator */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-200 w-full max-w-lg">
              <div className="flex -space-x-3 shrink-0">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-[#F7F4EE] flex items-center justify-center text-[10px] font-bold text-stone-900 shadow-sm">RD</span>
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 border-2 border-[#F7F4EE] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">AN</span>
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 border-2 border-[#F7F4EE] flex items-center justify-center text-[10px] font-bold text-stone-900 shadow-sm">BS</span>
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A1814] to-stone-800 border-2 border-[#F7F4EE] flex items-center justify-center text-[9px] font-sans font-bold text-[#E8D5A8] shadow-sm">+99</span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-550 font-sans font-medium leading-normal">
                Dipercaya oleh <span className="font-bold text-stone-900">2.400+ profesional elite</span>, pemilik bisnis, dan pelopor UMKM kreatif di seluruh kota Indonesia.
              </p>
            </div>
          </div>

          {/* Premium High-Fidelity Mock SaaS Live Workspace Area */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="border border-stone-200/80 rounded-2xl p-6.5 bg-white shadow-[0_20px_50px_rgba(200,169,110,0.12)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(200,169,110,0.18)] max-w-sm ml-auto font-sans">
              
              {/* Modern Grid Line decoration */}
              <div className="absolute top-0 right-14 w-[1px] h-full bg-gradient-to-b from-[#C8A96E]/20 via-[#C8A96E]/5 to-transparent pointer-events-none" />
              <div className="absolute top-12 left-0 w-full h-[1px] bg-stone-100 pointer-events-none" />

              <div className="flex justify-between items-center mb-5.5">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#C8A96E] font-bold block">NEXUS SAAS MONITOR</span>
                  <h4 className="font-serif text-2xl font-normal text-stone-900 mt-0.5">Sinergi Kreatif</h4>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#E8D5A8]/20 border border-[#C8A96E]/30 text-[#8A6D3B] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Monitor
                </div>
              </div>

              {/* Redesigned Premium Metrics & Sparklines */}
              <div className="space-y-4 pt-1">
                
                {/* Active Projects Widget */}
                <div className="p-3.5 bg-stone-50 hover:bg-[#FDFDFB] rounded-xl border border-stone-150 flex items-center justify-between gap-3 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">KLIEN DIHUBUNGI HARI INI</p>
                    <p className="text-xs font-bold text-stone-800 mt-0.5">38 Freelancer Berkualitas Tinggi</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 shrink-0" />
                  </div>
                </div>

                {/* Active Forums Widget */}
                <div className="p-3.5 bg-stone-50 hover:bg-[#FDFDFB] rounded-xl border border-stone-150 flex items-center justify-between gap-3 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">UMKM EXPORT GATEWAY</p>
                    <p className="text-xs font-bold text-stone-800 mt-0.5">4 kisah sukses baru bertaraf global</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 shrink-0" />
                  </div>
                </div>

                {/* Micro chart monitor mock representation */}
                <div className="p-3.5 bg-[#1a1814] text-white rounded-xl border border-stone-850 flex flex-col gap-2 shadow-inner">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-stone-400 block font-bold uppercase tracking-wider">PREVIEW PENDAPATAN JASA</span>
                    <span className="text-[#C8A96E] font-bold font-mono">Rp 12.8M</span>
                  </div>
                  {/* Decorative sparkline bars */}
                  <div className="flex items-end gap-1.5 h-7 pt-1">
                    <div className="bg-stone-700 w-full h-[40%] rounded-xs transition-all hover:bg-[#C8A96E]"></div>
                    <div className="bg-stone-700 w-full h-[60%] rounded-xs transition-all hover:bg-[#C8A96E]"></div>
                    <div className="bg-stone-700 w-full h-[55%] rounded-xs transition-all hover:bg-[#C8A96E]"></div>
                    <div className="bg-stone-700 w-full h-[85%] rounded-xs transition-all hover:bg-[#C8A96E]"></div>
                    <div className="bg-[#C8A96E] w-full h-[100%] rounded-xs"></div>
                    <div className="bg-stone-800 w-full h-[0%] rounded-xs"></div>
                  </div>
                </div>
              </div>

              {/* Bottom anchor link action card */}
              <button 
                onClick={() => openSandboxTab('directory')}
                className="w-full mt-6 bg-[#1a1814]/5 hover:bg-[#1a1814] text-stone-900 hover:text-[#F7F4EE] border border-stone-200 hover:border-black rounded-lg py-3.5 flex justify-center items-center gap-2 text-xs tracking-widest font-sans font-bold uppercase transition-all duration-300 shadow-xs"
              >
                <span>Jelajahi Direktori</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND TRUST / LOGO BANNER */}
      <section className="py-8 bg-white/25 border-t border-stone-200/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <span className="text-[10px] uppercase tracking-[0.22em] font-sans font-bold text-stone-400">
            SINERGI MITRA LOKAL & AGENSI DIGITAL INDONESIA
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-45 hover:opacity-75 transition-opacity duration-300 select-none">
            <span className="font-sans text-xs tracking-[0.18em] font-extrabold text-stone-800">SELASAR.DESIGN</span>
            <span className="font-sans text-xs tracking-[0.15em] font-black text-stone-800">NUSANTARA STUDIOS</span>
            <span className="font-serif italic text-xs tracking-widest font-semibold text-stone-800">Borneo Craft</span>
            <span className="font-mono text-[11px] font-bold text-stone-800">[ SUMATRA.DEV ]</span>
            <span className="font-sans text-xs tracking-[0.2em] font-medium text-stone-800">JAVA COFFEE CO.</span>
          </div>
        </div>
      </section>

      {/* STATS / TRUST BAR */}
      <section className="bg-[#FFFFFF]/50 border-y border-[#C8A96E]/20 py-10 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-center">
            
            <div className="text-center lg:border-r border-[#C8A96E]/25 last:border-0 px-2 flex flex-col items-center">
              <span className="font-serif text-4xl font-light text-[#C8A96E] tracking-tight block">2.4K+</span>
              <span className="text-xs tracking-wider uppercase font-sans font-medium text-[#8A8578] mt-2">Pengguna Aktif</span>
            </div>
            
            <div className="text-center lg:border-r border-[#C8A96E]/25 last:border-0 px-2 flex flex-col items-center">
              <span className="font-serif text-4xl font-light text-[#C8A96E] tracking-tight block">840+</span>
              <span className="text-xs tracking-wider uppercase font-sans font-medium text-[#8A8578] mt-2">Portofolio Terbuka</span>
            </div>
            
            <div className="text-center lg:border-r border-[#C8A96E]/25 last:border-0 px-2 flex flex-col items-center">
              <span className="font-serif text-4xl font-light text-[#C8A96E] tracking-tight block">3</span>
              <span className="text-xs tracking-wider uppercase font-sans font-medium text-[#8A8578] mt-2">Forum Tersegregasi</span>
            </div>
            
            <div className="text-center last:border-0 px-2 flex flex-col items-center">
              <span className="font-serif text-4xl font-light text-[#C8A96E] tracking-tight block">98%</span>
              <span className="text-xs tracking-wider uppercase font-sans font-medium text-[#8A8578] mt-2">Kepuasan Pengguna</span>
            </div>
            
          </div>
        </div>
      </section>

      {/* FITUR UTAMA */}
      <section id="fitur" className="py-28 relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96E] font-bold block mb-3">PENGALAMAN DIGITAL TERPADU</span>
          <h2 className="text-3xl sm:text-4.5xl font-serif text-[#1A1814] font-normal leading-tight">Alat Profesional untuk Melejitkan Bisnis Anda</h2>
          <p className="text-sm text-stone-700 mt-4 font-sans leading-relaxed">
            Mulai dari menerbitkan penawaran kerja, bincang komunal bebas bising, hingga merancang faktur profesional siap cetak. Semua dirancang presisi untuk alur kerja terstruktur.
          </p>
        </div>

        {/* Features Grid with Refined Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_30px_rgba(200,169,110,0.08)] hover:translate-y-[-5px] transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8A96E]/40 to-[#E8D5A8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div>
              <div className="w-13 h-13 rounded-xl bg-[#F5EDD8]/70 border border-[#C8A96E]/20 flex items-center justify-center text-[#8A6D3B] mb-6 transition-transform group-hover:scale-105">
                <Star className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-2.5 text-stone-900 group-hover:text-[#8A6D3B] transition-colors">Tampil Profesional</h3>
              <p className="text-stone-600 text-[12.5px] font-sans leading-relaxed">
                Buat profil representatif lengkap dengan daftar karya, estimasi tarif jam kerja, dan legalitas usaha. Dapatkan satu tautan instan untuk portofolio digital kelas atas Anda.
              </p>
            </div>
            <button 
              onClick={() => openSandboxTab('directory')}
              className="mt-7 flex items-center gap-1.5 text-xs tracking-wider uppercase font-extrabold text-[#C8A96E] hover:text-[#1A1814] transition-colors w-fit"
            >
              Cari Jasa / Talent <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_30px_rgba(200,169,110,0.08)] hover:translate-y-[-5px] transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8A96E]/40 to-[#E8D5A8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div>
              <div className="w-13 h-13 rounded-xl bg-[#F5EDD8]/70 border border-[#C8A96E]/20 flex items-center justify-center text-[#8A6D3B] mb-6 transition-transform group-hover:scale-105">
                <MessageSquare className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-2.5 text-stone-900 group-hover:text-[#8A6D3B] transition-colors">3 Forum Khusus</h3>
              <p className="text-stone-600 text-[12.5px] font-sans leading-relaxed">
                Akses Forum Umum, UMKM, dan Freelancer. Kami memisahkan ruang bincang secara tertata agar Anda terhindar dari bias informasi dan fokus pada solusi praktis.
              </p>
            </div>
            <button 
              onClick={() => openSandboxTab('forum')}
              className="mt-7 flex items-center gap-1.5 text-xs tracking-wider uppercase font-extrabold text-[#C8A96E] hover:text-[#1A1814] transition-colors w-fit"
            >
              Uji Coba Forum <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_30px_rgba(200,169,110,0.08)] hover:translate-y-[-5px] transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8A96E]/40 to-[#E8D5A8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div>
              <div className="w-13 h-13 rounded-xl bg-[#F5EDD8]/70 border border-[#C8A96E]/20 flex items-center justify-center text-[#8A6D3B] mb-6 transition-transform group-hover:scale-105">
                <CheckSquare className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-2.5 text-stone-900 group-hover:text-[#8A6D3B] transition-colors">Kelola Proyekmu</h3>
              <p className="text-stone-600 text-[12.5px] font-sans leading-relaxed">
                Pantau progres penyerahan kerja, kelola revisi klien, tentukan skala prioritas tugas penting, dan simpan link deliverables Anda di satu papan kanban digital.
              </p>
            </div>
            <button 
              onClick={() => openSandboxTab('projects')}
              className="mt-7 flex items-center gap-1.5 text-xs tracking-wider uppercase font-extrabold text-[#C8A96E] hover:text-[#1A1814] transition-colors w-fit"
            >
              Atur Project <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_30px_rgba(200,169,110,0.08)] hover:translate-y-[-5px] transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8A96E]/40 to-[#E8D5A8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div>
              <div className="w-13 h-13 rounded-xl bg-[#F5EDD8]/70 border border-[#C8A96E]/20 flex items-center justify-center text-[#8A6D3B] mb-6 transition-transform group-hover:scale-105">
                <FileText className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-2.5 text-stone-900 group-hover:text-[#8A6D3B] transition-colors">Invoice Instan</h3>
              <p className="text-stone-600 text-[12.5px] font-sans leading-relaxed">
                Tulis faktur tagihan kerja dalam beberapa klik. Lengkap dengan detail nominal, opsional pajak PPN/PPH otomatis, dan live sheet generator premium siap unduh.
              </p>
            </div>
            <button 
              onClick={() => openSandboxTab('invoice')}
              className="mt-7 flex items-center gap-1.5 text-xs tracking-wider uppercase font-extrabold text-[#C8A96E] hover:text-[#1A1814] transition-colors w-fit"
            >
              Buat Tagihan <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_30px_rgba(200,169,110,0.08)] hover:translate-y-[-5px] transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8A96E]/40 to-[#E8D5A8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div>
              <div className="w-13 h-13 rounded-xl bg-[#F5EDD8]/70 border border-[#C8A96E]/20 flex items-center justify-center text-[#8A6D3B] mb-6 transition-transform group-hover:scale-105">
                <Compass className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-2.5 text-stone-900 group-hover:text-[#8A6D3B] transition-colors">Ditemukan Klien</h3>
              <p className="text-stone-600 text-[12.5px] font-sans leading-relaxed">
                Masuk dalam indeks katalog publik tepercaya se-Indonesia. Klien dari luar kota yang membutuhkan kapabilitas Anda dapat segera menghubungi Anda tanpa potongan komisi.
              </p>
            </div>
            <button 
              onClick={() => openSandboxTab('directory')}
              className="mt-7 flex items-center gap-1.5 text-xs tracking-wider uppercase font-extrabold text-[#C8A96E] hover:text-[#1A1814] transition-colors w-fit"
            >
              Cari Klien & Jasa <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 hover:border-[#C8A96E]/60 hover:shadow-[0_12px_30px_rgba(200,169,110,0.08)] hover:translate-y-[-5px] transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8A96E]/40 to-[#E8D5A8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div>
              <div className="w-13 h-13 rounded-xl bg-[#F5EDD8]/70 border border-[#C8A96E]/20 flex items-center justify-center text-[#8A6D3B] mb-6 transition-transform group-hover:scale-105">
                <Sliders className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl font-serif font-normal mb-2.5 text-stone-900 group-hover:text-[#8A6D3B] transition-colors">Dashboard Terpadu</h3>
              <p className="text-stone-600 text-[12.5px] font-sans leading-relaxed">
                Pantau total omset bulanan hasil kiriman invoice, cek statistik koneksi dari direktori pencarian, beralih forum, dan atur agenda proyek di satu terminal andalan.
              </p>
            </div>
            <button 
              onClick={() => openSandboxTab('dashboard')}
              className="mt-7 flex items-center gap-1.5 text-xs tracking-wider uppercase font-extrabold text-[#C8A96E] hover:text-[#1A1814] transition-colors w-fit"
            >
              Buka Analitik <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* 👑 INTERACTIVE WORKBENCH PLAZA (THE SANDBOX) */}
      <section id="sandbox-tool" className="py-24 bg-[#FAF8F5] border-y border-stone-150 relative z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 pb-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8A6D3B] tracking-[0.16em] font-sans mb-2.5 bg-[#E8D5A8]/20 px-3 py-1 rounded-full border border-[#C8A96E]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96E] animate-pulse" /> PROTOTIPE INTERAKTIF NEXUS
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1814] font-normal tracking-tight">Eksplorasi Langsung Hub Simulasi</h2>
              <p className="text-stone-600 text-sm mt-1.5 font-sans leading-relaxed">
                Uji langsung fitur operasional harian kami di simulator interaktif terpadu di bawah ini.
              </p>
            </div>
            {/* Tab Controllers - Premium Rounded Tab system */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200/80 max-w-full">
              {[
                { id: 'directory', label: 'Direktori & Profil' },
                { id: 'forum', label: 'Community Forum' },
                { id: 'projects', label: 'Manajemen Proyek' },
                { id: 'invoice', label: 'Asisten Invoice' },
                { id: 'dashboard', label: 'Dashboard Analisis' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setIsTabLoading(true);
                    setActiveTab(tab.id as any);
                    setTimeout(() => {
                      setIsTabLoading(false);
                    }, 400);
                  }}
                  className={`text-[11px] font-sans font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-[#1A1814] text-[#E8D5A8] shadow-sm border border-stone-950' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xl min-h-[500px]">
            
            {isTabLoading ? (
              <div className="p-6 md:p-8 animate-pulse space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-stone-100 pb-6 mb-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-stone-200 rounded-md w-48"></div>
                    <div className="h-3 bg-stone-150 rounded-md w-64"></div>
                  </div>
                  <div className="h-9 bg-stone-200 rounded-lg w-32 shrink-0"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-stone-200/60 rounded-xl p-5 bg-[#FDFDFB]/85 space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-11 h-11 rounded-full bg-stone-200 shrink-0"></div>
                        <div className="flex-1 space-y-2.5">
                          <div className="h-3.5 bg-stone-200 rounded-md w-1/2"></div>
                          <div className="h-3 bg-stone-150 rounded-md w-1/3"></div>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="h-3 bg-stone-150 rounded-md w-full"></div>
                        <div className="h-3 bg-stone-150 rounded-md w-5/6"></div>
                      </div>
                      <div className="flex justify-between items-center border-t border-stone-100 pt-3.5 mt-2">
                        <div className="h-4 bg-stone-150 rounded w-20"></div>
                        <div className="h-6.5 bg-stone-200 rounded-lg w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* 1. DIRECTORY WORKBENCH */}
                {activeTab === 'directory' && (
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row bg-[#F7F4EE]/50 border-b border-dashed border-[#C8A96E]/20 pb-6 mb-8 gap-4 justify-between items-start lg:items-center">
                  <div>
                    <h3 className="text-lg font-serif">Katalog Talent & Usaha Lokal</h3>
                    <p className="text-xs text-stone-500 font-sans">Cari freelancer ahli atau temukan usaha lokal tepercaya Indonesia.</p>
                  </div>
                  {/* Register simulated block */}
                  <button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-[#C8A96E]/15 hover:bg-[#C8A96E]/25 text-[#735C33] text-xs font-sans font-bold uppercase py-2 px-4 rounded-lg border border-[#C8A96E]/30 transition-all"
                  >
                    <PlusSquareIcon className="w-4 h-4" /> Tambah Profil Saya ke Katalog
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#8A8578]" />
                    <input
                      type="text"
                      placeholder="Cari keahlian (contoh: branding, react, kayu jati)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#F7F4EE]/35 border border-[#1A1814]/15 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#C8A96E] font-sans"
                    />
                  </div>
                  {/* Category Buttons */}
                  <div className="flex overflow-x-auto no-scrollbar gap-1.5">
                    {['Semua', 'Desainer', 'Developer', 'Copywriter', 'UMKM'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setDirectoryCategory(cat as any)}
                        className={`text-[10px] font-sans tracking-wider uppercase font-bold px-3.5 py-2.5 rounded-lg border transition-all ${
                          directoryCategory === cat
                            ? 'bg-[#1A1814] text-white border-black'
                            : 'border-[#1A1814]/10 bg-transparent text-[#3D3A33] hover:bg-stone-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Directory List Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="directory-grid-sandbox">
                  {filteredFreelancers.length > 0 ? (
                    filteredFreelancers.map((fl) => (
                      <div key={fl.id} className="border border-[#C8A96E]/20 rounded-xl p-5 hover:border-[#1A1814]/40 hover:shadow-md transition-all bg-[#FDFDFB]">
                        <div className="flex gap-4 items-start">
                          <span className={`w-12 h-12 rounded-full bg-gradient-to-br ${fl.bgGradient} flex items-center justify-center text-xs font-bold shrink-0 shadow-inner`}>
                            {fl.avatarInitials}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-serif text-lg font-medium tracking-tight truncate text-[#1A1814]">{fl.name}</h4>
                              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded shrink-0">
                                <Star className="w-3 h-3 fill-amber-700" /> {fl.rating.toFixed(1)}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 font-sans tracking-wide leading-tight mt-0.5">{fl.role}</p>
                            <p className="text-[11px] font-sans text-[#8A8578] mt-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 shrink-0" /> {fl.location}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-stone-650 font-sans leading-relaxed mt-4 line-clamp-2">
                          {fl.bio}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {fl.tags.map(t => (
                            <span key={t} className="text-[10px] font-sans tracking-wide bg-[#F2EDE4] text-stone-800 px-2.5 py-1 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Recent Work / Project */}
                        <div className="border-t border-dashed border-[#C8A96E]/20 mt-4 pt-3">
                          <span className="text-[9px] uppercase tracking-wider text-[#8A8578] font-semibold block">PORTOFOLIO DIGITAL TERBARU</span>
                          <div className="flex justify-between text-xs font-sans mt-1">
                            <span className="font-medium text-[#1A1814] truncate max-w-[70%]">{fl.portfolio[0]?.title}</span>
                            <span className="text-stone-400 shrink-0">{fl.portfolio[0]?.client} • {fl.portfolio[0]?.year}</span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-center justify-between border-t border-[#1A1814]/5 mt-4 pt-3">
                          <span className="text-[10px] font-medium font-sans text-stone-500">{fl.rate}</span>
                          <button 
                            onClick={() => {
                              setSelectedContactTalent(fl);
                              setContactMessage(`Halo ${fl.name}, saya melihat profil Anda di NEXUS dan tertarik untuk mendiskusikan rencana kerja sama terkait proyek baru. Apakah ada waktu luang untuk berdiskusi?`);
                              setContactChannel('NEXUS Chat');
                              setContactModalSuccess(false);
                              setIsContactModalOpen(true);
                            }}
                            className="bg-[#1A1814] hover:bg-[#C8A96E] hover:text-[#1A1814] text-white text-[10px] uppercase font-sans tracking-wider font-bold py-1.5 px-3 rounded transition-colors"
                          >
                            Hubungi Talent
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-stone-400 font-sans">
                      <p>Katalog kosong atau tidak menemukan keahlian tersebut.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setDirectoryCategory('Semua'); }}
                        className="text-xs text-[#C8A96E] font-bold mt-2 hover:underline"
                      >
                        Reset Pencarian
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. FORUM WORKBENCH */}
            {activeTab === 'forum' && (
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side categories and posting */}
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#C8A96E]/15 pb-6 lg:pb-0 lg:pr-6">
                  <h3 className="text-lg font-serif mb-1">Berbagi Gagasan Baru</h3>
                  <p className="text-xs text-stone-500 mb-6 font-sans">Pilih ruang, bicarakan topik Anda bersama ribuan rekan seprofesi lainnya di Indonesia.</p>

                  <div className="space-y-2 mb-6">
                    {(['umum', 'umkm', 'freelance'] as const).map((space) => {
                      const forum = FORUMS_DATA[space];
                      const countThreads = forumThreads[space].length;
                      return (
                        <button
                          key={space}
                          onClick={() => {
                            setActiveForum(space);
                            setSelectedThreadId(null);
                          }}
                          className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all ${
                            activeForum === space 
                              ? 'bg-[#1A1814] text-white border-black shadow' 
                              : 'bg-[#FDFDFB] hover:bg-stone-50 border-stone-200'
                          }`}
                        >
                          <div>
                            <span className={`text-[9px] uppercase tracking-widest font-sans font-bold ${activeForum === space ? 'text-[#E8D5A8]' : 'text-[#C8A96E]'}`}>
                              {forum.tag}
                            </span>
                            <h4 className="font-serif text-base font-semibold mt-0.5">{forum.name}</h4>
                            <p className={`text-[11px] mt-1 line-clamp-1 font-sans ${activeForum === space ? 'text-stone-300' : 'text-stone-500'}`}>
                              {forum.description}
                            </p>
                          </div>
                          <span className={`text-xs ml-3 font-mono border rounded px-2 py-0.5 ${activeForum === space ? 'bg-white/10 border-white/20' : 'bg-stone-100 border-stone-200'}`}>
                            {countThreads}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Form Create Thread */}
                  <form onSubmit={handleCreateThread} className="bg-[#F7F4EE]/55 border border-[#C8A96E]/20 p-4 rounded-xl">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold block mb-2">BUAT DISKUSI BARU</span>
                    <div className="text-xs font-sans text-stone-500 mb-2">
                       Akan diterbitkan di: <span className="font-bold text-[#1A1814] uppercase">{activeForum}</span>
                    </div>
                    <textarea
                      placeholder="Apa yang ingin Anda tanyakan atau bagikan hari ini?"
                      value={newThreadTitle}
                      onChange={(e) => setNewThreadTitle(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-[#1A1814]/15 rounded-md p-2.5 text-xs focus:outline-none focus:border-[#C8A96E] font-sans resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full mt-3 bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-[11px] uppercase tracking-wider font-bold py-2.5 rounded transition-all flex items-center justify-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Terbitkan Diskusi
                    </button>
                  </form>
                </div>

                {/* Right side list of threads */}
                <div className="lg:col-span-7">
                  {selectedThreadId ? (
                    /* Thread Detail View */
                    <div className="animate-fade-up">
                      <button 
                        onClick={() => setSelectedThreadId(null)}
                        className="text-xs text-[#C8A96E] font-bold mb-4 hover:underline flex items-center gap-1"
                      >
                        ← Kembali ke Daftar Diskusi
                      </button>

                      {(() => {
                        const allThreads = [...forumThreads.umum, ...forumThreads.umkm, ...forumThreads.freelance];
                        const thread = allThreads.find(t => t.id === selectedThreadId);
                        if (!thread) return <p>Diskusi tidak ditemukan.</p>;
                        
                        const replies = activeThreadReplies[selectedThreadId] || [];

                        return (
                          <div className="space-y-4">
                            <div className="bg-[#F7F4EE]/40 border border-[#C8A96E]/25 rounded-xl p-5">
                              <div className="flex gap-3 mb-3">
                                <span className="w-10 h-10 rounded-full bg-[#1A1814] text-[#E8D5A8] flex items-center justify-center text-xs font-bold leading-none">
                                  {thread.avatarInitials}
                                </span>
                                <div>
                                  <div className="text-xs font-bold text-[#1A1814]">{thread.author}</div>
                                  <div className="text-[10px] text-stone-400 font-sans mt-0.5">{thread.time} • di {thread.category.toUpperCase()}</div>
                                </div>
                              </div>
                              <h4 className="font-serif text-lg text-[#1A1814] leading-snug">{thread.title}</h4>
                            </div>

                            {/* Replies List */}
                            <div className="space-y-3">
                              <h5 className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold">Komentar Tanggapan ({replies.length})</h5>
                              {replies.length > 0 ? (
                                replies.map((reply, index) => (
                                  <div key={index} className="bg-stone-50 border border-stone-200/55 rounded-xl p-4 ml-6">
                                    <div className="text-xs font-semibold text-[#1A1814] flex justify-between items-center">
                                      <span>{reply.author}</span>
                                      <span className="text-[9px] text-stone-400 font-sans">{reply.time}</span>
                                    </div>
                                    <p className="text-xs text-stone-650 font-sans mt-1.5 leading-relaxed">{reply.text}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-stone-450 italic ml-6">Belum ada tanggapan. Jadilah yang pertama berkomentar!</p>
                              )}
                            </div>

                            {/* Reply Input Form */}
                            <form onSubmit={handleAddReply} className="pt-3 border-t border-[#1A1814]/5 space-y-2">
                              <span className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold block">TULIS JAWABAN ANDA</span>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Ketik balasan saran profesional Anda..."
                                  value={newReplyText}
                                  onChange={(e) => setNewReplyText(e.target.value)}
                                  className="flex-1 bg-stone-50 border border-[#1A1814]/15 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C8A96E] font-sans"
                                  required
                                />
                                <button
                                  type="submit"
                                  className="bg-[#1A1814] text-white hover:bg-[#C8A96E] hover:text-[#1A1814] px-4 rounded-lg text-xs font-bold font-sans transition-colors shrink-0"
                                >
                                  Kirim
                                </button>
                              </div>
                            </form>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* Thread List View */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2 mb-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#8A8578] font-bold">DISKUSI AKTIF ({FORUMS_DATA[activeForum].name})</span>
                        <span className="text-[10px] text-stone-400 font-sans">Klik judul untuk membalas diskusi</span>
                      </div>

                      <div className="space-y-3" id="forum-threads-sandbox">
                        {forumThreads[activeForum].map((thread) => (
                          <div 
                            key={thread.id} 
                            className="p-4 rounded-xl border border-stone-150 bg-[#FDFDFB] hover:border-[#C8A96E] transition-all flex gap-3.5 items-start cursor-pointer hover:shadow-xs"
                            onClick={() => setSelectedThreadId(thread.id)}
                          >
                            <span className="w-9 h-9 rounded-full bg-[#C8A96E]/20 text-[#8A6D3B] flex items-center justify-center text-xs font-bold mt-0.5 font-sans leading-none shrink-0">
                              {thread.avatarInitials}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm md:text-base font-semibold leading-snug text-[#1A1814] group-hover:text-[#C8A96E] transition-colors hover:underline">
                                {thread.title}
                              </h4>
                              <div className="flex items-center gap-3 text-[10px] text-stone-450 font-sans mt-2">
                                <span className="font-bold text-[#3D3A33]">{thread.author}</span>
                                <span>•</span>
                                <span>{thread.time}</span>
                              </div>
                            </div>

                            {/* Likes and Replies Count Buttons */}
                            <div className="flex items-center gap-2.5 self-center shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleLikeThread(thread.id, activeForum)}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-sans font-bold transition-colors ${
                                  likedThreads.includes(thread.id)
                                    ? 'bg-[#F5EDD8] text-[#8A6D3B] border-brand-gold'
                                    : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" /> {thread.likes}
                              </button>
                              <button
                                onClick={() => setSelectedThreadId(thread.id)}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-stone-200 text-stone-500 hover:bg-stone-50 text-[10px] font-sans font-medium"
                              >
                                <MessageSquare className="w-3 h-3" /> {thread.replies}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 3. KANBAN PROJECTS WORKBENCH */}
            {activeTab === 'projects' && (
              <div className="p-6 md:p-8">
                
                <div className="flex flex-col md:flex-row justify-between bg-[#F7F4EE]/50 border-b border-dashed border-[#C8A96E]/20 pb-6 mb-8 gap-4 items-start md:items-center">
                  <div>
                    <h3 className="text-lg font-serif">Papan Manajemen Pekerjaan</h3>
                    <p className="text-xs text-stone-500 font-sans">Organisasikan penawaran, revisi pengerjaan digital, sertifikasi produk secara visual sederhana.</p>
                  </div>
                  {/* Create task inline form */}
                  <form onSubmit={handleAddTask} className="flex gap-2 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Tugas baru (contoh: Pengepakan Keripik)..."
                      value={new_task_title}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="border border-[#1A1814]/15 rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#C8A96E] font-sans bg-white"
                      required
                    />
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="border border-[#1A1814]/15 rounded-md px-2 py-2 text-xs focus:outline-none focus:border-[#C8A96E] font-sans bg-white"
                    >
                      <option value="Tinggi">Tinggi</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Rendah">Rendah</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-[#1A1814] text-white hover:bg-[#C8A96E] hover:text-[#1A1814] text-xs font-bold px-4 rounded-md font-sans transition-all shrink-0 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah
                    </button>
                  </form>
                </div>

                {/* 3 Kanban Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Column 1: Rencana */}
                  <div className="bg-[#F7F4EE]/65 rounded-xl border border-stone-200/60 p-4">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
                      <span className="text-xs uppercase tracking-wider text-[#8A8578] font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-stone-400" /> Rencana Klien ({projectTasks.filter(t => t.stage === 'Rencana').length})
                      </span>
                    </div>
                    
                    <div className="space-y-3 font-sans">
                      {projectTasks.filter(t => t.stage === 'Rencana').map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-lg border border-stone-200/55 shadow-xs space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-semibold text-[#1A1814] leading-snug">{task.title}</h4>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              task.priority === 'Tinggi' ? 'bg-red-50 text-red-650 border border-red-100' : 'bg-stone-100 text-stone-600'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-stone-400">Exp: {task.deadline}</span>
                          </div>

                          <div className="border-t border-dashed border-stone-100 pt-2.5 flex justify-end">
                            <button
                              onClick={() => handleMoveTask(task.id, 'forward')}
                              className="text-[10px] text-[#C8A96E] hover:text-[#1A1814] font-bold uppercase tracking-wider flex items-center gap-0.5"
                            >
                              Kerjakan <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {projectTasks.filter(t => t.stage === 'Rencana').length === 0 && (
                        <div className="text-center py-6 text-stone-400 text-xs italic">Tidak ada agenda kerja.</div>
                      )}
                    </div>
                  </div>

                  {/* Column 2: Berjalan */}
                  <div className="bg-[#E8D5A8]/10 rounded-xl border border-[#C8A96E]/20 p-4">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C8A96E]/20">
                      <span className="text-xs uppercase tracking-wider text-[#8A6D3B] font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#C8A96E] animate-pulse" /> Proses Pengerjaan ({projectTasks.filter(t => t.stage === 'Berjalan').length})
                      </span>
                    </div>

                    <div className="space-y-3 font-sans">
                      {projectTasks.filter(t => t.stage === 'Berjalan').map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-lg border border-[#C8A96E]/15 shadow-xs space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-semibold text-[#1A1814] leading-snug">{task.title}</h4>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-stone-400">Exp: {task.deadline}</span>
                          </div>

                          <div className="border-t border-dashed border-stone-100 pt-2.5 flex justify-between">
                            <button
                              onClick={() => handleMoveTask(task.id, 'backward')}
                              className="text-[10px] text-stone-400 hover:text-stone-700 font-medium uppercase tracking-wider"
                            >
                              ← Simpan
                            </button>
                            <button
                              onClick={() => handleMoveTask(task.id, 'forward')}
                              className="text-[10px] text-green-700 hover:text-green-900 font-bold uppercase tracking-wider flex items-center"
                            >
                              Selesaikan <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {projectTasks.filter(t => t.stage === 'Berjalan').length === 0 && (
                        <div className="text-center py-6 text-stone-400 text-xs italic">Belum ada tugas berjalan.</div>
                      )}
                    </div>
                  </div>

                  {/* Column 3: Selesai */}
                  <div className="bg-emerald-50/15 rounded-xl border border-emerald-500/15 p-4">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-100">
                      <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Selesai & Diserahkan ({projectTasks.filter(t => t.stage === 'Selesai').length})
                      </span>
                    </div>

                    <div className="space-y-3 font-sans">
                      {projectTasks.filter(t => t.stage === 'Selesai').map(task => (
                        <div key={task.id} className="bg-white/80 p-4 rounded-lg border border-emerald-100/60 shadow-xs space-y-3 line-through text-stone-400">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-semibold leading-snug">{task.title}</h4>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-stone-400">
                            <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-400 uppercase tracking-wild line-through">
                              {task.priority}
                            </span>
                            <span className="text-[10px]">Tuntas</span>
                          </div>

                          <div className="border-t border-dashed border-stone-100 pt-2.5 flex justify-start">
                            <button
                              onClick={() => handleMoveTask(task.id, 'backward')}
                              className="text-[10px] text-[#C8A96E] hover:text-[#1A1814] font-bold uppercase tracking-wider"
                            >
                              ← Kembalikan Proses
                            </button>
                          </div>
                        </div>
                      ))}
                      {projectTasks.filter(t => t.stage === 'Selesai').length === 0 && (
                        <div className="text-center py-6 text-stone-400 text-xs italic">Belum ada penyerahan tugas tuntas.</div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 4. INVOICE ASSISTANT WORKBENCH */}
            {activeTab === 'invoice' && (
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form parameters */}
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#C8A96E]/15 pb-6 lg:pb-0 lg:pr-6 space-y-4 font-sans text-xs">
                  <h3 className="text-lg font-serif mb-1">Informasi Pembuat Invoice</h3>
                  <p className="text-xs text-stone-500 font-sans mb-4">Ubah detail di bawah ini, kalkulator lembar faktur akan ikut ter-update instan.</p>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Klien Penerima (Nama Perusahaan):</label>
                    <input
                      type="text"
                      value={invoiceClient}
                      onChange={(e) => setInvoiceClient(e.target.value)}
                      onBlur={() => syncInvoiceWithServer({ client: invoiceClient })}
                      className="w-full bg-stone-50 border border-stone-200 rounded p-2.5"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Penjelasan Pekerjaan Utama:</label>
                    <input
                      type="text"
                      value={invoiceProject}
                      onChange={(e) => setInvoiceProject(e.target.value)}
                      onBlur={() => syncInvoiceWithServer({ project: invoiceProject })}
                      className="w-full bg-stone-50 border border-stone-200 rounded p-2.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700">No. Invoice:</label>
                      <input
                        type="text"
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        onBlur={() => syncInvoiceWithServer({ no: invoiceNo })}
                        className="w-full bg-stone-50 border border-stone-200 rounded p-2.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700">Aktifkan PPN 11%? :</label>
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="taxChecked"
                          checked={invoicePPN}
                          onChange={(e) => {
                            setInvoicePPN(e.target.checked);
                            syncInvoiceWithServer({ ppn: e.target.checked });
                          }}
                          className="w-4 h-4 text-[#C8A96E] border-stone-300 rounded focus:ring-[#C8A96E]"
                        />
                        <label htmlFor="taxChecked" className="font-medium text-[#1A1814] select-none">Ya, kenakan Pajak</label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700">Tanggal Terbit:</label>
                      <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        onBlur={() => syncInvoiceWithServer({ date: invoiceDate })}
                        className="w-full bg-stone-50 border border-stone-200 rounded p-2.5"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-700">Tempo Pembayaran:</label>
                      <input
                        type="date"
                        value={invoiceDue}
                        onChange={(e) => setInvoiceDue(e.target.value)}
                        onBlur={() => syncInvoiceWithServer({ due: invoiceDue })}
                        className="w-full bg-stone-50 border border-stone-200 rounded p-2.5"
                      />
                    </div>
                  </div>

                  {/* Add Invoice Item list table parameters */}
                  <form onSubmit={handleAddInvoiceItem} className="border-t border-dashed border-[#C8A96E]/20 pt-4 space-y-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold block mb-1">TAMBAH LAYANAN JASA / BARANG</span>
                    
                    <div className="space-y-1">
                      <label className="text-[11px] text-stone-600">Keterangan Detail:</label>
                      <input
                        type="text"
                        placeholder="Contoh: Revisi Pengepakan Batch 2"
                        value={newInvoiceDesc}
                        onChange={(e) => setNewInvoiceDesc(e.target.value)}
                        className="w-full bg-white border border-[#1A1814]/15 rounded p-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 space-y-1">
                        <label className="text-[11px] text-stone-600">Jumlah Qty:</label>
                        <input
                          type="number"
                          value={newInvoiceQty}
                          min={1}
                          onChange={(e) => setNewInvoiceQty(parseInt(e.target.value) || 1)}
                          className="w-full bg-white border border-[#1A1814]/15 rounded p-2"
                        />
                      </div>
                      <div className="col-span-8 space-y-1">
                        <label className="text-[11px] text-stone-600">Harga Satuan (Rp):</label>
                        <input
                          type="number"
                          value={newInvoicePrice}
                          min={0}
                          onChange={(e) => setNewInvoicePrice(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-[#1A1814]/15 rounded p-2"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-[10px] font-sans font-bold uppercase tracking-wider py-2.5 rounded transition-all flex items-center justify-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Tambahkan ke Pembukuan
                    </button>
                  </form>

                </div>

                {/* Right side live rendering invoice preview sheet */}
                <div className="lg:col-span-7 font-sans">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#8A8578] font-bold">LIVE PREVIEW LEMBAR INVOICE</span>
                    <button 
                      onClick={() => {
                        window.print();
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#1A1814] text-white hover:bg-[#C8A96E] hover:text-[#1A1814] text-[11px] uppercase tracking-wider font-bold py-1.5 px-3 rounded transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> Cetak / Ekspor PDF
                    </button>
                  </div>

                  {/* Standard high-fidelity premium visual sheet */}
                  <div className="border border-[#C8A96E]/20 bg-[#FDFDFB] p-6 rounded-xl relative shadow overflow-auto" id="printable-area-card">
                    {/* Tiny gold header strip */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#C8A96E]" />
                    
                    <div className="flex justify-between items-start mb-8 pb-4 border-b border-stone-150 gap-4">
                      <div>
                        {/* Self logo info */}
                        <div className="font-serif text-xl tracking-tight font-bold text-[#1A1814]">
                          <span className="text-[#C8A96E] font-sans font-black tracking-wider text-[15px] bg-[#1A1814] px-1.5 py-0.2 rounded mr-1">NXS</span>
                          <span>{user ? user.brand : 'STUDIO MITRA DIGITAL'}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1">E-Commerce & Branding Terintegrasi • Yogyakarta</p>
                        <p className="text-[10px] text-stone-400">Penerbit: {user ? user.name : 'Rara Dewanti (NEXUS Partner)'}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-serif tracking-widest text-[#C8A96E] font-semibold block">FAKTUR TAGIHAN</span>
                        <span className="text-xs font-mono font-bold text-stone-700 block mt-1">{invoiceNo}</span>
                      </div>
                    </div>

                    {/* Metadata grids */}
                    <div className="grid grid-cols-2 gap-6 text-[11px] mb-6 font-sans">
                      <div>
                        <span className="text-stone-400 block font-semibold uppercase text-[9px] tracking-wider mb-1">DIBAYARKAN KEPADA:</span>
                        <strong className="text-stone-800 block text-xs">{invoiceClient}</strong>
                        <span className="text-stone-500 block mt-0.5">Klien Resmi - Proyek Kreatif Nusantara</span>
                      </div>
                      <div className="text-right">
                        <div className="mb-2">
                          <span className="text-stone-400 text-[9px] block uppercase font-semibold tracking-wider">TANGGAL PENERBITAN</span>
                          <span className="text-stone-700 font-medium">{invoiceDate}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[9px] block uppercase font-semibold tracking-wider">BATAS JATUH TEMPO</span>
                          <span className="text-amber-800 font-bold">{invoiceDue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-stone-100 rounded-lg overflow-hidden mb-6 text-xs font-sans">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-stone-50 text-stone-650 font-bold border-b border-stone-100 text-[10px] uppercase tracking-wider">
                            <th className="p-3">Uraian Pekerjaan / Layanan</th>
                            <th className="p-3 text-center w-16">Qty</th>
                            <th className="p-3 text-right">Harga Satuan</th>
                            <th className="p-3 text-right">Total Biaya</th>
                            <th className="p-3 text-center w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceItems.map((item) => (
                            <tr key={item.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 text-[11px]">
                              <td className="p-3 font-medium text-stone-800">{item.description}</td>
                              <td className="p-3 text-center text-stone-650">{item.qty}</td>
                              <td className="p-3 text-right text-stone-650">{formatIDR(item.price)}</td>
                              <td className="p-3 text-right font-semibold text-stone-800">{formatIDR(item.qty * item.price)}</td>
                              <td className="p-3 text-center">
                                <button 
                                  onClick={() => handleSubInvoiceItem(item.id)} 
                                  className="text-stone-300 hover:text-red-500 transition-colors"
                                  title="Hapus baris"
                                >
                                  ×
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Financial summary breakdown list */}
                    <div className="max-w-xs ml-auto text-xs font-sans space-y-2 border-t border-[#C8A96E]/20 pt-4 text-stone-700">
                      <div className="flex justify-between">
                        <span>Subtotal Jasa</span>
                        <span className="font-medium">{formatIDR(invoiceSubtotal)}</span>
                      </div>
                      {invoicePPN && (
                        <div className="flex justify-between items-center text-stone-500">
                          <span className="flex items-center gap-1.5"><Percent className="w-3.5 h-3.5" /> PPN Pajak Ekspor (11%)</span>
                          <span>{formatIDR(invoiceTax)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-serif font-semibold border-t border-dashed border-stone-200 pt-2 text-[#1A1814]">
                        <span>Grand Total Tagihan</span>
                        <span className="text-[#C8A96E]">{formatIDR(invoiceGrandTotal)}</span>
                      </div>
                    </div>

                    <div className="border-t border-stone-150 mt-8 pt-4 text-[10px] text-stone-400 font-sans text-center">
                      Terbit secara otomatis menggunakan sistem <strong className="text-stone-500 font-bold uppercase tracking-wider">NEXUS FAKTUR TAGIHAN PRO</strong>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 5. DASHBOARD WORKBENCH */}
            {activeTab === 'dashboard' && (
              <div className="p-6 md:p-8">
                
                {/* Dashboard Banner Option Toggle */}
                <div className="bg-[#F7F4EE]/50 border-b border-[#C8A96E]/15 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-serif">Selamat datang di Nexus Dashboard</h3>
                    <p className="text-xs text-stone-500 font-sans">Pratinjau grafik penjualan produk kreatif dan pengelolaan ketaatan klien Anda.</p>
                  </div>
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500">SISTEM INTEGRASI AKTIF</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 font-sans">
                  {/* Stat Card 1 */}
                  <div className="bg-white border border-[#C8A96E]/25 p-5 rounded-xl shadow-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold block mb-1">TOTAL PENDAPATAN BULANAN</span>
                    <h4 className="text-2xl font-serif font-light text-[#1A1814] mt-0.5">Rp 12.850.000</h4>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block mt-3 font-semibold">
                      ↑ 18.5% dibandingkan bulan lalu
                    </span>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="bg-white border border-[#C8A96E]/25 p-5 rounded-xl shadow-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold block mb-1">PROGRES PEKERJAAN AKTIF</span>
                    <h4 className="text-2xl font-serif font-light text-[#1A1814] mt-0.5">3 Proyek Aktif</h4>
                    <div className="w-full bg-[#F2EDE4] h-2.5 rounded-full mt-4 overflow-hidden">
                      <div className="bg-[#C8A96E] h-2.5 rounded-full" style={{ width: '66%' }} />
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="bg-white border border-[#C8A96E]/25 p-5 rounded-xl shadow-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8578] font-bold block mb-1">POPULARITAS PORTFOLIO</span>
                    <h4 className="text-2xl font-serif font-light text-[#1A1814] mt-0.5">142 Pengunjung</h4>
                    <span className="text-[10px] text-sky-700 bg-sky-50 px-2.5 py-1 rounded inline-block mt-3 font-semibold">
                      5 Calon Klien mengklik profil Anda
                    </span>
                  </div>
                </div>

                {/* Simulated Chart Container */}
                <div className="border border-stone-200 rounded-xl p-5 bg-[#FDFDFB]">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1814] uppercase tracking-wider">Grafik Pertumbuhan Keuangan Bisnis Anda (2026)</h4>
                      <p className="text-[11px] text-stone-400">Menampilkan pendapatan kotor dari penyerahan proyek digital dan pengerajin lokal.</p>
                    </div>
                    <select className="border border-stone-200 rounded px-2.5 py-1 text-[11px] font-sans">
                      <option>Filter 6 Bulan Terakhir</option>
                      <option>Tahun Buku 2026</option>
                    </select>
                  </div>

                  {/* Custom SVG/CSS Bar Chart Grid */}
                  <div className="h-64 flex items-end justify-between gap-4 font-sans text-stone-400 text-xs border-b border-dashed border-stone-200 pb-3">
                    
                    {/* Bar Jan */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-bold text-stone-700">Rp 4.5M</div>
                      <div className="bg-stone-300 w-full hover:bg-[#C8A96E] transition-all rounded-t" style={{ height: '35%' }} />
                      <span className="text-[10px] font-medium tracking-wide">Jan</span>
                    </div>

                    {/* Bar Feb */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-bold text-stone-700">Rp 6.2M</div>
                      <div className="bg-stone-300 w-full hover:bg-[#C8A96E] transition-all rounded-t" style={{ height: '48%' }} />
                      <span className="text-[10px] font-medium tracking-wide">Feb</span>
                    </div>

                    {/* Bar Mar */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-bold text-stone-700">Rp 8.0M</div>
                      <div className="bg-stone-300 w-full hover:bg-[#C8A96E] transition-all rounded-t" style={{ height: '62%' }} />
                      <span className="text-[10px] font-medium tracking-wide">Mar</span>
                    </div>

                    {/* Bar Apr */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-bold text-stone-700">Rp 11.2M</div>
                      <div className="bg-stone-300 w-full hover:bg-[#C8A96E] transition-all rounded-t" style={{ height: '85%' }} />
                      <span className="text-[10px] font-medium tracking-wide">Apr</span>
                    </div>

                    {/* Bar May */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-bold text-[#C8A96E]">Rp 12.8M</div>
                      <div className="bg-[#C8A96E]/80 w-full hover:bg-[#C8A96E] transition-all rounded-t animate-pulse-slow" style={{ height: '98%' }} />
                      <span className="text-[10px] font-bold text-[#1A1814]">Mei</span>
                    </div>

                    {/* Bar Jun */}
                    <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end opacity-50">
                      <div className="text-[10px] font-bold text-stone-400">Rp 0</div>
                      <div className="bg-stone-200 w-full rounded-t" style={{ height: '5%' }} />
                      <span className="text-[10px] font-medium tracking-wide">Jun</span>
                    </div>

                  </div>
                </div>

                {/* Riwayat Hubungi Talent Panel (LocalStorage Saved) */}
                <div className="border border-stone-200 rounded-xl p-5 bg-white mt-6 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1814] uppercase tracking-wider">Riwayat Kontak Penawaran Kerja (Mencari Talent)</h4>
                      <p className="text-[11px] text-stone-400">Draf penawaran yang telah Anda kirimkan ke Talent. Data tersimpan secara aman di LocalStorage perangkat Anda.</p>
                    </div>
                    <span className="text-[10px] bg-stone-100 text-[#1A1814] font-sans font-medium px-2 py-1 rounded border border-[#C8A96E]/20">
                      Total: {sentInboundOffers.length} Terkirim
                    </span>
                  </div>

                  {sentInboundOffers.length > 0 ? (
                    <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                      {sentInboundOffers.map((offer) => (
                        <div key={offer.id} className="p-3.5 bg-stone-50 hover:bg-[#F7F4EE]/50 border border-stone-200 rounded-lg flex flex-col justify-between md:flex-row md:items-start gap-4 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="text-xs font-serif font-bold text-[#1A1814]">Ke: {offer.receiver}</span>
                              <span className="text-[9px] uppercase font-sans px-2 py-0.5 rounded bg-amber-50 text-[#8A6D3B] font-bold border border-amber-150">
                                {offer.channel}
                              </span>
                              <span className="text-[10px] text-stone-400 ml-auto font-mono">{offer.date}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 font-sans italic line-clamp-2">"{offer.message}"</p>
                          </div>
                          
                          <div className="flex gap-2 self-end shrink-0">
                            {offer.channel === 'WhatsApp' && (
                              <a 
                                href={`https://wa.me/?text=${encodeURIComponent(offer.message)}`}
                                target="_blank"
                                rel="noreferrer referrer"
                                className="text-[10px] bg-[#1A1814] hover:bg-[#C8A96E] text-white hover:text-black font-bold py-1 px-2.5 rounded transition-all"
                              >
                                Buka WA
                              </a>
                            )}
                            {offer.channel === 'Email' && (
                              <a 
                                href={`mailto:?subject=${encodeURIComponent('NEXUS Penawaran Proyek')}&body=${encodeURIComponent(offer.message)}`}
                                target="_blank"
                                rel="noreferrer referrer"
                                className="text-[10px] bg-[#8A6D3B] hover:bg-amber-800 text-white font-bold py-1 px-2.5 rounded transition-all"
                              >
                                Tulis Email
                              </a>
                            )}
                            <button
                              onClick={() => {
                                if (confirm("Apakah Anda yakin ingin menghapus catatan riwayat kontak ini?")) {
                                  setSentInboundOffers(sentInboundOffers.filter(o => o.id !== offer.id));
                                }
                              }}
                              className="text-[10px] bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-1 px-2 rounded transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-[#FDFDFB] rounded border border-dashed border-stone-200">
                      <p className="text-stone-400 text-xs font-sans">Belum ada riwayat kontak penawaran kerja yang terkirim.</p>
                      <button 
                        onClick={() => setActiveTab('directory')}
                        className="text-[11px] text-[#C8A96E] hover:underline font-bold mt-2"
                      >
                        Buka Katalog & Hubungi Talent Sekarang
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
              </>
            )}

          </div>

        </div>
      </section>

      {/* FORUM PREVIEW - "Ruang Diskusi Terpisah" */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="forum-preview-section">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#C8A96E] font-semibold block mb-2">KOMUNITAS YANG RELEVAN</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1814] font-normal leading-tight">Forum yang Berbicara Bahasamu</h2>
          <p className="text-[14px] text-[#3D3A33] mt-3 font-sans leading-relaxed">
            NEXUS mengerti bahwa UMKM dan Freelancer memiliki tantangan yang berbeda. Kami pisahkan ruang diskusi secara disiplin agar percakapan lebih terfokus dan sarat edukasi bermanfaat.
          </p>
        </div>

        {/* 3 Forum Category Vertical Stack/Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Forum Umum */}
          <div className="bg-white border border-[#C8A96E]/20 p-7.5 rounded-2xl shadow-sm flex flex-col justify-between h-full hover:border-[#1A1814] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-[#F5EDD8] text-[#8A6D3B] text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 rounded">
                  SEMUA ORANG
                </span>
                <span className="text-[11px] text-[#8A8578] font-mono">Forum Beranda</span>
              </div>
              
              <h3 className="text-2xl font-serif font-light text-[#1A1814] mb-3">Forum Umum</h3>
              <p className="text-xs text-[#3D3A33] leading-relaxed mb-6 font-sans">
                Ruang silaturahmi bebas, tips pengembangan bisnis, inspirasi, pengumuman agenda kopdar bulanan, serta kolaborasi lintas sektoral.
              </p>

              {/* Two dummy thread previews */}
              <div className="space-y-3 mb-6 font-sans">
                <div className="p-3 bg-[#F7F4EE]/50 rounded-lg text-xs hover:bg-[#F2EDE4] transition-colors cursor-pointer" onClick={() => openSandboxTab('forum')}>
                  <p className="font-semibold text-stone-800 line-clamp-1">Tips Mengatur Cash Flow Pemula Bisnis...</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">Oleh Devi A. • 18 komentar</span>
                </div>
                <div className="p-3 bg-[#F7F4EE]/50 rounded-lg text-xs hover:bg-[#F2EDE4] transition-colors cursor-pointer" onClick={() => openSandboxTab('forum')}>
                  <p className="font-semibold text-stone-800 line-clamp-1">Pentingnya Punya Website Portofolio Mandiri...</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">Oleh Rian P. • 24 komentar</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setActiveForum('umum');
                openSandboxTab('forum');
              }}
              className="w-full bg-[#1A1814] text-white hover:bg-[#C8A96E] hover:text-[#1A1814] text-xs font-bold font-sans py-3 rounded-lg text-center tracking-wider transition-colors"
            >
              Masuk Forum Umum →
            </button>
          </div>

          {/* Card 2: Forum UMKM */}
          <div className="bg-white border border-[#C8A96E]/20 p-7.5 rounded-2xl shadow-sm flex flex-col justify-between h-full hover:border-[#1A1814] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-[#F5EDD8] text-[#8A6D3B] text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 rounded">
                  USAHA & PRODUK
                </span>
                <span className="text-[11px] text-[#8A8578] font-mono">Usaha Kerajinan</span>
              </div>

              <h3 className="text-2xl font-serif font-light text-[#1A1814] mb-3">Forum UMKM</h3>
              <p className="text-xs text-[#3D3A33] leading-relaxed mb-6 font-sans">
                Strategi perizinan legalitas usaha, kepatuhan SNI/Sertifikasi Halal, optimalisasi packaging, penyaluran modal perbankan, dan distribusi grosir luar kota.
              </p>

              {/* Two dummy thread previews */}
              <div className="space-y-3 mb-6 font-sans">
                <div className="p-3 bg-[#F7F4EE]/50 rounded-lg text-xs hover:bg-[#F2EDE4] transition-colors cursor-pointer" onClick={() => openSandboxTab('forum')}>
                  <p className="font-semibold text-stone-800 line-clamp-1">Cara Urus Sertifikasi Halal Gratis (SEHATI)...</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">Oleh H. Syarifudin • 45 komentar</span>
                </div>
                <div className="p-3 bg-[#F7F4EE]/50 rounded-lg text-xs hover:bg-[#F2EDE4] transition-colors cursor-pointer" onClick={() => openSandboxTab('forum')}>
                  <p className="font-semibold text-stone-800 line-clamp-1">Rekomendasi Jasa Ekspedisi Murah Kerajinan Wood...</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">Oleh Budi S. • 12 komentar</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setActiveForum('umkm');
                openSandboxTab('forum');
              }}
              className="w-full bg-[#1A1814] text-white hover:bg-[#C8A96E] hover:text-[#1A1814] text-xs font-bold font-sans py-3 rounded-lg text-center tracking-wider transition-colors"
            >
              Masuk Forum UMKM →
            </button>
          </div>

          {/* Card 3: Forum Freelancer */}
          <div className="bg-white border border-[#C8A96E]/20 p-7.5 rounded-2xl shadow-sm flex flex-col justify-between h-full hover:border-[#1A1814] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-[#F5EDD8] text-[#8A6D3B] text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 rounded">
                  JASA & DIGITAL
                </span>
                <span className="text-[11px] text-[#8A8578] font-mono">Freelance Tech</span>
              </div>

              <h3 className="text-2xl font-serif font-light text-[#1A1814] mb-3">Forum Freelancer</h3>
              <p className="text-xs text-[#3D3A33] leading-relaxed mb-6 font-sans">
                Penyusunan minimal rate card jasa kreatif, trik memenangkan kontrak kerja luar negeri, perlindungan hukum draf kontrak, dan menghadapi klien abal-abal.
              </p>

              {/* Two dummy thread previews */}
              <div className="space-y-3 mb-6 font-sans">
                <div className="p-3 bg-[#F7F4EE]/50 rounded-lg text-xs hover:bg-[#F2EDE4] transition-colors cursor-pointer" onClick={() => openSandboxTab('forum')}>
                  <p className="font-semibold text-stone-800 line-clamp-1">Berapa Rate Card Standar Desainer Pemula?...</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">Oleh Rara Dewanti • 57 komentar</span>
                </div>
                <div className="p-3 bg-[#F7F4EE]/50 rounded-lg text-xs hover:bg-[#F2EDE4] transition-colors cursor-pointer" onClick={() => openSandboxTab('forum')}>
                  <p className="font-semibold text-stone-800 line-clamp-1">Panduan Bikin Kontrak Kerja Freelance Kokoh...</p>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">Oleh Adit N. • 41 komentar</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setActiveForum('freelance');
                openSandboxTab('forum');
              }}
              className="w-full bg-[#1A1814] text-white hover:bg-[#C8A96E] hover:text-[#1A1814] text-xs font-bold font-sans py-3 rounded-lg text-center tracking-wider transition-colors"
            >
              Masuk Forum Freelancer →
            </button>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="cara-kerja" className="py-28 bg-[#FAF8F5] relative z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end justify-between mb-20">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96E] font-bold block mb-3">TAHAPAN PROSES</span>
              <h2 className="text-3xl sm:text-4.5xl font-serif text-[#1A1814] font-normal tracking-tight">Onboarding Instan, Sederhana, dan Praktis</h2>
            </div>
            <p className="text-sm text-stone-650 max-w-md font-sans leading-relaxed">
              Kami memangkas alur registrasi yang melelahkan. Dapatkan akun kerja aktif dalam sekejap tanpa memerlukan setup sistem atau integrasi kartu kredit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines on desktop */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-stone-200/80 -translate-y-6 z-0" />
            
            {/* Step 1 */}
            <div className="bg-white border border-stone-200 p-8 rounded-2xl relative z-10 shadow-xs hover:border-[#C8A96E]/50 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-5xl font-extralight text-[#C8A96E] group-hover:scale-110 transition-transform duration-300 block">01</span>
                <span className="px-2.5 py-1 rounded bg-[#E8D5A8]/10 text-[#8A6D3B] text-[9px] font-bold tracking-widest uppercase">Langkah Pertama</span>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2.5">Daftar Akun Gratis</h3>
              <p className="text-[12.5px] text-stone-600 leading-relaxed font-sans">
                Buat identitas bisnis dalam 60 detik. Masukkan nama pribadi/institusi, detail keahlian, dan pasang preferensi kerja pilihan Anda tanpa denda komisi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-stone-200 p-8 rounded-2xl relative z-10 shadow-xs hover:border-[#C8A96E]/50 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-5xl font-extralight text-[#C8A96E] group-hover:scale-110 transition-transform duration-300 block">02</span>
                <span className="px-2.5 py-1 rounded bg-[#E8D5A8]/10 text-[#8A6D3B] text-[9px] font-bold tracking-widest uppercase">Langkah Kedua</span>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2.5">Bangun Portofolio & Jasa</h3>
              <p className="text-[12.5px] text-stone-600 leading-relaxed font-sans">
                Unggah penawaran kerja kreatif Anda atau etalase produk UMKM lokal, lalu segera gabung ke salah satu dari 3 sekat forum diskusi komunitas terpadu kami.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-stone-200 p-8 rounded-2xl relative z-10 shadow-xs hover:border-[#C8A96E]/50 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-5xl font-extralight text-[#C8A96E] group-hover:scale-110 transition-transform duration-300 block">03</span>
                <span className="px-2.5 py-1 rounded bg-[#E8D5A8]/10 text-[#8A6D3B] text-[9px] font-bold tracking-widest uppercase">Mulai Berkembang</span>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2.5">Terhubung & Cetak Invoice</h3>
              <p className="text-[12.5px] text-stone-600 leading-relaxed font-sans">
                Ditemukan klien regional, beralih kendali tugas di papan Kanban proyek, dan nikmati generator penagihan invoice otomatis aman siap kirim.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimoni" className="py-28 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96E] font-bold block mb-3">KISAH MITRA PILIHAN</span>
          <h2 className="text-3xl sm:text-4.5xl font-serif text-[#1A1814] font-normal leading-tight">Bukti Nyata Efisiensi NEXUS</h2>
          <p className="text-sm text-stone-700 mt-4 font-sans leading-relaxed">
            Menghubungkan ratusan agensi digital, perajin lokal, dan pekerja lepas mandiri dari berbagai pelosok Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div key={index} className="bg-white border border-stone-200/90 p-8 rounded-2xl shadow-xs flex flex-col justify-between h-full hover:shadow-xl hover:border-stone-300/80 transition-all duration-300 relative group">
              <div className="absolute top-6 right-8 text-stone-150 group-hover:text-[#C8A96E]/30 transition-colors pointer-events-none">
                <Quote className="w-8 h-8" />
              </div>
              <p className="text-stone-750 text-[13px] leading-relaxed font-sans italic relative pr-2">
                "{t.quote}"
              </p>
              
              <div className="flex gap-3.5 items-center mt-7 pt-6 border-t border-stone-100">
                <span className="w-10 h-10 rounded-full bg-[#1A1814] text-[#E8D5A8] flex items-center justify-center text-xs font-bold leading-none shrink-0 font-sans shadow-md border border-stone-950">
                  {t.avatarInitials}
                </span>
                <div>
                  <strong className="text-xs text-stone-900 block tracking-wide font-sans font-bold">{t.name}</strong>
                  <span className="text-[10px] text-[#C8A96E] font-sans font-medium mt-0.5 block leading-none tracking-wider uppercase">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULL-WIDTH CTA SECTION (DARK WOOD) */}
      <section className="bg-[#1A1814] text-white py-24 relative overflow-hidden">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-radial from-[#C8A96E]/12 to-transparent opacity-90 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8A96E04_1px,transparent_1px),linear-gradient(to_bottom,#C8A96E04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-7">
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#C8A96E] font-bold block bg-white/5 py-1 px-4.5 rounded-full w-fit mx-auto border border-white/10">MULAI SEKARANG</span>
          <h2 className="text-3.5xl sm:text-4.5xl md:text-5.5xl font-serif tracking-tight text-white font-normal leading-tight text-balance">
            Sudah Siap Membawa Bisnis Anda ke Level Berikutnya?
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F4EE]/75 max-w-lg mx-auto font-sans font-normal leading-relaxed text-balance">
            Daftar tanpa syarat apa pun hari ini dan nikmati platform kolaboratif visioner kebanggaan nusantara. 100% gratis, aman, dan tanpa potongan transaksi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4.5 justify-center items-center pt-4">
            <button 
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-[#C8A96E] hover:bg-[#E8D5A8] text-[#1A1814] text-xs font-sans font-extrabold uppercase tracking-widest py-4.5 px-10 rounded-xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 transition-all duration-300 w-full sm:w-auto"
            >
              Mulai Sekarang — Gratis
            </button>
            <a 
              href="#sandbox-tool"
              className="bg-transparent hover:bg-white/10 text-[#FDFCF9] border border-white/20 text-xs font-sans font-extrabold uppercase tracking-widest py-4.5 px-8.5 rounded-xl transition-all text-center w-full sm:w-auto hover:border-white/50"
            >
              Coba Simulator Platform
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EDE9E0] border-t border-[#C8A96E]/20 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1A1814]/10">
            
            {/* Logo description */}
            <div className="lg:col-span-4 space-y-4">
              <a href="#" className="flex items-center gap-2 font-sans text-sm tracking-[0.28em] font-black uppercase text-stone-900 group">
                <NexusLogo className="w-6 h-6 text-[#1A1814] transition-transform group-hover:rotate-12 duration-300" />
                <span className="text-stone-900 transition-colors group-hover:text-[#8A6D3B]">NEXUS</span>
              </a>
              <p className="text-xs text-stone-600 font-sans leading-relaxed max-w-sm">
                NEXUS adalah ruang tumbuh kolaborasi terpadu di Indonesia. Membantu pemilik UMKM produk lokal dan tenaga lepas digital berhimpun membangun kemitraan bernilai sejati.
              </p>
            </div>

            {/* Links columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-stone-600 font-sans">
              <div>
                <strong className="text-[#1A1814] block tracking-wider uppercase text-[10px] font-bold mb-4">Produk</strong>
                <ul className="space-y-2.5">
                  <li><a href="#fitur" className="hover:text-[#C8A96E] transition-colors">Fitur Unggulan</a></li>
                  <li><a href="#sandbox-tool" className="hover:text-[#C8A96E] transition-colors">Digital Simulator</a></li>
                  <li><a href="#forum-preview-section" className="hover:text-[#C8A96E] transition-colors">Forum Komunitas</a></li>
                  <li><a href="#testimoni" className="hover:text-[#C8A96E] transition-colors">Paket Layanan</a></li>
                </ul>
              </div>

              <div>
                <strong className="text-[#1A1814] block tracking-wider uppercase text-[10px] font-bold mb-4">Komunitas</strong>
                <ul className="space-y-2.5">
                  <li><a href="#forum-preview-section" className="hover:text-[#C8A96E] transition-colors">Diskusi Forum</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Blog & Opini</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Kisah Sukses UMKM</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Acara Bulanan</a></li>
                </ul>
              </div>

              <div>
                <strong className="text-[#1A1814] block tracking-wider uppercase text-[10px] font-bold mb-4">Perusahaan</strong>
                <ul className="space-y-2.5">
                  <li><a href="#cara-kerja" className="hover:text-[#C8A96E] transition-colors">Tentang NEXUS</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Karir Profesional</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Hubungan Media</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Kontak Studio</a></li>
                </ul>
              </div>

              <div>
                <strong className="text-[#1A1814] block tracking-wider uppercase text-[10px] font-bold mb-4">Bantuan</strong>
                <ul className="space-y-2.5">
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Pertanyaan FAQ</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Kebijakan Privasi</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Kebutuhan Syarat</a></li>
                  <li><a href="#" className="hover:text-[#C8A96E] transition-colors">Pusat Laporkan</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 font-sans mt-8 gap-4">
            <span>© 2026 NEXUS. Seluruh hak cipta dilindungi undang-undang. Dibuat dengan ❤ untuk kemajuan profesional Indonesia.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline hover:text-[#C8A96E]">Syarat Layanan</a>
              <span>•</span>
              <a href="#" className="hover:underline hover:text-[#C8A96E]">Kebijakan Privasi</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 🔮 SIGNUP MODAL DIALOG SIMULATION */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-[#1A1814]/70 backdrop-blur-xs flex items-center justify-center p-4 z-100 scroll-smooth">
          <div className="bg-[#F7F4EE] rounded-2xl border border-[#C8A96E]/30 p-6 md:p-8 max-w-md w-full relative shadow-2xl animate-fade-up font-sans text-xs">
            
            {/* Close button icon */}
            <button 
              onClick={() => setIsSignupModalOpen(false)} 
              className="absolute top-4 right-4 text-stone-400 hover:text-[#1A1814] p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[9px] uppercase tracking-widest text-[#C8A96E] font-bold block mb-1">BERGABUNG SEGERA</span>
              <h3 className="font-serif text-2.5xl font-light text-[#1A1814]">Daftar Akun NEXUS</h3>
              <p className="text-[11px] text-[#8A8578] mt-1 font-sans">Kurang dari 60 detik untuk membuka seluruh akses ke simulator dan fitur tepercaya.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Nama Lengkap Anda :</label>
                <input
                  type="text"
                  placeholder="Contoh: Rara Dewanti"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2.5"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Alamat Email Aktif:</label>
                <input
                  type="email"
                  placeholder="rara.dewanti@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2.5"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Jenis Keanggotaan Anda:</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setRegType('freelancer')}
                    className={`p-2.5 rounded border text-center transition-all ${
                      regType === 'freelancer' 
                        ? 'bg-[#1A1814] text-[#E8D5A8] border-[#C8A96E]' 
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    <strong>Freelancer Jasa</strong>
                    <span className="block text-[8px] mt-0.5 opacity-80">Desain, Kode, Tulisan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegType('umkm')}
                    className={`p-2.5 rounded border text-center transition-all ${
                      regType === 'umkm' 
                        ? 'bg-[#1A1814] text-[#E8D5A8] border-[#C8A96E]' 
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    <strong>Pemilik UMKM</strong>
                    <span className="block text-[8px] mt-0.5 opacity-80">Produk Barang, Kerajinan</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Nama Brand / Usaha Mandiri:</label>
                <input
                  type="text"
                  placeholder="Contoh: Studio Keripik Nusantara"
                  value={regBrand}
                  onChange={(e) => setRegBrand(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Spesialisasi / Deskripsi Singkat Bio:</label>
                <input
                  type="text"
                  placeholder="Contoh: Pembuat custom boks hampers kayu jati."
                  value={regBio}
                  onChange={(e) => setRegBio(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Lokasi Kota Tinggal:</label>
                <input
                  type="text"
                  value={regLocation}
                  onChange={(e) => setRegLocation(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Keahlian Spesifik (Pisah dengan koma):</label>
                <input
                  type="text"
                  placeholder="Contoh: UI/UX, Kayu Jati, SEO"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-xs font-sans font-bold uppercase tracking-wider py-4.5 rounded transition-all shadow-md mt-4"
              >
                Selesaikan Pendaftaran & Simulasikan Dashboard!
              </button>

            </form>
          </div>
        </div>
      )}

      {/* 🤝 QUICK CONTACT MODAL DIALOG */}
      {isContactModalOpen && selectedContactTalent && (
        <div className="fixed inset-0 bg-[#1A1814]/70 backdrop-blur-xs flex items-center justify-center p-4 z-100 scroll-smooth">
          <div className="bg-[#F7F4EE] rounded-2xl border border-[#C8A96E]/30 p-6 md:p-8 max-w-lg w-full relative shadow-2xl animate-fade-up font-sans text-xs">
            
            {/* Close button */}
            <button 
              onClick={() => setIsContactModalOpen(false)} 
              className="absolute top-4 right-4 text-stone-400 hover:text-[#1A1814] p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!contactModalSuccess ? (
              <div>
                <div className="text-center mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-[#C8A96E] font-bold block mb-1">HUBUNGI TALENT SEKARANG</span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1814]">Kirim Penawaran Kerja</h3>
                  <p className="text-[11px] text-[#8A8578] mt-1 font-sans">
                    Terhubung langsung secara profesional dengan talent terbaik pilihan Anda secara instan.
                  </p>
                </div>

                {/* Talent Summary Mini Card */}
                <div className="flex gap-3 items-center bg-white p-3.5 rounded-xl border border-stone-200/60 mb-5">
                  <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedContactTalent.bgGradient} flex items-center justify-center text-xs font-bold shrink-0 shadow-inner`}>
                    {selectedContactTalent.avatarInitials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-stone-900 truncate">{selectedContactTalent.name}</h4>
                    <p className="text-[10px] text-stone-500 truncate">{selectedContactTalent.role} • {selectedContactTalent.location}</p>
                  </div>
                  <span className="text-[10px] bg-stone-100 text-[#1A1814] px-2 py-0.5 rounded font-mono font-bold shrink-0">
                    {selectedContactTalent.rate}
                  </span>
                </div>

                {/* Choosing Channel */}
                <div className="space-y-1 mb-4">
                  <label className="font-semibold text-stone-700 block">Bagaimana Anda Ingin Menghubungi?:</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setContactChannel('NEXUS Chat')}
                      className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                        contactChannel === 'NEXUS Chat' 
                          ? 'bg-[#1A1814] text-[#E8D5A8] border-[#C8A96E]' 
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <strong className="text-[10px]">NEXUS Chatbox</strong>
                      <span className="block text-[8px] mt-0.5 opacity-80">(Simulasi Chat Terpadu)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactChannel('WhatsApp')}
                      className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                        contactChannel === 'WhatsApp' 
                          ? 'bg-[#1A1814] text-[#E8D5A8] border-[#C8A96E]' 
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <strong className="text-[10px]">WhatsApp Web</strong>
                      <span className="block text-[8px] mt-0.5 opacity-80">(Buka draf pesan di WA)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactChannel('Email')}
                      className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                        contactChannel === 'Email' 
                          ? 'bg-[#1A1814] text-[#E8D5A8] border-[#C8A96E]' 
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <strong className="text-[10px]">Surat Elektronik (Email)</strong>
                      <span className="block text-[8px] mt-0.5 opacity-80">(Buka draf di Email)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactChannel('LinkedIn')}
                      className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                        contactChannel === 'LinkedIn' 
                          ? 'bg-[#1A1814] text-[#E8D5A8] border-[#C8A96E]' 
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <strong className="text-[10px]">Pesan LinkedIn</strong>
                      <span className="block text-[8px] mt-0.5 opacity-80">(Simulasi Teks Undangan)</span>
                    </button>
                  </div>
                </div>

                {/* Message Customization */}
                <div className="space-y-1 mb-5">
                  <label className="font-semibold text-stone-700 block">Kustomisasi Isi Pesan Anda:</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 leading-relaxed font-sans placeholder-stone-400 focus:outline-[#C8A96E]"
                    placeholder="Tulis pesan penawaran kerja sama..."
                    required
                  />
                  <div className="flex justify-between items-center text-[9px] text-[#8A8578] px-1 font-semibold mt-0.5 uppercase tracking-wide">
                    <span>Draft Tersimpan Otomatis</span>
                    <span>{contactMessage.length} Karakter</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={async () => {
                    if (!contactMessage) return;
                    
                    const dateStr = new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";
                    const senderName = user ? user.name : 'UMKM Tamu';
                    const newOffer = {
                      id: `off_${Date.now()}`,
                      sender: senderName,
                      receiver: selectedContactTalent.name,
                      message: contactMessage,
                      channel: contactChannel,
                      date: dateStr
                    };

                    // Optimistic update
                    setSentInboundOffers(prev => [newOffer, ...prev]);
                    setContactModalSuccess(true);

                    // Sync to database server
                    try {
                      await fetch("/api/offers/send", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          sender: senderName,
                          receiver: selectedContactTalent.name,
                          message: contactMessage,
                          channel: contactChannel
                        })
                      });
                    } catch (err) {
                      console.error("Gagal mengirimkan pesan ke server database:", err);
                    }
                  }}
                  className="w-full bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] text-xs font-sans font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Kirim & Dapatkan Tautan Kontak
                </button>
              </div>
            ) : (
              <div className="text-center py-4 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-inner">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                
                <h3 className="font-serif text-2xl font-light text-[#1A1814]">Terkirim Sukses!</h3>
                <p className="text-[11px] text-[#8A8578] mt-1.5 font-sans leading-relaxed">
                  Pesan Anda untuk <strong>{selectedContactTalent.name}</strong> berhasil dikirimkan dan disimpan dalam log riwayat dashboard.
                </p>

                {/* Channel specific feedback actions */}
                <div className="my-6 p-4 rounded-xl bg-white border border-stone-200/80 text-left">
                  <span className="text-[9px] font-bold text-[#C8A96E] uppercase tracking-wider block mb-1">Informasi Integrasi {contactChannel}</span>
                  
                  {contactChannel === 'NEXUS Chat' && (
                    <div>
                      <p className="text-[11px] text-stone-600 leading-relaxed mb-3">
                        Pesan Anda terkirim di dalam forum kotak masuk NEXUS terenkripsi. Berikut adalah simulasi balasan otomatis instan dari Talent:
                      </p>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60">
                        <span className="font-mono text-[9px] text-[#8A6D3B] font-bold block mb-1">BALASAN INSTAN ({selectedContactTalent.name}):</span>
                        <p className="text-[11px] text-stone-700 italic font-sans font-medium">
                          "Halo! Terima kasih banyak atas minat dan penawarannya. Portofolio serta draf kerja sama Anda sangat menarik bagi saya. Kapan kita bisa mendiskusikan detail teknis dan biaya proyek ini via Google Meet?"
                        </p>
                      </div>
                    </div>
                  )}

                  {contactChannel === 'WhatsApp' && (
                    <div>
                      <p className="text-[11px] text-stone-600 leading-relaxed mb-4">
                        Tautan WhatsApp Web siap dibuka dengan draf pesan otomatis Anda. Klik tombol hijau di bawah untuk menuju ke ruang chat WhatsApp:
                      </p>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(contactMessage)}`}
                        target="_blank"
                        rel="noreferrer referrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider text-[10px]"
                      >
                        Buka Obrolan WhatsApp Web <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {contactChannel === 'Email' && (
                    <div>
                      <p className="text-[11px] text-stone-600 leading-relaxed mb-4">
                        Draf email siap dibuka di klien surel bawaan Anda. Silakan klik tombol di bawah untuk mengirim email kerja sama sekarang:
                      </p>
                      <a
                        href={`mailto:hello@nexus.id?subject=${encodeURIComponent("Penawaran Kolaborasi Kerja via NEXUS")}&body=${encodeURIComponent(contactMessage)}`}
                        target="_blank"
                        rel="noreferrer referrer"
                        className="w-full bg-[#1A1814] hover:bg-[#C8A96E] hover:text-black text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider text-[10px]"
                      >
                        Buka Aplikasi Email Anda <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {contactChannel === 'LinkedIn' && (
                    <div>
                      <p className="text-[11px] text-stone-600 leading-relaxed mb-3">
                        Pesan koneksi LinkedIn singkat (di bawah 300 karakter) telah berhasil diformat agar muat dalam draf undangan jaringan:
                      </p>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-150 font-mono text-[10px] text-stone-600 line-clamp-3">
                        {contactMessage.slice(0, 280)}...
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsContactModalOpen(false);
                      setActiveTab('dashboard'); // Direct user to see log record
                    }}
                    className="flex-1 bg-white border border-stone-200 text-stone-700 hover:border-[#C8A96E] py-2.5 rounded-lg font-bold transition-all text-[11px]"
                  >
                    Lihat Riwayat Kontak
                  </button>
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    className="flex-1 bg-[#1A1814] text-[#F7F4EE] hover:bg-[#C8A96E] hover:text-[#1A1814] py-2.5 rounded-lg font-bold transition-all text-[11px]"
                  >
                    Tutup Dialog
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* LOGIN MODAL DESIGN SIMULATION */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-[#1A1814]/70 backdrop-blur-xs flex items-center justify-center p-4 z-100 animate-fade-down font-sans text-xs">
          <div className="bg-[#F7F4EE] rounded-2xl border border-[#C8A96E]/30 p-6 md:p-8 max-w-sm w-full relative shadow-2xl">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-light">Masuk Akun NEXUS</h3>
              <p className="text-[10px] text-stone-500 mt-1">Uji coba akses dengan mensimulasikan login instan di bawah ini.</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setUser({ name: "Rara Dewanti", email: "rara@designer.id", type: "freelancer", brand: "Selatan Design Duo" });
                  setIsLoginModalOpen(false);
                }}
                className="w-full bg-white border border-stone-200 text-[#1A1814] hover:border-[#C8A96E] p-3 rounded-lg text-left font-medium transition-all flex justify-between items-center"
              >
                <span>Masuk sebagai <strong>Rara Dewanti</strong> (Freelancer)</span>
                <ChevronRight className="w-4 h-4 text-[#C8A96E]" />
              </button>
              
              <button
                onClick={() => {
                  setUser({ name: "Budi Santoso", email: "budi@lestariwood.id", type: "umkm", brand: "Kayu Lestari Jati" });
                  setIsLoginModalOpen(false);
                }}
                className="w-full bg-white border border-stone-200 text-[#1A1814] hover:border-[#C8A96E] p-3 rounded-lg text-left font-medium transition-all flex justify-between items-center"
              >
                <span>Masuk sebagai <strong>Budi Santoso</strong> (Owner UMKM)</span>
                <ChevronRight className="w-4 h-4 text-[#C8A96E]" />
              </button>
            </div>

            <div className="border-t border-[#1A1814]/10 mt-6 pt-4 text-center">
              <button 
                onClick={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true); }}
                className="text-xs text-[#C8A96E] font-bold hover:underline"
              >
                Belum punya akun? Buat akun sekarang gratis
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline fallback icons for safety
function PlusSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function NexusLogo({ className = "w-6 h-6", color = "#C8A96E" }: { className?: string; color?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 
        This is an ultra-premium, modern geometric icon representing the NXS monogram.
        It has a balanced structure of solid side pillars forming N and clean diagonal cuts that cross as an X.
      */}
      {/* Left pillar representing N */}
      <rect 
        x="4" 
        y="4" 
        width="3" 
        height="16" 
        rx="1.5" 
        fill="currentColor" 
      />
      {/* Right pillar representing N */}
      <rect 
        x="17" 
        y="4" 
        width="3" 
        height="16" 
        rx="1.5" 
        fill="currentColor" 
      />
      {/* Golden sleek primary slash representing N's diagonal & X's ascending brush */}
      <path 
        d="M6 5L18 19" 
        stroke={color} 
        strokeWidth="2.8" 
        strokeLinecap="round" 
      />
      {/* Counter diagonal crossing to complete the 'X' shape */}
      <path 
        d="M18 5L14 9.5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-85"
      />
      <path 
        d="M10 14.5L6 19" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-85"
      />
    </svg>
  );
}
