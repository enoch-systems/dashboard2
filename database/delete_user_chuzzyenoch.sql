-- Delete user chuzzyenoch@gmail.com from Supabase auth.users table
-- This will permanently remove the user and all their session data

-- First, let's check if the user exists
SELECT id, email, created_at, last_sign_in_at, email_confirmed_at
FROM auth.users 
WHERE email = 'chuzzyenoch@gmail.com';

-- Delete the user from auth.users table
-- WARNING: This action is irreversible and will:
-- - Remove the user account permanently
-- - Invalidate all active sessions
-- - Remove all user data from auth system
-- - Cannot be undone

DELETE FROM auth.users 
WHERE email = 'chuzzyenoch@gmail.com';

-- Verify the user has been deleted
SELECT COUNT(*) as remaining_users_with_email
FROM auth.users 
WHERE email = 'chuzzyenoch@gmail.com';

-- Show remaining users for verification
SELECT id, email, created_at, last_sign_in_at, email_confirmed_at
FROM auth.users 
ORDER BY created_at DESC;
