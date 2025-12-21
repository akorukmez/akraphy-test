
import React, { useState } from 'react';
import { X, Mail, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../services/authService';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User, isNewRegistration: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let user;
      let isNew = false;

      if (isRegistering) {
        if (!name.trim()) throw new Error('İsim gereklidir.');
        user = await authService.register(email, name);
        isNew = true;
      } else {
        user = await authService.login(email);
        isNew = false;
      }
      
      onLoginSuccess(user, isNew);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-anthracite-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-8 animate-in fade-in zoom-in duration-300 border border-transparent dark:border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-anthracite-700 transition-colors">
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isRegistering ? 'Hesap Oluştur' : 'Giriş Yap'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {isRegistering 
              ? 'Hemen kaydol ve 3 ücretsiz kredi kazan!' 
              : 'Kredilerini kullanmak için hesabına giriş yap.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1 uppercase tracking-wide">İsim Soyisim</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-anthracite-900 text-gray-900 dark:text-white placeholder-gray-400 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                  placeholder="Adınız"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 ml-1 uppercase tracking-wide">E-Posta Adresi</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-anthracite-900 text-gray-900 dark:text-white placeholder-gray-400 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-xs text-center font-bold bg-red-50 dark:bg-red-900/20 py-3 rounded-lg border border-red-100 dark:border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-gray-100 dark:border-white/5">
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(null); }}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-semibold transition-colors underline decoration-dotted decoration-gray-300 dark:decoration-gray-600 hover:decoration-black dark:hover:decoration-white"
          >
            {isRegistering 
              ? 'Zaten hesabın var mı? Giriş Yap' 
              : 'Hesabın yok mu? Hemen Kaydol'}
          </button>
        </div>
      </div>
    </div>
  );
};
