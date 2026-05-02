-- SQL Script to Delete Specific Payment Proofs
-- Run this in Supabase SQL Editor

-- First, let's see what will be deleted (SAFETY CHECK)
SELECT 'PAYMENT PROOFS TO BE DELETED:' as info;

SELECT 
    id,
    student_name,
    email,
    amount,
    course,
    status,
    created_at,
    cloudinary_url
FROM public.payment_receipts 
WHERE email IN ('enoch@gmail.com', 'enaok@gmail.com')
   OR student_name ILIKE '%Enoch Chukwudi%'
   OR student_name ILIKE '%enoch%'
ORDER BY created_at DESC;

-- DELETE QUERY - Uncomment the lines below after verifying the SELECT results
-- DELETE FROM public.viewed_payment_receipts 
-- WHERE receipt_id IN (
--     SELECT id FROM public.payment_receipts 
--     WHERE email IN ('enoch@gmail.com', 'enaok@gmail.com')
--        OR student_name ILIKE '%Enoch Chukwudi%'
--        OR student_name ILIKE '%enoch%'
-- );

-- DELETE FROM public.payment_receipts 
-- WHERE email IN ('enoch@gmail.com', 'enaok@gmail.com')
--    OR student_name ILIKE '%Enoch Chukwudi%'
--    OR student_name ILIKE '%enoch%';

-- -- Verify deletion
-- SELECT 'Remaining payment proofs:' as info;
-- SELECT COUNT(*) as total_receipts FROM public.payment_receipts;
