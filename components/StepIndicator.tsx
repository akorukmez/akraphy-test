import React from 'react';
import { ProcessingState, Language } from '../types';
import { translations } from '../translations';
import { Upload, Scan, Wand2, CheckCircle2, AlertCircle } from 'lucide-react';

interface StepIndicatorProps {
  state: ProcessingState;
  lang: Language;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ state, lang }) => {
  const t = translations[lang].steps;
  
  const steps = [
    { id: 'uploading', label: t.upload, icon: Upload },
    { id: 'analyzing', label: t.analyze, icon: Scan },
    { id: 'generating', label: t.generate, icon: Wand2 },
    { id: 'completed', label: t.done, icon: CheckCircle2 },
  ];

  const getCurrentStepIndex = () => {
    if (state.step === 'idle') return -1;
    if (state.step === 'error') return steps.length;
    return steps.findIndex(s => s.id === state.step);
  };

  const currentIdx = getCurrentStepIndex();

  if (state.step === 'idle' && !state.error) return null;

  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      {state.error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400 shadow-sm">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{state.error}</span>
        </div>
      ) : (
        <div className="relative flex justify-between w-full">
           {/* Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200 dark:bg-anthracite-700 -z-10 rounded-full"></div>
          
           {/* Active Line */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-black dark:bg-white -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((currentIdx) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s, idx) => {
            const isActive = idx === currentIdx;
            const isCompleted = idx < currentIdx;
            const Icon = s.icon;

            return (
              <div key={s.id} className="flex flex-col items-center gap-2 bg-[#F5F5F7] dark:bg-anthracite-900 px-2 transition-colors duration-300">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive || isCompleted 
                        ? 'bg-black dark:bg-white text-white dark:text-black' 
                        : 'bg-white dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-600'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isActive || isCompleted ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};