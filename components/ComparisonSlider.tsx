import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeImageClassName?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ 
  beforeImage, 
  afterImage,
  beforeLabel = "Original",
  afterLabel = "Studio",
  beforeImageClassName = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent).clientX;
    }

    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
         const containerRect = containerRef.current.getBoundingClientRect();
         const position = ((e.clientX - containerRect.left) / containerRect.width) * 100;
         setSliderPosition(Math.min(100, Math.max(0, position)));
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full rounded-none sm:rounded-3xl overflow-hidden select-none cursor-col-resize group shadow-2xl border border-gray-800/50 bg-black"
      onMouseMove={!isDragging ? (e) => handleMove(e) : undefined}
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* AFTER Image (Background) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-contain sm:object-cover pointer-events-none select-none"
      />
      
      {/* Right Label (Studio Result) - Fades out when slider goes to the right (covering it) */}
      <div 
        className="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg z-10 pointer-events-none transition-opacity duration-300"
        style={{ opacity: sliderPosition > 90 ? 0 : 1 }}
      >
        {afterLabel}
      </div>

      {/* BEFORE Image (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-white/80"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className={`absolute top-0 left-0 h-full object-contain sm:object-cover pointer-events-none select-none ${beforeImageClassName}`}
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100vw', maxWidth: 'none' }}
        />
        
        {/* Left Label (Original) - Fades out when slider goes to the left (hiding it) */}
        <div 
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg z-10 pointer-events-none transition-opacity duration-300 whitespace-nowrap"
            style={{ opacity: sliderPosition < 10 ? 0 : 1 }}
        >
            {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 cursor-col-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-110 active:scale-95">
          <MoveHorizontal className="w-6 h-6 text-gray-900" />
        </div>
      </div>
    </div>
  );
};