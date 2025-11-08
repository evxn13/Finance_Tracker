'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Expense, Category } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    category_id: '',
    is_recurring: false,
    recurring_frequency: 'monthly',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        expense_categories (
          name,
          color,
          icon
        )
      `)
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (!error && data) {
      setExpenses(data as any);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('expense_categories')
      .select('*')
      .eq('user_id', user.id)
      .order('name');

    if (data) {
      setCategories(data);
      if (data.length > 0 && !formData.category_id) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const expenseData = {
      user_id: user.id,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
      category_id: formData.category_id || null,
      is_recurring: formData.is_recurring,
      recurring_frequency: formData.is_recurring ? formData.recurring_frequency : null,
    };

    if (editingId) {
      await supabase
        .from('expenses')
        .update(expenseData)
        .eq('id', editingId);
    } else {
      await supabase
        .from('expenses')
        .insert([expenseData]);
    }

    setIsModalOpen(false);
    resetForm();
    fetchExpenses();
  };

  const handleEdit = (expense: Expense) => {
    setFormData({
      amount: expense.amount.toString(),
      description: expense.description || '',
      date: expense.date,
      category_id: expense.category_id || '',
      is_recurring: expense.is_recurring,
      recurring_frequency: expense.recurring_frequency || 'monthly',
    });
    setEditingId(expense.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      await supabase
        .from('expenses')
        .delete()
        .eq('id', id);
      fetchExpenses();
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      category_id: categories[0]?.id || '',
      is_recurring: false,
      recurring_frequency: 'monthly',
    });
    setEditingId(null);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dépenses</h1>
          <p className="text-gray-600 mt-1">Suivez et gérez vos dépenses</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter une dépense
        </Button>
      </div>

      <Card title="Statistiques">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total des dépenses</p>
            <p className="text-2xl font-bold text-danger-600">{totalExpenses.toFixed(2)} €</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nombre de dépenses</p>
            <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dépense moyenne</p>
            <p className="text-2xl font-bold text-gray-900">
              {expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'} €
            </p>
          </div>
        </div>
      </Card>

      <Card title="Historique des dépenses">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucune dépense enregistrée. Commencez par en ajouter une !
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Catégorie</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Montant</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Récurrent</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((expense: any) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {format(new Date(expense.date), 'dd MMM yyyy', { locale: fr })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center space-x-1 px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: expense.expense_categories?.color || '#6b7280' }}
                      >
                        {expense.expense_categories?.icon && <span>{expense.expense_categories.icon}</span>}
                        <span>{expense.expense_categories?.name || 'Sans catégorie'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{expense.description || '-'}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-danger-600 text-right">
                      {Number(expense.amount).toFixed(2)} €
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">
                      {expense.is_recurring ? '✓' : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-danger-600 hover:text-danger-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingId ? 'Modifier la dépense' : 'Ajouter une dépense'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            label="Montant (€)"
            placeholder="0.00"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />

          <Select
            label="Catégorie"
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            options={categories.map(cat => ({ value: cat.id, label: `${cat.icon || ''} ${cat.name}` }))}
          />

          <Input
            type="text"
            label="Description"
            placeholder="Ex: Courses de la semaine"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Input
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_recurring"
              checked={formData.is_recurring}
              onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="is_recurring" className="text-sm text-gray-700">
              Dépense récurrente
            </label>
          </div>

          {formData.is_recurring && (
            <Select
              label="Fréquence"
              value={formData.recurring_frequency}
              onChange={(e) => setFormData({ ...formData, recurring_frequency: e.target.value })}
              options={[
                { value: 'daily', label: 'Quotidien' },
                { value: 'weekly', label: 'Hebdomadaire' },
                { value: 'monthly', label: 'Mensuel' },
                { value: 'yearly', label: 'Annuel' },
              ]}
            />
          )}

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
