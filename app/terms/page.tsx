import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, FileText } from 'lucide-react';

export default function TermsPage() {
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions d'utilisation</h1>
              <p className="text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 prose prose-lg max-w-none">
              <h2>1. Acceptation des conditions</h2>
              <p>
                En accédant et en utilisant Finance Tracker, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>

              <h2>2. Description du service</h2>
              <p>
                Finance Tracker est une application de gestion financière personnelle qui vous permet de :
              </p>
              <ul>
                <li>Suivre vos revenus et dépenses</li>
                <li>Définir et suivre des objectifs d'épargne</li>
                <li>Recevoir des conseils financiers générés par l'IA Claude</li>
                <li>Visualiser vos données financières via des graphiques</li>
              </ul>

              <h2>3. Compte utilisateur</h2>
              <h3>3.1 Création de compte</h3>
              <p>
                Pour utiliser Finance Tracker, vous devez créer un compte en fournissant une adresse e-mail valide et un mot de passe sécurisé.
              </p>

              <h3>3.2 Sécurité du compte</h3>
              <p>Vous êtes responsable de :</p>
              <ul>
                <li>Maintenir la confidentialité de vos identifiants</li>
                <li>Toutes les activités effectuées sous votre compte</li>
                <li>Nous notifier immédiatement en cas d'utilisation non autorisée</li>
              </ul>

              <h2>4. Utilisation acceptable</h2>
              <p>Vous acceptez de NE PAS :</p>
              <ul>
                <li>Utiliser le service à des fins illégales</li>
                <li>Tenter d'accéder aux comptes d'autres utilisateurs</li>
                <li>Introduire des virus ou codes malveillants</li>
                <li>Surcharger ou perturber le service</li>
                <li>Copier, modifier ou distribuer notre contenu sans autorisation</li>
                <li>Utiliser des robots ou scrapers automatisés</li>
              </ul>

              <h2>5. Abonnement Premium</h2>
              <h3>5.1 Tarification</h3>
              <p>
                L'abonnement Premium coûte 5€/mois et offre des fonctionnalités avancées incluant des insights IA illimités, des rapports détaillés et l'export PDF.
              </p>

              <h3>5.2 Paiement</h3>
              <p>
                Les paiements sont traités de manière sécurisée via Stripe. Vous autorisez des paiements récurrents mensuels jusqu'à annulation.
              </p>

              <h3>5.3 Annulation</h3>
              <p>
                Vous pouvez annuler votre abonnement à tout moment depuis vos paramètres. L'annulation prend effet à la fin de la période de facturation en cours.
              </p>

              <h3>5.4 Remboursements</h3>
              <p>
                Aucun remboursement n'est offert pour les périodes partiellement utilisées, sauf en cas d'erreur de facturation de notre part.
              </p>

              <h2>6. Propriété intellectuelle</h2>
              <p>
                Finance Tracker et tout son contenu (textes, graphiques, logos, code) sont la propriété de Finance Tracker et protégés par les lois sur la propriété intellectuelle.
              </p>

              <h2>7. Vos données</h2>
              <p>
                Vous conservez la propriété de toutes les données financières que vous saisissez. Consultez notre <Link href="/privacy" className="text-emerald-600 hover:underline">Politique de confidentialité</Link> pour plus d'informations sur la gestion de vos données.
              </p>

              <h2>8. Intelligence Artificielle</h2>
              <p>
                Les conseils financiers générés par l'IA Claude sont fournis à titre informatif uniquement et ne constituent pas des conseils financiers professionnels. Consultez toujours un conseiller financier qualifié pour des décisions importantes.
              </p>

              <h2>9. Limitation de responsabilité</h2>
              <p>
                Finance Tracker est fourni "tel quel" sans garantie d'aucune sorte. Nous ne sommes pas responsables de :
              </p>
              <ul>
                <li>Pertes financières résultant de l'utilisation du service</li>
                <li>Interruptions ou erreurs du service</li>
                <li>Décisions prises sur la base des insights IA</li>
                <li>Perte de données due à des circonstances indépendantes de notre volonté</li>
              </ul>

              <h2>10. Résiliation</h2>
              <p>
                Nous nous réservons le droit de suspendre ou résilier votre compte en cas de violation de ces conditions. Vous pouvez supprimer votre compte à tout moment depuis vos paramètres.
              </p>

              <h2>11. Modifications des conditions</h2>
              <p>
                Nous pouvons modifier ces conditions à tout moment. Les modifications importantes seront notifiées par e-mail. L'utilisation continue du service après modification constitue votre acceptation des nouvelles conditions.
              </p>

              <h2>12. Loi applicable</h2>
              <p>
                Ces conditions sont régies par les lois françaises. Tout litige sera soumis aux tribunaux compétents de Paris, France.
              </p>

              <h2>13. Contact</h2>
              <p>
                Pour toute question concernant ces conditions, contactez-nous à : <a href="mailto:legal@financetracker.com" className="text-emerald-600 hover:underline">legal@financetracker.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
