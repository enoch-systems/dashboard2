-- Fix sorting issue: Update created_at to match registration date for proper ordering
-- Run this in Supabase SQL Editor

-- Update the 5 new students to have created_at matching their registration date/time
UPDATE public.students 
SET created_at = '2026-05-02 07:25:00+00'
WHERE email IN (
  'zaynabyusrahsani@gmail.com',
  'timehinfarhaat@gmail.com', 
  'siredave1@gmail.com',
  'olabisi5858@gmail.com',
  'kuforijinafisat8@gmail.com'
);

-- Check if they're now the latest records
SELECT 
  name,
  email,
  reg_date,
  reg_time,
  created_at,
  timestamp
FROM public.students 
WHERE email IN (
  'zaynabyusrahsani@gmail.com',
  'timehinfarhaat@gmail.com', 
  'siredave1@gmail.com',
  'olabisi5858@gmail.com',
  'kuforijinafisat8@gmail.com'
)
ORDER BY created_at DESC;

-- Show top 10 most recent students to verify ordering
SELECT 
  name,
  email,
  reg_date,
  created_at
FROM public.students 
ORDER BY created_at DESC 
LIMIT 10;
