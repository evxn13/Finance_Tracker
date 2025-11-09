import { Metadata } from 'next';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'À propos - Finance Tracker',
  description: 'Découvrez l\'histoire de Finance Tracker, notre mission de rendre la gestion financière personnelle accessible à tous grâce à l\'intelligence artificielle Claude.',
  keywords: [
    'à propos finance tracker',
    'histoire finance tracker',
    'mission finance tracker',
    'équipe finance tracker',
    'qui sommes nous',
    'finance tracker team'
  ],
  openGraph: {
    title: 'À propos - Finance Tracker',
    description: 'Découvrez l\'histoire de Finance Tracker et notre mission.',
    url: 'https://financetrackers.app/about',
    siteName: 'Finance Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Tracker - À propos',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos - Finance Tracker',
    description: 'Découvrez l\'histoire de Finance Tracker et notre mission.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://financetrackers.app/about',
  },
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Finance Tracker',
    description: 'Application de gestion financière personnelle propulsée par l\'IA Claude',
    foundingDate: '2024',
    mission: 'Rendre la gestion financière personnelle accessible à tous grâce à l\'intelligence artificielle',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={aboutPageSchema} />
      {children}
    </>
  );
}

