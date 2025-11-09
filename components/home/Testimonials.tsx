'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Freelance',
    content: 'Finance Tracker m\'a aidée à économiser 500€ par mois en identifiant mes dépenses inutiles. Les conseils IA sont vraiment pertinents !',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Thomas D.',
    role: 'Entrepreneur',
    content: 'L\'interface est intuitive et les rapports PDF sont parfaits pour mes déclarations. Un outil indispensable pour gérer mes finances.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Sophie M.',
    role: 'Étudiante',
    content: 'Enfin une app gratuite qui fait vraiment le job ! Je peux suivre mon budget étudiant et atteindre mes objectifs d\'épargne.',
    rating: 5,
    avatar: '👩‍🎓',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-down">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <Quote className="w-8 h-8 text-emerald-500 mb-4 opacity-50" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

