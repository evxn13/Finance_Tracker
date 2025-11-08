'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Brain, Sparkles, AlertCircle, Lightbulb, Trash2, Lock, Crown } from 'lucide-react';
import { AIInsight } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function InsightsPage() {
  const router = useRouter();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [dailyLimit, setDailyLimit] = useState({ used: 0, max: 2 });
  const [isPremium, setIsPremium] = useState(false);
  const [checkingPremium, setCheckingPremium] = useState(true);

  useEffect(() => {
    checkPremiumStatus();
    fetchInsights();
    checkDailyLimit();
  }, []);

  const checkPremiumStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .single();

    setIsPremium(profile?.is_premium || false);
    setCheckingPremium(false);
  };

  const checkDailyLimit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('ai_insights')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    const generationsToday = Math.floor((count || 0) / 3);
    setDailyLimit({ used: generationsToday, max: 2 });
  };

  const fetchInsights = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInsights(data);
    }
    setLoading(false);
  };

  const generateInsights = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Conseils générés avec succès !');
        fetchInsights();
        checkDailyLimit();
      } else {
        if (response.status === 429) {
          alert(result.message || 'Limite quotidienne atteinte. Réessayez demain !');
        } else {
          alert(result.error || 'Erreur lors de la génération des conseils');
        }
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      alert('Erreur lors de la génération des conseils');
    } finally {
      setGenerating(false);
    }
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('ai_insights')
      .update({ is_read: true })
      .eq('id', id);

    fetchInsights();
  };

  const deleteInsight = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce conseil ?')) {
      await supabase
        .from('ai_insights')
        .delete()
        .eq('id', id);

      fetchInsights();
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="text-danger-600" size={24} />;
      case 'recommendation':
        return <Lightbulb className="text-yellow-600" size={24} />;
      default:
        return <Brain className="text-primary-600" size={24} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-danger-500 bg-danger-50';
      case 'normal':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'low':
        return 'border-l-4 border-gray-500 bg-gray-50';
      default:
        return 'border-l-4 border-gray-300';
    }
  };

  const unreadCount = insights.filter(i => !i.is_read).length;

  const limitReached = dailyLimit.used >= dailyLimit.max;

  if (checkingPremium) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Conseils IA</h1>

        <Card className="text-center py-12 border-2 border-primary-200">
          <Lock className="mx-auto text-primary-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Fonctionnalité Premium
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Les conseils IA personnalisés sont réservés aux utilisateurs Premium.
            Passez Premium pour obtenir des recommandations basées sur votre situation financière.
          </p>
          <Button onClick={() => router.push('/pricing')}>
            <Crown size={20} className="mr-2" />
            Passer Premium - 5€/mois
          </Button>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <h3 className="font-semibold text-primary-900 mb-3">
            Avec Premium, vous obtiendrez :
          </h3>
          <ul className="space-y-2 text-primary-800">
            <li className="flex items-start">
              <Sparkles className="mr-2 mt-0.5 flex-shrink-0" size={20} />
              <span>Conseils personnalisés générés par IA basés sur vos finances</span>
            </li>
            <li className="flex items-start">
              <Sparkles className="mr-2 mt-0.5 flex-shrink-0" size={20} />
              <span>Alertes et recommandations pour optimiser votre budget</span>
            </li>
            <li className="flex items-start">
              <Sparkles className="mr-2 mt-0.5 flex-shrink-0" size={20} />
              <span>Objectifs d'épargne illimités</span>
            </li>
            <li className="flex items-start">
              <Sparkles className="mr-2 mt-0.5 flex-shrink-0" size={20} />
              <span>Support prioritaire</span>
            </li>
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">Conseils IA</h1>
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-semibold rounded-full flex items-center">
              <Crown size={14} className="mr-1" />
              PREMIUM
            </span>
          </div>
          <p className="text-gray-600 mt-1">
            Recevez des recommandations personnalisées basées sur votre situation financière
          </p>
        </div>
        <div className="text-right">
          <Button
            onClick={generateInsights}
            isLoading={generating}
            disabled={generating || limitReached}
          >
            <Sparkles size={20} className="mr-2" />
            Générer des conseils
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            {dailyLimit.used}/{dailyLimit.max} générations utilisées aujourd'hui
          </p>
          {limitReached && (
            <p className="text-xs text-danger-600 mt-1">
              Limite atteinte. Revenez demain !
            </p>
          )}
        </div>
      </div>

      {unreadCount > 0 && (
        <Card className="bg-primary-50 border-primary-200">
          <div className="flex items-center space-x-3">
            <Brain className="text-primary-600" size={32} />
            <div>
              <p className="font-semibold text-primary-900">
                Vous avez {unreadCount} nouveau{unreadCount > 1 ? 'x' : ''} conseil{unreadCount > 1 ? 's' : ''}
              </p>
              <p className="text-sm text-primary-700">
                Consultez vos recommandations personnalisées ci-dessous
              </p>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : insights.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Brain className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun conseil disponible
            </h3>
            <p className="text-gray-600 mb-6">
              Générez vos premiers conseils personnalisés basés sur votre situation financière
            </p>
            <Button onClick={generateInsights} isLoading={generating}>
              <Sparkles size={20} className="mr-2" />
              Générer des conseils
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className={`${getPriorityColor(insight.priority)} ${
                insight.is_read ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">{getInsightIcon(insight.insight_type)}</div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {insight.title}
                      </h3>
                      {!insight.is_read && (
                        <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                      {insight.content}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        {format(new Date(insight.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                        {insight.insight_type === 'alert' && 'Alerte'}
                        {insight.insight_type === 'recommendation' && 'Recommandation'}
                        {insight.insight_type === 'advice' && 'Conseil'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        insight.priority === 'high' ? 'bg-danger-200 text-danger-800' :
                        insight.priority === 'normal' ? 'bg-blue-200 text-blue-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        Priorité: {insight.priority === 'high' ? 'Haute' :
                                  insight.priority === 'normal' ? 'Normale' : 'Basse'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  {!insight.is_read && (
                    <button
                      onClick={() => markAsRead(insight.id)}
                      className="px-3 py-1 text-sm text-primary-600 hover:bg-primary-100 rounded transition-colors"
                    >
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    onClick={() => deleteInsight(insight.id)}
                    className="text-danger-600 hover:text-danger-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {insights.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Lightbulb className="text-blue-600 mt-1" size={24} />
            <div>
              <p className="font-semibold text-blue-900 mb-1">
                Comment utiliser ces conseils ?
              </p>
              <p className="text-sm text-blue-800">
                Les conseils sont générés en analysant vos revenus, dépenses, dettes et objectifs.
                Ils sont personnalisés et mis à jour en fonction de votre situation financière actuelle.
                N'hésitez pas à générer de nouveaux conseils régulièrement pour suivre votre progression.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
