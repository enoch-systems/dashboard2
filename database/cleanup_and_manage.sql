-- Clean up duplicates and manage payment proofs

-- Step 1: Delete duplicate viewed records, keep only the latest one per receipt/user
DELETE FROM public.viewed_payment_receipts a
USING public.viewed_payment_receipts b
WHERE a.id < b.id  -- Keep the one with higher ID (latest)
  AND a.receipt_id = b.receipt_id 
  AND a.user_id = b.user_id;

-- Step 2: Delete ALL pending payment proofs (simple, no constraints needed)
DELETE FROM public.payment_receipts 
WHERE status = 'pending';

-- Step 3: Mark remaining (approved/rejected) as viewed 
-- (insert only if not already viewed)
INSERT INTO public.viewed_payment_receipts (receipt_id, user_id, viewed_at)
SELECT 
    pr.id,
    'admin_user',
    NOW()
FROM public.payment_receipts pr
LEFT JOIN public.viewed_payment_receipts vpr 
    ON vpr.receipt_id = pr.id AND vpr.user_id = 'admin_user'
WHERE vpr.id IS NULL;

-- Step 4: Verify results
SELECT 
    'Payment Receipts by Status:' as info,
    status, 
    COUNT(*) as count
FROM public.payment_receipts 
GROUP BY status;

-- Check total viewed records
SELECT 
    'Total viewed records:' as info,
    COUNT(*) as count 
FROM public.viewed_payment_receipts;
