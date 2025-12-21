
import React, { useState, useEffect } from 'react';
import { Language, GalleryItem, ProductCategory, SceneType, LightingType } from '../types';
import { translations } from '../translations';
import { X, ZoomIn, ChevronRight } from 'lucide-react';
import { ComparisonSlider } from './ComparisonSlider';
import { SHOWCASE_ITEMS } from '../data/galleryData';

interface ShowcaseGalleryProps {
  lang: Language;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ lang }) => {
  const t = translations[lang];
  const configT = t.config;
  const [selectedExample, setSelectedExample] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (selectedExample) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedExample]);

  // Helper to get translated label from enum value
  const getTranslatedLabel = (type: 'category' | 'scene' | 'lighting', value: string) => {
    let key: string | undefined;
    
    if (type === 'category') {
      key = Object.keys(ProductCategory).find(k => ProductCategory[k as keyof typeof ProductCategory] === value);
      return key ? configT.categories[key as keyof typeof configT.categories] : value;
    } else if (type === 'scene') {
      key = Object.keys(SceneType).find(k => SceneType[k as keyof typeof SceneType] === value);
      return key ? configT.scenes[key as keyof typeof configT.scenes] : value;
    } else {
      key = Object.keys(LightingType).find(k => LightingType[k as keyof typeof LightingType] === value);
      return key ? configT.lighting[key as keyof typeof configT.lighting] : value;
    }
  };

  return (
    <>
      <section className="w-full py-20" id="showcase">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs mb-2 block">
            {lang === 'tr' ? 'Galeri' : 'Gallery'}
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
            {lang === 'tr' ? 'Stüdyo Örnekleri' : 'Studio Examples'}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            {lang === 'tr' 
              ? 'Yapay zeka stüdyomuzla oluşturulan gerçek çalışmalar. Ayarları görmek için tıklayın.' 
              : 'Real works created with our AI studio. Click to see the settings used.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {SHOWCASE_ITEMS.map((ex) => (
            <div 
              key={ex.id} 
              onClick={() => setSelectedExample(ex)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-anthracite-800 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img src={ex.afterImage} alt={ex.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <ZoomIn className="w-4 h-4 text-black" />
                    <span className="text-xs font-bold text-black uppercase tracking-wide">{lang === 'tr' ? 'Ayarları Gör' : 'View Settings'}</span>
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-bold truncate opacity-80">{getTranslatedLabel('category', ex.category)}</p>
                <p className="text-white text-[10px] font-medium truncate opacity-60">{getTranslatedLabel('scene', ex.scene)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedExample && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedExample(null)}></div>

          <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-end px-6 z-[220] pointer-events-none">
             <button onClick={() => setSelectedExample(null)} className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group">
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-12 z-[210] pointer-events-none">
            <div className="pointer-events-auto relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 animate-in zoom-in-95 duration-300">
                <div className="relative w-full h-full max-h-[70vh] aspect-[16/9] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
                    <ComparisonSlider 
                        beforeImage={selectedExample.beforeImage}
                        afterImage={selectedExample.afterImage}
                        beforeLabel={t.originalSource}
                        afterLabel={t.aiResult}
                        beforeImageClassName="grayscale brightness-90 contrast-75 blur-[1px]" 
                    />
                </div>
            </div>

            <div className="pointer-events-auto mt-4 flex flex-col items-center text-center">
                <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 mb-4 shadow-xl">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{lang === 'tr' ? 'STÜDYO REÇETESİ' : 'STUDIO RECIPE'}</span>
                    <div className="hidden sm:block w-[1px] h-3 bg-white/10"></div>
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                        <span className="opacity-100">{getTranslatedLabel('category', selectedExample.category)}</span>
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <span className="opacity-100">{getTranslatedLabel('scene', selectedExample.scene)}</span>
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <span className="opacity-100 text-blue-400">{getTranslatedLabel('lighting', selectedExample.lighting)}</span>
                    </div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-1 tracking-tight">{selectedExample.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
