'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { XCircle, ArrowLeft, Mail } from 'lucide-react';

export default function ConfirmErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="text-rose-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Lien invalide ou expiré
            </h1>
            <p className="text-gray-600 mb-4">
              Le lien de confirmation n'est plus valide. Cela peut arriver si :
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-600 mr-2">•</span>
                <span>Le lien a expiré (valable 24h)</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-600 mr-2">•</span>
                <span>Le lien a déjà été utilisé</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-600 mr-2">•</span>
                <span>Le lien est incorrect ou corrompu</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <div className="flex items-start">
                <Mail className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Besoin d'un nouveau lien ?
                  </p>
                  <p className="text-sm text-blue-700">
                    Connectez-vous avec votre email et mot de passe. Si votre compte n'est pas encore confirmé, vous recevrez un nouvel email de confirmation.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/login">
              <Button className="w-full" size="lg">
                Se connecter
                <ArrowLeft className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full">
                Créer un nouveau compte
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

