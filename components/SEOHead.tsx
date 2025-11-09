import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | Finance Tracker`
    : "Finance Tracker - Gérez vos finances intelligemment avec l'IA";
  const fullDescription =
    description ||
    "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés par Claude, objectifs d'épargne et insights financiers.";
  const canonicalUrl = canonical || 'https://financetrackers.app';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={`https://financetrackers.app${ogImage}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Finance Tracker" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`https://financetrackers.app${ogImage}`} />
      
      {/* Preconnect pour performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://vercel.live" />
    </Head>
  );
}

