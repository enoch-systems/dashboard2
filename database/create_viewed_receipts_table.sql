-- SQL Script to Create viewed_payment_receipts Table
-- Run this in Supabase SQL Editor

-- Create table to track which admin users have viewed which payment receipts
CREATE TABLE IF NOT EXISTS public.viewed_payment_receipts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    receipt_id UUID NOT NULL REFERENCES public.payment_receipts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL DEFAULT 'admin_user',
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint to prevent duplicate view records
    UNIQUE(receipt_id, user_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_viewed_receipts_receipt_id ON public.viewed_payment_receipts(receipt_id);
CREATE INDEX IF NOT EXISTS idx_viewed_receipts_user_id ON public.viewed_payment_receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_viewed_receipts_viewed_at ON public.viewed_payment_receipts(viewed_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.viewed_payment_receipts ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admins can view all viewed receipts" ON public.viewed_payment_receipts
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert viewed receipts" ON public.viewed_payment_receipts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update viewed receipts" ON public.viewed_payment_receipts
    FOR UPDATE USING (true);

-- Create function to check if a receipt has been viewed
CREATE OR REPLACE FUNCTION public.has_receipt_been_viewed(receipt_uuid UUID, admin_user_id TEXT DEFAULT 'admin_user')
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.viewed_payment_receipts
        WHERE receipt_id = receipt_uuid AND user_id = admin_user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get all viewed receipt IDs for a user
CREATE OR REPLACE FUNCTION public.get_viewed_receipt_ids(admin_user_id TEXT DEFAULT 'admin_user')
RETURNS TABLE(receipt_id UUID) AS $$
BEGIN
    RETURN QUERY
    SELECT v.receipt_id 
    FROM public.viewed_payment_receipts v
    WHERE v.user_id = admin_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to mark a receipt as viewed (handles duplicates gracefully)
CREATE OR REPLACE FUNCTION public.mark_receipt_viewed(receipt_uuid UUID, admin_user_id TEXT DEFAULT 'admin_user')
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.viewed_payment_receipts (receipt_id, user_id, viewed_at)
    VALUES (receipt_uuid, admin_user_id, NOW())
    ON CONFLICT (receipt_id, user_id) 
    DO UPDATE SET viewed_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'viewed_payment_receipts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
