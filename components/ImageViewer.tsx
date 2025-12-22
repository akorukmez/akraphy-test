
import React, { useEffect, useState, useRef } from 'react';
import { X, Download, ChevronDown, Check, Maximize, Smartphone, Monitor, Layout, Image as ImageIcon, ScanLine, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language, ProductCategory, SceneType, LightingType } from '../types';
import { translations } from '../translations';

interface ImageViewerProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  alt: string;
  lang: Language;
  category?: ProductCategory;
  scenes?: SceneType[]; // Changed from single scene to array
  lighting?: LightingType;
}

type AspectRatio = 'original' | '1:1' | '9:16' | '4:5' | '16:9';

interface FormatOption {
  id: AspectRatio;
  label: string;
  subLabel: string;
  width?: number;
  height?: number;
  icon: React.ElementType;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ 
    isOpen, 
    images, 
    initialIndex = 0, 
    onClose, 
    alt, 
    lang, 
    category, 
    scenes, 
    lighting 
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialIndex]);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        onClose();
        setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex]);

  // Click outside for download menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    };
    if (isDownloadMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDownloadMenuOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Calculate current scene based on index (assuming 5 images per scene)
  // If scenes array is not provided or empty, fallback to null
  const getCurrentScene = () => {
    if (!scenes || scenes.length === 0) return null;
    const sceneIndex = Math.floor(activeIndex / 5);
    return scenes[sceneIndex] || scenes[0];
  };

  const currentScene = getCurrentScene();

  // Helper to get translated label
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

  const formats: FormatOption[] = [
    { id: 'original', label: 'Original', subLabel: 'Full Resolution', icon: ImageIcon },
    { id: '1:1', label: 'Square (1:1)', subLabel: '1080 x 1080 px', width: 1080, height: 1080, icon: Layout },
    { id: '4:5', label: 'Vertical (4:5)', subLabel: '1080 x 1350 px', width: 1080, height: 1350, icon: ScanLine },
    { id: '9:16', label: 'Portrait (9:16)', subLabel: '1080 x 1920 px', width: 1080, height: 1920, icon: Smartphone },
    { id: '16:9', label: 'Landscape (16:9)', subLabel: '1920 x 1080 px', width: 1920, height: 1080, icon: Monitor },
  ];

  const handleDownload = async (format: FormatOption) => {
    const imageUrl = images[activeIndex];
    if (!imageUrl) return;
    setIsDownloading(true);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context failed');

      let targetWidth = img.width;
      let targetHeight = img.height;

      if (format.id !== 'original' && format.width && format.height) {
        targetWidth = format.width;
        targetHeight = format.height;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (format.id === 'original') {
        ctx.drawImage(img, 0, 0);
      } else {
        // Blur background logic
        ctx.save();
        ctx.filter = 'blur(40px) brightness(0.7)';
        const scaleCover = Math.max(targetWidth / img.width, targetHeight / img.height);
        const wCover = img.width * scaleCover;
        const hCover = img.height * scaleCover;
        const xCover = (targetWidth - wCover) / 2;
        const yCover = (targetHeight - hCover) / 2;
        ctx.drawImage(img, xCover, yCover, wCover, hCover);
        ctx.restore();

        // Draw centered image
        const scaleContain = Math.min(targetWidth / img.width, targetHeight / img.height);
        const wContain = img.width * scaleContain;
        const hContain = img.height * scaleContain;
        const xContain = (targetWidth - wContain) / 2;
        const yContain = (targetHeight - hContain) / 2;

        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
        ctx.drawImage(img, xContain, yContain, wContain, hContain);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const timestamp = new Date().toISOString().split('T')[0];
          link.download = `akraphy-studio-${format.id.replace(':','-')}-${timestamp}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        setIsDownloading(false);
        setIsDownloadMenuOpen(false);
      }, 'image/png', 1.0);

    } catch (e) {
      console.error('Download failed', e);
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Backdrop with Blur & Close Handler - Increased Transparency */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer" 
        onClick={handleClose}
      ></div>

      {/* Close Button Top Right (Fixed) */}
      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-transparent hover:border-white/10 z-[220] group"
        title={t.close}
      >
        <X className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Main Content Container */}
      <div 
        className={`relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-12 pointer-events-none transition-transform duration-300 ${isClosing ? 'scale-90' : 'scale-100'}`}
      >
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
            <>
                <button 
                    onClick={prevImage}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto backdrop-blur-md transition-all z-[215] group"
                >
                    <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                    onClick={nextImage}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto backdrop-blur-md transition-all z-[215] group"
                >
                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </>
        )}

        {/* Image Container with Animation */}
        <div 
            className="relative max-w-7xl max-h-[75vh] w-full flex items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()} 
        >
          {/* Using key to trigger animation on index change */}
          <img 
            key={activeIndex}
            src={images[activeIndex]} 
            alt={alt} 
            className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-lg select-none bg-[#111] border border-white/5 animate-in fade-in slide-in-from-right-4 duration-500"
          />
          
          {/* Image Counter Badge */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10">
                {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Studio Recipe (Metadata) - Only shows if data is present */}
        {category && currentScene && lighting && (
            <div className="mt-6 pointer-events-auto animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{t.studioRecipe}</span>
                    <div className="hidden sm:block w-[1px] h-4 bg-white/10"></div>
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                        <span className="opacity-100">{getTranslatedLabel('category', category)}</span>
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <span className="opacity-100">{getTranslatedLabel('scene', currentScene)}</span>
                        <ChevronRight className="w-3 h-3 text-white/30" />
                        <span className="opacity-100 text-blue-400">{getTranslatedLabel('lighting', lighting)}</span>
                    </div>
                </div>
            </div>
        )}

        {/* Floating Controls Bar */}
        <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-2 py-2 bg-[#1C1C1E]/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl pointer-events-auto transform translate-y-0 animate-in slide-in-from-bottom-8 duration-500 delay-200 z-[210] ring-1 ring-black/50"
            onClick={(e) => e.stopPropagation()} 
        >
            
            {/* Download Dropdown */}
            <div className="relative" ref={downloadMenuRef}>
              <button 
                onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                className="flex items-center gap-3 bg-white text-black pl-6 pr-5 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors active:scale-95 shadow-lg"
              >
                {isDownloading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{t.download}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {isDownloadMenuOpen && (
                <div className="absolute bottom-full left-0 mb-3 w-64 bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-1 animate-in slide-in-from-bottom-2 fade-in zoom-in-95 origin-bottom-left">
                  <div className="px-4 py-3 border-b border-white/5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t.downloadOptions}</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
                    {formats.map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => handleDownload(fmt)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-white/10 group-hover:border-white/20">
                           <fmt.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-white text-xs font-bold">{fmt.label}</div>
                          <div className="text-gray-500 text-[10px] font-medium">{fmt.subLabel}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
            
            <button 
                onClick={handleClose} 
                className="p-3.5 rounded-xl hover:bg-white/10 text-white transition-colors"
                title={t.close}
            >
                <Maximize className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
        </div>

      </div>
    </div>
  );
};
