
import React from 'react';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';
import { Language, User } from '../types';
import { translations } from '../translations';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  user: User;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, lang, user }) => {
  const t = translations[lang].onboarding;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Dark backdrop with blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"></div>

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-anthracite-900 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-gray-100 dark:border-white/10 text-center">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200/30 dark:bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon */}
        <div className="relative mx-auto w-20 h-20 bg-black dark:bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl rotate-3">
          <Sparkles className="w-10 h-10 text-white dark:text-black animate-pulse" />
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
             <Gift className="w-3 h-3" />
             {user.credits} {t.credits}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          {t.title}, {user.name.split(' ')[0]}
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-8">
          {t.subTitle}
        </p>

        <div className="bg-gray-50 dark:bg-anthracite-800 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                <Gift className="w-4 h-4" />
                {t.gift}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.desc}
            </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onClose}
          className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          {t.btn}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
};
