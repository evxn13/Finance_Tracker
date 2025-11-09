import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Shield } from 'lucide-react';

export default function PrivacyPage() {
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

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de confidentialité</h1>
              <p className="text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Finance Tracker ("nous", "notre" ou "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
              </p>

              <h2>2. Informations que nous collectons</h2>
              <h3>2.1 Informations que vous nous fournissez</h3>
              <ul>
                <li>Nom et adresse e-mail lors de l'inscription</li>
                <li>Données financières que vous saisissez (revenus, dépenses, objectifs)</li>
                <li>Préférences et paramètres de compte</li>
              </ul>

              <h3>2.2 Informations collectées automatiquement</h3>
              <ul>
                <li>Adresse IP et données de localisation</li>
                <li>Type de navigateur et appareil</li>
                <li>Pages visitées et actions effectuées</li>
                <li>Cookies et technologies similaires</li>
              </ul>

              <h2>3. Utilisation de vos informations</h2>
              <p>Nous utilisons vos informations pour :</p>
              <ul>
                <li>Fournir et améliorer nos services</li>
                <li>Générer des insights financiers personnalisés via l'IA Claude</li>
                <li>Communiquer avec vous concernant votre compte</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Respecter nos obligations légales</li>
              </ul>

              <h2>4. Partage de vos informations</h2>
              <p>Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :</p>
              <ul>
                <li><strong>Anthropic (Claude AI)</strong> : Pour générer des insights financiers</li>
                <li><strong>Stripe</strong> : Pour traiter les paiements Premium</li>
                <li><strong>Supabase</strong> : Pour le stockage sécurisé de vos données</li>
                <li><strong>Vercel</strong> : Pour l'hébergement de l'application</li>
              </ul>

              <h2>5. Sécurité des données</h2>
              <p>
                Nous prenons la sécurité de vos données très au sérieux. Vos informations sont :
              </p>
              <ul>
                <li>Cryptées en transit (HTTPS/TLS)</li>
                <li>Cryptées au repos dans nos bases de données</li>
                <li>Stockées sur des serveurs sécurisés</li>
                <li>Accessibles uniquement au personnel autorisé</li>
              </ul>

              <h2>6. Vos droits (RGPD)</h2>
              <p>Conformément au RGPD, vous avez le droit de :</p>
              <ul>
                <li>Accéder à vos données personnelles</li>
                <li>Rectifier vos données inexactes</li>
                <li>Supprimer vos données ("droit à l'oubli")</li>
                <li>Limiter le traitement de vos données</li>
                <li>Exporter vos données (portabilité)</li>
                <li>Vous opposer au traitement de vos données</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                Nous utilisons des cookies pour améliorer votre expérience. Consultez notre <Link href="/cookies" className="text-emerald-600 hover:underline">Politique de cookies</Link> pour plus d'informations.
              </p>

              <h2>8. Conservation des données</h2>
              <p>
                Nous conservons vos données aussi longtemps que votre compte est actif ou selon les besoins pour vous fournir nos services. Vous pouvez supprimer votre compte à tout moment depuis vos paramètres.
              </p>

              <h2>9. Modifications de cette politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important par e-mail ou via une notification sur notre site.
              </p>

              <h2>10. Nous contacter</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité, contactez-nous à : <a href="mailto:privacy@financetracker.com" className="text-emerald-600 hover:underline">privacy@financetracker.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
