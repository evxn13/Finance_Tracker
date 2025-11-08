import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, PiggyBank, Brain, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-primary-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-900">Finance Tracker</h1>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline">Connexion</Button>
          </Link>
          <Link href="/register">
            <Button>Commencer</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Prenez le contrôle de vos finances
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Suivez vos revenus et dépenses, atteignez vos objectifs d'épargne et recevez des conseils personnalisés grâce à l'intelligence artificielle.
        </p>
        <Link href="/register">
          <Button size="lg">Commencer gratuitement</Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<TrendingUp className="text-primary-600" size={40} />}
            title="Suivi en temps réel"
            description="Visualisez votre situation financière avec des graphiques interactifs"
          />
          <FeatureCard
            icon={<PiggyBank className="text-primary-600" size={40} />}
            title="Objectifs d'épargne"
            description="Définissez et suivez vos objectifs financiers facilement"
          />
          <FeatureCard
            icon={<Brain className="text-primary-600" size={40} />}
            title="Conseils IA"
            description="Recevez des recommandations personnalisées basées sur vos habitudes"
          />
          <FeatureCard
            icon={<Shield className="text-primary-600" size={40} />}
            title="Sécurisé"
            description="Vos données sont cryptées et protégées"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-primary-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à améliorer votre situation financière ?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de leurs finances
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Créer un compte gratuit
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 Finance Tracker. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
