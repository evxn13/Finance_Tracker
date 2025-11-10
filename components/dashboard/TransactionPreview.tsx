'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDownCircle, ArrowUpCircle, Edit2, Trash2 } from 'lucide-react';

interface ParsedTransaction {
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  confidence: number;
}

interface TransactionPreviewProps {
  transactions: ParsedTransaction[];
  onImport: (transactions: ParsedTransaction[]) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function TransactionPreview({
  transactions,
  onImport,
  onCancel,
  isLoading,
}: TransactionPreviewProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<Set<number>>(
    new Set(transactions.map((_, i) => i))
  );
  const [editedTransactions, setEditedTransactions] = useState(transactions);

  const toggleTransaction = (index: number) => {
    const newSelected = new Set(selectedTransactions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedTransactions(newSelected);
  };

  const toggleAll = () => {
    if (selectedTransactions.size === transactions.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(transactions.map((_, i) => i)));
    }
  };

  const handleImport = () => {
    const selected = editedTransactions.filter((_, i) => selectedTransactions.has(i));
    onImport(selected);
  };

  const totalIncome = editedTransactions
    .filter((t, i) => selectedTransactions.has(i) && t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = editedTransactions
    .filter((t, i) => selectedTransactions.has(i) && t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Transactions détectées</p>
          <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpCircle className="w-4 h-4 text-emerald-600" />
            <p className="text-sm text-emerald-700">Revenus</p>
          </div>
          <p className="text-3xl font-bold text-emerald-600">
            +{totalIncome.toFixed(2)}€
          </p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-6">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-700">Dépenses</p>
          </div>
          <p className="text-3xl font-bold text-red-600">
            -{totalExpense.toFixed(2)}€
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedTransactions.size === transactions.length}
            onCheckedChange={toggleAll}
          />
          <span className="text-sm font-medium text-gray-700">
            {selectedTransactions.size} / {transactions.length} sélectionnées
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
          <Button
            onClick={handleImport}
            disabled={selectedTransactions.size === 0 || isLoading}
          >
            Importer {selectedTransactions.size} transaction(s)
          </Button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    checked={selectedTransactions.size === transactions.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Catégorie
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  Montant
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Confiance IA
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {editedTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-colors ${
                    !selectedTransactions.has(index) ? 'opacity-50' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedTransactions.has(index)}
                      onCheckedChange={() => toggleTransaction(index)}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    <span
                      className={
                        transaction.type === 'income'
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {Math.abs(transaction.amount).toFixed(2)}€
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            transaction.confidence >= 0.8
                              ? 'bg-emerald-500'
                              : transaction.confidence >= 0.6
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${transaction.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {(transaction.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
