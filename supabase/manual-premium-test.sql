-- Script pour tester manuellement le système Premium
-- Remplacez 'VOTRE_USER_ID' par votre vrai user_id

-- 1. Trouver votre user_id (copiez l'ID qui correspond à votre email)
SELECT id, email FROM auth.users WHERE email = 'evanscheid42@gmail.com';

-- 2. Créer un abonnement test (remplacez USER_ID_ICI par l'ID trouvé ci-dessus)
INSERT INTO subscriptions (
  user_id,
  stripe_customer_id,
  stripe_subscription_id,
  stripe_price_id,
  status,
  current_period_start,
  current_period_end,
  cancel_at_period_end
) VALUES (
  'USER_ID_ICI', -- Remplacez par votre user_id
  'cus_test_123',
  'sub_test_123',
  'price_1SRKqB3PrS4AQiE7iOjrb27M',
  'active',
  NOW(),
  NOW() + INTERVAL '1 month',
  false
);

-- 3. Vérifier que is_premium a été mis à jour automatiquement
SELECT id, email, is_premium FROM profiles WHERE email = 'evanscheid42@gmail.com';

-- 4. Si is_premium est toujours false, forcez la mise à jour:
UPDATE profiles
SET is_premium = true
WHERE email = 'evanscheid42@gmail.com';
