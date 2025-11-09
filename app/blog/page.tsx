import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Calendar, Clock } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: '10 Conseils pour mieux gérer votre budget',
      excerpt: 'Découvrez nos meilleures astuces pour optimiser vos finances personnelles et atteindre vos objectifs d\'épargne plus rapidement.',
      date: '15 janvier 2025',
      readTime: '5 min',
      category: 'Finances Personnelles',
      image: '📊',
    },
    {
      title: 'Comment l\'IA révolutionne la gestion financière',
      excerpt: 'L\'intelligence artificielle transforme la façon dont nous gérons notre argent. Découvrez comment Claude AI vous aide au quotidien.',
      date: '10 janvier 2025',
      readTime: '7 min',
      category: 'Technologie',
      image: '🤖',
    },
    {
      title: 'Épargner efficacement en 2025',
      excerpt: 'Les meilleures stratégies d\'épargne pour cette année. Objectifs SMART, automatisation et optimisation fiscale.',
      date: '5 janvier 2025',
      readTime: '6 min',
      category: 'Épargne',
      image: '💰',
    },
    {
      title: 'Guide complet de la catégorisation des dépenses',
      excerpt: 'Apprenez à organiser vos dépenses par catégorie pour une meilleure visibilité sur votre budget mensuel.',
      date: '28 décembre 2024',
      readTime: '4 min',
      category: 'Tutoriels',
      image: '📁',
    },
    {
      title: 'Sécurité financière : Protégez vos données',
      excerpt: 'Les bonnes pratiques pour sécuriser vos informations financières en ligne et éviter les fraudes.',
      date: '20 décembre 2024',
      readTime: '5 min',
      category: 'Sécurité',
      image: '🔒',
    },
    {
      title: 'Nouveautés Finance Tracker - Décembre 2024',
      excerpt: 'Découvrez les dernières fonctionnalités : export PDF, graphiques améliorés, et insights IA avancés.',
      date: '15 décembre 2024',
      readTime: '3 min',
      category: 'Nouveautés',
      image: '✨',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow-md">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">Finance Tracker</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Blog Finance Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conseils, astuces et actualités pour mieux gérer vos finances
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-white rounded-2xl shadow-md px-8 py-6">
              <p className="text-gray-600">
                📝 Plus d'articles à venir prochainement !
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
