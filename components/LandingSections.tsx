
import React, { useState } from 'react';
import { Language, Currency, User } from '../types';
import { translations } from '../translations';
import { Zap, LayoutTemplate, Aperture, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { ComparisonSlider } from './ComparisonSlider';
import { ShowcaseGallery } from './ShowcaseGallery';
import { PricingSection } from './PricingSection';
import { LANDING_COMPARISON } from '../data/galleryData';

interface LandingSectionsProps {
  lang: Language;
  currency?: Currency;
  user: User | null;
  onOpenPricing: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({ lang, currency = 'TRY', user, onOpenPricing }) => {
  const t = translations[lang].landing;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const features = [
    { icon: Zap, ...t.features[0] },
    { icon: Aperture, ...t.features[1] },
    { icon: LayoutTemplate, ...t.features[2] },
    { icon: ShieldCheck, ...t.features[3] },
  ];

  return (
    <div className="w-full flex flex-col gap-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">{t.featuresTitle}</h2>
          <div className="w-20 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="group bg-white dark:bg-anthracite-800 p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start">
                <div className="w-14 h-14 bg-gray-50 dark:bg-anthracite-700 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black rounded-2xl flex items-center justify-center mb-6 text-black dark:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs mb-2 block">Stüdyo Kalitesi</span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">{t.comparisonTitle}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">{t.comparisonDesc}</p>
        </div>
        <div className="w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-gray-100 dark:bg-anthracite-800">
             <ComparisonSlider 
                beforeImage={LANDING_COMPARISON.before} 
                afterImage={LANDING_COMPARISON.after} 
                beforeLabel={translations[lang].originalSource}
                afterLabel={translations[lang].aiResult}
                beforeImageClassName="grayscale brightness-90 contrast-75 blur-[1px]" 
             />
        </div>
      </section>

      {/* Reordered to: Gallery > Pricing > FAQ */}
      <ShowcaseGallery lang={lang} />
      
      <PricingSection lang={lang} onBuyClick={onOpenPricing} currency={currency} user={user} />

      <section id="faq" className="max-w-3xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">{t.faqTitle}</h2>
        </div>
        <div className="space-y-4">
          {t.faq.map((item, i) => (
            <div key={i} className={`bg-white dark:bg-anthracite-800 border rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === i ? 'border-black dark:border-white shadow-lg ring-1 ring-black dark:ring-white' : 'border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20'}`}>
              <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-anthracite-700 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.q}</h3>
                {openFaqIndex === i ? <ChevronUp className="w-5 h-5 text-gray-900 dark:text-white" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              <div className={`px-6 text-gray-500 dark:text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-64 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
