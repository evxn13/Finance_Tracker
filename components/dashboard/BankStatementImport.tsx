'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TransactionPreview } from './TransactionPreview';

interface ParsedTransaction {
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  confidence: number;
}

interface BankStatementImportProps {
  userId: string;
}

export function BankStatementImport({ userId }: BankStatementImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedTransactions, setParsedTransactions] = useState<ParsedTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'success'>('upload');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleParse = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await fetch('/api/parse-bank-statement', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse du fichier');
      }

      const data = await response.json();
      setParsedTransactions(data.transactions);
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async (selectedTransactions: ParsedTransaction[]) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/import-transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          transactions: selectedTransactions,
          filename: file?.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'import');
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setParsedTransactions([]);
    setError(null);
    setStep('upload');
  };

  if (step === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Import réussi !
        </h2>
        <p className="text-gray-600 mb-6">
          {parsedTransactions.length} transaction(s) ont été importées avec succès.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleReset}>
            Importer un autre fichier
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = '/dashboard')}>
            Voir mes transactions
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <TransactionPreview
        transactions={parsedTransactions}
        onImport={handleImport}
        onCancel={handleReset}
        isLoading={isProcessing}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragActive
                ? 'Déposez votre fichier ici'
                : 'Glissez-déposez votre relevé bancaire'}
            </h3>
            <p className="text-gray-600 text-sm">
              Formats acceptés : PDF, CSV, Excel, Image (max 10MB)
            </p>
          </div>
          <Button variant="outline" type="button">
            Parcourir les fichiers
          </Button>
        </div>
      </div>

      {/* Selected File */}
      {file && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button onClick={handleParse} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              'Analyser avec l\'IA'
            )}
          </Button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Erreur</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3">💡 Comment ça marche ?</h4>
        <ol className="space-y-2 text-sm text-blue-800">
          <li>1. Uploadez votre relevé bancaire (PDF, CSV, Excel ou image)</li>
          <li>2. Notre IA Claude analyse et extrait toutes les transactions</li>
          <li>3. Vérifiez et modifiez les transactions si nécessaire</li>
          <li>4. Importez en un clic - terminé !</li>
        </ol>
      </div>
    </div>
  );
}
