
import React from 'react';
import { ProductCategory, SceneType, LightingType, Language } from '../types';
import { translations } from '../translations';
import { 
  Gem, Shirt, Palette, Armchair, SprayCan, BookOpen, Smartphone, Baby, Coffee, Car, // Categories
  ShoppingBag, Moon, Sun, Palette as ArtPalette, Building2, Layers, TreeDeciduous, Waves, // Scenes
  Box, Zap, Aperture, CloudFog, Sunrise, Lightbulb, Target // Lighting
} from 'lucide-react';

interface StyleSelectorProps {
  selectedCategory: ProductCategory;
  selectedScene: SceneType;
  selectedLighting: LightingType;
  onSelectCategory: (c: ProductCategory) => void;
  onSelectScene: (s: SceneType) => void;
  onSelectLighting: (l: LightingType) => void;
  disabled: boolean;
  lang: Language;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedCategory, selectedScene, selectedLighting,
  onSelectCategory, onSelectScene, onSelectLighting,
  disabled, lang 
}) => {
  const t = translations[lang].config;

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
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">{t.categoryTitle}</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(ProductCategory).map(([key, value]) => {
            const label = t.categories[key as keyof typeof t.categories];
            const Icon = getCategoryIcon(key);
            const isSelected = selectedCategory === value;
            return (
              <button key={key} onClick={() => onSelectCategory(value)} disabled={disabled} className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg' : 'bg-white dark:bg-anthracite-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">{t.sceneTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(SceneType).map(([key, value]) => {
            const label = t.scenes[key as keyof typeof t.scenes];
            const Icon = getSceneIcon(key);
            const isSelected = selectedScene === value;
            return (
              <button key={key} onClick={() => onSelectScene(value)} disabled={disabled} className={`relative flex flex-col items-center justify-center p-4 h-28 rounded-2xl border transition-all ${isSelected ? 'bg-gray-50 dark:bg-anthracite-700 border-black dark:border-white ring-1 ring-black dark:ring-white shadow-md' : 'bg-white dark:bg-anthracite-800 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-anthracite-700/50'}`}>
                <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                <span className={`text-[10px] font-bold text-center leading-tight ${isSelected ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">{t.lightingTitle}</h3>
        <div className="bg-white dark:bg-anthracite-800 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-wrap gap-1">
          {Object.entries(LightingType).map(([key, value]) => {
            const label = t.lighting[key as keyof typeof t.lighting];
            const Icon = getLightingIcon(key);
            const isSelected = selectedLighting === value;
            return (
              <button key={key} onClick={() => onSelectLighting(value)} disabled={disabled} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-anthracite-700'}`}>
                <Icon className="w-3.5 h-3.5" /><span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
