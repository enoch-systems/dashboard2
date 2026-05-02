-- Update all student dates to DD/MM/YYYY format (2/5/2026 becomes 02/05/2026)
-- Run this in Supabase SQL Editor

-- Update the 5 newly added students to DD/MM/YYYY format
UPDATE public.students 
SET 
  reg_date = '02/05/2026',
  reg_time = '07:25:00',
  timestamp = '02/05/2026 07:25:00'
WHERE email IN (
  'zaynabyusrahsani@gmail.com',
  'timehinfarhaat@gmail.com', 
  'siredave1@gmail.com',
  'olabisi5858@gmail.com',
  'kuforijinafisat8@gmail.com'
);

-- Check the updated records
SELECT 
  name,
  email,
  reg_date,
  reg_time,
  timestamp,
  course
FROM public.students 
WHERE email IN (
  'zaynabyusrahsani@gmail.com',
  'timehinfarhaat@gmail.com', 
  'siredave1@gmail.com',
  'olabisi5858@gmail.com',
  'kuforijinafisat8@gmail.com'
)
ORDER BY name;
