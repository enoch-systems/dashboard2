-- Fix SQL Script for viewed_payment_receipts Table
-- Run this if you get "already exists" errors

-- Create table (safe to run multiple times)
CREATE TABLE IF NOT EXISTS public.viewed_payment_receipts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    receipt_id UUID NOT NULL REFERENCES public.payment_receipts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL DEFAULT 'admin_user',
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint to prevent duplicate view records
    UNIQUE(receipt_id, user_id)
);

-- Add indexes safely (skip if they already exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_viewed_receipts_receipt_id') THEN
        CREATE INDEX idx_viewed_receipts_receipt_id ON public.viewed_payment_receipts(receipt_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_viewed_receipts_user_id') THEN
        CREATE INDEX idx_viewed_receipts_user_id ON public.viewed_payment_receipts(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_viewed_receipts_viewed_at') THEN
        CREATE INDEX idx_viewed_receipts_viewed_at ON public.viewed_payment_receipts(viewed_at DESC);
    END IF;
END $$;

-- Enable RLS (safe to run multiple times)
ALTER TABLE public.viewed_payment_receipts ENABLE ROW LEVEL SECURITY;

-- Create policies safely (drop first if exist, then create)
DROP POLICY IF EXISTS "Admins can view all viewed receipts" ON public.viewed_payment_receipts;
DROP POLICY IF EXISTS "Admins can insert viewed receipts" ON public.viewed_payment_receipts;
DROP POLICY IF EXISTS "Admins can update viewed receipts" ON public.viewed_payment_receipts;

CREATE POLICY "Admins can view all viewed receipts" ON public.viewed_payment_receipts
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert viewed receipts" ON public.viewed_payment_receipts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update viewed receipts" ON public.viewed_payment_receipts
    FOR UPDATE USING (true);

-- Verify the table is working
SELECT 'Table created successfully' as status;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'viewed_payment_receipts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
