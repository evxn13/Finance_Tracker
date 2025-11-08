'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit, Trash2, Target, Lock, Crown, Sparkles } from 'lucide-react';
import { SavingsGoal } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function GoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [checkingPremium, setCheckingPremium] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    target_amount: '',
    current_amount: '',
    target_date: '',
    description: '',
    priority: 'medium',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    checkPremiumStatus();
    fetchGoals();
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

  const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGoals(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const goalData = {
      user_id: user.id,
      name: formData.name,
      target_amount: parseFloat(formData.target_amount),
      current_amount: parseFloat(formData.current_amount) || 0,
      target_date: formData.target_date || null,
      description: formData.description || null,
      priority: formData.priority,
    };

    if (editingId) {
      await supabase
        .from('savings_goals')
        .update(goalData)
        .eq('id', editingId);
    } else {
      await supabase
        .from('savings_goals')
        .insert([goalData]);
    }

    setIsModalOpen(false);
    resetForm();
    fetchGoals();
  };

  const handleEdit = (goal: SavingsGoal) => {
    setFormData({
      name: goal.name,
      target_amount: goal.target_amount.toString(),
      current_amount: goal.current_amount.toString(),
      target_date: goal.target_date || '',
      description: goal.description || '',
      priority: goal.priority,
    });
    setEditingId(goal.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      await supabase
        .from('savings_goals')
        .delete()
        .eq('id', id);
      fetchGoals();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      target_amount: '',
      current_amount: '',
      target_date: '',
      description: '',
      priority: 'medium',
    });
    setEditingId(null);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-danger-100 text-danger-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  const FREE_GOALS_LIMIT = 3;
  const canAddGoal = isPremium || goals.length < FREE_GOALS_LIMIT;

  if (checkingPremium) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">Objectifs d'épargne</h1>
            {isPremium && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-semibold rounded-full flex items-center">
                <Crown size={14} className="mr-1" />
                PREMIUM
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">
            Suivez vos projets et objectifs financiers
            {!isPremium && ` (${goals.length}/${FREE_GOALS_LIMIT} objectifs gratuits)`}
          </p>
        </div>
        <Button
          onClick={() => {
            if (!canAddGoal) {
              router.push('/pricing');
              return;
            }
            resetForm();
            setIsModalOpen(true);
          }}
          disabled={!canAddGoal && !isPremium}
        >
          {!canAddGoal && !isPremium ? (
            <>
              <Lock size={20} className="mr-2" />
              Passer Premium
            </>
          ) : (
            <>
              <Plus size={20} className="mr-2" />
              Ajouter un objectif
            </>
          )}
        </Button>
      </div>

      {!isPremium && goals.length >= FREE_GOALS_LIMIT && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <div className="flex items-start space-x-3">
            <Lock className="text-yellow-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2">
                Limite gratuite atteinte
              </h3>
              <p className="text-yellow-800 mb-3">
                Vous avez atteint la limite de {FREE_GOALS_LIMIT} objectifs gratuits. Passez Premium pour créer des objectifs illimités et débloquer toutes les fonctionnalités.
              </p>
              <Button onClick={() => router.push('/pricing')} size="sm">
                <Crown size={16} className="mr-2" />
                Passer Premium - 5€/mois
              </Button>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : goals.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Target className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 mb-4">Aucun objectif d'épargne défini</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Créer votre premier objectif
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.current_amount, goal.target_amount);
            const isCompleted = goal.current_amount >= goal.target_amount;

            return (
              <Card key={goal.id} className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{goal.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                        {getPriorityLabel(goal.priority)}
                      </span>
                    </div>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-danger-600 hover:text-danger-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">{progress.toFixed(0)}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        isCompleted ? 'bg-primary-600' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-600">Montant actuel</p>
                      <p className="text-lg font-bold text-gray-900">
                        {goal.current_amount.toFixed(2)} €
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Objectif</p>
                      <p className="text-lg font-bold text-primary-600">
                        {goal.target_amount.toFixed(2)} €
                      </p>
                    </div>
                  </div>

                  {goal.target_date && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Date cible: {format(new Date(goal.target_date), 'dd MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="pt-2">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                        ✓ Objectif atteint !
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingId ? 'Modifier l\'objectif' : 'Ajouter un objectif'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Nom de l'objectif"
            placeholder="Ex: Vacances d'été"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            type="number"
            label="Montant cible (€)"
            placeholder="0.00"
            step="0.01"
            value={formData.target_amount}
            onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
            required
          />

          <Input
            type="number"
            label="Montant actuel (€)"
            placeholder="0.00"
            step="0.01"
            value={formData.current_amount}
            onChange={(e) => setFormData({ ...formData, current_amount: e.target.value })}
          />

          <Input
            type="date"
            label="Date cible (optionnel)"
            value={formData.target_date}
            onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
          />

          <Select
            label="Priorité"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            options={[
              { value: 'low', label: 'Basse' },
              { value: 'medium', label: 'Moyenne' },
              { value: 'high', label: 'Haute' },
            ]}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              placeholder="Décrivez votre objectif..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Annuler
            </Button>
            <Button type="submit">
              {editingId ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
