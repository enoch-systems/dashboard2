-- Update Amah Precious's email from chuksenoch!0@gmail.com to chuzzyenoch@gmail.com
-- This updates the students table

UPDATE public.students 
SET email = 'chuzzyenoch@gmail.com', 
    updated_at = NOW()
WHERE email = 'chuksenoch!0@gmail.com' 
  AND name = 'Amah Precious';

-- Verify the update
SELECT id, name, email, phone, course, reg_date, status, created_at, updated_at
FROM public.students 
WHERE name = 'Amah Precious';
