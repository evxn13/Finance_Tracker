# Migration vers shadcn/ui ✨

## Composants modernes implémentés

J'ai migré votre application vers les composants **shadcn/ui** pour un design encore plus moderne et professionnel !

### Composants mis à jour

1. ✅ **Button** - Composant button moderne avec variants CVA
2. ✅ **Card** - Card avec sous-composants (CardHeader, CardTitle, CardContent, etc.)
3. ✅ **Input** - Input avec support label, error, et icon
4. ✅ **Alert Dialog** - Dialogs modaux pour confirmations
5. ✅ **Alert** - Notifications utilisateur (success, error, warning, info)
6. ✅ **Badge** - Badges pour catégories, status, compteurs

### Système de design

- **class-variance-authority (CVA)** : Gestion des variants de composants
- **clsx + tailwind-merge** : Combinaison intelligente des classes CSS
- **Tokens CSS personnalisés** : Variables CSS pour les couleurs, bordures, etc.

## Installation des dépendances

Pour que tout fonctionne, vous devez installer les nouvelles dépendances:

```bash
npm install
```

Les packages suivants ont été ajoutés au `package.json`:

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## Nouveautés

### 1. Système de tokens CSS

Les couleurs et styles utilisent maintenant des variables CSS définies dans `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 142.1 76.2% 36.3%;
  --destructive: 0 84.2% 60.2%;
  /* ... */
}
```

### 2. Utilitaire `cn()`

Nouveau helper pour combiner les classes Tailwind intelligemment:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-class", condition && "conditional-class")} />
```

### 3. Variants avec CVA

Les composants utilisent `class-variance-authority` pour gérer les variants:

```tsx
// Button variants
<Button variant="default">Primary</Button>
<Button variant="destructive">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### 4. Composants avec forwardRef

Tous les composants supportent maintenant `ref` pour une meilleure intégration:

```tsx
const inputRef = useRef<HTMLInputElement>(null)
<Input ref={inputRef} label="Email" />
```

## Utilisation

### Button

```tsx
import { Button } from "@/components/ui/Button"

// Variants
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Link</Button>
<Button variant="link">Text Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// Loading state
<Button isLoading>Loading...</Button>
```

### Card

```tsx
import { Card } from "@/components/ui/Card"

// Simple
<Card title="Title" subtitle="Subtitle">
  Content here
</Card>

// Avec action
<Card
  title="Dashboard"
  subtitle="Vue d'ensemble"
  action={<Button size="sm">Action</Button>}
>
  Content
</Card>

// Avec composants
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

### Input

```tsx
import { Input } from "@/components/ui/Input"

// Simple
<Input placeholder="Email" />

// Avec label
<Input label="Email" type="email" />

// Avec icon
<Input
  label="Email"
  icon={<Mail />}
  placeholder="you@example.com"
/>

// Avec error
<Input
  label="Password"
  type="password"
  error="Le mot de passe est requis"
/>
```

## Avantages de shadcn/ui

1. **🎨 Design system cohérent** : Tous les composants suivent les mêmes patterns
2. **♿ Accessibilité** : Support des refs, aria-labels, keyboard navigation
3. **🔧 Personnalisable** : Vous possédez le code, modifiez-le comme vous voulez
4. **⚡ Performance** : Aucune librairie externe lourde, juste du code
5. **🌙 Dark mode ready** : Variables CSS prêtes pour le dark mode
6. **📱 Responsive** : Tous les composants sont mobile-first

## Prochaines étapes

Vous pouvez maintenant:

1. ✅ Tester l'application avec les nouveaux composants
2. ✅ Ajouter d'autres composants shadcn/ui si besoin (Badge, Dialog, Dropdown, etc.)
3. ✅ Personnaliser les couleurs dans `globals.css` et `tailwind.config.ts`
4. ✅ Activer le dark mode si souhaité

## Ressources

- [Documentation shadcn/ui](https://ui.shadcn.com)
- [Tous les composants disponibles](https://ui.shadcn.com/docs/components)
- [CVA Documentation](https://cva.style/docs)
