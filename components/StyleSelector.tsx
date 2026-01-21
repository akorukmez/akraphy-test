
import React from 'react';
import { ProductCategory, SceneType, LightingType, Language } from '../types';
import { translations } from '../translations';
import { 
  Gem, SprayCan, Gift, Smartphone, Box, 
  ShoppingBag, Moon, Sun, Table, BoxSelect, Eraser,
  Zap, CloudFog, Sunrise, Target, CheckCircle2,
  Aperture, Wand2, Palette
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

  const handlePresetSelect = (preset: any) => {
    onSelectCategory(preset.cat);
    onSelectScenes([preset.scene]);
    onSelectLighting(preset.light);
  };

  const PRESETS = [
    {
        id: 'amazon',
        label: t.presets.amazon.label,
        desc: t.presets.amazon.desc,
        cat: ProductCategory.GENERAL,
        scene: SceneType.PURE_STUDIO,
        light: LightingType.SOFTBOX,
        icon: ShoppingBag
    },
    {
        id: 'social',
        label: t.presets.social.label,
        desc: t.presets.social.desc,
        cat: ProductCategory.COSMETICS,
        scene: SceneType.SOFT_GRADIENT,
        light: LightingType.HIGH_KEY,
        icon: Aperture
    },
    {
        id: 'luxury',
        label: t.presets.luxury.label,
        desc: t.presets.luxury.desc,
        cat: ProductCategory.JEWELRY,
        scene: SceneType.DARK_PREMIUM,
        light: LightingType.DIRECTIONAL,
        icon: Gem
    },
    {
        id: 'transparent',
        label: t.presets.transparent.label,
        desc: t.presets.transparent.desc,
        cat: ProductCategory.GENERAL,
        scene: SceneType.TRANSPARENT,
        light: LightingType.SOFTBOX,
        icon: Eraser
    }
  ];

  const getCategoryIcon = (key: string) => {
    switch(key) {
      case 'JEWELRY': return Gem; 
      case 'COSMETICS': return SprayCan; 
      case 'SMALL_GOODS': return Gift; 
      case 'TECH': return Smartphone; 
      case 'GENERAL': return Box; 
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
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 0. Quick Start Presets (Monochrome) */}
      <div className="w-full">
         <div className="flex items-center gap-2 mb-4 ml-1">
            <Wand2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                {t.presetsTitle}
            </h3>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESETS.map((preset) => (
                <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    disabled={disabled}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all shadow-sm group"
                >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-anthracite-700 text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors border border-gray-100 dark:border-white/5">
                        <preset.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold text-gray-900 dark:text-white">{preset.label}</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">{preset.desc}</div>
                    </div>
                </button>
            ))}
         </div>
      </div>

      <div className="w-full h-[1px] bg-gray-100 dark:bg-white/5"></div>

      {/* 1. Category Section (Monochrome) */}
      <div className="w-full">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">{t.categoryTitle}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          {Object.entries(ProductCategory).map(([key, value]) => {
            const catData = t.categories[value as keyof typeof t.categories];
            if (!catData) return null;

            const label = catData.label;
            const desc = catData.desc;
            const Icon = getCategoryIcon(key);
            const isSelected = selectedCategory === value;
            return (
              <button 
                key={key} 
                onClick={() => onSelectCategory(value)} 
                disabled={disabled} 
                className={`flex flex-col items-start p-4 rounded-xl transition-all border h-full 
                    ${isSelected 
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg' 
                        : 'bg-white dark:bg-anthracite-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:text-black dark:hover:text-white'}`}
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

      {/* 2. Scene Section (Monochrome / Architectural) */}
      <div className="w-full">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 ml-1">
          {t.sceneTitle} {isBatchMode && <span className="text-black dark:text-white ml-1">({selectedScenes.length}/5)</span>}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {Object.entries(SceneType).map(([key, value]) => {
             const sceneData = t.scenes[value as keyof typeof t.scenes];
             if (!sceneData) return null;
             
             const label = sceneData.label;
             const desc = sceneData.desc;
             const Icon = getSceneIcon(key);
             const isSelected = selectedScenes.includes(value);

             // Monochrome Background Logic
             let bgClass = "bg-white dark:bg-anthracite-900";
             if (key === 'PURE_STUDIO') bgClass = "bg-gray-50 dark:bg-anthracite-800";
             if (key === 'DARK_PREMIUM') bgClass = "bg-gray-900 text-white";
             if (key === 'SOFT_GRADIENT') bgClass = "bg-gradient-to-br from-gray-50 to-gray-200 dark:from-anthracite-800 dark:to-anthracite-700";
             if (key === 'TRANSPARENT') bgClass = "bg-[url('https://www.transparenttextures.com/patterns/checkerboard-cross.png')] bg-repeat";

            return (
              <button 
                key={key} 
                onClick={() => handleSceneToggle(value)} 
                disabled={disabled} 
                className={`relative group overflow-hidden flex flex-col items-start gap-1 p-5 rounded-xl text-left transition-all border h-32 justify-end 
                    ${isSelected 
                        ? 'border-2 border-black dark:border-white shadow-xl scale-[1.02]' 
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'} 
                    ${bgClass}`}
              >
                {/* Checkbox badge for batch mode (Black/White) */}
                {isSelected && (
                    <div className="absolute top-3 right-3 bg-black dark:bg-white text-white dark:text-black p-1 rounded-full shadow-md z-10">
                        <CheckCircle2 className="w-3 h-3" />
                    </div>
                )}
                
                {/* Content Overlay */}
                <div className={`relative z-10 w-full ${key === 'DARK_PREMIUM' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 opacity-80" />
                        <span className="text-xs font-extrabold uppercase tracking-tight">{label}</span>
                    </div>
                    <span className={`text-[10px] block leading-tight opacity-70`}>
                        {desc}
                    </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Lighting Section (Monochrome Gradients) */}
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

              // Visual representation of light (Grayscale)
              let gradient = "";
              if (key === 'SOFTBOX') gradient = "bg-gradient-to-tr from-gray-100 to-white dark:from-anthracite-800 dark:to-anthracite-700";
              if (key === 'DIRECTIONAL') gradient = "bg-gradient-to-l from-gray-300 to-gray-100 dark:from-black dark:to-anthracite-800";
              if (key === 'HIGH_KEY') gradient = "bg-white border border-gray-200";
              if (key === 'MOODY') gradient = "bg-gradient-to-br from-black to-gray-800 text-white";

              // Determine text color based on background logic
              let textColorClass = 'text-gray-900 dark:text-white';
              if (key === 'MOODY') textColorClass = 'text-white';
              if (key === 'HIGH_KEY') textColorClass = 'text-gray-900';

              return (
                <button 
                  key={key} 
                  onClick={() => onSelectLighting(value)} 
                  disabled={disabled} 
                  className={`flex flex-col items-start gap-1 p-4 rounded-xl text-left transition-all border 
                    ${isSelected 
                        ? 'ring-2 ring-black dark:ring-white scale-[1.02] shadow-md' 
                        : 'border-transparent hover:scale-[1.01] hover:border-gray-300 dark:hover:border-white/20'}
                    ${gradient}
                  `}
                >
                  <div className={`flex items-center gap-2 mb-1 ${textColorClass}`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">{label}</span>
                  </div>
                  <span className={`text-[10px] leading-snug opacity-70 ${key === 'MOODY' ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
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
