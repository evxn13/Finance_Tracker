'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Crown, CreditCard, Calendar, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Subscription {
  id: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
}

interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subData) {
      setSubscription(subData);
      setIsPremium(subData.status === 'active' || subData.status === 'trialing');
    }

    // Fetch payment history
    const { data: paymentsData } = await supabase
      .from('payment_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (paymentsData) {
      setPaymentHistory(paymentsData);
    }

    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      canceled: 'bg-red-100 text-red-800',
      past_due: 'bg-orange-100 text-orange-800',
      trialing: 'bg-blue-100 text-blue-800',
    };
    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
      canceled: 'Annulé',
      past_due: 'Paiement en retard',
      trialing: 'Période d\'essai',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${badges[status as keyof typeof badges] || badges.inactive}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const badges = {
      succeeded: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      canceled: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badges[status as keyof typeof badges] || badges.pending}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!subscription || subscription.status === 'inactive') {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Mon Abonnement</h1>

        <Card className="text-center py-12">
          <Crown className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Aucun abonnement actif
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Passez Premium pour accéder aux conseils IA personnalisés, objectifs d'épargne illimités et bien plus encore.
          </p>
          <Button onClick={() => router.push('/pricing')}>
            <Crown size={20} className="mr-2" />
            Découvrir Premium - 5€/mois
          </Button>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <h3 className="font-semibold text-primary-900 mb-3">
            Avantages Premium
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start space-x-2">
              <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
              <span className="text-primary-800">Conseils IA personnalisés</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
              <span className="text-primary-800">Objectifs d'épargne illimités</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
              <span className="text-primary-800">Support prioritaire</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
              <span className="text-primary-800">Export des données</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">Mon Abonnement</h1>
          {isPremium && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-semibold rounded-full flex items-center">
              <Crown size={14} className="mr-1" />
              PREMIUM
            </span>
          )}
        </div>
      </div>

      {/* Subscription Status */}
      <Card>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Crown className="text-primary-600" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Abonnement Premium
              </h2>
              <p className="text-gray-600">5,00 € / mois</p>
            </div>
          </div>
          <div>
            {getStatusBadge(subscription.status)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
          {subscription.current_period_start && (
            <div className="flex items-start space-x-3">
              <Calendar className="text-gray-400 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-gray-600">Date de début</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(subscription.current_period_start), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          )}

          {subscription.current_period_end && (
            <div className="flex items-start space-x-3">
              <Calendar className="text-gray-400 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-gray-600">
                  {subscription.cancel_at_period_end ? 'Se termine le' : 'Prochain renouvellement'}
                </p>
                <p className="font-medium text-gray-900">
                  {format(new Date(subscription.current_period_end), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          )}
        </div>

        {subscription.cancel_at_period_end && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-orange-900">Abonnement annulé</p>
              <p className="text-sm text-orange-800">
                Votre abonnement sera désactivé à la fin de la période de facturation en cours.
                Vous conservez l'accès Premium jusqu'à cette date.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Features */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fonctionnalités incluses
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-gray-900">Conseils IA personnalisés</p>
              <p className="text-sm text-gray-600">Analyse intelligente de vos finances</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-gray-900">Objectifs illimités</p>
              <p className="text-sm text-gray-600">Créez autant d'objectifs que vous voulez</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-gray-900">Support prioritaire</p>
              <p className="text-sm text-gray-600">Réponse rapide à vos questions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <Check className="text-primary-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-gray-900">Export de données</p>
              <p className="text-sm text-gray-600">Téléchargez vos données financières</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment History */}
      {paymentHistory.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Historique des paiements
          </h3>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.amount.toFixed(2)} {payment.currency.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(payment.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                    </p>
                  </div>
                </div>
                {getPaymentStatusBadge(payment.status)}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Manage Subscription */}
      <Card className="bg-gray-50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gérer votre abonnement
            </h3>
            <p className="text-gray-600 mb-4">
              Gérez votre abonnement, vos informations de paiement et consultez vos factures via le portail client Stripe.
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => alert('Fonctionnalité à venir: Portail client Stripe')}>
          Gérer l'abonnement
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </Card>
    </div>
  );
}
