import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { BankStatementImport } from '@/components/dashboard/BankStatementImport';

export const metadata = {
  title: 'Import de Relevé Bancaire',
  description: 'Importez vos relevés bancaires automatiquement avec l\'IA',
};

export default async function ImportPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is premium
  const { data: profile } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('id', user.id)
    .single();

  const isPremium = profile?.subscription_status === 'active';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Import de Relevé Bancaire
        </h1>
        <p className="text-gray-600">
          Importez vos transactions automatiquement à partir de vos relevés bancaires (PDF, CSV, Excel)
        </p>
      </div>

      {!isPremium ? (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">✨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Fonctionnalité Premium
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            L'import automatique de relevés bancaires avec IA est réservé aux membres Premium.
            Gagnez du temps en important des centaines de transactions en quelques secondes.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Passer Premium - 5€/mois
          </a>
        </div>
      ) : (
        <BankStatementImport userId={user.id} />
      )}
    </div>
  );
}
