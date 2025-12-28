
import React, { useEffect, useState, useRef } from 'react';
import { X, History, Trash2, Calendar, Clock, Layers, Zap, Tag, ZoomIn, Image as ImageIcon, LayoutGrid, List, Search, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { Language, HistoryItem, ProductCategory, SceneType, LightingType } from '../types';
import { translations } from '../translations';
import { historyService } from '../services/historyService';
import { ImageViewer } from './ImageViewer';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

type SortBy = 'date' | 'category' | 'scene';
type SortOrder = 'asc' | 'desc';

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, lang }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filtering & Sorting State
  const [filterQuery, setFilterQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

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

  // Click outside for sort menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
    if (isSortMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSortMenuOpen]);

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

  // 1. Filter Logic
  const filteredItems = historyItems.filter(item => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    
    const cat = getTranslatedLabel('category', item.category).toLowerCase();
    const scn = getTranslatedLabel('scene', item.scene).toLowerCase();
    const lgt = getTranslatedLabel('lighting', item.lighting).toLowerCase();
    const vari = (item.variation || '').toLowerCase();
    
    return cat.includes(q) || scn.includes(q) || lgt.includes(q) || vari.includes(q);
  });

  // 2. Sort Logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    let valA: string | number, valB: string | number;

    switch(sortBy) {
        case 'category':
            valA = getTranslatedLabel('category', a.category);
            valB = getTranslatedLabel('category', b.category);
            break;
        case 'scene':
            valA = getTranslatedLabel('scene', a.scene);
            valB = getTranslatedLabel('scene', b.scene);
            break;
        default: // date
            valA = new Date(a.timestamp).getTime();
            valB = new Date(b.timestamp).getTime();
            break;
    }

    if (sortBy === 'date') {
        // Numeric sort for timestamp
        return sortOrder === 'asc' 
            ? (valA as number) - (valB as number) 
            : (valB as number) - (valA as number);
    } else {
        // String sort for labels
        return sortOrder === 'asc' 
            ? (valA as string).localeCompare(valB as string) 
            : (valB as string).localeCompare(valA as string);
    }
  });

  const sortOptions = [
    { key: 'date_desc', label: tHist.sort.newest, by: 'date', order: 'desc' },
    { key: 'date_asc', label: tHist.sort.oldest, by: 'date', order: 'asc' },
    { key: 'cat_asc', label: tHist.sort.catAZ, by: 'category', order: 'asc' },
    { key: 'cat_desc', label: tHist.sort.catZA, by: 'category', order: 'desc' },
    { key: 'scn_asc', label: tHist.sort.sceneAZ, by: 'scene', order: 'asc' },
    { key: 'scn_desc', label: tHist.sort.sceneZA, by: 'scene', order: 'desc' },
  ];

  const currentSortLabel = sortOptions.find(o => o.by === sortBy && o.order === sortOrder)?.label || tHist.sort.newest;

  return (
    <>
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white dark:bg-anthracite-900 rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in duration-300 border border-transparent dark:border-white/10">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-950">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <History className="w-6 h-6 text-white dark:text-black" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{tHist.title}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{tHist.subtitle}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="flex bg-white dark:bg-anthracite-800 rounded-lg p-1 border border-gray-200 dark:border-white/10 mr-2">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    <button 
                        onClick={onClose} 
                        className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-anthracite-800 transition-colors group"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Filter & Sort Toolbar */}
            <div className="px-6 md:px-8 py-4 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-white dark:bg-anthracite-900 z-10 shadow-sm/50">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder={tHist.searchPlaceholder}
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="relative min-w-[180px]" ref={sortMenuRef}>
                    <button 
                        onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                        className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-gray-50 dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-anthracite-700 transition-colors"
                    >
                        <div className="flex items-center gap-2 truncate">
                            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                            <span>{currentSortLabel}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSortMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isSortMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95">
                             <div className="px-4 py-2 bg-gray-50 dark:bg-anthracite-950 border-b border-gray-100 dark:border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                {tHist.sortTitle}
                             </div>
                             {sortOptions.map(opt => {
                                 const isActive = sortBy === opt.by && sortOrder === opt.order;
                                 return (
                                     <button
                                        key={opt.key}
                                        onClick={() => {
                                            setSortBy(opt.by as SortBy);
                                            setSortOrder(opt.order as SortOrder);
                                            setIsSortMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-gray-50 dark:hover:bg-anthracite-700 transition-colors ${isActive ? 'text-black dark:text-white bg-gray-50 dark:bg-anthracite-700/50' : 'text-gray-600 dark:text-gray-300'}`}
                                     >
                                        {opt.label}
                                        {isActive && <Check className="w-3.5 h-3.5 text-blue-500" />}
                                     </button>
                                 );
                             })}
                        </div>
                    )}
                </div>
            </div>

            {/* Content List/Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-gray-50 dark:bg-anthracite-900">
                {sortedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        {filterQuery ? (
                            <>
                                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Sonuç Bulunamadı</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Arama kriterlerinize uygun kayıt yok.</p>
                            </>
                        ) : (
                            <>
                                <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tHist.empty}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{tHist.emptyDesc}</p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {sortedItems.map((item) => {
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
                        ) : (
                            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {sortedItems.map((item) => {
                                    const dt = formatDate(item.timestamp);
                                    return (
                                        <div 
                                            key={item.id} 
                                            className="group flex items-center gap-4 bg-white dark:bg-anthracite-800 p-3 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-anthracite-700/50 transition-colors cursor-pointer"
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-anthracite-900 rounded-xl overflow-hidden">
                                                 <img src={item.imageUrl} alt="Thumb" className="w-full h-full object-cover" />
                                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                     <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                 </div>
                                            </div>

                                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                                <div className="col-span-1">
                                                     <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                                        {t.config.categoryTitle.split('.')[1]}
                                                     </div>
                                                     <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                                        <Tag className="w-3.5 h-3.5 text-blue-500" />
                                                        {getTranslatedLabel('category', item.category)}
                                                     </div>
                                                </div>
                                                
                                                <div className="col-span-1">
                                                     <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                                        {t.config.sceneTitle.split('.')[1]}
                                                     </div>
                                                     <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                                        <Layers className="w-3.5 h-3.5 text-purple-500" />
                                                        {getTranslatedLabel('scene', item.scene)}
                                                     </div>
                                                </div>

                                                <div className="hidden md:block col-span-1">
                                                     <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                                        {t.variation}
                                                     </div>
                                                     <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                        {item.variation || '-'}
                                                     </div>
                                                </div>

                                                <div className="hidden md:block col-span-1 text-right">
                                                     <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                                        {tHist.date}
                                                     </div>
                                                     <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                        {dt.date} {dt.time}
                                                     </div>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={(e) => handleDelete(e, item.id)}
                                                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                                title={tHist.delete}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </>
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
