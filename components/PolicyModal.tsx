
import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PolicyModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  lang: Language;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, type, onClose, lang }) => {
  if (!isOpen || !type) return null;

  const t = translations[lang];
  const content = type === 'privacy' ? t.policies.privacy : t.policies.terms;
  const title = type === 'privacy' ? t.footer.privacy : t.footer.terms;
  const Icon = type === 'privacy' ? ShieldCheck : FileText;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-anthracite-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in duration-300 border border-transparent dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black dark:bg-white rounded-lg">
                <Icon className="w-5 h-5 text-white dark:text-black" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-anthracite-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {content.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-950 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {lang === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
