import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Home, Search } from 'lucide-react';
import { BackButton } from '@/components/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6">
            <Search className="text-emerald-600" size={48} />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page non trouvée
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Pages populaires
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                <Home className="text-emerald-600 mb-2 mx-auto" size={24} />
                <div className="font-medium text-gray-900">Accueil</div>
              </div>
            </Link>
            <Link href="/pricing">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                <TrendingUp className="text-emerald-600 mb-2 mx-auto" size={24} />
                <div className="font-medium text-gray-900">Tarifs</div>
              </div>
            </Link>
            <Link href="/features">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                <div className="text-emerald-600 mb-2 mx-auto text-2xl">⚡</div>
                <div className="font-medium text-gray-900">Fonctionnalités</div>
              </div>
            </Link>
            <Link href="/gestion-budget">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                <div className="text-emerald-600 mb-2 mx-auto text-2xl">📊</div>
                <div className="font-medium text-gray-900">Guide Budget</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 w-5 h-5" />
              Retour à l'accueil
            </Button>
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
}

