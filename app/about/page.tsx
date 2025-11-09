import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Target, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Notre mission
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Rendre la gestion financière personnelle accessible à tous grâce à l'intelligence artificielle
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre histoire</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Finance Tracker est né d'une conviction simple : tout le monde devrait avoir accès à des outils puissants pour gérer ses finances personnelles.
                </p>
                <p className="mb-4">
                  Nous avons créé une plateforme qui combine la simplicité d'utilisation avec la puissance de l'intelligence artificielle pour vous aider à prendre des décisions financières éclairées.
                </p>
                <p>
                  Propulsé par Claude AI d'Anthropic, Finance Tracker vous offre des insights personnalisés et des recommandations intelligentes basées sur vos habitudes financières.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplicité</h3>
                <p className="text-gray-600">
                  Une interface intuitive et facile à utiliser pour tous
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Technologie de pointe avec l'IA Claude
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
                <p className="text-gray-600">
                  Des milliers d'utilisateurs nous font confiance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Rejoignez-nous
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Commencez à gérer vos finances intelligemment dès aujourd'hui
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
