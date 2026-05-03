-- Update email from chuzzyenoch@gmail.com to successoghenegare7@gmail.com
-- This script updates email in all relevant tables

-- Update users table
UPDATE public.users 
SET email = 'successoghenegare7@gmail.com', updated_at = NOW()
WHERE email = 'chuzzyenoch@gmail.com';

-- Update students table
UPDATE public.students 
SET email = 'successoghenegare7@gmail.com', updated_at = NOW()
WHERE email = 'chuzzyenoch@gmail.com';

-- Update payment_requests table
UPDATE public.payment_requests 
SET email = 'successoghenegare7@gmail.com', updated_at = NOW()
WHERE email = 'chuzzyenoch@gmail.com';

-- Verify the changes
SELECT 'users' as table_name, COUNT(*) as updated_count FROM public.users WHERE email = 'successoghenegare7@gmail.com'
UNION ALL
SELECT 'students' as table_name, COUNT(*) as updated_count FROM public.students WHERE email = 'successoghenegare7@gmail.com'
UNION ALL
SELECT 'payment_requests' as table_name, COUNT(*) as updated_count FROM public.payment_requests WHERE email = 'successoghenegare7@gmail.com';
