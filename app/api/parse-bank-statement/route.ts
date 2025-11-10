import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Fichier et userId requis' },
        { status: 400 }
      );
    }

    // Check if user is premium
    const supabase = await createClient();
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

    // Extract text from file based on type
    let fileContent = '';
    const fileType = file.type;

    if (fileType === 'text/csv') {
      // CSV parsing
      const text = await file.text();
      fileContent = text;
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      // Excel parsing
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      fileContent = XLSX.utils.sheet_to_csv(firstSheet);
    } else if (fileType === 'application/pdf') {
      // For PDF, we'd need pdf-parse or similar
      // For now, return error asking for CSV/Excel
      return NextResponse.json(
        {
          error:
            'Les fichiers PDF ne sont pas encore supportés. Veuillez exporter votre relevé en CSV ou Excel depuis votre banque.',
        },
        { status: 400 }
      );
    } else if (fileType.startsWith('image/')) {
      // For images, we'd need OCR (Tesseract.js)
      return NextResponse.json(
        {
          error:
            'Les images ne sont pas encore supportées. Veuillez exporter votre relevé en CSV ou Excel depuis votre banque.',
        },
        { status: 400 }
      );
    }

    // Use Claude to parse the bank statement
    const prompt = `Tu es un expert en analyse de relevés bancaires. Analyse ce relevé et extrait toutes les transactions.

Relevé bancaire:
${fileContent}

Pour chaque transaction, fournis:
- date (format YYYY-MM-DD)
- description (descriptif de la transaction)
- amount (montant en nombre décimal, positif pour revenus, négatif pour dépenses)
- category (catégorie parmi: Alimentation, Transport, Logement, Santé, Loisirs, Shopping, Salaire, Autre, Épargne, Abonnements)
- type (income ou expense)
- confidence (ton niveau de confiance entre 0 et 1)

Réponds UNIQUEMENT avec un JSON valide au format:
{
  "transactions": [
    {
      "date": "2025-01-15",
      "description": "CARREFOUR MARKET",
      "amount": -45.32,
      "category": "Alimentation",
      "type": "expense",
      "confidence": 0.95
    }
  ]
}

Ne rajoute AUCUN texte avant ou après le JSON. Uniquement le JSON.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse Claude's response
    let parsedData;
    try {
      // Remove markdown code blocks if present
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      return NextResponse.json(
        { error: 'Erreur lors de l\'analyse du fichier. Format non reconnu.' },
        { status: 500 }
      );
    }

    // Validate transactions
    if (!parsedData.transactions || !Array.isArray(parsedData.transactions)) {
      return NextResponse.json(
        { error: 'Aucune transaction trouvée dans le fichier' },
        { status: 400 }
      );
    }

    // Save import log
    await supabase.from('imports').insert({
      user_id: userId,
      filename: file.name,
      file_type: fileType,
      transactions_count: parsedData.transactions.length,
      status: 'parsed',
    });

    return NextResponse.json({
      transactions: parsedData.transactions,
      count: parsedData.transactions.length,
    });
  } catch (error) {
    console.error('Error parsing bank statement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'analyse du fichier' },
      { status: 500 }
    );
  }
}
