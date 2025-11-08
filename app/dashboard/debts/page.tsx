'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit, Trash2, CreditCard, AlertCircle } from 'lucide-react';
import { Debt } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    total_amount: '',
    remaining_amount: '',
    interest_rate: '',
    monthly_payment: '',
    due_date: '',
    creditor: '',
    status: 'active',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDebts();
  }, []);

  const fetchDebts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDebts(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const debtData = {
      user_id: user.id,
      name: formData.name,
      total_amount: parseFloat(formData.total_amount),
      remaining_amount: parseFloat(formData.remaining_amount),
      interest_rate: parseFloat(formData.interest_rate) || 0,
      monthly_payment: formData.monthly_payment ? parseFloat(formData.monthly_payment) : null,
      due_date: formData.due_date || null,
      creditor: formData.creditor || null,
      status: formData.status,
    };

    if (editingId) {
      await supabase
        .from('debts')
        .update(debtData)
        .eq('id', editingId);
    } else {
      await supabase
        .from('debts')
        .insert([debtData]);
    }

    setIsModalOpen(false);
    resetForm();
    fetchDebts();
  };

  const handleEdit = (debt: Debt) => {
    setFormData({
      name: debt.name,
      total_amount: debt.total_amount.toString(),
      remaining_amount: debt.remaining_amount.toString(),
      interest_rate: debt.interest_rate.toString(),
      monthly_payment: debt.monthly_payment?.toString() || '',
      due_date: debt.due_date || '',
      creditor: debt.creditor || '',
      status: debt.status,
    });
    setEditingId(debt.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dette ?')) {
      await supabase
        .from('debts')
        .delete()
        .eq('id', id);
      fetchDebts();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      total_amount: '',
      remaining_amount: '',
      interest_rate: '',
      monthly_payment: '',
      due_date: '',
      creditor: '',
      status: 'active',
    });
    setEditingId(null);
  };

  const getProgressPercentage = (remaining: number, total: number) => {
    return ((total - remaining) / total) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-primary-100 text-primary-800';
      case 'deferred': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'paid': return 'Payée';
      case 'deferred': return 'Différée';
      default: return status;
    }
  };

  const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.remaining_amount), 0);
  const activeDebts = debts.filter(d => d.status === 'active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des dettes</h1>
          <p className="text-gray-600 mt-1">Suivez et remboursez vos dettes</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter une dette
        </Button>
      </div>

      <Card title="Vue d'ensemble">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Dette totale restante</p>
            <p className="text-2xl font-bold text-danger-600">{totalDebt.toFixed(2)} €</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dettes actives</p>
            <p className="text-2xl font-bold text-gray-900">{activeDebts.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Paiement mensuel total</p>
            <p className="text-2xl font-bold text-gray-900">
              {activeDebts.reduce((sum, debt) => sum + (Number(debt.monthly_payment) || 0), 0).toFixed(2)} €
            </p>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : debts.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 mb-4">Aucune dette enregistrée</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Ajouter une dette
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {debts.map((debt) => {
            const progress = getProgressPercentage(debt.remaining_amount, debt.total_amount);
            const isPaid = debt.status === 'paid' || debt.remaining_amount === 0;

            return (
              <Card key={debt.id}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{debt.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(debt.status)}`}>
                        {getStatusLabel(debt.status)}
                      </span>
                    </div>
                    {debt.creditor && (
                      <p className="text-sm text-gray-600">Créancier: {debt.creditor}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(debt)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(debt.id)}
                      className="text-danger-600 hover:text-danger-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progression du remboursement</span>
                      <span className="font-semibold text-gray-900">{progress.toFixed(0)}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isPaid ? 'bg-primary-600' : 'bg-danger-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-600">Restant à payer</p>
                        <p className="text-lg font-bold text-danger-600">
                          {debt.remaining_amount.toFixed(2)} €
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Montant total</p>
                        <p className="text-lg font-bold text-gray-900">
                          {debt.total_amount.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {debt.interest_rate > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Taux d'intérêt</span>
                        <span className="font-medium text-gray-900">{debt.interest_rate}%</span>
                      </div>
                    )}
                    {debt.monthly_payment && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Paiement mensuel</span>
                        <span className="font-medium text-gray-900">{debt.monthly_payment.toFixed(2)} €</span>
                      </div>
                    )}
                    {debt.due_date && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Date d'échéance</span>
                        <span className="font-medium text-gray-900">
                          {format(new Date(debt.due_date), 'dd MMM yyyy', { locale: fr })}
                        </span>
                      </div>
                    )}

                    {isPaid && (
                      <div className="pt-2">
                        <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                          ✓ Dette remboursée !
                        </span>
                      </div>
                    )}
                  </div>
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
        title={editingId ? 'Modifier la dette' : 'Ajouter une dette'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Nom de la dette"
            placeholder="Ex: Prêt automobile"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Montant total (€)"
              placeholder="0.00"
              step="0.01"
              value={formData.total_amount}
              onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
              required
            />

            <Input
              type="number"
              label="Montant restant (€)"
              placeholder="0.00"
              step="0.01"
              value={formData.remaining_amount}
              onChange={(e) => setFormData({ ...formData, remaining_amount: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Taux d'intérêt (%)"
              placeholder="0.00"
              step="0.01"
              value={formData.interest_rate}
              onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
            />

            <Input
              type="number"
              label="Paiement mensuel (€)"
              placeholder="0.00"
              step="0.01"
              value={formData.monthly_payment}
              onChange={(e) => setFormData({ ...formData, monthly_payment: e.target.value })}
            />
          </div>

          <Input
            type="text"
            label="Créancier (optionnel)"
            placeholder="Ex: Banque XYZ"
            value={formData.creditor}
            onChange={(e) => setFormData({ ...formData, creditor: e.target.value })}
          />

          <Input
            type="date"
            label="Date d'échéance (optionnel)"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />

          <Select
            label="Statut"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'paid', label: 'Payée' },
              { value: 'deferred', label: 'Différée' },
            ]}
          />

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
