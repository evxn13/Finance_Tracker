import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Fonctionnalités - Finance Tracker',
  description: 'Découvrez toutes les fonctionnalités de Finance Tracker : suivi en temps réel, conseils IA personnalisés, objectifs d\'épargne, rapports détaillés, sécurité maximale et bien plus.',
  keywords: [
    'fonctionnalités finance tracker',
    'features gestion finances',
    'conseils IA finances',
    'suivi dépenses',
    'objectifs épargne',
    'rapports financiers',
    'sécurité données',
    'application finance'
  ],
  openGraph: {
    title: 'Fonctionnalités - Finance Tracker',
    description: 'Découvrez toutes les fonctionnalités de Finance Tracker : suivi en temps réel, conseils IA, objectifs d\'épargne.',
    url: 'https://financetrackers.app/features',
    siteName: 'Finance Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Tracker - Fonctionnalités',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fonctionnalités - Finance Tracker',
    description: 'Découvrez toutes les fonctionnalités de Finance Tracker.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://financetrackers.app/features',
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Fonctionnalités Finance Tracker',
  description: 'Liste des fonctionnalités de Finance Tracker',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Suivi en temps réel',
      description: 'Visualisez votre situation financière instantanément avec des graphiques interactifs',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Objectifs d\'épargne',
      description: 'Définissez vos objectifs financiers et suivez votre progression',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Intelligence Artificielle',
      description: 'Propulsé par Claude AI, recevez des analyses mensuelles automatiques',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Sécurité maximale',
      description: 'Vos données sont cryptées de bout en bout',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Rapports détaillés',
      description: 'Exportez vos rapports en PDF et visualisez vos tendances',
    },
  ],
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={itemListSchema} />
      {children}
    </>
  );
}

