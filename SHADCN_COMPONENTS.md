# Composants shadcn/ui Ajoutés 🎨

## Nouveaux composants disponibles

### 1. Alert Dialog

Dialog modal qui interrompt l'utilisateur avec un contenu important et attend une réponse.

**Utilisation:**

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/Button"

function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera définitivement
            vos données de nos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction>Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

**Cas d'usage:**
- ✅ Confirmation de suppression
- ✅ Actions irréversibles
- ✅ Warnings critiques
- ✅ Déconnexion

---

### 2. Alert (Notifications)

Affiche une notification pour attirer l'attention de l'utilisateur.

**Utilisation:**

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"

// Alert de succès
<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Succès !</AlertTitle>
  <AlertDescription>
    Vos modifications ont été enregistrées.
  </AlertDescription>
</Alert>

// Alert d'erreur
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Erreur de paiement</AlertTitle>
  <AlertDescription>
    Veuillez vérifier vos informations bancaires et réessayer.
  </AlertDescription>
</Alert>

// Alert d'information
<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Votre abonnement expire dans 3 jours.
  </AlertDescription>
</Alert>

// Alert de warning
<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Attention</AlertTitle>
  <AlertDescription>
    Vous avez atteint 80% de votre quota mensuel.
  </AlertDescription>
</Alert>
```

**Variants disponibles:**
- `default` - Alerte standard
- `destructive` - Alerte d'erreur (rouge)
- `success` - Alerte de succès (vert)
- `warning` - Alerte d'avertissement (orange)
- `info` - Alerte d'information (bleu)

**Cas d'usage:**
- ✅ Messages de succès après actions
- ✅ Erreurs de validation
- ✅ Avertissements utilisateur
- ✅ Informations contextuelles
- ✅ Status de paiement

---

### 3. Badge

Affiche un badge ou un composant qui ressemble à un badge.

**Utilisation:**

```tsx
import { Badge } from "@/components/ui/badge"
import { BadgeCheck } from "lucide-react"

// Badges simples
<Badge>Nouveau</Badge>
<Badge variant="secondary">En cours</Badge>
<Badge variant="destructive">Urgent</Badge>
<Badge variant="outline">Draft</Badge>

// Badges colorés personnalisés
<Badge variant="success">Payé</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="info">Premium</Badge>

// Badge avec icône
<Badge variant="secondary" className="gap-1">
  <BadgeCheck className="h-3 w-3" />
  Vérifié
</Badge>

// Badge de compteur
<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
  12
</Badge>

// Badge comme lien
<Badge asChild>
  <Link href="/premium">Premium</Link>
</Badge>
```

**Variants disponibles:**
- `default` - Badge primaire (vert)
- `secondary` - Badge secondaire (gris)
- `destructive` - Badge destructif (rouge)
- `outline` - Badge avec bordure
- `success` - Badge succès (vert clair)
- `warning` - Badge warning (orange)
- `info` - Badge info (bleu)

**Cas d'usage pour votre app:**

#### Catégories de dépenses/revenus:
```tsx
// Catégories de revenus
<Badge variant="success">Salaire</Badge>
<Badge variant="info">Freelance</Badge>
<Badge variant="secondary">Autre</Badge>

// Catégories de dépenses
<Badge variant="destructive">Urgent</Badge>
<Badge variant="warning">Courses</Badge>
<Badge variant="outline">Loisirs</Badge>
```

#### Status Premium:
```tsx
<Badge variant="default" className="gap-1">
  <Sparkles className="h-3 w-3" />
  Premium
</Badge>

<Badge variant="outline">Gratuit</Badge>
```

#### Status de paiement:
```tsx
<Badge variant="success">Payé</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="destructive">Échoué</Badge>
```

#### Objectifs d'épargne:
```tsx
<Badge variant="success">Complété</Badge>
<Badge variant="info">En cours</Badge>
<Badge variant="outline">À venir</Badge>
```

---

## Exemples d'intégration dans votre app

### 1. Confirmation de suppression d'objectif

```tsx
// app/dashboard/goals/page.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/Button"
import { Trash2 } from "lucide-react"

function GoalCard({ goal }) {
  const handleDelete = async () => {
    // Logique de suppression
  }

  return (
    <Card>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'objectif ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer "{goal.name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
```

### 2. Notifications de statut de paiement

```tsx
// app/dashboard/subscription/page.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

function SubscriptionPage() {
  const paymentSuccess = searchParams.get('success') === 'true'
  const paymentCanceled = searchParams.get('canceled') === 'true'

  return (
    <div className="space-y-6">
      {paymentSuccess && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Paiement réussi !</AlertTitle>
          <AlertDescription>
            Votre abonnement Premium est maintenant actif. Profitez de toutes les fonctionnalités !
          </AlertDescription>
        </Alert>
      )}

      {paymentCanceled && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Paiement annulé</AlertTitle>
          <AlertDescription>
            Vous pouvez réessayer à tout moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
```

### 3. Badges de catégories

```tsx
// app/dashboard/expenses/page.tsx
import { Badge } from "@/components/ui/badge"

const CATEGORY_COLORS = {
  'Alimentation': 'success',
  'Transport': 'info',
  'Loisirs': 'warning',
  'Santé': 'destructive',
  'Logement': 'secondary',
} as const

function ExpenseRow({ expense }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant={CATEGORY_COLORS[expense.category] || 'outline'}>
        {expense.category}
      </Badge>
      <span>{expense.amount} €</span>
    </div>
  )
}
```

### 4. Badge Premium utilisateur

```tsx
// components/UserAvatar.tsx
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

function UserAvatar({ user }) {
  return (
    <div className="flex items-center gap-2">
      <span>{user.email}</span>
      {user.is_premium && (
        <Badge variant="default" className="gap-1">
          <Sparkles className="h-3 w-3" />
          Premium
        </Badge>
      )}
    </div>
  )
}
```

---

## Installation

Toutes les dépendances ont été ajoutées au `package.json`. Exécutez simplement:

```bash
npm install
```

Nouvelle dépendance ajoutée:
- `@radix-ui/react-alert-dialog` - Pour le composant AlertDialog

---

## Ressources

- [shadcn/ui Alert Dialog](https://ui.shadcn.com/docs/components/alert-dialog)
- [shadcn/ui Alert](https://ui.shadcn.com/docs/components/alert)
- [shadcn/ui Badge](https://ui.shadcn.com/docs/components/badge)
- [Radix UI Documentation](https://www.radix-ui.com/)
