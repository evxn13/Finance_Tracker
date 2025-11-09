import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BetaBanner } from "@/components/BetaBanner";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://financetrackers.app'),
  title: {
    default: "Finance Tracker - Gérez vos finances intelligemment avec l'IA",
    template: "%s | Finance Tracker"
  },
  description: "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés par Claude, objectifs d'épargne et insights financiers. Essai gratuit.",
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
    'objectifs financiers'
  ],
  authors: [{ name: 'Finance Tracker' }],
  creator: 'Finance Tracker',
  publisher: 'Finance Tracker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://financetrackers.app',
    title: "Finance Tracker - Gérez vos finances intelligemment avec l'IA",
    description: "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés, objectifs d'épargne.",
    siteName: 'Finance Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance Tracker - Gestion financière intelligente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Finance Tracker - Gérez vos finances intelligemment avec l'IA",
    description: "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés.",
    images: ['/og-image.png'],
    creator: '@financetracker',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-verification-google',
    // yandex: 'votre-code-yandex',
    // bing: 'votre-code-bing',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <BetaBanner />
        {children}
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
