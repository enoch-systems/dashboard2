-- Delete script for eocnhs railw (enocg@gmal.com)
-- Run this in Supabase SQL Editor

-- Step 1: Check what exists
SELECT id, student_name, email, amount, created_at
FROM public.payment_receipts 
WHERE email = 'enocg@gmal.com'
   OR LOWER(student_name) LIKE '%eocnhs%'
   OR LOWER(student_name) LIKE '%railw%'
   OR LOWER(student_name) LIKE '%enocg%';

-- Step 2: Delete from viewed_payment_receipts (if it exists)
DELETE FROM public.viewed_payment_receipts 
WHERE receipt_id::text IN (
    SELECT id::text FROM public.payment_receipts 
    WHERE email = 'enocg@gmal.com'
       OR LOWER(student_name) LIKE '%eocnhs%'
       OR LOWER(student_name) LIKE '%railw%'
       OR LOWER(student_name) LIKE '%enocg%'
);

-- Step 3: Delete from payment_receipts
DELETE FROM public.payment_receipts 
WHERE email = 'enocg@gmal.com'
   OR LOWER(student_name) LIKE '%eocnhs%'
   OR LOWER(student_name) LIKE '%railw%'
   OR LOWER(student_name) LIKE '%enocg%';

-- Step 4: Verify deletion
SELECT 'Deleted successfully' as status, COUNT(*) as remaining_count
FROM public.payment_receipts 
WHERE email = 'enocg@gmal.com'
   OR LOWER(student_name) LIKE '%eocnhs%'
   OR LOWER(student_name) LIKE '%railw%'
   OR LOWER(student_name) LIKE '%enocg%';
