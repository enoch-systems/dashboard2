-- Update Amah Precious's email from chuzzyenoch@gmail.com to amahchibu@gmail.com
-- This updates the students table

UPDATE public.students 
SET email = 'amahchibu@gmail.com', 
    updated_at = NOW()
WHERE email = 'chuzzyenoch@gmail.com' 
  AND name = 'Amah Precious';

-- Verify the update
SELECT id, name, email, phone, course, reg_date, status, created_at, updated_at
FROM public.students 
WHERE name = 'Amah Precious';
