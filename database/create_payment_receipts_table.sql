-- SQL Script to Create/Update payment_receipts Table
-- Run this in Supabase SQL Editor

-- Check if table exists and create if it doesn't
CREATE TABLE IF NOT EXISTS public.payment_receipts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    amount INTEGER NOT NULL,
    course TEXT,
    payment_date TEXT NOT NULL,
    payment_type TEXT NOT NULL DEFAULT 'proof_submission',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    cloudinary_public_id TEXT,
    cloudinary_url TEXT,
    original_filename TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payment_receipts_status ON public.payment_receipts(status);
CREATE INDEX IF NOT EXISTS idx_payment_receipts_email ON public.payment_receipts(email);
CREATE INDEX IF NOT EXISTS idx_payment_receipts_submitted_at ON public.payment_receipts(submitted_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (if you have RLS enabled)
CREATE POLICY "Admins can view all payment receipts" ON public.payment_receipts
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert payment receipts" ON public.payment_receipts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update payment receipts" ON public.payment_receipts
    FOR UPDATE USING (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER handle_payment_receipts_updated_at
    BEFORE UPDATE ON public.payment_receipts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Test query to verify table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'payment_receipts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
