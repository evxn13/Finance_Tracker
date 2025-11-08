'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, X, Sparkles, Zap } from 'lucide-react';

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600">
            Commencez gratuitement ou passez Premium pour débloquer toutes les fonctionnalités
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
          <Card className="relative overflow-hidden border-2 border-primary-500 shadow-xl">
            <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
              POPULAIRE
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Sparkles className="text-primary-500 mr-2" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">Premium</h2>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">5 €</div>
                <div className="text-gray-600">par mois</div>
              </div>
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                className="w-full mb-6"
              >
                Passer Premium
              </Button>
              <div className="space-y-3">
                {features.premium.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="text-primary-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 font-medium">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Toutes les transactions sont sécurisées et cryptées via Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
