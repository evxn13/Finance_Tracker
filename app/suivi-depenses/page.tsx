import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, CheckCircle, ArrowRight, Smartphone, BarChart3, Target } from 'lucide-react';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Suivi Dépenses : Application Gratuite 2024 | Finance Tracker',
  description: 'Suivez vos dépenses facilement avec Finance Tracker. Application gratuite pour tracker vos dépenses, analyser vos habitudes et économiser plus. Essai gratuit.',
  keywords: [
    'suivi dépenses',
    'tracker dépenses',
    'application suivi dépenses',
    'suivre ses dépenses',
    'gestion dépenses',
    'application budget',
    'tracker budget',
    'suivi finances'
  ],
  openGraph: {
    title: 'Suivi Dépenses : Application Gratuite 2024 | Finance Tracker',
    description: 'Suivez vos dépenses facilement avec Finance Tracker. Application gratuite pour tracker vos dépenses.',
    url: 'https://financetrackers.app/suivi-depenses',
    type: 'article',
  },
  alternates: {
    canonical: 'https://financetrackers.app/suivi-depenses',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Suivi Dépenses : Application Gratuite 2024',
  description: 'Guide complet pour suivre ses dépenses efficacement avec une application moderne',
  author: {
    '@type': 'Organization',
    name: 'Finance Tracker',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Finance Tracker',
    logo: {
      '@type': 'ImageObject',
      url: 'https://financetrackers.app/logo.png',
    },
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function SuiviDepensesPage() {
  return (
    <>
      <StructuredData data={articleSchema} />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
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
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Suivez Vos Dépenses Facilement en 2024
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                L'application gratuite pour tracker vos dépenses, analyser vos habitudes de consommation et économiser plus chaque mois.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg">
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi Suivre Ses Dépenses est Crucial</h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Saviez-vous que la plupart des gens <strong>sous-estiment leurs dépenses de 20 à 30%</strong> ? Sans un suivi précis, il est impossible de savoir où va vraiment votre argent. C'est pourquoi utiliser une application de suivi de dépenses comme Finance Tracker est essentiel pour prendre le contrôle de vos finances.
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                Le suivi régulier de vos dépenses vous permet de :
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Target className="text-emerald-600 mr-3" size={28} />
                    <h3 className="text-xl font-semibold text-gray-900">Identifier les Fuites</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Découvrez où vous dépensez inutilement et réduisez ces coûts pour économiser davantage.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="text-blue-600 mr-3" size={28} />
                    <h3 className="text-xl font-semibold text-gray-900">Analyser les Tendances</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Visualisez vos habitudes de consommation sur plusieurs mois pour prendre de meilleures décisions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Smartphone className="text-purple-600 mr-3" size={28} />
                    <h3 className="text-xl font-semibold text-gray-900">Suivi en Temps Réel</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Accédez à vos finances partout, à tout moment, depuis votre smartphone ou ordinateur.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="text-teal-600 mr-3" size={28} />
                    <h3 className="text-xl font-semibold text-gray-900">Atteindre Vos Objectifs</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Suivez votre progression vers vos objectifs d'épargne avec des rapports détaillés.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Comment Fonctionne le Suivi de Dépenses avec Finance Tracker</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Finance Tracker simplifie le suivi de vos dépenses avec une interface intuitive et des fonctionnalités puissantes :
              </p>

              <div className="bg-emerald-50 p-8 rounded-xl mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Fonctionnalités Clés</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <strong className="text-gray-900 block mb-1">Catégorisation Automatique</strong>
                      <span className="text-gray-700">Finance Tracker catégorise automatiquement vos dépenses (alimentation, transport, loisirs, etc.) pour un suivi précis sans effort.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <strong className="text-gray-900 block mb-1">Graphiques Interactifs</strong>
                      <span className="text-gray-700">Visualisez vos dépenses avec des graphiques en camembert, des barres et des courbes pour comprendre rapidement vos habitudes.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <strong className="text-gray-900 block mb-1">Rapports Mensuels</strong>
                      <span className="text-gray-700">Recevez des rapports détaillés chaque mois avec vos tendances, vos catégories les plus dépensières et des conseils personnalisés.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <strong className="text-gray-900 block mb-1">Export PDF</strong>
                      <span className="text-gray-700">Exportez vos données en PDF pour vos déclarations d'impôts ou vos analyses personnelles.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <strong className="text-gray-900 block mb-1">Conseils IA Personnalisés</strong>
                      <span className="text-gray-700">Avec le plan Premium, recevez des recommandations intelligentes basées sur vos habitudes de dépenses.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Les Meilleures Pratiques pour Suivre Ses Dépenses</h2>

              <div className="space-y-6 mb-12">
                <div className="border-l-4 border-emerald-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Enregistrez Immédiatement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ne remettez pas à plus tard. Enregistrez chaque dépense dès que possible pour éviter les oublis. Avec Finance Tracker, cela prend moins de 10 secondes depuis votre smartphone.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Soyez Précis avec les Catégories</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Plus vos catégories sont précises, plus vos analyses seront utiles. Finance Tracker vous permet de créer des catégories personnalisées adaptées à votre mode de vie.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Consultez Régulièrement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Prenez 5 minutes chaque semaine pour consulter vos dépenses. Cela vous aide à rester conscient de vos habitudes et à ajuster si nécessaire.
                  </p>
                </div>

                <div className="border-l-4 border-teal-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Fixez des Limites</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Définissez des budgets par catégorie et recevez des alertes si vous approchez de vos limites. Finance Tracker vous notifie avant que vous ne dépassiez votre budget.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Pourquoi Choisir Finance Tracker pour le Suivi de Dépenses</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Il existe de nombreuses applications de suivi de dépenses, mais Finance Tracker se distingue par :
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
                  <div className="text-gray-700 font-semibold">Gratuit</div>
                  <p className="text-sm text-gray-600 mt-2">Plan gratuit complet sans limitation de durée</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-2">IA</div>
                  <div className="text-gray-700 font-semibold">Intelligence</div>
                  <p className="text-sm text-gray-600 mt-2">Conseils personnalisés avec Claude AI</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">RGPD</div>
                  <div className="text-gray-700 font-semibold">Sécurisé</div>
                  <p className="text-sm text-gray-600 mt-2">Données cryptées, conforme RGPD</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Commencez Dès Aujourd'hui</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Le meilleur moment pour commencer à suivre vos dépenses, c'est <strong>maintenant</strong>. Plus vous attendez, plus vous perdez de l'argent en dépenses inutiles.
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                Finance Tracker est gratuit, simple à utiliser et vous donne tous les outils nécessaires pour prendre le contrôle de vos finances. <strong>Créez votre compte en 2 minutes</strong> et commencez à tracker vos dépenses dès aujourd'hui.
              </p>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl text-center text-white mt-12">
                <h3 className="text-2xl font-bold mb-4">Prêt à Suivre Vos Dépenses ?</h3>
                <p className="text-lg mb-6 text-white/90">
                  Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de leurs finances
                </p>
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                    Créer un compte gratuit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Links */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles Connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/gestion-budget" className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Guide Complet : Gestion de Budget</h3>
                  <p className="text-gray-600">Apprenez à gérer votre budget efficacement avec nos méthodes éprouvées.</p>
                </Link>
                <Link href="/pricing" className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tarifs et Plans</h3>
                  <p className="text-gray-600">Découvrez nos plans gratuits et Premium pour tous vos besoins.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

