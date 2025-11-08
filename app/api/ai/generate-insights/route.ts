import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_DAILY_GENERATIONS = 2;

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check daily generation limit
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    const { count, error: countError } = await supabase
      .from('ai_insights')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfToday.toISOString())
      .lte('created_at', endOfToday.toISOString());

    if (countError) {
      console.error('Error checking generation count:', countError);
      return NextResponse.json({ error: 'Failed to check generation limit' }, { status: 500 });
    }

    // Count insights generated today (each generation creates ~3-4 insights)
    const generationsToday = Math.floor((count || 0) / 3);

    if (generationsToday >= MAX_DAILY_GENERATIONS) {
      return NextResponse.json({
        error: 'Limite quotidienne atteinte',
        message: `Vous avez atteint la limite de ${MAX_DAILY_GENERATIONS} générations par jour. Réessayez demain !`,
        generationsToday,
        maxGenerations: MAX_DAILY_GENERATIONS
      }, { status: 429 });
    }

    // Fetch user's financial data
    const currentDate = new Date();
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);

    const [incomesResult, expensesResult, debtsResult, goalsResult] = await Promise.all([
      supabase
        .from('incomes')
        .select('amount, description, date')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString()),

      supabase
        .from('expenses')
        .select(`
          amount,
          description,
          date,
          expense_categories (name)
        `)
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString()),

      supabase
        .from('debts')
        .select('name, total_amount, remaining_amount, interest_rate, status')
        .eq('user_id', user.id)
        .eq('status', 'active'),

      supabase
        .from('savings_goals')
        .select('name, target_amount, current_amount, priority, status')
        .eq('user_id', user.id)
        .eq('status', 'in_progress'),
    ]);

    const incomes = incomesResult.data || [];
    const expenses = expensesResult.data || [];
    const debts = debtsResult.data || [];
    const goals = goalsResult.data || [];

    const totalIncome = incomes.reduce((sum, inc) => sum + Number(inc.amount), 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;

    // Prepare data for AI
    const financialContext = `
Analyse financière du mois en cours :
- Revenus totaux : ${totalIncome.toFixed(2)} €
- Dépenses totales : ${totalExpenses.toFixed(2)} €
- Solde : ${balance.toFixed(2)} €
- Taux d'épargne : ${savingsRate.toFixed(2)}%

Nombre de transactions :
- ${incomes.length} revenus
- ${expenses.length} dépenses

Dettes actives : ${debts.length}
${debts.map(d => `- ${d.name}: ${d.remaining_amount}€ restant sur ${d.total_amount}€ (taux: ${d.interest_rate}%)`).join('\n')}

Objectifs d'épargne en cours : ${goals.length}
${goals.map(g => `- ${g.name}: ${g.current_amount}€ / ${g.target_amount}€ (priorité: ${g.priority})`).join('\n')}

Catégories de dépenses principales (ce mois) :
${getTopExpenseCategories(expenses).map(cat => `- ${cat.category}: ${cat.total.toFixed(2)}€`).join('\n')}
`;

    // Generate insights using Claude
    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Tu es un conseiller financier expert. Analyse la situation financière suivante et fournis 3-4 conseils personnalisés, clairs et actionnables.

Chaque conseil doit :
- Être spécifique à la situation de l'utilisateur
- Contenir un titre court (max 50 caractères)
- Être accompagné d'une explication détaillée (100-150 mots)
- Être classé par type : "advice" (conseil général), "alert" (alerte importante), ou "recommendation" (recommandation d'action)
- Avoir une priorité : "low", "normal", ou "high"

${financialContext}

IMPORTANT : Réponds UNIQUEMENT avec un tableau JSON valide, sans texte avant ou après. Format attendu :
[
  {
    "type": "advice|alert|recommendation",
    "priority": "low|normal|high",
    "title": "Titre court du conseil",
    "content": "Explication détaillée du conseil..."
  }
]`
        }
      ],
    });

    const insightsText = message.content[0].type === 'text' ? message.content[0].text : '';

    if (!insightsText) {
      return NextResponse.json({ error: 'No insights generated' }, { status: 500 });
    }

    // Parse AI response
    let insights;
    try {
      // Remove potential markdown code blocks
      const cleanedText = insightsText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      insights = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse AI response:', insightsText);
      // If parsing fails, create a single insight with the raw text
      insights = [{
        type: 'advice',
        priority: 'normal',
        title: 'Analyse financière',
        content: insightsText.substring(0, 500)
      }];
    }

    // Save insights to database
    const insightsToSave = insights.map((insight: any) => ({
      user_id: user.id,
      insight_type: insight.type || 'advice',
      title: insight.title,
      content: insight.content,
      priority: insight.priority || 'normal',
      is_read: false,
    }));

    const { error: insertError } = await supabase
      .from('ai_insights')
      .insert(insightsToSave);

    if (insertError) {
      console.error('Error saving insights:', insertError);
      return NextResponse.json({ error: 'Failed to save insights' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      insights: insightsToSave.length,
      message: `${insightsToSave.length} nouveaux conseils générés`
    });

  } catch (error: any) {
    console.error('Error generating insights:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

function getTopExpenseCategories(expenses: any[]) {
  const categoryMap = new Map();

  expenses.forEach((expense: any) => {
    const categoryName = expense.expense_categories?.name || 'Sans catégorie';
    const amount = Number(expense.amount);

    if (categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, categoryMap.get(categoryName) + amount);
    } else {
      categoryMap.set(categoryName, amount);
    }
  });

  return Array.from(categoryMap, ([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}
