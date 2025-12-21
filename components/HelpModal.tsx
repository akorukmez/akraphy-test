
import React from 'react';
import { X, Upload, Sliders, Wand2, Lightbulb, BookOpen, Layers, Eraser } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].help;

  if (!isOpen) return null;

  const icons = [Upload, Sliders, Wand2];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-anthracite-950/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-anthracite-900 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden scale-100 transition-all duration-300 border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto flex flex-col">
        
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

        <div className="p-8 md:p-10 bg-white dark:bg-anthracite-900">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16 relative">
                <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-gray-100 dark:bg-anthracite-800 -z-10"></div>
                
                {t.steps.map((step, idx) => {
                    const Icon = icons[idx];
                    return (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white dark:bg-anthracite-800 shadow-md border border-gray-200 dark:border-white/10 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                                <Icon className="w-7 h-7 text-gray-900 dark:text-white" strokeWidth={1.5} />
                                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold border-2 border-white dark:border-anthracite-900">
                                    {idx + 1}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[250px]">{step.desc}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center gap-3 mb-3">
                  <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-blue-900 dark:text-blue-100">Toplu Çekim (Batch Mode)</h4>
                </div>
                <p className="text-sm text-blue-800/80 dark:text-blue-200/80 leading-relaxed">
                  Aynı ürün için tek seferde 5 farklı stüdyo ortamı oluşturabilirsiniz. Ayarlar panelindeki anahtarı açın ve istediğiniz sahneleri seçin. Her sahne 1 kredi harcar.
                </p>
              </div>
              <div className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-3xl border border-purple-100 dark:border-purple-800/50">
                <div className="flex items-center gap-3 mb-3">
                  <Eraser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-bold text-purple-900 dark:text-purple-100">Dekupe Modu</h4>
                </div>
                <p className="text-sm text-purple-800/80 dark:text-purple-200/80 leading-relaxed">
                  Sadece arkaplanı temizlemek istiyorsanız "Arkaplan Sil" modunu seçin. Motorumuz ürünü ortamdan ayırarak şeffaf bir PNG çıktısı hazırlayacaktır.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-anthracite-800 dark:to-anthracite-800/50 rounded-2xl p-8 border border-blue-100 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                             <Lightbulb className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                        </div>
                        <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">{t.tipsTitle}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {t.tips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <p className="text-sm text-blue-800 dark:text-blue-200/80 font-medium leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

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
