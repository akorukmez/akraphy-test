
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Sparkles, RefreshCcw, Globe, Coins, User as UserIcon, LogOut, Moon, Sun, HelpCircle, Mail, Layers, Zap, Settings2, ShieldCheck, FileText, Info, History, ChevronDown } from 'lucide-react';
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
  const [selectedScenes, setSelectedScenes] = useState<SceneType[]>([SceneType.CLEAN_WHITE]);
  const [selectedLighting, setSelectedLighting] = useState<LightingType>(LightingType.STUDIO_SOFT);
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
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
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
            resultUrl = await processWithN8n(rawBase64, selectedCategory, currentScene, selectedLighting, variation.label);
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
    <div className="min-h-screen flex flex-col items-center bg-apple-bg dark:bg-anthracite-900 font-sans transition-colors duration-500">
      
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

      <nav className="w-full bg-white/70 dark:bg-anthracite-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 sticky top-0 z-[100] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-black text-xs shadow-md">AK</div>
            <span className="font-bold text-lg tracking-tight text-apple-text dark:text-white hidden sm:block">{t.title}</span>
          </div>
          
          <div className="flex items-center gap-1 md:gap-3">
            <button onClick={() => scrollToSection('showcase')} className="hidden lg:block text-[13px] font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors px-2 py-2">{t.nav.gallery}</button>
            <button onClick={() => scrollToSection('pricing')} className="hidden lg:block text-[13px] font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors px-2 py-2">{t.nav.pricing}</button>
            <button onClick={() => setShowHelp(true)} className="hidden md:flex items-center gap-1 text-[13px] font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors px-2 py-2"><HelpCircle className="w-3.5 h-3.5" />{t.nav.help}</button>

            <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 hidden md:block mx-1"></div>

            <div className="flex items-center gap-2">
              <div className="relative" ref={langDropdownRef}>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1 uppercase text-[10px] font-black"><Globe className="w-4 h-4" /> {lang}</button>
                {isLangOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/5 rounded-xl shadow-2xl p-1 w-24 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    <button onClick={() => { setLang('tr'); setIsLangOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${lang === 'tr' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-50 dark:hover:bg-anthracite-700 text-gray-700 dark:text-gray-300'}`}>TR</button>
                    <button onClick={() => { setLang('en'); setIsLangOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${lang === 'en' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-50 dark:hover:bg-anthracite-700 text-gray-700 dark:text-gray-300'}`}>EN</button>
                  </div>
                )}
              </div>
              <div className="relative" ref={currencyDropdownRef}>
                <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1 uppercase text-[10px] font-black"><Coins className="w-4 h-4" /> {currencySymbols[currency]} {currency}</button>
                {isCurrencyOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/5 rounded-xl shadow-2xl p-1 w-32 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    {(Object.keys(currencySymbols) as Currency[]).map(c => (
                      <button key={c} onClick={() => { setCurrency(c); setIsCurrencyOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${currency === c ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-50 dark:hover:bg-anthracite-700 text-gray-700 dark:text-gray-300'}`}>{currencySymbols[c]} {c}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-2">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                    <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-3 bg-gray-50 dark:bg-anthracite-800/50 border border-gray-100 dark:border-white/10 rounded-full pl-3 pr-2 py-1 shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-anthracite-700"
                    >
                        <div className="hidden lg:flex flex-col items-end mr-2 pr-2 border-r border-gray-200 dark:border-white/10 leading-tight">
                            <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 lowercase flex items-center gap-1 tracking-tight">{user.email.toLowerCase()}</span>
                            <span className="text-[8px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter bg-gray-200 dark:bg-white/5 px-1.5 py-0.5 rounded mt-0.5">{user.planName}</span>
                        </div>
                        <div className="flex items-center gap-1 mr-1">
                            <Coins className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-xs font-black text-gray-900 dark:text-white">{user.credits}</span>
                        </div>
                        <div className="bg-white dark:bg-black rounded-full p-1 border border-gray-100 dark:border-white/10">
                            <ChevronDown className="w-3 h-3 text-gray-500" />
                        </div>
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                            <div className="p-1.5">
                                <button 
                                    onClick={() => { setShowPricing(true); setIsUserMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-anthracite-700 rounded-xl transition-all text-left group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-anthracite-700 flex items-center justify-center text-black dark:text-white border border-gray-200 dark:border-white/10 group-hover:border-black dark:group-hover:border-white transition-colors shadow-sm">
                                        <Coins className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-900 dark:text-white">{t.buyCredits}</div>
                                        <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{t.history.subLabels.upgrade}</div>
                                    </div>
                                </button>
                                
                                <button 
                                    onClick={() => { setShowHistory(true); setIsUserMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-anthracite-700 rounded-xl transition-all text-left mt-1 group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-anthracite-700 flex items-center justify-center text-black dark:text-white border border-gray-200 dark:border-white/10 group-hover:border-black dark:group-hover:border-white transition-colors shadow-sm">
                                        <History className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-900 dark:text-white">{t.nav.history}</div>
                                        <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{t.history.subLabels.past}</div>
                                    </div>
                                </button>

                                <div className="h-[1px] bg-gray-100 dark:bg-white/10 my-2 mx-2"></div>

                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all text-left group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-anthracite-700 flex items-center justify-center text-gray-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 group-hover:text-red-500 transition-all border border-transparent group-hover:border-red-100 dark:group-hover:border-red-500/20">
                                        <LogOut className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-red-600 transition-colors">{t.logout}</div>
                                        <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{t.history.subLabels.exit}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
              ) : (
                <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-[12px] font-bold shadow-md"><UserIcon className="w-3.5 h-3.5" /><span>{t.loginBtn}</span></button>
              )}
              <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-50 dark:bg-anthracite-800 hover:bg-gray-100 dark:hover:bg-anthracite-700 transition-colors text-gray-600 dark:text-gray-300">{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full flex flex-col items-center">
        <section className="text-center pt-20 pb-14 max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800/20 shadow-sm">
            <Zap className="w-3 h-3" /> v2.2 Stüdyo Yayında
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1] transition-colors">{t.subtitle}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed transition-colors max-w-2xl mx-auto">{t.desc}</p>
        </section>

        <main className="w-full max-w-7xl px-6 sm:px-10 mb-20 space-y-16">
          {!hasResults && (
            <section className="w-full bg-white dark:bg-anthracite-800/80 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-gray-100 dark:border-white/5 animate-in fade-in slide-up duration-700">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-gray-100 dark:border-white/5 pb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gray-50 dark:bg-anthracite-900 rounded-xl">
                      <Settings2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{t.selectStyle}</h2>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{t.poweredBy}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 justify-center">
                  <div className="bg-gray-50/50 dark:bg-anthracite-900/50 px-4 py-2 rounded-xl flex items-center gap-3 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tight">{t.batchToggle}</span>
                    </div>
                    <button 
                      onClick={() => {
                        const nextBatch = !isBatchMode;
                        setIsBatchMode(nextBatch);
                        if (!nextBatch && selectedScenes.length > 1) {
                          setSelectedScenes([selectedScenes[0]]);
                        }
                      }}
                      className={`w-10 h-5 rounded-full transition-all relative ${isBatchMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-anthracite-700'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${isBatchMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className="flex bg-gray-50/50 dark:bg-anthracite-900/50 p-1 rounded-xl border border-gray-100 dark:border-white/5">
                    <button onClick={() => setEngineProvider('n8n')} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${engineProvider === 'n8n' ? 'bg-white dark:bg-anthracite-700 text-black dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>n8n Webhook</button>
                    <button onClick={() => setEngineProvider('gemini')} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${engineProvider === 'gemini' ? 'bg-white dark:bg-anthracite-700 text-black dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Gemini Studio</button>
                  </div>
                </div>
              </div>

              <div className="w-full">
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
              </div>
            </section>
          )}

          <section className="w-full space-y-10">
            <StepIndicator state={processingState} lang={lang} />

            {!hasResults ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className={`relative group rounded-[2.5rem] overflow-hidden h-[550px] flex flex-col items-center justify-center bg-white dark:bg-anthracite-800 shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-500 ${!originalImage ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-1' : ''}`}>
                            {!originalImage ? (
                            <label className="w-full h-full flex flex-col items-center justify-center p-12 cursor-pointer">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-anthracite-900 rounded-2xl flex items-center justify-center mb-8 text-gray-300 group-hover:scale-110 group-hover:rotate-1 transition-all duration-500 shadow-inner">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <span className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">{t.uploadTitle}</span>
                                <span className="text-gray-400 dark:text-gray-500 font-medium text-sm">{t.uploadDesc}</span>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                            ) : (
                            <div className="relative w-full h-full p-10 bg-gray-50 dark:bg-anthracite-900/50">
                                <img src={originalImage} alt="Original" className="w-full h-full object-contain drop-shadow-2xl animate-in zoom-in duration-700" />
                                <div className="absolute top-8 right-8 z-10">
                                    <button onClick={handleReset} disabled={processingState.isProcessing} className="bg-white dark:bg-anthracite-700 hover:bg-gray-50 dark:hover:bg-anthracite-600 text-gray-900 dark:text-white p-3.5 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 transition-all active:scale-90">
                                        <RefreshCcw className={`w-5 h-5 ${processingState.isProcessing ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                                <div className="absolute top-8 left-8 bg-white/90 dark:bg-anthracite-700/90 backdrop-blur-md px-5 py-1.5 rounded-full text-[10px] font-black text-gray-900 dark:text-white shadow-xl uppercase tracking-widest">{t.originalSource}</div>
                            </div>
                            )}
                        </div>
                        {originalImage && processedImages.length === 0 && (
                            <button 
                            onClick={handleProcessImage} 
                            disabled={processingState.isProcessing} 
                            className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-3 transition-all duration-300 tracking-wide border ${processingState.isProcessing ? 'bg-gray-100 dark:bg-anthracite-700 text-gray-400 cursor-wait border-transparent' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-transparent hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]'}`}
                            >
                            {processingState.isProcessing ? (<><RefreshCcw className="w-4 h-4 animate-spin" />{t.processing}</>) : (<><Sparkles className="w-4 h-4" />{isBatchMode ? t.batchProcessButton : t.processButton} <span className="bg-white/20 dark:bg-black/10 px-2 py-0.5 rounded-md text-[10px] ml-1 font-black">{selectedScenes.length} {t.credits}</span></>)}
                            </button>
                        )}
                    </div>

                    <div className={`relative rounded-[2.5rem] h-[550px] flex flex-col items-center justify-center bg-white dark:bg-anthracite-800 border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-700 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150`}>
                        <ProcessingOverlay isProcessing={processingState.isProcessing} lang={lang} batchProgress={processingState.batchProgress} />
                        <div className="text-center p-12 opacity-30 max-w-xs group">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-anthracite-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform group-hover:scale-95 duration-500">
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">{t.waitingInput}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">{t.waitingDesc}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <div className="w-full bg-white dark:bg-anthracite-800 rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={openOriginalViewer}>
                            <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-anthracite-900 overflow-hidden relative group">
                                <img src={originalImage!} alt="Original" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.originalSource}</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{t.selectStyle}</p>
                            </div>
                        </div>
                        <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-anthracite-700 hover:bg-gray-200 dark:hover:bg-anthracite-600 rounded-lg text-xs font-bold transition-colors text-gray-900 dark:text-white shadow-sm">
                            <RefreshCcw className="w-3.5 h-3.5" />
                            <span>{t.newSession}</span>
                        </button>
                    </div>

                    <div id="results-section" className="w-full bg-white dark:bg-anthracite-800/50 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
                        
                        <div className="flex items-center justify-between mb-8">
                             <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                                    <Layers className="w-6 h-6 text-gray-900 dark:text-white" />
                                    {t.aiResult}
                                </h3>
                             </div>
                             <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg border border-transparent dark:border-white/10">
                                 {processedImages.length} {t.images}
                             </span>
                        </div>

                        <div className="flex flex-col gap-12">
                          {selectedScenes.map((scene, sceneIdx) => {
                            const sceneImages = processedImages.slice(sceneIdx * 5, (sceneIdx + 1) * 5);
                            if (sceneImages.length === 0) return null;

                            return (
                              <div key={sceneIdx} className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${sceneIdx * 200}ms` }}>
                                <div className="flex items-center gap-3 mb-6 pl-2">
                                  <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                                    {getTranslatedSceneLabel(scene)}
                                  </h4>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                    {sceneImages.map((img, imgIdx) => {
                                        const globalIdx = (sceneIdx * 5) + imgIdx;
                                        return (
                                          <div key={globalIdx} className="group relative aspect-[4/5] cursor-zoom-in animate-in zoom-in-95 duration-700 fill-mode-forwards" style={{ animationDelay: `${imgIdx * 100}ms` }} onClick={() => openViewer(globalIdx)}>
                                              <div className="absolute inset-0 bg-gray-100 dark:bg-anthracite-900 rounded-2xl animate-pulse"></div>
                                              <img src={img} alt={`Result ${globalIdx}`} className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-md border border-gray-100 dark:border-white/5 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:z-10" />
                                              
                                              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                                                  {t.variation} {imgIdx + 1}
                                              </div>

                                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center pointer-events-none">
                                                  <div className="bg-white/90 dark:bg-anthracite-900/90 text-black dark:text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-transparent dark:border-white/10">
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
          </section>

          <div className="pt-6 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white dark:bg-anthracite-800 border border-gray-100 dark:border-white/5 shadow-sm">
                <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase">{t.poweredBy}</span>
            </div>
          </div>
        </main>
        
        <LandingSections lang={lang} currency={currency} user={user} onOpenPricing={() => setShowPricing(true)} />
        
        <footer className="w-full border-t border-gray-200 dark:border-white/5 mt-20 py-16 bg-white dark:bg-anthracite-950 transition-colors">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-black text-xs">AK</div>
                    <span className="font-bold text-md text-gray-900 dark:text-white tracking-tight">Akraphy Studio</span>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest justify-center">
                    <button onClick={() => setShowHelp(true)} className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> {t.footer.guide}</button>
                    <button onClick={() => setActivePolicy('privacy')} className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> {t.footer.privacy}</button>
                    <button onClick={() => setActivePolicy('terms')} className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {t.footer.terms}</button>
                    <button onClick={() => setShowContact(true)} className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {t.footer.contact}</button>
                </div>
                <p className="text-gray-400 dark:text-gray-600 text-[9px] font-bold tracking-tight uppercase">&copy; 2024 Akraphy. {t.footer.rights}</p>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
