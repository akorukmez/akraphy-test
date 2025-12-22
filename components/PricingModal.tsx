
import React, { useState } from 'react';
import { X, Check, CreditCard, Loader2, Zap } from 'lucide-react';
import { CreditPackage, Language, Currency, User } from '../types';
import { translations } from '../translations';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number, planName: string) => void;
  lang: Language;
  currency: Currency;
  user: User | null;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onPurchase, lang, currency, user }) => {
  const [loadingPkg, setLoadingPkg] = useState<string | null>(null);
  const t = translations[lang] || translations.en;
  const pkgInfo = t.packages || translations.en.packages;

  if (!isOpen) return null;

  const currencySymbol: Record<Currency, string> = {
    'TRY': '₺',
    'USD': '$',
    'EUR': '€'
  };

  const allPackages: CreditPackage[] = [
    {
      id: 'free',
      name: pkgInfo.free.name,
      credits: 2,
      prices: { 'TRY': 0, 'USD': 0, 'EUR': 0 },
      features: pkgInfo.free.features
    },
    {
      id: 'starter',
      name: pkgInfo.starter.name,
      credits: 10,
      prices: { 'TRY': 150, 'USD': 5, 'EUR': 4 },
      features: pkgInfo.starter.features
    },
    {
      id: 'pro',
      name: pkgInfo.pro.name,
      credits: 50,
      prices: { 'TRY': 450, 'USD': 15, 'EUR': 14 },
      popular: true,
      features: pkgInfo.pro.features
    },
    {
      id: 'studio',
      name: pkgInfo.studio.name,
      credits: 250,
      prices: { 'TRY': 1500, 'USD': 45, 'EUR': 42 },
      features: pkgInfo.studio.features
    },
    {
      id: 'enterprise',
      name: pkgInfo.enterprise.name,
      credits: 1000,
      prices: { 'TRY': 4500, 'USD': 150, 'EUR': 140 },
      features: pkgInfo.enterprise.features
    }
  ];

  const packages = user 
    ? allPackages.filter(pkg => pkg.id !== 'free') 
    : allPackages;

  const handleBuy = (pkg: CreditPackage) => {
    setLoadingPkg(pkg.id);
    setTimeout(() => {
      onPurchase(pkg.credits, pkg.name);
      setLoadingPkg(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-anthracite-900 rounded-3xl shadow-2xl w-full max-w-7xl overflow-hidden scale-100 transition-transform border border-transparent dark:border-white/10 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-anthracite-800 transition-colors z-10">
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="p-8 text-center border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-900">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{t.pricingTitle}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{t.pricingDesc}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-8 bg-white dark:bg-anthracite-900">
          {packages.map((pkg) => {
             const price = pkg.prices[currency];
             const isFree = pkg.id === 'free';
             const displayPrice = price === 0 ? (lang === 'tr' ? 'Ücretsiz' : 'Free') : `${currencySymbol[currency]}${price}`;

             return (
                <div 
                  key={pkg.id} 
                  className={`relative flex flex-col p-6 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(20%-1.5rem)] min-w-[240px] max-w-[300px] rounded-2xl border transition-all duration-300 
                    ${pkg.popular 
                        ? 'border-black dark:border-white shadow-xl scale-105 z-10 bg-black dark:bg-white' 
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-anthracite-800'}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {t.mostPopular}
                    </div>
                  )}
                  
                  <div className="text-center mb-4 mt-2">
                    <h3 className={`text-md font-bold mb-1 ${pkg.popular ? 'text-white dark:text-black' : 'text-gray-900 dark:text-white'}`}>{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-2xl font-extrabold tracking-tight ${pkg.popular ? 'text-white dark:text-black' : 'text-gray-900 dark:text-white'}`}>
                        {displayPrice}
                      </span>
                    </div>
                    {!isFree && (
                        <span className={`text-[10px] font-medium ${pkg.popular ? 'text-white/60 dark:text-black/60' : 'text-gray-500 dark:text-gray-400'}`}>/ {pkg.credits} {t.credits}</span>
                    )}
                  </div>

                  <ul className="flex-1 space-y-3 mb-6 text-left">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className={`flex items-start gap-2 text-xs ${pkg.popular ? 'text-white/80 dark:text-black/80' : 'text-gray-600 dark:text-gray-300'}`}>
                        <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-white dark:text-black' : 'text-green-600 dark:text-green-400'}`} />
                        <span className="leading-tight font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleBuy(pkg)}
                    disabled={!!loadingPkg}
                    className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-md
                      ${pkg.popular 
                        ? 'bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' 
                        : (isFree ? 'bg-gray-100 dark:bg-anthracite-700 text-gray-900 dark:text-white hover:bg-gray-200' : 'bg-gray-100 dark:bg-anthracite-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-anthracite-600 shadow-sm')}
                      ${loadingPkg && loadingPkg !== pkg.id ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {loadingPkg === pkg.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isFree ? (
                      <>
                        <Zap className="w-3 h-3" />
                        {lang === 'tr' ? 'Hemen Başla' : 'Start Now'}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5" />
                        {t.purchase}
                      </>
                    )}
                  </button>
                </div>
             );
          })}
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-anthracite-950 text-center text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest border-t border-gray-100 dark:border-white/5">
          Secure Payments by Stripe & Akraphy
        </div>
      </div>
    </div>
  );
};
