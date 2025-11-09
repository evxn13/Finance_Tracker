import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, PiggyBank, Brain, Shield, BarChart3, Target, Zap, Lock, Smartphone, Cloud } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Suivi en temps réel',
      description: 'Visualisez votre situation financière instantanément avec des graphiques interactifs et intuitifs. Suivez vos revenus, dépenses et votre solde en temps réel.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: PiggyBank,
      title: 'Objectifs d\'épargne',
      description: 'Définissez vos objectifs financiers et suivez votre progression. Recevez des notifications de progression et des conseils pour atteindre vos rêves.',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: Brain,
      title: 'Intelligence Artificielle',
      description: 'Propulsé par Claude AI, recevez des analyses mensuelles automatiques, des recommandations personnalisées et une détection d\'anomalies.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Vos données sont cryptées de bout en bout. Paiements sécurisés via Stripe, authentification à deux facteurs et conformité RGPD.',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      icon: BarChart3,
      title: 'Rapports détaillés',
      description: 'Exportez vos rapports en PDF, visualisez vos tendances mensuelles et analysez vos dépenses par catégorie avec des graphiques interactifs.',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      icon: Target,
      title: 'Catégorisation automatique',
      description: 'Organisez vos transactions automatiquement par catégorie. Visualisez où va votre argent avec des graphiques en camembert.',
      color: 'text-teal-600 bg-teal-50',
    },
    {
      icon: Zap,
      title: 'Rapide et performant',
      description: 'Interface ultra-rapide construite avec Next.js 14. Chargement instantané et navigation fluide pour une expérience optimale.',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      icon: Lock,
      title: 'Confidentialité garantie',
      description: 'Vos données vous appartiennent. Nous ne vendons jamais vos informations personnelles et respectons votre vie privée.',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Smartphone,
      title: 'Mobile-first',
      description: 'Accédez à vos finances partout, à tout moment. Interface responsive optimisée pour tous les appareils.',
      color: 'text-pink-600 bg-pink-50',
    },
    {
      icon: Cloud,
      title: 'Cloud synchronisé',
      description: 'Vos données sont synchronisées en temps réel sur tous vos appareils. Accédez à Finance Tracker depuis n\'importe où.',
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow-md">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">Finance Tracker</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Toutes les fonctionnalités dont vous avez besoin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Des outils puissants pour gérer vos finances simplement et efficacement
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 sm:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de leurs finances
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-50 shadow-xl">
              Créer un compte gratuit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
