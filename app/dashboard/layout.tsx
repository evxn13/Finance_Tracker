'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Home, TrendingUp, TrendingDown, Target, CreditCard, Brain, LogOut, Menu, X, Crown } from 'lucide-react';
import { User } from '@supabase/supabase-js';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <TrendingUp className="text-primary-600" size={32} />
              <span className="text-xl font-bold text-gray-900">Finance Tracker</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <NavLink href="/dashboard" icon={<Home size={20} />} onClick={() => setSidebarOpen(false)}>
              Tableau de bord
            </NavLink>
            <NavLink href="/dashboard/income" icon={<TrendingUp size={20} />} onClick={() => setSidebarOpen(false)}>
              Revenus
            </NavLink>
            <NavLink href="/dashboard/expenses" icon={<TrendingDown size={20} />} onClick={() => setSidebarOpen(false)}>
              Dépenses
            </NavLink>
            <NavLink href="/dashboard/goals" icon={<Target size={20} />} onClick={() => setSidebarOpen(false)}>
              Objectifs
            </NavLink>
            <NavLink href="/dashboard/debts" icon={<CreditCard size={20} />} onClick={() => setSidebarOpen(false)}>
              Dettes
            </NavLink>
            <NavLink href="/dashboard/insights" icon={<Brain size={20} />} onClick={() => setSidebarOpen(false)}>
              Conseils IA
            </NavLink>
            <NavLink href="/dashboard/subscription" icon={<Crown size={20} />} onClick={() => setSidebarOpen(false)}>
              Abonnement
            </NavLink>
          </nav>

          {/* User section */}
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Connecté en tant que</p>
              <p className="font-medium text-gray-900 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
  onClick
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
