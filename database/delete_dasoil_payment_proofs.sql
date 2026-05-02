-- SQL Script to Delete Payment Proofs for rolpa gaol (dasoil@gmail.com)
-- Run this in Supabase SQL Editor

-- First, let's see what will be deleted (SAFETY CHECK)
SELECT 'PAYMENT PROOFS TO BE DELETED FOR rolpa gaol (dasoil@gmail.com):' as info;

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
WHERE LOWER(email) = 'dasoil@gmail.com'
   OR LOWER(student_name) LIKE '%rolpa%'
   OR LOWER(student_name) LIKE '%gaol%'
ORDER BY created_at DESC;

-- DELETE QUERY - Uncomment the lines below after verifying the SELECT results
-- DELETE FROM public.viewed_payment_receipts 
-- WHERE receipt_id IN (
--     SELECT id FROM public.payment_receipts 
--     WHERE LOWER(email) = 'dasoil@gmail.com'
--        OR LOWER(student_name) LIKE '%rolpa%'
--        OR LOWER(student_name) LIKE '%gaol%'
-- );

-- DELETE FROM public.payment_receipts 
-- WHERE LOWER(email) = 'dasoil@gmail.com'
--    OR LOWER(student_name) LIKE '%rolpa%'
--    OR LOWER(student_name) LIKE '%gaol%';

-- -- Verify deletion
-- SELECT 'Remaining payment proofs:' as info;
-- SELECT COUNT(*) as total_receipts FROM public.payment_receipts;
