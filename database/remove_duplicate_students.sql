-- Remove duplicate students from the database
-- Run this in Supabase SQL Editor

-- First, check for duplicates by name
SELECT 
  name,
  email,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as duplicate_ids
FROM public.students 
GROUP BY name, email
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- Show duplicates by email (more reliable)
SELECT 
  email,
  name,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as duplicate_ids
FROM public.students 
GROUP BY email, name
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- Remove duplicates keeping the most recent one (by created_at)
WITH duplicates AS (
  SELECT 
    id,
    email,
    name,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC) as row_num
  FROM public.students
)
DELETE FROM public.students 
WHERE id IN (
  SELECT id FROM duplicates WHERE row_num > 1
);

-- Verify duplicates are removed
SELECT 
  email,
  name,
  COUNT(*) as count
FROM public.students 
GROUP BY email, name
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- Show total student count after cleanup
SELECT COUNT(*) as total_students FROM public.students;
