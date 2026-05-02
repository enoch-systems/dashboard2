-- Find and Delete Enoch's Payment Proofs
-- Step 1: Find exact matches (run this first)

SELECT 
    id,
    student_name,
    email,
    amount,
    status,
    created_at,
    'COPY THIS ID:' as instruction
FROM public.payment_receipts 
WHERE LOWER(email) = 'enoch@gmail.com'
   OR LOWER(email) = 'enaok@gmail.com'
   OR LOWER(student_name) LIKE '%enoch%'
ORDER BY created_at DESC;

-- Step 2: If you found the IDs, delete by specific ID (replace with actual IDs from above)
-- DELETE FROM public.viewed_payment_receipts WHERE receipt_id = 'ACTUAL_ID_HERE';
-- DELETE FROM public.payment_receipts WHERE id = 'ACTUAL_ID_HERE';

-- Alternative: Delete all enoch proofs by exact email match
-- DELETE FROM public.viewed_payment_receipts 
-- WHERE receipt_id IN (SELECT id FROM public.payment_receipts WHERE LOWER(email) IN ('enoch@gmail.com', 'enaok@gmail.com'));

-- DELETE FROM public.payment_receipts WHERE LOWER(email) IN ('enoch@gmail.com', 'enaok@gmail.com');

-- Alternative: Delete by partial name match
-- DELETE FROM public.viewed_payment_receipts 
-- WHERE receipt_id IN (
--     SELECT id FROM public.payment_receipts 
--     WHERE LOWER(student_name) LIKE '%enoch%'
-- );

-- DELETE FROM public.payment_receipts WHERE LOWER(student_name) LIKE '%enoch%';
