import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface ProcessingOverlayProps {
  isProcessing: boolean;
  lang: Language;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ isProcessing, lang }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const t = translations[lang];
  const steps = t.loadingSteps || ["Processing..."];

  useEffect(() => {
    if (isProcessing) {
      setStepIndex(0);
      const interval = setInterval(() => {
        setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isProcessing, steps.length]);

  if (!isProcessing) return null;

  return (
    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center rounded-[2rem] animate-in fade-in duration-500">
      
      {/* Sleek Minimalist Loader */}
      <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
        
        {/* Outer Static Ring (Very faint) */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
        
        {/* Animated Spinner Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-black/10 border-t-black animate-spin duration-1000 ease-linear"></div>
        
        {/* Inner Breathing Circle */}
        <div className="absolute inset-2 rounded-full bg-gray-50 animate-pulse flex items-center justify-center">
            {/* Brand Initials or Icon */}
            <span className="text-xl font-bold tracking-tighter text-black animate-bounce-subtle">AK</span>
        </div>
      </div>

      {/* Dynamic Text with Slide Up Animation */}
      <div className="h-8 overflow-hidden mb-2">
         <h3 className="text-lg font-bold text-gray-900 animate-slide-up key={stepIndex}">
            {steps[stepIndex]}
         </h3>
      </div>
      
      <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
        Engine Active
      </p>

      {/* Thin Progress Bar */}
      <div className="w-48 h-1 bg-gray-100 rounded-full mt-8 overflow-hidden">
        <div 
            className="h-full bg-black rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};