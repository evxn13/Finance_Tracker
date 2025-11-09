import { Metadata } from 'next';
import { Navigation } from '@/components/home/Navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesShowcase } from '@/components/home/FeaturesShowcase';
import { SocialProof } from '@/components/home/SocialProof';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { Footer } from '@/components/home/Footer';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Finance Tracker - Gérez vos finances intelligemment avec l'IA",
  description: "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés par Claude, objectifs d'épargne et insights financiers. Essai gratuit, sans carte bancaire.",
  keywords: [
    'gestion finances',
    'budget personnel',
    'épargne',
    'conseils financiers IA',
    'suivi dépenses',
    'finance tracker',
    'application finance',
    'Claude AI',
    'gestion budget',
    'objectifs financiers',
    'finances personnelles',
    'tracker dépenses'
  ],
  openGraph: {
    title: "Finance Tracker - Gérez vos finances intelligemment avec l'IA",
    description: "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés, objectifs d'épargne.",
    url: 'https://financetrackers.app',
    siteName: 'Finance Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Tracker - Gestion financière intelligente',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Finance Tracker - Gérez vos finances intelligemment avec l'IA",
    description: "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés.",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://financetrackers.app',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Finance Tracker',
  url: 'https://financetrackers.app',
  logo: 'https://financetrackers.app/logo.png',
  description: "Application de gestion financière personnelle propulsée par l'IA Claude",
  sameAs: [
    // Ajoutez vos réseaux sociaux ici quand disponibles
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Support client',
    email: 'contact@financetrackers.app',
  },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Finance Tracker',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Plan gratuit disponible',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
  },
  description: "Application de gestion financière personnelle avec intelligence artificielle",
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Finance Tracker est-il vraiment gratuit ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, Finance Tracker propose un plan gratuit à vie qui inclut le suivi des revenus et dépenses, la gestion des dettes, les tableaux de bord visuels et les catégories personnalisables. Le plan Premium à 5€/mois débloque les conseils IA, les objectifs d'épargne illimités et l'export des données.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment fonctionnent les conseils IA ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les conseils IA sont générés par Claude AI d'Anthropic. L'IA analyse vos habitudes financières et vous fournit des recommandations personnalisées, des détections d'anomalies et des insights mensuels automatiques.",
      },
    },
    {
      '@type': 'Question',
      name: "Mes données sont-elles sécurisées ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, vos données sont cryptées de bout en bout. Nous utilisons Supabase pour l'hébergement sécurisé, Stripe pour les paiements, et nous sommes conformes au RGPD. Vos données vous appartiennent et ne sont jamais vendues.",
      },
    },
    {
      '@type': 'Question',
      name: "Puis-je annuler mon abonnement Premium à tout moment ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, vous pouvez annuler votre abonnement Premium à tout moment depuis votre tableau de bord. Aucun frais d'annulation, vous gardez l'accès jusqu'à la fin de la période payée.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={softwareApplicationSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <HeroSection />
          <SocialProof />
          <FeaturesShowcase />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
