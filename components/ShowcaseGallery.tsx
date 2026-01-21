
import React, { useState, useEffect } from 'react';
import { Language, GalleryItem } from '../types';
import { translations } from '../translations';
import { X, ZoomIn, ChevronRight, Tag, Layers, Zap, ScanLine, ArrowRightLeft } from 'lucide-react';
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

  // Helper to get translated label directly from value
  const getTranslatedLabel = (type: 'category' | 'scene' | 'lighting', value: string) => {
    if (type === 'category') {
      const catData = configT.categories[value as keyof typeof configT.categories];
      return catData ? catData.label : value;
    } else if (type === 'scene') {
      const sceneData = configT.scenes[value as keyof typeof configT.scenes];
      return sceneData ? sceneData.label : value;
    } else {
      const lightData = configT.lighting[value as keyof typeof configT.lighting];
      return lightData ? lightData.label : value;
    }
  };

  return (
    <>
      <section className="w-full py-20" id="showcase">
        <div className="text-center mb-16">
          <span className="text-black dark:text-white font-bold tracking-widest uppercase text-xs mb-2 block opacity-50">
            {lang === 'tr' ? 'Galeri' : 'Gallery'}
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
            {lang === 'tr' ? 'Stüdyo Örnekleri' : 'Studio Examples'}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            {lang === 'tr' 
              ? 'Yapay zeka stüdyomuzla oluşturulan gerçek çalışmalar. Ayarları ve öncesi/sonrası halini görmek için tıklayın.' 
              : 'Real works created with our AI studio. Click to see the settings and before/after comparison.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {SHOWCASE_ITEMS.map((ex) => {
            const categoryLabel = getTranslatedLabel('category', ex.category);
            const sceneLabel = getTranslatedLabel('scene', ex.scene);
            const lightingLabel = getTranslatedLabel('lighting', ex.lighting);

            return (
              <div 
                key={ex.id} 
                onClick={() => setSelectedExample(ex)}
                className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer bg-white dark:bg-anthracite-800 shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image */}
                <img src={ex.afterImage} alt={ex.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Top Badge: Trust Signal (Monochrome) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                    <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5 border border-white/10">
                        <ScanLine className="w-3 h-3" />
                        {t.generatedFrom}
                    </span>
                </div>

                {/* Center Action Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                   <div className="bg-white text-black p-4 rounded-full shadow-2xl transform scale-50 group-hover:scale-100 transition-transform">
                      <ArrowRightLeft className="w-6 h-6" />
                   </div>
                </div>

                {/* Bottom: The Recipe (Monochrome) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">
                        {t.settingsUsed}
                    </p>
                    <div className="flex flex-col gap-1.5 items-start">
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-md text-white text-[10px] font-bold">
                            <Tag className="w-3 h-3" /> {categoryLabel}
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-md text-white text-[10px] font-bold">
                            <Layers className="w-3 h-3" /> {sceneLabel}
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-md text-white text-[10px] font-bold">
                            <Zap className="w-3 h-3" /> {lightingLabel}
                        </div>
                    </div>
                </div>

                {/* Default State Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                   <p className="text-white font-bold text-sm truncate shadow-black drop-shadow-md">{ex.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
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
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{t.studioRecipe}</span>
                    <div className="hidden sm:block w-[1px] h-3 bg-white/10"></div>
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                        <span className="opacity-100">{getTranslatedLabel('category', selectedExample.category)}</span>
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <span className="opacity-100">{getTranslatedLabel('scene', selectedExample.scene)}</span>
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <span className="opacity-100 text-white">{getTranslatedLabel('lighting', selectedExample.lighting)}</span>
                    </div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-1 tracking-tight">{selectedExample.title}</h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-2 animate-pulse">{t.dragCompare}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
