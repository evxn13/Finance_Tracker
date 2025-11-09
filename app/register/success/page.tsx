'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-emerald-600" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Vérifiez votre email
            </h1>
            <p className="text-gray-600">
              Nous avons envoyé un lien de confirmation à votre adresse email.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
            <div className="flex items-start">
              <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-blue-700">
                <p className="font-semibold mb-1">Prochaines étapes :</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Ouvrez votre boîte de réception</li>
                  <li>Cliquez sur le lien de confirmation</li>
                  <li>Vous serez automatiquement connecté</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <p>Vous n'avez pas reçu l'email ?</p>
              <p className="mt-1">Vérifiez votre dossier spam ou attendez quelques minutes.</p>
            </div>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                J'ai déjà confirmé mon email
                <ArrowRight className="ml-2 w-5 h-5" />
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

