-- Fix timestamp format to match existing students (MM/DD/YYYY format)
-- Run this in Supabase SQL Editor

-- Update the 5 new students to use MM/DD/YYYY format with today's date
UPDATE public.students 
SET timestamp = '5/2/2026 7:25:00'
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
  timestamp,
  created_at
FROM public.students 
WHERE email IN (
  'zaynabyusrahsani@gmail.com',
  'timehinfarhaat@gmail.com', 
  'siredave1@gmail.com',
  'olabisi5858@gmail.com',
  'kuforijinafisat8@gmail.com'
)
ORDER BY timestamp DESC;

-- Show top 10 most recent students by timestamp to verify they're at the top
SELECT 
  name,
  email,
  reg_date,
  timestamp
FROM public.students 
ORDER BY timestamp DESC 
LIMIT 10;


