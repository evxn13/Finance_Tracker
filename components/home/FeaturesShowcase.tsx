'use client';

import { TrendingUp, PiggyBank, Brain, Shield, BarChart3, Target } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const features = [
  {
    icon: TrendingUp,
    title: 'Suivi en temps réel',
    description: 'Visualisez votre situation financière instantanément avec des graphiques interactifs et intuitifs.',
    points: [
      'Graphiques interactifs pour revenus et dépenses',
      'Mise à jour automatique de vos données',
      'Vue d ensemble claire de votre solde',
      'Export de vos rapports en PDF',
    ],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
  },
  {
    icon: PiggyBank,
    title: 'Objectifs d épargne',
    description: 'Définissez vos objectifs financiers et suivez votre progression vers vos rêves.',
    points: [
      'Créez des objectifs personnalisés',
      'Suivez votre taux d épargne',
      'Notifications de progression',
      'Conseils pour atteindre vos objectifs',
    ],
    gradient: 'from-purple-500/20 to-blue-500/20',
    accentColor: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-blue-50',
  },
  {
    icon: Brain,
    title: 'Conseils IA personnalisés',
    description: 'Recevez des recommandations intelligentes basées sur vos habitudes financières.',
    points: [
      'Analyses mensuelles automatiques',
      'Recommandations sur mesure',
      'Détection d anomalies',
      'Propulsé par Claude AI',
    ],
    gradient: 'from-blue-500/20 to-indigo-500/20',
    accentColor: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
  },
  {
    icon: Shield,
    title: 'Sécurité maximale',
    description: 'Vos données financières sont cryptées et protégées avec les plus hauts standards de sécurité.',
    points: [
      'Cryptage de bout en bout',
      'Paiements sécurisés via Stripe',
      'Authentification à deux facteurs',
      'Conformité RGPD',
    ],
    gradient: 'from-rose-500/20 to-pink-500/20',
    accentColor: 'text-rose-600',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
  },
];

function FeatureSection({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const Icon = feature.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className={`py-12 sm:py-20 lg:py-24 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          {/* Content */}
          <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} ${isVisible ? 'fade-in-up' : ''}`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${feature.accentColor.replace('text-', '')}/10 mb-4`}>
              <Icon className={`w-5 h-5 ${feature.accentColor}`} />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {feature.title}
            </h2>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">{feature.description}</p>

            <ul className="space-y-3 sm:space-y-4">
              {feature.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${feature.accentColor.replace('text-', 'bg-')}/10 flex-shrink-0`}>
                    <svg className={`w-3 h-3 ${feature.accentColor}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div
            className={`${isEven ? 'lg:order-2' : 'lg:order-1'} ${
              isVisible ? 'fade-in-up animation-delay-200' : ''
            }`}
          >
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${feature.bgColor} p-8 sm:p-12 lg:p-16`}>
              {/* Placeholder for feature visualization */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/50`}>
                <Icon className={`w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 ${feature.accentColor} opacity-40`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesShowcase() {
  return (
    <section className="bg-white">
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 fade-in">
          Tout ce dont vous avez besoin
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 sm:mb-16 fade-in animation-delay-200">
          Des outils puissants pour gérer vos finances simplement et efficacement
        </p>

        {/* Feature categories */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 fade-in animation-delay-400">
          {[
            { icon: TrendingUp, label: 'Suivi', color: 'text-emerald-600 bg-emerald-50' },
            { icon: PiggyBank, label: 'Épargne', color: 'text-purple-600 bg-purple-50' },
            { icon: Brain, label: 'IA', color: 'text-blue-600 bg-blue-50' },
            { icon: Shield, label: 'Sécurité', color: 'text-rose-600 bg-rose-50' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full ${item.color} hover:scale-105 transition-transform cursor-pointer`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features List */}
      <div className="divide-y divide-gray-100">
        {features.map((feature, index) => (
          <FeatureSection key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
