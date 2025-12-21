import React, { useEffect, useState } from 'react';
import { X, Download, ChevronDown, Check, Maximize, Smartphone, Monitor, Layout, Image as ImageIcon, ScanLine } from 'lucide-react';

interface ImageViewerProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
  alt: string;
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

export const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, imageUrl, onClose, alt }) => {
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const formats: FormatOption[] = [
    { id: 'original', label: 'Original', subLabel: 'Full Resolution', icon: ImageIcon },
    { id: '1:1', label: 'Square (1:1)', subLabel: '1080 x 1080 px', width: 1080, height: 1080, icon: Layout },
    { id: '4:5', label: 'Vertical (4:5)', subLabel: '1080 x 1350 px', width: 1080, height: 1350, icon: ScanLine },
    { id: '9:16', label: 'Portrait (9:16)', subLabel: '1080 x 1920 px', width: 1080, height: 1920, icon: Smartphone },
    { id: '16:9', label: 'Landscape (16:9)', subLabel: '1920 x 1080 px', width: 1920, height: 1080, icon: Monitor },
  ];

  const handleDownload = async (format: FormatOption) => {
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

      // 1. Determine Output Size
      let targetWidth = img.width;
      let targetHeight = img.height;

      if (format.id !== 'original' && format.width && format.height) {
        targetWidth = format.width;
        targetHeight = format.height;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 2. High Quality Settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (format.id === 'original') {
        // Just draw exactly as is
        ctx.drawImage(img, 0, 0);
      } else {
        // 3. Smart "Fit & Blur" Logic
        // Instead of cropping, we fill the background with a blurred version 
        // and fit the whole image in the center.

        // A. Draw Blurred Background (Fill)
        // We draw the image stretched to fill the canvas, then blur it.
        ctx.save();
        ctx.filter = 'blur(40px) brightness(0.7)'; // Darken slightly for contrast
        // Scale to fill (cover)
        const scaleCover = Math.max(targetWidth / img.width, targetHeight / img.height);
        const wCover = img.width * scaleCover;
        const hCover = img.height * scaleCover;
        const xCover = (targetWidth - wCover) / 2;
        const yCover = (targetHeight - hCover) / 2;
        
        ctx.drawImage(img, xCover, yCover, wCover, hCover);
        ctx.restore();

        // B. Draw Main Image (Contain) - No Cropping
        // Calculate scale to fit entirely within the canvas
        const scaleContain = Math.min(targetWidth / img.width, targetHeight / img.height);
        const wContain = img.width * scaleContain;
        const hContain = img.height * scaleContain;
        
        // Center it
        const xContain = (targetWidth - wContain) / 2;
        const yContain = (targetHeight - hContain) / 2;

        // Add a subtle drop shadow to separate from background
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;

        ctx.drawImage(img, xContain, yContain, wContain, hContain);
      }

      // 4. Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          // Clean filename
          const timestamp = new Date().toISOString().split('T')[0];
          link.download = `akraphy-studio-${format.id.replace(':','-')}-${timestamp}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        setIsDownloading(false);
        setIsDownloadMenuOpen(false);
      }, 'image/png', 1.0); // Maximum quality

    } catch (e) {
      console.error('Download failed', e);
      setIsDownloading(false);
    }
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-300">
      
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 pointer-events-none">
        
        {/* Image Container */}
        <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center pointer-events-auto transform transition-all duration-500 animate-in zoom-in-95">
          <img 
            src={imageUrl} 
            alt={alt} 
            className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm select-none bg-[#111] border border-white/5"
          />
        </div>

        {/* Floating Controls Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-anthracite-800/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl pointer-events-auto transform translate-y-0 animate-in slide-in-from-bottom-4 duration-500 z-50">
            
            {/* Download Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                className="flex items-center gap-3 bg-white text-black pl-5 pr-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors active:scale-95 shadow-lg"
              >
                {isDownloading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {isDownloadMenuOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-1.5 flex flex-col gap-1 z-[60] ring-1 ring-black/50">
                  <div className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 flex items-center justify-between">
                    <span>Select Dimension</span>
                    <Maximize className="w-3 h-3" />
                  </div>
                  
                  {formats.map((fmt) => {
                    const Icon = fmt.icon;
                    return (
                      <button 
                        key={fmt.id}
                        onClick={() => handleDownload(fmt)} 
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 text-white text-left transition-all group active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                          <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold tracking-tight">{fmt.label}</div>
                          <div className="text-[10px] text-gray-500 font-medium tracking-wide">{fmt.subLabel}</div>
                        </div>
                        {fmt.id === 'original' && <Check className="w-4 h-4 text-white/50" />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

            <button 
                onClick={onClose}
                className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-all border border-transparent hover:border-white/10"
                title="Close Viewer"
            >
                <X className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </button>
        </div>
      </div>
    </div>
  );
};