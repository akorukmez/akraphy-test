
import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { RefreshCcw } from 'lucide-react';

interface ProcessingOverlayProps {
  isProcessing: boolean;
  lang: Language;
  batchProgress?: { current: number; total: number };
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ isProcessing, lang, batchProgress }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const t = translations[lang];
  const steps = t.loadingSteps || [t.processingStep];

  useEffect(() => {
    if (isProcessing) {
      setStepIndex(0);
      const interval = setInterval(() => {
        setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isProcessing, steps.length]);

  if (!isProcessing) return null;

  const isMulti = batchProgress && batchProgress.total > 1;

  return (
    <div className="absolute inset-0 z-50 bg-white/95 dark:bg-anthracite-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center rounded-[2rem] animate-in fade-in duration-500">
      
      {isMulti && (
        <div className="absolute top-10 flex items-center gap-2 bg-gray-100 dark:bg-white/10 px-4 py-2 rounded-full border border-gray-200 dark:border-white/5">
          <RefreshCcw className="w-4 h-4 text-black dark:text-white animate-spin" />
          <span className="text-xs font-bold text-black dark:text-white">
            {batchProgress.current} / {batchProgress.total}
          </span>
        </div>
      )}

      <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-gray-100 dark:border-white/5"></div>
        <div className="absolute inset-0 rounded-full border-2 border-black/10 border-t-black dark:border-white/10 dark:border-t-white animate-spin duration-1000 ease-linear"></div>
        <div className="absolute inset-2 rounded-full bg-gray-50 dark:bg-anthracite-800 animate-pulse flex items-center justify-center">
            <span className="text-xl font-bold tracking-tighter text-black dark:text-white animate-bounce-subtle">AK</span>
        </div>
      </div>

      <div className="h-8 overflow-hidden mb-2">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-all duration-500">
            {steps[stepIndex]}
         </h3>
      </div>
      
      <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
        {t.simulatorActive}
      </p>

      <div className="w-48 h-1 bg-gray-100 dark:bg-white/5 rounded-full mt-8 overflow-hidden">
        <div 
            className="h-full bg-black dark:bg-white rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
