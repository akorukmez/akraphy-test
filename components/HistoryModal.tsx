
import React, { useEffect, useState } from 'react';
import { X, History, Trash2, Calendar, Clock, Layers, Zap, Tag, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { Language, HistoryItem, ProductCategory, SceneType, LightingType } from '../types';
import { translations } from '../translations';
import { historyService } from '../services/historyService';
import { ImageViewer } from './ImageViewer';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, lang }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const t = translations[lang];
  const tHist = t.history;

  useEffect(() => {
    if (isOpen) {
      setHistoryItems(historyService.getHistory());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = historyService.deleteFromHistory(id);
    setHistoryItems(updated);
  };

  // Helper to translate labels
  const getTranslatedLabel = (type: 'category' | 'scene' | 'lighting', value: string) => {
    const configT = t.config;
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

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return {
        date: date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US'),
        time: date.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <>
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white dark:bg-anthracite-900 rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in duration-300 border border-transparent dark:border-white/10">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-950">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <History className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{tHist.title}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{tHist.subtitle}</p>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-anthracite-800 transition-colors group"
                >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-gray-50 dark:bg-anthracite-900">
                {historyItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tHist.empty}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{tHist.emptyDesc}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {historyItems.map((item) => {
                            const dt = formatDate(item.timestamp);
                            return (
                                <div 
                                    key={item.id} 
                                    className="group relative bg-white dark:bg-anthracite-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {/* Image Area */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-anthracite-900">
                                        <img src={item.imageUrl} alt="Generated" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <ZoomIn className="w-3.5 h-3.5 text-black" />
                                                <span className="text-[10px] font-bold text-black uppercase">{t.download}</span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={(e) => handleDelete(e, item.id)}
                                            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg z-10"
                                            title={tHist.delete}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Info Area */}
                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{dt.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{dt.time}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                                                <Tag className="w-3.5 h-3.5 text-blue-500" />
                                                <span className="truncate">{getTranslatedLabel('category', item.category)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                                                <Layers className="w-3.5 h-3.5 text-purple-500" />
                                                <span className="truncate">{getTranslatedLabel('scene', item.scene)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                                                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                                                <span className="truncate">{getTranslatedLabel('lighting', item.lighting)}</span>
                                            </div>
                                        </div>

                                        {item.variation && (
                                            <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                                                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-[9px] font-bold text-gray-500 dark:text-gray-400">
                                                    {item.variation}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
        </div>

        {/* Reusing ImageViewer for full screen */}
        {selectedItem && (
            <ImageViewer 
                isOpen={!!selectedItem}
                images={[selectedItem.imageUrl]}
                onClose={() => setSelectedItem(null)}
                lang={lang}
                alt="History Item"
                category={selectedItem.category}
                scenes={[selectedItem.scene]}
                lighting={selectedItem.lighting}
            />
        )}
    </>
  );
};
