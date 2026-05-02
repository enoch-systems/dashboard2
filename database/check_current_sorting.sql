-- Check current sorting and timestamps to understand why students aren't appearing at top
-- Run this in Supabase SQL Editor

-- Show the 5 new students with all their date fields
SELECT 
  name,
  email,
  reg_date,
  reg_time,
  timestamp,
  created_at,
  updated_at
FROM public.students 
WHERE email IN (
  'zaynabyusrahsani@gmail.com',
  'timehinfarhaat@gmail.com', 
  'siredave1@gmail.com',
  'olabisi5858@gmail.com',
  'kuforijinafisat8@gmail.com'
)
ORDER BY created_at DESC;

-- Show top 15 most recent students by created_at
SELECT 
  name,
  email,
  reg_date,
  created_at
FROM public.students 
ORDER BY created_at DESC 
LIMIT 15;

-- Show top 15 most recent students by timestamp
SELECT 
  name,
  email,
  reg_date,
  timestamp
FROM public.students 
ORDER BY timestamp DESC 
LIMIT 15;

-- Check what format your timestamp field uses
SELECT DISTINCT 
  SUBSTRING(timestamp, 1, 10) as timestamp_format_sample,
  COUNT(*) as count
FROM public.students 
WHERE timestamp IS NOT NULL
GROUP BY SUBSTRING(timestamp, 1, 10)
ORDER BY count DESC
LIMIT 5;
