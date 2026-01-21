
import React from 'react';
import { X, BookOpen, Layers, Lightbulb, Package, Sun } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].help;
  const config = translations[lang].config;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-anthracite-950/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-anthracite-900 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden scale-100 transition-all duration-300 border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-900">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t.title}</h2>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">{t.subTitle}</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-anthracite-800 transition-colors group">
                <X className="w-6 h-6 text-gray-400 group-hover:text-black dark:hover:text-white transition-colors" />
            </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 bg-white dark:bg-anthracite-900 space-y-12">
            
            {/* 1. Categories Guide */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-6">
                    <Package className="w-5 h-5 text-black dark:text-white" />
                    {t.guide.catTitle}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(config.categories).map(([key, val]: [string, any]) => (
                        <div key={key} className="p-4 bg-gray-50 dark:bg-anthracite-800 rounded-2xl border border-gray-100 dark:border-white/5">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{val.label}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100 dark:bg-white/5"></div>

            {/* 2. Scenes Guide */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-6">
                    <Layers className="w-5 h-5 text-black dark:text-white" />
                    {t.guide.sceneTitle}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(config.scenes).map(([key, val]: [string, any]) => (
                        <div key={key} className="p-4 bg-gray-50 dark:bg-anthracite-800 rounded-2xl border border-gray-100 dark:border-white/5">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{val.label}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100 dark:bg-white/5"></div>

            {/* 3. Lighting Guide */}
            <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-6">
                    <Sun className="w-5 h-5 text-black dark:text-white" />
                    {t.guide.lightTitle}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(config.lighting).map(([key, val]: [string, any]) => (
                        <div key={key} className="p-4 bg-gray-50 dark:bg-anthracite-800 rounded-2xl border border-gray-100 dark:border-white/5">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{val.label}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pro Tips Box (Monochrome) */}
            <div className="bg-gray-50 dark:bg-anthracite-800 rounded-2xl p-8 border border-gray-200 dark:border-white/5 relative overflow-hidden mt-8">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-white/10">
                             <Lightbulb className="w-5 h-5 text-black dark:text-white" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t.tipsTitle}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {t.tips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 bg-black dark:bg-white rounded-full flex-shrink-0"></span>
                                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 flex justify-end bg-gray-50/50 dark:bg-anthracite-900">
            <button 
                onClick={onClose}
                className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-lg"
            >
                {t.btn}
            </button>
        </div>
      </div>
    </div>
  );
};
