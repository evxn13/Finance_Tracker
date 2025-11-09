import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const positions = [
    {
      title: 'Full Stack Developer',
      location: 'Remote - France',
      type: 'CDI - Temps plein',
      description: 'Développeur passionné pour contribuer à l\'évolution de Finance Tracker. Next.js, React, TypeScript, Supabase.',
    },
    {
      title: 'Product Designer',
      location: 'Paris ou Remote',
      type: 'CDI - Temps plein',
      description: 'Designer UX/UI pour créer des expériences utilisateur exceptionnelles dans le domaine de la fintech.',
    },
    {
      title: 'Data Scientist - IA',
      location: 'Remote',
      type: 'CDI - Temps plein',
      description: 'Expert en machine learning pour améliorer nos algorithmes de recommandation et d\'analyse financière.',
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Nous repoussons constamment les limites de la technologie financière',
      emoji: '🚀',
    },
    {
      title: 'Impact',
      description: 'Aidez des milliers de personnes à améliorer leur situation financière',
      emoji: '💪',
    },
    {
      title: 'Flexibilité',
      description: 'Travail remote, horaires flexibles, équilibre vie pro/perso',
      emoji: '⚖️',
    },
    {
      title: 'Croissance',
      description: 'Formation continue, conférences, budget développement personnel',
      emoji: '📚',
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
            <Link href="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Rejoignez l'aventure
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Construisez l'avenir de la gestion financière personnelle avec nous
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nos valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-4">{value.emoji}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Postes ouverts</h2>

            <div className="space-y-6">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{position.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="md:self-start">
                      Postuler
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{position.description}</p>
                </div>
              ))}
            </div>

            {/* Spontaneous Application */}
            <div className="mt-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl shadow-xl p-8 sm:p-12 text-center text-white">
              <Briefcase className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Candidature spontanée</h3>
              <p className="text-lg mb-6 opacity-90">
                Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre CV !
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-50">
                Envoyer mon CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Avantages</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💻</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Équipement fourni</h4>
                  <p className="text-gray-600 text-sm">MacBook Pro, écran 4K, accessoires</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Remote-first</h4>
                  <p className="text-gray-600 text-sm">Travaillez d'où vous voulez</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Horaires flexibles</h4>
                  <p className="text-gray-600 text-sm">Organisez votre temps comme vous voulez</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌴</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">25 jours de congés</h4>
                  <p className="text-gray-600 text-sm">+ RTT et congés spéciaux</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Formation continue</h4>
                  <p className="text-gray-600 text-sm">Budget annuel 2000€ par personne</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏥</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Mutuelle premium</h4>
                  <p className="text-gray-600 text-sm">Prise en charge à 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
