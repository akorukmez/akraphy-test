
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Sparkles, RefreshCcw, Globe, Coins, User as UserIcon, LogOut, Moon, Sun, HelpCircle, Mail, Layers, Zap, Settings2, ShieldCheck, FileText, Info, History, ChevronDown, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { ProductCategory, SceneType, LightingType, ProcessingState, Language, User, Currency, ProcessingProvider, HistoryItem } from './types';
import { translations } from './translations';
import { fileToBase64, generateProfessionalHeadshot as processWithGemini } from './services/geminiService';
import { processWithN8n } from './services/n8nService';
import { authService } from './services/authService';
import { historyService } from './services/historyService';
import { StepIndicator } from './components/StepIndicator';
import { StyleSelector } from './components/StyleSelector';
import { PricingModal } from './components/PricingModal';
import { LoginModal } from './components/LoginModal';
import { OnboardingModal } from './components/OnboardingModal';
import { HelpModal } from './components/HelpModal';
import { PolicyModal } from './components/PolicyModal';
import { LandingSections } from './components/LandingSections';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { ImageViewer } from './components/ImageViewer';
import { ContactModal } from './components/ContactModal';
import { HistoryModal } from './components/HistoryModal';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('tr'); 
  const [currency, setCurrency] = useState<Currency>('TRY');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(ProductCategory.JEWELRY);
  const [selectedScenes, setSelectedScenes] = useState<SceneType[]>([SceneType.PURE_STUDIO]);
  const [selectedLighting, setSelectedLighting] = useState<LightingType>(LightingType.SOFTBOX);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [engineProvider, setEngineProvider] = useState<ProcessingProvider>('gemini');

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [user, setUser] = useState<User | null>(null);
  const [showPricing, setShowPricing] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showContact, setShowContact] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [processingState, setProcessingState] = useState<ProcessingState>({
    isUploading: false,
    isProcessing: false,
    step: 'idle',
    error: null,
  });

  const t = translations[lang] || translations.en;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const currencySymbols: Record<Currency, string> = {
    'TRY': '₺',
    'USD': '$',
    'EUR': '€'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to Light
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
    
    // Auto login admin for testing
    const adminUser = authService.getOrCreateAdmin();
    setUser(adminUser);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => { authService.logout(); setUser(null); setIsUserMenuOpen(false); };
  const scrollToSection = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setProcessingState(prev => ({ ...prev, error: t.errorValidImage }));
      return;
    }
    setProcessingState(prev => ({ ...prev, step: 'uploading', error: null }));
    try {
      const base64 = await fileToBase64(file);
      const dataUri = base64.startsWith('data:') ? base64 : `data:${file.type};base64,${base64}`;
      setOriginalImage(dataUri);
      setOriginalFile(file);
      setProcessedImages([]);
      setProcessingState(prev => ({ ...prev, step: 'idle' }));
    } catch (err) {
      setProcessingState(prev => ({ ...prev, step: 'error', error: t.errorLoad }));
    }
  };

  const handleProcessImage = async () => {
    if (!user) { setShowLogin(true); return; }
    if (!originalImage || !originalFile) return;
    
    const cost = selectedScenes.length; 
    if (user.credits < cost) { setShowPricing(true); return; }

    const angleVariations = [
      { id: 'front', label: 'Front Standard' },
      { id: 'side', label: '45-Degree Side' },
      { id: 'top', label: 'Top-Down Flatlay' },
      { id: 'detail', label: 'Macro Detail' },
      { id: 'lifestyle', label: 'Lifestyle Context' }
    ];

    const totalOperations = selectedScenes.length * angleVariations.length;

    setProcessingState({ 
      isUploading: false, 
      isProcessing: true, 
      step: 'analyzing', 
      error: null,
      batchProgress: { current: 0, total: totalOperations }
    });

    try {
      const results: string[] = [];
      const rawBase64 = originalImage.split(',')[1];
      const mimeType = originalFile.type;

      let completedOps = 0;

      for (let i = 0; i < selectedScenes.length; i++) {
        const currentScene = selectedScenes[i];

        for (const variation of angleVariations) {
          completedOps++;
          setProcessingState(prev => ({
            ...prev, 
            step: 'generating',
            batchProgress: { current: completedOps, total: totalOperations }
          }));

          let resultUrl = '';
          if (engineProvider === 'n8n') {
            resultUrl = await processWithN8n(
                rawBase64, 
                selectedCategory, 
                currentScene, 
                selectedLighting, 
                variation.label,
                user,
                lang
            );
          } else {
            resultUrl = await processWithGemini(rawBase64, mimeType, selectedCategory, currentScene, selectedLighting, variation.label);
          }
          
          results.push(resultUrl);

          const historyItem: HistoryItem = {
            id: Date.now().toString() + Math.random().toString(),
            timestamp: new Date().toISOString(),
            imageUrl: resultUrl,
            category: selectedCategory,
            scene: currentScene,
            lighting: selectedLighting,
            variation: variation.label
          };
          historyService.addToHistory(historyItem);
        }

        const updatedUser = authService.updateCredits(-1);
        if (updatedUser) setUser(updatedUser);
      }

      setProcessedImages(results);
      setProcessingState(prev => ({ ...prev, isProcessing: false, step: 'completed' }));
      
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (error: any) {
      console.error(error);
      setProcessingState(prev => ({ ...prev, isProcessing: false, step: 'error', error: error.message || t.errorGen }));
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImages([]);
    setOriginalFile(null);
    setProcessingState({ isUploading: false, isProcessing: false, step: 'idle', error: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openViewer = (index: number) => {
    setViewerImages(processedImages);
    setViewerInitialIndex(index);
    setIsViewerOpen(true);
  };
  
  const openOriginalViewer = () => {
    if (originalImage) {
        setViewerImages([originalImage]);
        setViewerInitialIndex(0);
        setIsViewerOpen(true);
    }
  };

  const getTranslatedSceneLabel = (sceneValue: SceneType) => {
    const key = Object.keys(SceneType).find(k => SceneType[k as keyof typeof SceneType] === sceneValue);
    return key ? t.config.scenes[key as keyof typeof t.config.scenes] : sceneValue;
  };

  const hasResults = processedImages.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-anthracite-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={(u, isNew) => { setUser(u); if (isNew) setShowOnboarding(true); }} />
      {user && <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} lang={lang} user={user} />}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} lang={lang} />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} lang={lang} />
      <HistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} lang={lang} />
      <PolicyModal isOpen={!!activePolicy} type={activePolicy} onClose={() => setActivePolicy(null)} lang={lang} />
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} onPurchase={(a, p) => { const u = authService.updateCredits(a, p); if (u) setUser(u); setShowPricing(false); }} lang={lang} currency={currency} user={user} />
      
      <ImageViewer 
        isOpen={isViewerOpen} 
        images={viewerImages}
        initialIndex={viewerInitialIndex}
        category={selectedCategory}
        scenes={selectedScenes}
        lighting={selectedLighting}
        onClose={() => setIsViewerOpen(false)} 
        lang={lang}
        alt="Studio Result" 
      />

      {/* Navbar */}
      <nav className="w-full bg-white/80 dark:bg-anthracite-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2 cursor-pointer z-10" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-black text-xs">AK</div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Akraphy<span className="text-gray-400">.io</span></span>
          </div>
          
          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button onClick={() => scrollToSection('showcase')} className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">{t.nav.gallery}</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">{t.nav.pricing}</button>
            <button onClick={() => setShowHelp(true)} className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">{t.nav.help}</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">{t.nav.faq}</button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 z-10">
            
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-anthracite-800 transition-colors">
                {theme === 'light' ? <Moon className="w-4 h-4 text-gray-600" /> : <Sun className="w-4 h-4 text-gray-300" />}
              </button>

              {/* Language */}
              <div className="relative" ref={langDropdownRef}>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 font-bold text-xs uppercase"><Globe className="w-4 h-4" /> {lang}</button>
                {isLangOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-1 w-24 overflow-hidden animate-in fade-in zoom-in-95 z-50">
                    <button onClick={() => { setLang('tr'); setIsLangOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${lang === 'tr' ? 'bg-gray-100 dark:bg-anthracite-700' : 'hover:bg-gray-50 dark:hover:bg-anthracite-700/50'}`}>Türkçe</button>
                    <button onClick={() => { setLang('en'); setIsLangOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${lang === 'en' ? 'bg-gray-100 dark:bg-anthracite-700' : 'hover:bg-gray-50 dark:hover:bg-anthracite-700/50'}`}>English</button>
                  </div>
                )}
              </div>
              
              {/* Currency */}
              <div className="relative" ref={currencyDropdownRef}>
                <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 font-bold text-xs uppercase"><Coins className="w-4 h-4" /> {currencySymbols[currency]}</button>
                {isCurrencyOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-1 w-32 overflow-hidden animate-in fade-in zoom-in-95 z-50">
                    {(Object.keys(currencySymbols) as Currency[]).map(c => (
                      <button key={c} onClick={() => { setCurrency(c); setIsCurrencyOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${currency === c ? 'bg-gray-100 dark:bg-anthracite-700' : 'hover:bg-gray-50 dark:hover:bg-anthracite-700/50'}`}>{currencySymbols[c]} {c}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 ml-2">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                    <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-3 bg-gray-100 dark:bg-anthracite-800 border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-full pl-1 pr-3 py-1 transition-all"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="hidden lg:flex flex-col items-end leading-none gap-0.5">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</span>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Coins className="w-3 h-3 text-yellow-500" /> {user.credits}
                            </span>
                        </div>
                        <ChevronDown className="w-3 h-3 text-gray-500" />
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-60 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 z-50">
                            <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-900/50">
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded uppercase tracking-wider">{user.planName}</span>
                              </div>
                            </div>
                            <div className="p-1.5">
                                <button onClick={() => { setShowPricing(true); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-anthracite-700 rounded-xl transition-colors text-left text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><Coins className="w-4 h-4" /> {t.buyCredits}</button>
                                <button onClick={() => { setShowHistory(true); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-anthracite-700 rounded-xl transition-colors text-left text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"><History className="w-4 h-4" /> {t.nav.history}</button>
                                <div className="h-[1px] bg-gray-100 dark:bg-white/5 my-1"></div>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-left text-xs font-bold text-red-500"><LogOut className="w-4 h-4" /> {t.logout}</button>
                            </div>
                        </div>
                    )}
                </div>
              ) : (
                <button onClick={() => setShowLogin(true)} className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all text-xs font-bold shadow-lg">
                  <span>{t.loginBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-7xl px-6 sm:px-10 py-12 flex flex-col items-center">
        
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
            {t.title}
            <span className="block text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400 mt-4 font-sans">{t.subtitle}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{t.desc}</p>

           {/* NEW: Instant Value Props (No Hardware, No Photoshop, No Studio) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             {(t.heroValues || []).map((val: string, i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-anthracite-800 rounded-full border border-gray-200 dark:border-white/10 shadow-sm transition-transform hover:scale-105">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                         <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{val}</span>
                </div>
             ))}
          </div>
        </header>

        <StepIndicator state={processingState} lang={lang} />

        {/* REARRANGED: Upload Area is now ABOVE Configuration Panel */}
        {!hasResults ? (
            <div className="w-full flex flex-col gap-10">
                
                {/* 1. Upload & Processing Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                    {/* Left: Upload */}
                    <div className="flex flex-col gap-6">
                         <div className={`relative group rounded-[2.5rem] overflow-hidden h-[500px] flex flex-col items-center justify-center bg-white dark:bg-anthracite-900 border-2 border-dashed border-gray-200 dark:border-anthracite-700 transition-all duration-300 hover:border-gray-400 dark:hover:border-anthracite-500 ${!originalImage ? 'cursor-pointer' : ''}`}>
                            {!originalImage ? (
                            <label id="main-upload" className="w-full h-full flex flex-col items-center justify-center p-12 cursor-pointer">
                                <div className="w-20 h-20 bg-gray-50 dark:bg-anthracite-800 rounded-full flex items-center justify-center mb-6 text-gray-400 group-hover:scale-110 transition-transform duration-300">
                                    <UploadCloud className="w-10 h-10" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.uploadTitle}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm mb-6">{t.uploadDesc}</span>
                                
                                {/* NEW: Upload Tips for Reassurance */}
                                <div className="flex flex-wrap justify-center gap-3">
                                  {(t.uploadTips?.tips || []).map((tip: string, i: number) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                                      <CheckCircle2 className="w-3 h-3 text-green-500 dark:text-green-400" />
                                      <span>{tip}</span>
                                    </div>
                                  ))}
                                </div>

                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                            ) : (
                            <div className="relative w-full h-full p-8 bg-gray-100 dark:bg-anthracite-800">
                                <img src={originalImage} alt="Original" className="w-full h-full object-contain drop-shadow-xl" />
                                <div className="absolute top-6 right-6 z-10">
                                    <button onClick={handleReset} disabled={processingState.isProcessing} className="bg-white/90 dark:bg-black/50 text-gray-700 dark:text-white p-3 rounded-full shadow-lg border border-gray-200 dark:border-white/10 hover:scale-105 transition-transform backdrop-blur-sm">
                                        <RefreshCcw className={`w-5 h-5 ${processingState.isProcessing ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                                <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-black dark:text-white shadow-sm border border-gray-200 dark:border-white/10 uppercase tracking-wider">{t.originalSource}</div>
                            </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Placeholder / Status */}
                    <div className="relative rounded-[2.5rem] h-[500px] flex flex-col items-center justify-center bg-gray-50 dark:bg-anthracite-900 border border-gray-200 dark:border-white/5 overflow-hidden">
                        <ProcessingOverlay isProcessing={processingState.isProcessing} lang={lang} batchProgress={processingState.batchProgress} />
                        <div className="text-center p-12 opacity-40">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.waitingInput}</h3>
                            <p className="text-sm text-gray-500">{t.waitingDesc}</p>
                        </div>
                    </div>
                </div>

                {/* 2. Configuration Panel */}
                <section className="w-full bg-white dark:bg-anthracite-900 rounded-[2rem] p-8 lg:p-12 shadow-2xl border border-gray-100 dark:border-white/5 animate-in fade-in slide-up duration-500 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-gray-100 dark:border-white/5 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-50 dark:bg-anthracite-800 rounded-2xl">
                                <Settings2 className="w-6 h-6 text-gray-900 dark:text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.selectStyle}</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{t.poweredBy}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-gray-50 dark:bg-anthracite-800 px-5 py-2.5 rounded-xl flex items-center gap-3 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t.batchToggle}</span>
                                </div>
                                <button 
                                    onClick={() => {
                                        const nextBatch = !isBatchMode;
                                        setIsBatchMode(nextBatch);
                                        if (!nextBatch && selectedScenes.length > 1) {
                                            setSelectedScenes([selectedScenes[0]]);
                                        }
                                    }}
                                    className={`w-11 h-6 rounded-full transition-all relative ${isBatchMode ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-anthracite-600'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full shadow-md transition-all duration-300 ${isBatchMode ? 'translate-x-5 bg-white dark:bg-black' : 'translate-x-0 bg-white'}`}></div>
                                </button>
                            </div>

                            <div className="flex bg-gray-100 dark:bg-anthracite-800 p-1 rounded-xl">
                                <button onClick={() => setEngineProvider('n8n')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${engineProvider === 'n8n' ? 'bg-white dark:bg-anthracite-600 text-black dark:text-white shadow-sm' : 'text-gray-400'}`}>n8n</button>
                                <button onClick={() => setEngineProvider('gemini')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${engineProvider === 'gemini' ? 'bg-white dark:bg-anthracite-600 text-black dark:text-white shadow-sm' : 'text-gray-400'}`}>Gemini</button>
                            </div>
                        </div>
                    </div>

                    <StyleSelector 
                      selectedCategory={selectedCategory} 
                      selectedScenes={selectedScenes} 
                      selectedLighting={selectedLighting}
                      onSelectCategory={setSelectedCategory} 
                      onSelectScenes={setSelectedScenes} 
                      onSelectLighting={setSelectedLighting}
                      disabled={processingState.isProcessing} 
                      lang={lang}
                      isBatchMode={isBatchMode}
                    />

                    {/* MOVED: Process Button now at the bottom of Configuration Flow */}
                    {originalImage && processedImages.length === 0 && (
                        <div className="mt-12 flex justify-center border-t border-gray-100 dark:border-white/5 pt-8">
                             <button 
                                onClick={handleProcessImage} 
                                disabled={processingState.isProcessing} 
                                className={`w-full md:w-auto md:min-w-[300px] py-4 px-12 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 ${processingState.isProcessing ? 'bg-gray-100 dark:bg-anthracite-800 text-gray-400 cursor-wait' : 'bg-black dark:bg-white text-white dark:text-black'}`}
                             >
                                {processingState.isProcessing ? (<><RefreshCcw className="w-5 h-5 animate-spin" />{t.processing}</>) : (<><Sparkles className="w-5 h-5" />{isBatchMode ? t.batchProcessButton : t.processButton}</>)}
                             </button>
                        </div>
                    )}
                </section>
            </div>
        ) : (
            <div className="w-full flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Results Header with Original Thumbnail */}
                <div className="w-full bg-white dark:bg-anthracite-900 rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={openOriginalViewer}>
                        <div className="h-14 w-14 rounded-xl bg-gray-100 dark:bg-anthracite-800 overflow-hidden relative group">
                            <img src={originalImage!} alt="Original" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t.originalSource}</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{t.selectStyle}</p>
                        </div>
                    </div>
                    <button onClick={handleReset} className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-anthracite-800 hover:bg-gray-200 dark:hover:bg-anthracite-700 rounded-xl text-xs font-bold transition-colors text-gray-900 dark:text-white">
                        <RefreshCcw className="w-3.5 h-3.5" />
                        <span>{t.newSession}</span>
                    </button>
                </div>

                <div id="results-section" className="w-full bg-white dark:bg-anthracite-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-10">
                         <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                             <Layers className="w-6 h-6" />
                             {t.aiResult}
                         </h3>
                         <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                             {processedImages.length} {t.images}
                         </span>
                    </div>

                    <div className="flex flex-col gap-12">
                      {selectedScenes.map((scene, sceneIdx) => {
                        const sceneImages = processedImages.slice(sceneIdx * 5, (sceneIdx + 1) * 5);
                        if (sceneImages.length === 0) return null;

                        return (
                          <div key={sceneIdx} className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${sceneIdx * 100}ms` }}>
                            <div className="flex items-center gap-3 mb-6 pl-2 border-l-4 border-black dark:border-white">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                {getTranslatedSceneLabel(scene)}
                              </h4>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {sceneImages.map((img, imgIdx) => {
                                    const globalIdx = (sceneIdx * 5) + imgIdx;
                                    return (
                                      <div key={globalIdx} className="group relative aspect-square cursor-zoom-in rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300" onClick={() => openViewer(globalIdx)}>
                                          <img src={img} alt={`Result ${globalIdx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                          
                                          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-md text-black dark:text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                                              {t.variation} {imgIdx + 1}
                                          </div>

                                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                              <div className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                                  {t.inspect}
                                              </div>
                                          </div>
                                      </div>
                                    );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                </div>
            </div>
        )}

      </main>

      <LandingSections lang={lang} currency={currency} user={user} onOpenPricing={() => setShowPricing(true)} />
      
      <footer className="w-full border-t border-gray-200 dark:border-white/5 mt-20 py-12 bg-white dark:bg-anthracite-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-black text-xs">AK</div>
                <span className="font-bold text-md text-gray-900 dark:text-white tracking-tight">Akraphy Studio</span>
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                <button onClick={() => setShowHelp(true)} className="hover:text-black dark:hover:text-white transition-colors">{t.footer.guide}</button>
                <button onClick={() => setActivePolicy('privacy')} className="hover:text-black dark:hover:text-white transition-colors">{t.footer.privacy}</button>
                <button onClick={() => setActivePolicy('terms')} className="hover:text-black dark:hover:text-white transition-colors">{t.footer.terms}</button>
                <button onClick={() => setShowContact(true)} className="hover:text-black dark:hover:text-white transition-colors">{t.footer.contact}</button>
            </div>
            <p className="text-gray-400 text-[10px] font-medium">&copy; 2024 Akraphy. {t.footer.rights}</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
