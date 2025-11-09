import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Tarifs - Finance Tracker',
  description: 'Choisissez votre plan Finance Tracker. Plan gratuit à vie ou Premium à 5€/mois avec conseils IA, objectifs d\'épargne illimités et export des données. Annulation à tout moment.',
  keywords: [
    'tarifs finance tracker',
    'prix finance tracker',
    'abonnement premium',
    'plan gratuit',
    'gestion finances prix',
    'finance tracker premium',
    'coût application finance'
  ],
  openGraph: {
    title: 'Tarifs - Finance Tracker',
    description: 'Choisissez votre plan Finance Tracker. Plan gratuit à vie ou Premium à 5€/mois.',
    url: 'https://financetrackers.app/pricing',
    siteName: 'Finance Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Tracker - Tarifs',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs - Finance Tracker',
    description: 'Choisissez votre plan Finance Tracker. Plan gratuit à vie ou Premium à 5€/mois.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://financetrackers.app/pricing',
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Finance Tracker Premium',
  description: 'Plan Premium avec conseils IA personnalisés, objectifs d\'épargne illimités et export des données',
  brand: {
    '@type': 'Brand',
    name: 'Finance Tracker',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Plan Gratuit',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://financetrackers.app/pricing',
    },
    {
      '@type': 'Offer',
      name: 'Plan Premium',
      price: '5.00',
      priceCurrency: 'EUR',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://financetrackers.app/pricing',
      billingIncrement: 'P1M',
    },
  ],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={productSchema} />
      {children}
    </>
  );
}

