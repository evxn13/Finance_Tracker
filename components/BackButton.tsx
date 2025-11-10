'use client';

import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full sm:w-auto"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="mr-2 w-5 h-5" />
      Page précédente
    </Button>
  );
}
