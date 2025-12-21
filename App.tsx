
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Sparkles, RefreshCcw, Globe, Coins, User as UserIcon, LogOut, ChevronDown, Moon, Sun, HelpCircle, Mail } from 'lucide-react';
import { ProductCategory, SceneType, LightingType, ProcessingState, Language, User, Currency } from './types';
import { translations } from './translations';
import { fileToBase64 } from './services/geminiService';
import { processWithN8n } from './services/n8nService';
import { authService } from './services/authService';
import { StepIndicator } from './components/StepIndicator';
import { StyleSelector } from './components/StyleSelector';
import { PricingModal } from './components/PricingModal';
import { LoginModal } from './components/LoginModal';
import { OnboardingModal } from './components/OnboardingModal';
import { HelpModal } from './components/HelpModal';
import { LandingSections } from './components/LandingSections';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { ImageViewer } from './components/ImageViewer';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('tr'); 
  const [currency, setCurrency] = useState<Currency>('TRY');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(ProductCategory.JEWELRY);
  const [selectedScene, setSelectedScene] = useState<SceneType>(SceneType.CLEAN_WHITE);
  const [selectedLighting, setSelectedLighting] = useState<LightingType>(LightingType.STUDIO_SOFT);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [user, setUser] = useState<User | null>(null);
  const [showPricing, setShowPricing] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [processingState, setProcessingState] = useState<ProcessingState>({
    isUploading: false,
    isProcessing: false,
    step: 'idle',
    error: null,
  });

  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // THEME & AUTH INITIALIZATION
  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    // TEST MODE: Auto-login as Admin (akraphy@akraphy.com)
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

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'tr' : 'en');
  const handleLogout = () => { authService.logout(); setUser(null); };
  const selectCurrency = (c: Currency) => { setCurrency(c); setIsCurrencyOpen(false); };
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
      setProcessedImage(null);
      setProcessingState(prev => ({ ...prev, step: 'idle' }));
    } catch (err) {
      setProcessingState(prev => ({ ...prev, step: 'error', error: t.errorLoad }));
    }
  };

  const handleProcessImage = async () => {
    if (!user) { setShowLogin(true); return; }
    if (!originalImage || !originalFile) return;
    if (user.credits <= 0) { setShowPricing(true); return; }

    setProcessingState({ isUploading: false, isProcessing: true, step: 'analyzing', error: null });

    try {
      await new Promise(r => setTimeout(r, 800)); 
      setProcessingState(prev => ({...prev, step: 'generating'}));
      const rawBase64 = originalImage.split(',')[1];
      const resultUrl = await processWithN8n(rawBase64, selectedCategory, selectedScene, selectedLighting);
      setProcessedImage(resultUrl);
      const updatedUser = authService.updateCredits(-1);
      if (updatedUser) setUser(updatedUser);
      setProcessingState(prev => ({ ...prev, isProcessing: false, step: 'completed' }));
    } catch (error: any) {
      console.error(error);
      setProcessingState(prev => ({ ...prev, isProcessing: false, step: 'error', error: error.message || t.errorGen }));
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setOriginalFile(null);
    setProcessingState({ isUploading: false, isProcessing: false, step: 'idle', error: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-apple-bg dark:bg-anthracite-900 font-sans transition-colors duration-300">
      
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={(u, isNew) => { setUser(u); if (isNew) setShowOnboarding(true); }} />
      {user && <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} lang={lang} user={user} />}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} lang={lang} />
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} onPurchase={(a, p) => { const u = authService.updateCredits(a, p); if (u) setUser(u); setShowPricing(false); }} lang={lang} currency={currency} user={user} />
      <ImageViewer isOpen={isViewerOpen} imageUrl={processedImage} onClose={() => setIsViewerOpen(false)} alt="Studio Result" />

      {showSuccessToast && <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full shadow-2xl z-[60] animate-bounce">{showSuccessToast}</div>}

      <nav className="w-full bg-white/80 dark:bg-anthracite-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-9 h-9 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-bold text-sm shadow-md">AK</div>
            <span className="font-semibold text-lg tracking-tight text-apple-text dark:text-white hidden sm:block">{t.title}</span>
          </div>
          
          <div className="flex items-center gap-1 md:gap-4">
            <button onClick={() => scrollToSection('showcase')} className="hidden md:block text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors px-3 py-2">{t.nav.gallery}</button>
            <button onClick={() => scrollToSection('pricing')} className="hidden md:block text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors px-3 py-2">{t.nav.pricing}</button>
            <button onClick={() => setShowHelp(true)} className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors px-3 py-2"><HelpCircle className="w-4 h-4" />{t.nav.help}</button>

            <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 hidden md:block mx-1"></div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-full pl-4 pr-1.5 py-1.5 shadow-sm transition-colors">
                  <div className="hidden lg:flex flex-col items-end mr-2 pr-2 border-r border-gray-100 dark:border-white/10 leading-tight">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {user.email}</span>
                    <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">{user.planName} Plan</span>
                  </div>
                  <div className="flex items-center gap-1.5 mr-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{user.credits}</span>
                  </div>
                  <button onClick={() => setShowPricing(true)} className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">+ {t.buyCredits}</button>
                  <div className="w-[1px] h-5 bg-gray-200 dark:bg-white/10 mx-1"></div>
                  <div className="relative">
                      <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-2 py-1 rounded-md">{currency}<ChevronDown className="w-3 h-3" /></button>
                      {isCurrencyOpen && (
                          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-anthracite-800 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 p-1 min-w-[80px] z-20 flex flex-col gap-1">
                                  {['TRY', 'USD', 'EUR'].map((c) => (<button key={c} onClick={() => selectCurrency(c as Currency)} className={`px-3 py-2 text-xs font-bold rounded-lg text-left hover:bg-gray-50 dark:hover:bg-anthracite-700 ${currency === c ? 'bg-gray-50 dark:bg-anthracite-700 text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{c}</button>))}
                          </div>
                      )}
                  </div>
                  <button onClick={handleLogout} className="p-1.5 hover:bg-gray-100 dark:hover:bg-anthracite-700 rounded-full text-gray-400 hover:text-red-500 transition-colors"><LogOut className="w-4 h-4" /></button>
                </div>
              ) : (
                <button onClick={() => setShowLogin(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-sm font-bold shadow-md"><UserIcon className="w-4 h-4" /><span>{t.loginBtn}</span></button>
              )}

              <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-100 dark:bg-anthracite-800 hover:bg-gray-200 dark:hover:bg-anthracite-700 transition-colors text-gray-600 dark:text-gray-300">{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
              <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-anthracite-800 hover:bg-gray-200 dark:hover:bg-anthracite-700 transition-colors text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide"><Globe className="w-3.5 h-3.5" /><span>{lang}</span></button>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full flex flex-col items-center">
        <section className="text-center pt-20 pb-12 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight transition-colors">{t.subtitle}</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8 transition-colors">{t.desc}</p>
        </section>

        <main className="w-full max-w-6xl px-4 sm:px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-2">{t.selectStyle}</h2>
            <StyleSelector 
              selectedCategory={selectedCategory} selectedScene={selectedScene} selectedLighting={selectedLighting}
              onSelectCategory={setSelectedCategory} onSelectScene={setSelectedScene} onSelectLighting={setSelectedLighting}
              disabled={processingState.isProcessing} lang={lang}
            />
          </div>

          <StepIndicator state={processingState} lang={lang} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col gap-4">
              <div className={`relative group rounded-[2rem] overflow-hidden h-[450px] flex flex-col items-center justify-center bg-white dark:bg-anthracite-800 shadow-sm border border-gray-100 dark:border-white/5 transition-all duration-300 ${!originalImage ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : ''}`}>
                {!originalImage ? (
                  <label className="w-full h-full flex flex-col items-center justify-center p-8 cursor-pointer">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-anthracite-700 rounded-3xl flex items-center justify-center mb-6 text-gray-300 group-hover:scale-110 transition-all duration-300"><UploadCloud className="w-10 h-10" /></div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.uploadTitle}</span>
                    <span className="text-gray-400 dark:text-gray-500 font-medium">{t.uploadDesc}</span>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                ) : (
                  <div className="relative w-full h-full p-8 bg-gray-50 dark:bg-anthracite-900/50">
                    <img src={originalImage} alt="Original" className="w-full h-full object-contain drop-shadow-xl" />
                    <div className="absolute top-6 right-6 z-10"><button onClick={handleReset} disabled={processingState.isProcessing} className="bg-white dark:bg-anthracite-700 hover:bg-gray-50 dark:hover:bg-anthracite-600 text-gray-900 dark:text-white p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 transition-all"><RefreshCcw className="w-5 h-5" /></button></div>
                    <div className="absolute top-6 left-6 bg-white/90 dark:bg-anthracite-700/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 dark:text-white shadow-sm uppercase tracking-wider">{t.originalSource}</div>
                  </div>
                )}
              </div>
              {originalImage && !processedImage && (
                <button onClick={handleProcessImage} disabled={processingState.isProcessing} className={`w-full py-5 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all duration-300 ${processingState.isProcessing ? 'bg-gray-100 dark:bg-anthracite-700 text-gray-400 cursor-wait' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-2xl hover:scale-[1.01]'}`}>
                  {processingState.isProcessing ? (<><RefreshCcw className="w-5 h-5 animate-spin" />{t.processing}</>) : (<><Sparkles className="w-5 h-5" />{t.processButton} <span className="bg-white/20 dark:bg-black/10 px-2 py-0.5 rounded text-xs ml-1 font-normal">1 {t.credits}</span></>)}
                </button>
              )}
            </div>

            <div className={`relative rounded-[2rem] h-[450px] flex flex-col items-center justify-center bg-white dark:bg-anthracite-800 border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 ${processedImage ? 'shadow-2xl cursor-zoom-in' : 'shadow-sm'}`} onClick={() => processedImage && setIsViewerOpen(true)}>
              <ProcessingOverlay isProcessing={processingState.isProcessing} lang={lang} />
              {processedImage ? (
                <div className="w-full h-full relative p-8 bg-gray-50 dark:bg-anthracite-800 group">
                  <img src={processedImage} alt="Processed" className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-700" />
                   <div className="absolute inset-0 bg-black/5 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"><span className="bg-black/70 dark:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">Görsele Tıkla</span></div>
                   <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-auto" onClick={(e) => e.stopPropagation()}><a href={processedImage} download="akraphy-studio-result.png" className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full shadow-2xl hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 transition-all font-bold text-sm"><Download className="w-4 h-4" />{t.save}</a></div>
                    <div className="absolute top-6 left-6 bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-xl uppercase tracking-wider z-20">{t.aiResult}</div>
                </div>
              ) : (
                <div className="text-center p-8 opacity-40 max-w-xs"><div className="w-20 h-20 bg-gray-50 dark:bg-anthracite-700 rounded-3xl flex items-center justify-center mx-auto mb-6"><ImageIcon className="w-8 h-8 text-gray-300" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.waitingInput}</h3><p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.waitingDesc}</p></div>
              )}
            </div>
          </div>
          <div className="mt-16 text-center"><span className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-anthracite-800 border border-gray-100 dark:border-white/5 text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase shadow-sm">{t.poweredBy}</span></div>
        </main>
        
        <LandingSections lang={lang} currency={currency} user={user} onOpenPricing={() => setShowPricing(true)} />
        
        <footer className="w-full border-t border-gray-200 dark:border-white/5 mt-20 py-10 text-center text-gray-400 dark:text-gray-600 text-sm"><p>&copy; 2024 Akraphy Studio. All rights reserved.</p></footer>
      </div>
    </div>
  );
};

export default App;
