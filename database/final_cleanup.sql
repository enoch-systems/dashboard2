-- Final cleanup with proper type casting

-- Step 1: Delete ALL pending payment proofs (simplest approach)
DELETE FROM public.payment_receipts 
WHERE status = 'pending';

-- Step 2: For approved/rejected, just ensure they're marked as viewed
-- Use text casting to match types
INSERT INTO public.viewed_payment_receipts (receipt_id, user_id, viewed_at)
SELECT 
    pr.id::text::uuid,  -- Cast to text then to uuid
    'admin_user',
    NOW()
FROM public.payment_receipts pr
WHERE pr.status IN ('approved', 'rejected')
  AND NOT EXISTS (
      SELECT 1 
      FROM public.viewed_payment_receipts vpr 
      WHERE vpr.receipt_id::text = pr.id::text 
        AND vpr.user_id = 'admin_user'
  );

-- Step 3: Verify
SELECT status, COUNT(*) as count 
FROM public.payment_receipts 
GROUP BY status;
