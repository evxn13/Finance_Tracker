-- Fix: Add missing INSERT policy for ai_insights table
-- This allows the API to insert AI-generated insights for users

CREATE POLICY "Users can insert own insights"
ON ai_insights
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Verify the policy was created
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'ai_insights';
