-- Delete enoch proof with proper type casting
-- This fixes the UUID/text type mismatch error

-- Step 1: Find the ID first
SELECT id, student_name, email, created_at 
FROM public.payment_receipts 
WHERE email = 'enaok@gmail.com';

-- Step 2: Delete using the ID (replace ACTUAL_ID with the id from above query)
-- DELETE FROM public.viewed_payment_receipts WHERE receipt_id = 'ACTUAL_ID'::uuid;
-- DELETE FROM public.payment_receipts WHERE id = 'ACTUAL_ID'::uuid;

-- OR use this approach with proper casting:
DELETE FROM public.viewed_payment_receipts 
WHERE receipt_id = ANY(
    ARRAY(SELECT id::uuid FROM public.payment_receipts WHERE email = 'enaok@gmail.com')
);

DELETE FROM public.payment_receipts 
WHERE email = 'enaok@gmail.com';

-- Verify it's deleted
SELECT 'Remaining proofs with enaok@gmail.com:' as check_result,
       COUNT(*) as count 
FROM public.payment_receipts 
WHERE email = 'enaok@gmail.com';
