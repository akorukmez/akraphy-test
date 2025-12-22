
import React, { useState } from 'react';
import { X, Send, Mail, MessageSquare, User, Loader2, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = translations[lang].contact;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-anthracite-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 border border-transparent dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-anthracite-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black dark:bg-white rounded-lg">
                <Mail className="w-5 h-5 text-white dark:text-black" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-anthracite-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
            {success ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.successTitle}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{t.successDesc}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">{t.nameLabel}</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    required 
                                    type="text" 
                                    className="w-full bg-gray-50 dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all text-gray-900 dark:text-white" 
                                    placeholder={t.namePlaceholder}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">{t.emailLabel}</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    required 
                                    type="email" 
                                    className="w-full bg-gray-50 dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all text-gray-900 dark:text-white" 
                                    placeholder={t.emailPlaceholder}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">{t.subjectLabel}</label>
                        <div className="relative">
                            <select className="w-full bg-gray-50 dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all appearance-none cursor-pointer text-gray-900 dark:text-white">
                                <option className="text-gray-900 dark:text-white bg-white dark:bg-anthracite-800">{t.subjects.support}</option>
                                <option className="text-gray-900 dark:text-white bg-white dark:bg-anthracite-800">{t.subjects.feature}</option>
                                <option className="text-gray-900 dark:text-white bg-white dark:bg-anthracite-800">{t.subjects.billing}</option>
                                <option className="text-gray-900 dark:text-white bg-white dark:bg-anthracite-800">{t.subjects.other}</option>
                            </select>
                            {/* Custom Arrow */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">{t.messageLabel}</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea 
                                required 
                                rows={4} 
                                className="w-full bg-gray-50 dark:bg-anthracite-800 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all resize-none text-gray-900 dark:text-white" 
                                placeholder={t.messagePlaceholder}
                            ></textarea>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                <>
                                    <Send className="w-4 h-4" />
                                    {t.sendBtn}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};
