-- Fix constraint and manage payment proofs

-- Step 1: Add unique constraint if not exists (fixes the ON CONFLICT error)
DO $$
BEGIN
    -- Check if constraint exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'viewed_payment_receipts_receipt_id_user_id_key'
    ) THEN
        -- Add unique constraint
        ALTER TABLE public.viewed_payment_receipts 
        ADD CONSTRAINT viewed_payment_receipts_receipt_id_user_id_key 
        UNIQUE (receipt_id, user_id);
    END IF;
END $$;

-- Step 2: Mark ALL approved/rejected as "viewed" (skip if already viewed)
INSERT INTO public.viewed_payment_receipts (receipt_id, user_id, viewed_at)
SELECT 
    pr.id as receipt_id,
    'admin_user' as user_id,
    NOW() as viewed_at
FROM public.payment_receipts pr
WHERE pr.status IN ('approved', 'rejected')
  AND NOT EXISTS (
      SELECT 1 FROM public.viewed_payment_receipts vpr 
      WHERE vpr.receipt_id = pr.id AND vpr.user_id = 'admin_user'
  );

-- Step 3: Delete ALL pending payment proofs
DELETE FROM public.viewed_payment_receipts 
WHERE receipt_id IN (
    SELECT id FROM public.payment_receipts WHERE status = 'pending'
);

DELETE FROM public.payment_receipts 
WHERE status = 'pending';

-- Step 4: Verify
SELECT status, COUNT(*) as count FROM public.payment_receipts GROUP BY status;
