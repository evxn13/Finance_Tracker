'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, X, Sparkles, Zap } from 'lucide-react';
import { track } from '@vercel/analytics';

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);

      // Track pricing page conversion attempt
      track('premium_checkout_started', {
        plan: 'monthly',
        price: 5
      });

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        track('premium_checkout_failed', {
          error: error.error || 'Unknown error'
        });
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        track('premium_checkout_redirected');
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const features = {
    free: [
      { name: 'Suivi des revenus et dépenses', included: true },
      { name: 'Gestion des dettes', included: true },
      { name: 'Tableaux de bord visuels', included: true },
      { name: 'Catégories personnalisables', included: true },
      { name: 'Conseils IA personnalisés', included: false },
      { name: 'Objectifs d\'épargne illimités', included: false },
      { name: 'Support prioritaire', included: false },
      { name: 'Export des données', included: false },
    ],
    premium: [
      { name: 'Suivi des revenus et dépenses', included: true },
      { name: 'Gestion des dettes', included: true },
      { name: 'Tableaux de bord visuels', included: true },
      { name: 'Catégories personnalisables', included: true },
      { name: 'Conseils IA personnalisés', included: true },
      { name: 'Objectifs d\'épargne illimités', included: true },
      { name: 'Support prioritaire', included: true },
      { name: 'Export des données', included: true },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-down">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 rounded-full text-sm font-semibold">
              Tarifs simples et transparents
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Commencez gratuitement ou passez Premium pour débloquer toutes les fonctionnalités
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto stagger-children">
          {/* Free Plan */}
          <Card className="relative overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Zap className="text-gray-400 mr-2" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">Gratuit</h2>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">0 €</div>
                <div className="text-gray-600">Pour toujours</div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push('/register')}
                className="w-full mb-6"
              >
                Commencer gratuitement
              </Button>
              <div className="space-y-3">
                {features.free.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <X className="text-gray-300 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden border-2 border-primary-500 shadow-2xl hover-glow">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg shadow-lg">
              ⭐ POPULAIRE
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-br from-primary-100 to-purple-100 rounded-lg mr-3">
                  <Sparkles className="text-primary-600" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">5 €</div>
                  <div className="text-gray-600 ml-2">/mois</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Annulation à tout moment</div>
              </div>
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                className="w-full mb-6 text-lg py-3"
              >
                Passer Premium ✨
              </Button>
              <div className="space-y-4">
                {features.premium.map((feature, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="p-1 bg-primary-100 rounded-full mr-3 group-hover:bg-primary-200 transition-colors">
                      <Check className="text-primary-600" size={16} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center fade-in-up">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-gray-700 font-medium">Paiement 100% sécurisé via Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
