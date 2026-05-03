-- Check all users in Supabase auth.users table
-- This will show you all authenticated users

SELECT 
    id,
    email,
    created_at,
    updated_at,
    last_sign_in_at,
    email_confirmed_at,
    phone_confirmed_at,
    is_super_admin,
    banned_until,
    CASE 
        WHEN email_confirmed_at IS NOT NULL THEN true 
        ELSE false 
    END as email_confirmed,
    CASE 
        WHEN phone_confirmed_at IS NOT NULL THEN true 
        ELSE false 
    END as phone_confirmed,
    is_anonymous
FROM auth.users 
ORDER BY created_at DESC;

-- Check user count
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as email_confirmed_users,
    COUNT(CASE WHEN last_sign_in_at IS NOT NULL THEN 1 END) as users_who_signed_in,
    MIN(created_at) as oldest_user,
    MAX(created_at) as newest_user
FROM auth.users;

-- Check recent sign-ins (last 30 days)
SELECT 
    email,
    last_sign_in_at,
    created_at,
    CASE 
        WHEN last_sign_in_at > NOW() - INTERVAL '30 days' THEN 'Recent'
        ELSE 'Not recent'
    END as sign_in_status
FROM auth.users 
WHERE last_sign_in_at IS NOT NULL
ORDER BY last_sign_in_at DESC;

-- Check for any users that might need attention
SELECT 
    email,
    created_at,
    last_sign_in_at,
    email_confirmed_at,
    CASE 
        WHEN email_confirmed_at IS NULL THEN 'Email not confirmed'
        WHEN last_sign_in_at IS NULL THEN 'Never signed in'
        ELSE 'Active user'
    END as status
FROM auth.users 
WHERE email_confirmed_at IS NULL OR last_sign_in_at IS NULL
ORDER BY created_at DESC;
