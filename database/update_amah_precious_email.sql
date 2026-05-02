-- Update Amah Precious's email address
UPDATE public.students 
SET email = 'amahchiibu@gmail.com', 
    updated_at = NOW()
WHERE email = 'chuzzyenoch@gmail.com' AND name = 'Amah Precious';
