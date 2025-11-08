'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { FinancialSummary } from '@/types';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6', '#ec4899', '#14b8a6', '#6b7280'];

export default function DashboardPage() {
  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsRate: 0,
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const currentDate = new Date();
      const startDate = startOfMonth(currentDate);
      const endDate = endOfMonth(currentDate);

      // Fetch current month incomes
      const { data: incomes } = await supabase
        .from('incomes')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString());

      // Fetch current month expenses
      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString());

      const totalIncome = incomes?.reduce((sum, inc) => sum + Number(inc.amount), 0) || 0;
      const totalExpenses = expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
      const balance = totalIncome - totalExpenses;
      const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;

      setSummary({
        totalIncome,
        totalExpenses,
        balance,
        savingsRate,
      });

      // Fetch last 6 months data
      await fetchMonthlyTrends(user.id);

      // Fetch expenses by category
      await fetchExpensesByCategory(user.id);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const fetchMonthlyTrends = async (userId: string) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      const { data: incomes } = await supabase
        .from('incomes')
        .select('amount')
        .eq('user_id', userId)
        .gte('date', start.toISOString())
        .lte('date', end.toISOString());

      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', userId)
        .gte('date', start.toISOString())
        .lte('date', end.toISOString());

      const income = incomes?.reduce((sum, inc) => sum + Number(inc.amount), 0) || 0;
      const expense = expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;

      months.push({
        month: format(date, 'MMM', { locale: fr }),
        revenus: income,
        dépenses: expense,
      });
    }

    setMonthlyData(months);
  };

  const fetchExpensesByCategory = async (userId: string) => {
    const currentDate = new Date();
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);

    const { data: expenses } = await supabase
      .from('expenses')
      .select(`
        amount,
        expense_categories (
          name,
          color
        )
      `)
      .eq('user_id', userId)
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString());

    const categoryMap = new Map();

    expenses?.forEach((expense: any) => {
      const categoryName = expense.expense_categories?.name || 'Sans catégorie';
      const amount = Number(expense.amount);

      if (categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, categoryMap.get(categoryName) + amount);
      } else {
        categoryMap.set(categoryName, amount);
      }
    });

    const categoryData = Array.from(categoryMap, ([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }));

    setExpensesByCategory(categoryData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre situation financière</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Revenus du mois"
          value={summary.totalIncome}
          icon={<TrendingUp className="text-primary-600" />}
          color="text-primary-600"
        />
        <SummaryCard
          title="Dépenses du mois"
          value={summary.totalExpenses}
          icon={<TrendingDown className="text-danger-600" />}
          color="text-danger-600"
        />
        <SummaryCard
          title="Solde"
          value={summary.balance}
          icon={<Wallet className="text-blue-600" />}
          color={summary.balance >= 0 ? 'text-primary-600' : 'text-danger-600'}
        />
        <SummaryCard
          title="Taux d'épargne"
          value={summary.savingsRate}
          icon={<Target className="text-purple-600" />}
          color="text-purple-600"
          suffix="%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card title="Tendances mensuelles" subtitle="6 derniers mois">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toFixed(2)} €`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenus"
                stackId="1"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="dépenses"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Expenses by Category */}
        <Card title="Dépenses par catégorie" subtitle="Mois en cours">
          {expensesByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toFixed(2)} €`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Aucune dépense pour ce mois
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  color,
  suffix = '€'
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>
            {suffix === '%' ? value.toFixed(1) : value.toFixed(2)} {suffix}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
}
