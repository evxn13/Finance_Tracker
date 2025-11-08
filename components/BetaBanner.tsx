'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

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
    <div className="bg-yellow-500 text-white px-4 py-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle size={20} />
          <span className="font-medium">
            Version BETA - Cette application est en phase de test. Certaines fonctionnalités peuvent être instables.
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
