-- Fix AI insights DELETE policy

-- Drop existing delete policy if it exists
DROP POLICY IF EXISTS "Users can delete own insights" ON ai_insights;

-- Create new delete policy
CREATE POLICY "Users can delete own insights"
ON ai_insights
FOR DELETE
USING (auth.uid() = user_id);

-- Verify all policies for ai_insights
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
