-- Verify Amah Precious's current email in the database
-- This query checks the current email for Amah Precious

SELECT id, name, email, phone, course, reg_date, status, created_at, updated_at
FROM public.students 
WHERE name = 'Amah Precious' 
   AND email = 'chuksenoch!0@gmail.com';
