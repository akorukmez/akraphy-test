
import React from 'react';
import { ProductCategory, SceneType, LightingType, Language } from '../types';
import { translations } from '../translations';
import { 
  Gem, SprayCan, Gift, Smartphone, Box, 
  ShoppingBag, Moon, Sun, Table, BoxSelect, Eraser,
  Zap, CloudFog, Sunrise, Target, CheckCircle2
} from 'lucide-react';

interface StyleSelectorProps {
  selectedCategory: ProductCategory;
  selectedScenes: SceneType[];
  selectedLighting: LightingType;
  onSelectCategory: (c: ProductCategory) => void;
  onSelectScenes: (s: SceneType[]) => void;
  onSelectLighting: (l: LightingType) => void;
  disabled: boolean;
  lang: Language;
  isBatchMode: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedCategory, selectedScenes, selectedLighting,
  onSelectCategory, onSelectScenes, onSelectLighting,
  disabled, lang, isBatchMode
}) => {
  const t = translations[lang].config;

  const handleSceneToggle = (scene: SceneType) => {
    let nextScenes = [...selectedScenes];

    if (isBatchMode) {
      if (nextScenes.includes(scene)) {
        if (nextScenes.length > 1) {
          onSelectScenes(nextScenes.filter(s => s !== scene));
        }
      } else if (nextScenes.length < 5) {
        onSelectScenes([...nextScenes, scene]);
      }
    } else {
      onSelectScenes([scene]);
    }
  };

  const getCategoryIcon = (key: string) => {
    switch(key) {
      case 'JEWELRY': return Gem; // Takı
      case 'COSMETICS': return SprayCan; // Kozmetik
      case 'SMALL_GOODS': return Gift; // Küçük Ürünler
      case 'TECH': return Smartphone; // Teknoloji
      case 'GENERAL': return Box; // Genel
      default: return Box;
    }
  };

  const getSceneIcon = (key: string) => {
    switch(key) {
      case 'PURE_STUDIO': return ShoppingBag; 
      case 'DARK_PREMIUM': return Moon; 
      case 'SOFT_GRADIENT': return Sunrise; 
      case 'TABLETOP_MINIMAL': return Table;
      case 'FLOATING_OBJECT': return BoxSelect;
      case 'TRANSPARENT': return Eraser;
      default: return Box;
    }
  };

  const getLightingIcon = (key: string) => {
    switch(key) {
        case 'SOFTBOX': return Box;
        case 'DIRECTIONAL': return Target;
        case 'HIGH_KEY': return Sun;
        case 'MOODY': return CloudFog;
        default: return Sun;
    }
  };

  return (
    <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Category Section */}
      <div className="w-full">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">{t.categoryTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {Object.entries(ProductCategory).map(([key, value]) => {
            const catData = t.categories[value as keyof typeof t.categories];
            if (!catData) return null; // Safety check

            const label = catData.label;
            const desc = catData.desc;
            const Icon = getCategoryIcon(key);
            const isSelected = selectedCategory === value;
            return (
              <button 
                key={key} 
                onClick={() => onSelectCategory(value)} 
                disabled={disabled} 
                className={`flex flex-col items-start p-4 rounded-2xl transition-all border h-full ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg scale-[1.02]' : 'bg-gray-50/50 dark:bg-anthracite-900/30 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-anthracite-700'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'scale-110' : ''}`} />
                    <span className="text-xs font-bold leading-tight text-left">{label}</span>
                </div>
                <span className={`text-[10px] text-left leading-snug ${isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400 dark:text-gray-500'}`}>
                    {desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scene Section */}
      <div className="w-full">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">
          {t.sceneTitle} {isBatchMode && <span className="text-blue-500 ml-1">({selectedScenes.length}/5)</span>}
        </h3>
        {/* Changed grid layout to match categories style but kept 3 columns for better spacing given 6 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {Object.entries(SceneType).map(([key, value]) => {
             const sceneData = t.scenes[value as keyof typeof t.scenes];
             if (!sceneData) return null;
             
             const label = sceneData.label;
             const desc = sceneData.desc;
             const Icon = getSceneIcon(key);
             const isSelected = selectedScenes.includes(value);

            return (
              <button 
                key={key} 
                onClick={() => handleSceneToggle(value)} 
                disabled={disabled} 
                className={`flex flex-col items-start gap-1 p-4 rounded-2xl text-left transition-all border ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg scale-[1.02]' : 'bg-gray-50/50 dark:bg-anthracite-900/30 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-anthracite-700'}`}
              >
                <div className="flex items-center gap-2 mb-1 w-full justify-between">
                    <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">{label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-500 fill-white dark:fill-anthracite-900" />}
                </div>
                <span className={`text-[10px] leading-snug ${isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400 dark:text-gray-500'}`}>
                    {desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting Section */}
      <div className="w-full animate-in fade-in duration-500">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">{t.lightingTitle}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {Object.entries(LightingType).map(([key, value]) => {
              const lightData = t.lighting[value as keyof typeof t.lighting];
              if (!lightData) return null;

              const label = lightData.label;
              const desc = lightData.desc;
              const Icon = getLightingIcon(key);
              const isSelected = selectedLighting === value;
              return (
                <button 
                  key={key} 
                  onClick={() => onSelectLighting(value)} 
                  disabled={disabled} 
                  className={`flex flex-col items-start gap-1 p-4 rounded-2xl text-left transition-all border ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg scale-[1.02]' : 'bg-gray-50/50 dark:bg-anthracite-900/30 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-anthracite-700'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">{label}</span>
                  </div>
                  <span className={`text-[10px] leading-snug ${isSelected ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400 dark:text-gray-500'}`}>
                      {desc}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

    </div>
  );
};
