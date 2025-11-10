import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export async function POST(request: NextRequest) {
  try {
    const { userId, transactions, filename } = await request.json();

    if (!userId || !transactions || !Array.isArray(transactions)) {
      return NextResponse.json(
        { error: 'Données invalides' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user is premium
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', userId)
      .single();

    if (profile?.subscription_status !== 'active') {
      return NextResponse.json(
        { error: 'Fonctionnalité réservée aux membres Premium' },
        { status: 403 }
      );
    }

    // Prepare transactions for insert
    const transactionsToInsert = transactions.map((t: Transaction) => ({
      user_id: userId,
      date: t.date,
      description: t.description,
      amount: Math.abs(t.amount),
      category: t.category,
      type: t.type,
      created_at: new Date().toISOString(),
    }));

    // Insert transactions in batch
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactionsToInsert)
      .select();

    if (error) {
      console.error('Error inserting transactions:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'import des transactions' },
        { status: 500 }
      );
    }

    // Update import log
    await supabase
      .from('imports')
      .update({
        status: 'completed',
        imported_count: transactions.length,
      })
      .eq('user_id', userId)
      .eq('filename', filename)
      .order('created_at', { ascending: false })
      .limit(1);

    return NextResponse.json({
      success: true,
      count: data.length,
      message: `${data.length} transactions importées avec succès`,
    });
  } catch (error) {
    console.error('Error importing transactions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'import' },
      { status: 500 }
    );
  }
}
