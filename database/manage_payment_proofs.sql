-- Manage Payment Proofs: Delete Pending, Keep Approved as Viewed
-- Run this in Supabase SQL Editor

-- Step 1: See what you have
SELECT 
    status,
    COUNT(*) as count
FROM public.payment_receipts 
GROUP BY status;

-- Step 2: Mark ALL approved/rejected receipts as "viewed" (so no "New message!" badge)
-- This inserts viewed records for all non-pending receipts
INSERT INTO public.viewed_payment_receipts (receipt_id, user_id, viewed_at)
SELECT 
    id as receipt_id,
    'admin_user' as user_id,
    NOW() as viewed_at
FROM public.payment_receipts
WHERE status IN ('approved', 'rejected')
  AND id NOT IN (
      SELECT receipt_id FROM public.viewed_payment_receipts WHERE user_id = 'admin_user'
  )
ON CONFLICT (receipt_id, user_id) DO NOTHING;

-- Step 3: Delete ALL pending payment proofs
DELETE FROM public.viewed_payment_receipts 
WHERE receipt_id IN (
    SELECT id FROM public.payment_receipts WHERE status = 'pending'
);

DELETE FROM public.payment_receipts 
WHERE status = 'pending';

-- Step 4: Verify results
SELECT 
    status,
    COUNT(*) as count
FROM public.payment_receipts 
GROUP BY status;

-- Check viewed records
SELECT COUNT(*) as viewed_count 
FROM public.viewed_payment_receipts 
WHERE user_id = 'admin_user';
