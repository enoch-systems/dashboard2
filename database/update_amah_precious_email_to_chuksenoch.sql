-- Update Amah Precious's email from amahchibu@gmail.com to chuksenoch10@gmail.com
-- This updates the students table

UPDATE public.students 
SET email = 'chuksenoch10@gmail.com', 
    updated_at = NOW()
WHERE email = 'amahchibu@gmail.com' 
  AND name = 'Amah Precious';

-- Verify the update
SELECT id, name, email, phone, course, updated_at 
FROM public.students 
WHERE email = 'chuksenoch10@gmail.com' 
   OR (email = 'amahchibu@gmail.com' AND name = 'Amah Precious');
