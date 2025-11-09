import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Cookie } from 'lucide-react';

export default function CookiesPage() {
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
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de cookies</h1>
              <p className="text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 prose prose-lg max-w-none">
              <h2>1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. Les cookies permettent au site de se souvenir de vos actions et préférences.
              </p>

              <h2>2. Comment utilisons-nous les cookies ?</h2>
              <p>Finance Tracker utilise des cookies pour :</p>
              <ul>
                <li>Maintenir votre session de connexion</li>
                <li>Mémoriser vos préférences</li>
                <li>Analyser l'utilisation du site</li>
                <li>Améliorer nos services</li>
              </ul>

              <h2>3. Types de cookies que nous utilisons</h2>

              <h3>3.1 Cookies strictement nécessaires</h3>
              <p>Ces cookies sont essentiels au fonctionnement du site :</p>
              <ul>
                <li><strong>Session d'authentification</strong> : Pour maintenir votre connexion</li>
                <li><strong>Sécurité</strong> : Pour protéger contre les attaques CSRF</li>
                <li><strong>Préférences</strong> : Pour mémoriser vos choix de consentement</li>
              </ul>

              <h3>3.2 Cookies de performance</h3>
              <p>Ces cookies nous aident à comprendre comment vous utilisez notre site :</p>
              <ul>
                <li><strong>Vercel Analytics</strong> : Statistiques d'utilisation anonymisées</li>
                <li><strong>Vercel Speed Insights</strong> : Métriques de performance</li>
              </ul>

              <h3>3.3 Cookies fonctionnels</h3>
              <p>Ces cookies améliorent votre expérience :</p>
              <ul>
                <li><strong>Préférences d'affichage</strong> : Graphiques, tableaux, vues</li>
                <li><strong>Langue</strong> : Mémorisation de votre langue préférée</li>
              </ul>

              <h2>4. Cookies tiers</h2>
              <p>Nous utilisons certains services tiers qui placent leurs propres cookies :</p>

              <h3>4.1 Stripe (Paiements)</h3>
              <p>
                Stripe utilise des cookies pour traiter les paiements Premium de manière sécurisée et prévenir la fraude.
              </p>

              <h3>4.2 Vercel (Hébergement & Analytics)</h3>
              <p>
                Vercel collecte des données analytiques anonymisées pour nous aider à améliorer la performance et l'expérience utilisateur.
              </p>

              <h2>5. Durée de conservation</h2>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left">Type de cookie</th>
                    <th className="text-left">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Session</td>
                    <td>Jusqu'à déconnexion</td>
                  </tr>
                  <tr>
                    <td>Consentement</td>
                    <td>1 an</td>
                  </tr>
                  <tr>
                    <td>Analytics</td>
                    <td>2 ans</td>
                  </tr>
                  <tr>
                    <td>Préférences</td>
                    <td>6 mois</td>
                  </tr>
                </tbody>
              </table>

              <h2>6. Gestion des cookies</h2>
              <p>Vous pouvez contrôler et gérer les cookies de plusieurs façons :</p>

              <h3>6.1 Paramètres du navigateur</h3>
              <p>
                La plupart des navigateurs vous permettent de refuser ou accepter les cookies. Consultez l'aide de votre navigateur pour plus d'informations.
              </p>

              <h3>6.2 Outils de gestion des cookies</h3>
              <p>
                Notre bannière de consentement vous permet de choisir quels cookies accepter lors de votre première visite.
              </p>

              <h3>6.3 Suppression des cookies</h3>
              <p>
                Vous pouvez supprimer tous les cookies déjà stockés sur votre appareil via les paramètres de votre navigateur.
              </p>

              <h2>7. Conséquences du refus des cookies</h2>
              <p>Si vous refusez les cookies :</p>
              <ul>
                <li><strong>Cookies nécessaires refusés</strong> : Certaines fonctionnalités peuvent ne pas fonctionner</li>
                <li><strong>Cookies analytiques refusés</strong> : Nous ne pourrons pas améliorer votre expérience</li>
                <li><strong>Cookies fonctionnels refusés</strong> : Vos préférences ne seront pas sauvegardées</li>
              </ul>

              <h2>8. Modifications de cette politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique de cookies. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
              </p>

              <h2>9. Informations complémentaires</h2>
              <p>
                Pour plus d'informations sur la gestion de vos données personnelles, consultez notre <Link href="/privacy" className="text-emerald-600 hover:underline">Politique de confidentialité</Link>.
              </p>

              <h2>10. Contact</h2>
              <p>
                Pour toute question concernant notre utilisation des cookies, contactez-nous à : <a href="mailto:privacy@financetracker.com" className="text-emerald-600 hover:underline">privacy@financetracker.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
