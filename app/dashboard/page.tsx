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
  ResponsiveContainer,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#14b8a6', '#3b82f6'];
const GRADIENT_COLORS = {
  income: { start: '#10b981', end: '#059669' },
  expense: { start: '#f43f5e', end: '#e11d48' },
  savings: { start: '#8b5cf6', end: '#6366f1' }
};

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
      <div className="fade-in-down">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre situation financière</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up">
        {/* Monthly Income vs Expenses - Bar Chart */}
        <Card title="Revenus vs Dépenses" subtitle="6 derniers mois">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GRADIENT_COLORS.income.start} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS.income.end} stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GRADIENT_COLORS.expense.start} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS.expense.end} stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(2)} €`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="revenus" fill="url(#incomeGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="dépenses" fill="url(#expenseGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Expenses by Category - Donut Chart */}
        <Card title="Dépenses par catégorie" subtitle="Mois en cours">
          {expensesByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  {COLORS.map((color, index) => (
                    <linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                  labelLine={false}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#colorGradient${index % COLORS.length})`}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${Number(value).toFixed(2)} €`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Aucune dépense pour ce mois
            </div>
          )}
        </Card>

        {/* Monthly Trends - Area Chart with Gradient */}
        <Card title="Tendances mensuelles" subtitle="Évolution sur 6 mois">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="areaIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GRADIENT_COLORS.income.start} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={GRADIENT_COLORS.income.start} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="areaExpenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GRADIENT_COLORS.expense.start} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={GRADIENT_COLORS.expense.start} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(2)} €`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Area
                type="monotone"
                dataKey="revenus"
                stroke={GRADIENT_COLORS.income.start}
                strokeWidth={2}
                fill="url(#areaIncomeGradient)"
              />
              <Area
                type="monotone"
                dataKey="dépenses"
                stroke={GRADIENT_COLORS.expense.start}
                strokeWidth={2}
                fill="url(#areaExpenseGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Savings Rate Trend - Line Chart */}
        <Card title="Taux d'épargne" subtitle="Évolution mensuelle">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={monthlyData.map(m => ({
                month: m.month,
                taux: m.revenus > 0 ? ((m.revenus - m.dépenses) / m.revenus * 100) : 0
              }))}
            >
              <defs>
                <linearGradient id="savingsLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={GRADIENT_COLORS.savings.start} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS.savings.end} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                label={{ value: '%', position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(1)} %`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="taux"
                stroke="url(#savingsLineGradient)"
                strokeWidth={3}
                dot={{ fill: GRADIENT_COLORS.savings.start, r: 5 }}
                activeDot={{ r: 7, fill: GRADIENT_COLORS.savings.end }}
              />
            </LineChart>
          </ResponsiveContainer>
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
  const getGradientClass = () => {
    if (title.includes('Revenus')) return 'from-emerald-500/10 to-emerald-500/5';
    if (title.includes('Dépenses')) return 'from-rose-500/10 to-rose-500/5';
    if (title.includes('Solde')) return 'from-blue-500/10 to-blue-500/5';
    if (title.includes('Taux')) return 'from-purple-500/10 to-purple-500/5';
    return 'from-gray-500/10 to-gray-500/5';
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color} tracking-tight`}>
            {suffix === '%' ? value.toFixed(1) : value.toFixed(2)} {suffix}
          </p>
        </div>
        <div className={`p-4 bg-gradient-to-br ${getGradientClass()} rounded-2xl shadow-sm`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
