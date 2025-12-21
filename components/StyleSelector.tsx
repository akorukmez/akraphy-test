
import React from 'react';
import { ProductCategory, SceneType, LightingType, Language } from '../types';
import { translations } from '../translations';
import { 
  Gem, Shirt, Palette, Armchair, SprayCan, BookOpen, Smartphone, Baby, Coffee, Car, 
  ShoppingBag, Moon, Sun, Palette as ArtPalette, Building2, Layers, TreeDeciduous, Waves,
  Box, Zap, Aperture, CloudFog, Sunrise, Lightbulb, Target, CheckCircle2, Eraser
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
  const isTransparentActive = selectedScenes.includes(SceneType.TRANSPARENT);

  const handleSceneToggle = (scene: SceneType) => {
    if (scene === SceneType.TRANSPARENT) {
      onSelectScenes([SceneType.TRANSPARENT]);
      return;
    }

    let nextScenes = [...selectedScenes];
    if (nextScenes.includes(SceneType.TRANSPARENT)) {
      nextScenes = [];
    }

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
      case 'JEWELRY': return Gem;
      case 'FASHION': return Shirt;
      case 'HANDMADE': return Palette;
      case 'HOME': return Armchair;
      case 'BEAUTY': return SprayCan;
      case 'BOOKS': return BookOpen;
      case 'TECH': return Smartphone;
      case 'KIDS': return Baby;
      case 'FOOD': return Coffee;
      case 'AUTOMOTIVE': return Car;
      default: return Box;
    }
  };

  const getSceneIcon = (key: string) => {
    switch(key) {
      case 'TRANSPARENT': return Eraser;
      case 'CLEAN_WHITE': return ShoppingBag; 
      case 'LIFESTYLE_HOME': return Armchair; 
      case 'LUXURY_DARK': return Moon; 
      case 'OUTDOOR_NATURAL': return TreeDeciduous; 
      case 'PASTEL_CREATIVE': return ArtPalette; 
      case 'CONCRETE_URBAN': return Building2;
      case 'MARBLE_ELEGANCE': return Layers;
      case 'WOODEN_RUSTIC': return TreeDeciduous;
      case 'WATER_DYNAMIC': return Waves;
      case 'VELVET_SOFT': return Layers;
      default: return Box;
    }
  };

  const getLightingIcon = (key: string) => {
    switch(key) {
        case 'STUDIO_SOFT': return Box;
        case 'NATURAL_SUN': return Sun;
        case 'PROFESSIONAL_CRISP': return Zap;
        case 'MOODY_DIM': return CloudFog;
        case 'GOLDEN_HOUR': return Sunrise;
        case 'NEON_VIBE': return Lightbulb;
        case 'RIM_LIGHT': return Target;
        default: return Sun;
    }
  };

  return (
    <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Category Section */}
      <div className="w-full">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">{t.categoryTitle}</h3>
        <div className="flex flex-wrap gap-2.5 w-full">
          {Object.entries(ProductCategory).map(([key, value]) => {
            const label = t.categories[key as keyof typeof t.categories];
            const Icon = getCategoryIcon(key);
            const isSelected = selectedCategory === value;
            return (
              <button 
                key={key} 
                onClick={() => onSelectCategory(value)} 
                disabled={disabled} 
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[12px] font-bold transition-all border ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg scale-[1.01]' : 'bg-gray-50/50 dark:bg-anthracite-900/30 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-anthracite-700'}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'scale-110' : ''}`} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scene Section */}
      <div className="w-full">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">
          {t.sceneTitle} {isBatchMode && !isTransparentActive && <span className="text-blue-500 ml-1">({selectedScenes.length}/5)</span>}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
          {Object.entries(SceneType).map(([key, value]) => {
            const label = t.scenes[key as keyof typeof t.scenes];
            const Icon = getSceneIcon(key);
            const isSelected = selectedScenes.includes(value);
            return (
              <button 
                key={key} 
                onClick={() => handleSceneToggle(value)} 
                disabled={disabled} 
                className={`relative flex flex-col items-center justify-center p-4 h-32 rounded-[2.2rem] border transition-all duration-300 ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/10 dark:ring-blue-400/10 shadow-xl scale-[1.02] z-10' : 'bg-gray-50/50 dark:bg-anthracite-900/30 border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-anthracite-700/50 hover:shadow-xl'}`}
              >
                {isSelected && <CheckCircle2 className="absolute top-4 right-4 w-4 h-4 text-blue-500 fill-white dark:fill-anthracite-900" />}
                <Icon className={`w-7 h-7 mb-3 transition-colors ${isSelected ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
                <span className={`text-[9px] font-bold text-center leading-snug uppercase tracking-[0.1em] ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting Section */}
      {!isTransparentActive && (
        <div className="w-full animate-in fade-in duration-500">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">{t.lightingTitle}</h3>
          <div className="flex flex-wrap gap-3 bg-gray-50/50 dark:bg-anthracite-900/30 p-3 rounded-[2.2rem] border border-gray-100 dark:border-white/5 w-full">
            {Object.entries(LightingType).map(([key, value]) => {
              const label = t.lighting[key as keyof typeof t.lighting];
              const Icon = getLightingIcon(key);
              const isSelected = selectedLighting === value;
              return (
                <button 
                  key={key} 
                  onClick={() => onSelectLighting(value)} 
                  disabled={disabled} 
                  className={`flex items-center gap-2.5 py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all flex-grow sm:flex-grow-0 min-w-fit ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-[1.01] z-10' : 'bg-white dark:bg-anthracite-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-anthracite-700 border border-transparent hover:border-gray-200 dark:hover:border-white/10'}`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
