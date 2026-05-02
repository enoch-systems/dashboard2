-- Update Amah Precious email from chuzzyenoch@gmail.com to amahchibu@gmail.com
-- This updates the student record with the correct email address

UPDATE public.students 
SET email = 'amahchibu@gmail.com', 
    updated_at = NOW()
WHERE name = 'Amah Precious'
  AND email = 'chuzzyenoch@gmail.com';

-- Alternative: Update by name and course if email doesn't match exactly
-- UPDATE public.students 
-- SET email = 'amahchibu@gmail.com', 
--     updated_at = NOW()
-- WHERE name = 'Amah Precious'
--   AND course ILIKE '%UI/UX Design%';

-- Verify the update was successful
-- SELECT id, name, email, course, payment_plan, updated_at 
-- FROM public.students 
-- WHERE name = 'Amah Precious';
