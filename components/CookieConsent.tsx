'use client';

import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-lg p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <Cookie className="text-primary-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Nous utilisons des cookies
              </h3>
              <p className="text-sm text-gray-600">
                Nous utilisons des cookies essentiels pour assurer le bon fonctionnement de l'application
                et maintenir votre session connectée. En continuant, vous acceptez notre utilisation des cookies.
              </p>
            </div>
          </div>
          <div className="flex space-x-3 flex-shrink-0">
            <Button variant="outline" onClick={handleDecline} size="sm">
              Refuser
            </Button>
            <Button onClick={handleAccept} size="sm">
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
