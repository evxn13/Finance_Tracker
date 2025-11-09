'use client';

import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export function BetaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('beta-banner-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('beta-banner-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-bold tracking-wide">BETA</span>
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              Vous testez notre nouvelle plateforme !
              <span className="ml-1.5 opacity-90">Merci de votre confiance 🚀</span>
            </span>
            <span className="text-sm font-medium sm:hidden">
              Version de test 🚀
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
