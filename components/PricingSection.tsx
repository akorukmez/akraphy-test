
import React from 'react';
import { Check, Star, Zap, ShieldCheck, Users } from 'lucide-react';
import { Language, Currency, CreditPackage, User } from '../types';
import { translations } from '../translations';

interface PricingSectionProps {
  lang: Language;
  onBuyClick: () => void;
  currency: Currency;
  user: User | null;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ lang, onBuyClick, currency, user }) => {
  const t = translations[lang] || translations.en;
  const packagesData = t.packages || translations.en.packages;

  // Currency Symbols
  const currencySymbol: Record<Currency, string> = {
    'TRY': '₺',
    'USD': '$',
    'EUR': '€'
  };

  const rawPackages: CreditPackage[] = [
    {
      id: 'free',
      name: packagesData.free.name,
      credits: 2,
      prices: { 'TRY': 0, 'USD': 0, 'EUR': 0 },
      features: packagesData.free.features
    },
    {
      id: 'starter',
      name: packagesData.starter.name,
      credits: 10,
      prices: { 'TRY': 150, 'USD': 5, 'EUR': 4 },
      features: packagesData.starter.features
    },
    {
      id: 'pro',
      name: packagesData.pro.name,
      credits: 50,
      prices: { 'TRY': 450, 'USD': 15, 'EUR': 14 },
      popular: true,
      features: packagesData.pro.features
    },
    {
      id: 'studio',
      name: packagesData.studio.name,
      credits: 250,
      prices: { 'TRY': 1500, 'USD': 45, 'EUR': 42 },
      features: packagesData.studio.features
    },
    {
      id: 'enterprise',
      name: packagesData.enterprise.name,
      credits: 1000,
      prices: { 'TRY': 4500, 'USD': 150, 'EUR': 140 },
      features: packagesData.enterprise.features
    }
  ];

  const packagesToShow = user 
    ? rawPackages.filter(pkg => pkg.id !== 'free') 
    : rawPackages;

  const getPackageStyles = (pkg: CreditPackage) => {
    if (pkg.id === 'free') {
      return {
        color: "bg-gray-50 dark:bg-anthracite-800",
        textColor: "text-gray-900 dark:text-gray-200",
        btnColor: "bg-white dark:bg-anthracite-700 text-black dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-100",
        border: "border-gray-200 dark:border-white/10 border-dashed"
      };
    }
    if (pkg.popular) {
      return {
        color: "bg-black dark:bg-white text-white dark:text-black",
        textColor: "text-white dark:text-black",
        btnColor: "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
        border: "border-black dark:border-white"
      };
    }
    return {
      color: "bg-white dark:bg-anthracite-800",
      textColor: "text-gray-900 dark:text-white",
      btnColor: "bg-gray-100 dark:bg-anthracite-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-anthracite-600",
      border: "border-gray-200 dark:border-white/10"
    };
  };

  return (
    <section id="pricing" className="w-full py-20 bg-gray-50 dark:bg-anthracite-950 border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-black dark:text-white font-bold tracking-widest uppercase text-xs mb-2 block opacity-50">
             {lang === 'tr' ? 'Fiyatlandırma' : 'Pricing'}
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">{t.pricingTitle}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            {t.pricingDesc}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 items-stretch">
          {packagesToShow.map((pkg, i) => {
            const styles = getPackageStyles(pkg);
            const price = pkg.prices[currency];
            const priceDisplay = price === 0 
                ? (lang === 'tr' ? 'Ücretsiz' : 'Free') 
                : `${currencySymbol[currency]}${price}`;

            return (
              <div 
                key={i} 
                className={`relative flex flex-col w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(20%-1.5rem)] min-w-[240px] max-w-[320px] rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 border ${styles.border} ${styles.color} ${styles.textColor} ${pkg.popular ? 'shadow-2xl ring-1 ring-black/5 dark:ring-white/10 scale-105 z-10' : 'hover:shadow-lg dark:shadow-none'}`}
              >
                {/* PRO: Social Proof Badge (Monochrome) */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-white/20 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 w-max">
                    <Users className="w-3 h-3 fill-current" />
                    {t.mostPopular}
                  </div>
                )}
                
                {/* STARTER: Satisfaction Guarantee (Monochrome) */}
                {pkg.id === 'starter' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-anthracite-700 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1 w-max">
                    <ShieldCheck className="w-3 h-3" />
                    {t.satisfactionGuarantee}
                  </div>
                )}

                {/* FREE: Trial Badge (Monochrome) */}
                {pkg.id === 'free' && (
                   <div className="absolute -top-3 left-6 bg-gray-200 dark:bg-anthracite-600 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" />
                    {lang === 'tr' ? 'Deneme' : 'Trial'}
                  </div>
                )}

                <div className="mb-6 mt-2">
                  <h3 className={`text-lg font-bold mb-2 opacity-80`}>{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight">{priceDisplay}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1 text-left">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? 'bg-white/20 dark:bg-black/10' : (pkg.id === 'free' ? 'bg-gray-200 dark:bg-anthracite-600' : 'bg-gray-100 dark:bg-white/10')}`}>
                         <Check className={`w-3 h-3 ${pkg.popular ? (pkg.id === 'pro' ? 'text-current' : 'text-white') : 'text-black dark:text-white'}`} />
                      </div>
                      <span className="font-medium opacity-90 leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={onBuyClick}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 ${styles.btnColor}`}
                >
                  {pkg.id === 'free' 
                    ? (lang === 'tr' ? 'Hemen Başla' : 'Start Now') 
                    : t.purchase}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">
                {lang === 'tr' 
                    ? '* Kurumsal API erişimi ve özel çözümler için bizimle iletişime geçin.' 
                    : '* Contact us for Enterprise API access and custom solutions.'}
            </p>
        </div>

      </div>
    </section>
  );
};
