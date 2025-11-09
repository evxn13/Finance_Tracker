'use client';

import { Users, TrendingUp, Shield, Star } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2,500+',
    label: 'Utilisateurs actifs',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: TrendingUp,
    value: '€150K+',
    label: 'Dépenses trackées',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Sécurisé',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Star,
    value: '4.8/5',
    label: 'Note moyenne',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

export function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-4`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

