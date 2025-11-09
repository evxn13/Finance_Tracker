import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, CheckCircle, ArrowRight, PiggyBank, Target, BarChart3 } from 'lucide-react';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Gestion Budget : Guide Complet 2024 | Finance Tracker',
  description: 'Apprenez à gérer votre budget efficacement en 2024. Guide complet avec méthodes, outils et conseils pratiques. Application gratuite pour suivre vos finances.',
  keywords: [
    'gestion budget',
    'budget personnel',
    'comment gérer son budget',
    'gestionnaire budget',
    'outil budget',
    'budget mensuel',
    'gestion finances',
    'application budget'
  ],
  openGraph: {
    title: 'Gestion Budget : Guide Complet 2024 | Finance Tracker',
    description: 'Apprenez à gérer votre budget efficacement. Guide complet avec méthodes, outils et conseils pratiques.',
    url: 'https://financetrackers.app/gestion-budget',
    type: 'article',
  },
  alternates: {
    canonical: 'https://financetrackers.app/gestion-budget',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Gestion Budget : Guide Complet 2024',
  description: 'Guide complet pour apprendre à gérer son budget efficacement',
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

export default function GestionBudgetPage() {
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
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Guide Complet : Comment Gérer Son Budget en 2024
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Découvrez les meilleures méthodes et outils pour prendre le contrôle de vos finances personnelles et atteindre vos objectifs d'épargne.
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
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi la Gestion de Budget est Essentielle</h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                La gestion de budget est la base d'une <strong>santé financière solide</strong>. Que vous souhaitiez économiser pour un projet, rembourser vos dettes ou simplement mieux comprendre où va votre argent, un budget bien géré vous donne le contrôle total sur vos finances.
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                Selon une étude récente, les personnes qui suivent régulièrement leur budget économisent en moyenne <strong>15% de plus</strong> que celles qui ne le font pas. C'est pourquoi utiliser une application de gestion de budget comme Finance Tracker peut transformer votre relation à l'argent.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Les 5 Méthodes de Gestion de Budget les Plus Efficaces</h2>

              <div className="space-y-8 mb-12">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <PiggyBank className="text-emerald-600 mr-3" size={28} />
                    1. La Méthode 50/30/20
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Cette méthode populaire divise vos revenus en trois catégories :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li><strong>50%</strong> pour les besoins essentiels (logement, nourriture, transport)</li>
                    <li><strong>30%</strong> pour les envies (loisirs, sorties, shopping)</li>
                    <li><strong>20%</strong> pour l'épargne et le remboursement de dettes</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Cette méthode est idéale pour les débutants car elle est simple à comprendre et à appliquer. Avec Finance Tracker, vous pouvez créer des catégories personnalisées et suivre automatiquement votre répartition.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="text-purple-600 mr-3" size={28} />
                    2. Le Budget Zéro
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Le principe du budget zéro est simple : <strong>chaque euro doit avoir une destination</strong> avant le début du mois. Vous planifiez toutes vos dépenses à l'avance, ce qui élimine les dépenses impulsives.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Cette méthode demande plus de discipline mais offre un contrôle total. Finance Tracker vous permet de planifier vos dépenses mensuelles et de recevoir des alertes si vous dépassez vos limites.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="text-blue-600 mr-3" size={28} />
                    3. Le Budget par Enveloppes
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Méthode traditionnelle adaptée au numérique : vous allouez un montant fixe à chaque catégorie de dépenses. Une fois le budget épuisé, vous ne pouvez plus dépenser dans cette catégorie jusqu'au mois suivant.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Finance Tracker permet de créer des "enveloppes" virtuelles pour chaque catégorie et de suivre vos dépenses en temps réel.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Comment Choisir la Meilleure Application de Gestion de Budget</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Avec des dizaines d'applications disponibles, choisir la bonne peut être difficile. Voici les critères essentiels à considérer :
              </p>

              <div className="bg-emerald-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Critères Importants :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>Gratuit ou abordable</strong> : Finance Tracker offre un plan gratuit complet</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>Interface intuitive</strong> : Facile à utiliser même pour les débutants</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>Sécurité des données</strong> : Cryptage de bout en bout, conforme RGPD</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>Conseils personnalisés</strong> : Intelligence artificielle pour des recommandations sur mesure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>Rapports détaillés</strong> : Graphiques et exports PDF pour analyser vos finances</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Étapes pour Commencer avec Finance Tracker</h2>

              <ol className="space-y-6 mb-12">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Créez votre compte gratuit</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Inscrivez-vous en moins de 2 minutes. Aucune carte bancaire requise pour le plan gratuit.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ajoutez vos revenus et dépenses</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Importez vos transactions ou ajoutez-les manuellement. Finance Tracker catégorise automatiquement vos dépenses.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Définissez vos objectifs</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Créez des objectifs d'épargne personnalisés et suivez votre progression en temps réel.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Recevez des conseils IA</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Avec le plan Premium, recevez des analyses mensuelles automatiques et des recommandations personnalisées par Claude AI.
                    </p>
                  </div>
                </li>
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Conseils Avancés pour Optimiser Votre Budget</h2>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">💡 Astuces Pro</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">•</span>
                    <span><strong>Revoyez votre budget chaque mois</strong> : Les besoins changent, votre budget aussi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">•</span>
                    <span><strong>Automatisez vos économies</strong> : Programmez des virements automatiques vers votre épargne</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">•</span>
                    <span><strong>Suivez les petites dépenses</strong> : Les cafés et snacks s'accumulent rapidement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">•</span>
                    <span><strong>Utilisez les alertes</strong> : Configurez des notifications pour éviter les dépassements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-3 font-bold">•</span>
                    <span><strong>Analysez régulièrement</strong> : Consultez vos rapports mensuels pour identifier les tendances</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Conclusion : Prenez le Contrôle de Vos Finances</h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                La gestion de budget n'est pas une contrainte, c'est une <strong>liberté</strong>. En comprenant où va votre argent, vous pouvez faire des choix éclairés et atteindre vos objectifs financiers plus rapidement.
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                Finance Tracker vous accompagne dans cette démarche avec des outils simples, des conseils personnalisés et une sécurité maximale. <strong>Commencez gratuitement dès aujourd'hui</strong> et découvrez la différence que peut faire une bonne gestion de budget.
              </p>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-2xl text-center text-white mt-12">
                <h3 className="text-2xl font-bold mb-4">Prêt à Améliorer Votre Gestion de Budget ?</h3>
                <p className="text-lg mb-6 text-white/90">
                  Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de leurs finances
                </p>
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-50">
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
                <Link href="/suivi-depenses" className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Comment Suivre Ses Dépenses Efficacement</h3>
                  <p className="text-gray-600">Découvrez les meilleures méthodes pour suivre vos dépenses au quotidien.</p>
                </Link>
                <Link href="/features" className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Toutes les Fonctionnalités</h3>
                  <p className="text-gray-600">Explorez toutes les fonctionnalités de Finance Tracker.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

