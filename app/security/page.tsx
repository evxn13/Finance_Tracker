import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Shield, Lock, Key, Eye, Server, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Sécurité & Protection
            </h1>
            <p className="text-xl text-gray-600">
              Votre sécurité est notre priorité absolue. Découvrez comment nous protégeons vos données financières.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-12">
              <div className="prose prose-lg max-w-none">
                <h2>Notre engagement sécurité</h2>
                <p>
                  Chez Finance Tracker, nous comprenons que vous nous confiez vos données financières les plus sensibles. C'est pourquoi nous avons mis en place des mesures de sécurité de niveau bancaire pour protéger vos informations.
                </p>
              </div>
            </div>

            {/* Security Measures Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cryptage de bout en bout</h3>
                <p className="text-gray-600">
                  Toutes vos données sont cryptées en transit (HTTPS/TLS 1.3) et au repos (AES-256). Vos informations financières sont protégées par les mêmes standards que les banques.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentification sécurisée</h3>
                <p className="text-gray-600">
                  Authentification à deux facteurs (2FA) disponible, mots de passe hashés avec bcrypt, et sessions sécurisées avec tokens JWT.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure sécurisée</h3>
                <p className="text-gray-600">
                  Hébergé sur Vercel avec Supabase (certifié SOC 2 Type II). Sauvegardes automatiques quotidiennes et redondance des données.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Surveillance 24/7</h3>
                <p className="text-gray-600">
                  Monitoring continu de notre infrastructure, détection automatique des anomalies, et équipe de sécurité réactive.
                </p>
              </div>
            </div>

            {/* Additional Security Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
              <div className="prose prose-lg max-w-none">
                <h2>Mesures de protection additionnelles</h2>

                <h3>Paiements sécurisés</h3>
                <p>
                  Nous utilisons <strong>Stripe</strong>, leader mondial du paiement en ligne, pour traiter tous les paiements Premium. Nous ne stockons JAMAIS vos informations de carte bancaire sur nos serveurs.
                </p>

                <h3>Conformité RGPD</h3>
                <p>
                  Finance Tracker est entièrement conforme au Règlement Général sur la Protection des Données (RGPD). Vous avez le contrôle total de vos données et pouvez les exporter ou les supprimer à tout moment.
                </p>

                <h3>Audits de sécurité</h3>
                <p>
                  Notre code est régulièrement audité pour détecter les vulnérabilités. Nous utilisons des outils automatisés de scanning de sécurité et suivons les meilleures pratiques OWASP.
                </p>

                <h3>Accès limité</h3>
                <p>
                  Seul le personnel autorisé a accès aux systèmes de production. Tous les accès sont journalisés et surveillés. Nous appliquons le principe du moindre privilège.
                </p>

                <h3>Protection contre les attaques</h3>
                <ul>
                  <li><strong>DDoS Protection</strong> : Protection Cloudflare contre les attaques par déni de service</li>
                  <li><strong>Rate Limiting</strong> : Limitation du nombre de requêtes pour prévenir les abus</li>
                  <li><strong>CSRF Protection</strong> : Tokens anti-CSRF sur toutes les requêtes sensibles</li>
                  <li><strong>XSS Prevention</strong> : Sanitization automatique des inputs utilisateur</li>
                  <li><strong>SQL Injection</strong> : Requêtes paramétrées et ORM sécurisé</li>
                </ul>
              </div>
            </div>

            {/* Security Alert */}
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Signalez une vulnérabilité</h3>
                  <p className="text-gray-700 mb-4">
                    Si vous découvrez une faille de sécurité, nous vous encourageons à nous la signaler de manière responsable. Nous nous engageons à traiter toutes les divulgations rapidement et sérieusement.
                  </p>
                  <a href="mailto:security@financetracker.com" className="text-emerald-600 hover:underline font-medium">
                    security@financetracker.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
