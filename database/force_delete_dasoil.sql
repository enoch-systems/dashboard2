-- Force delete script for dasoil@gmail.com
-- Run this if the previous deletion failed

-- Step 1: Check for any foreign key constraints
SELECT 
    tc.table_name, 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name = 'payment_receipts';

-- Step 2: Get the IDs to delete
SELECT id, student_name, email, created_at
FROM public.payment_receipts 
WHERE email = 'dasoil@gmail.com';

-- Step 3: Delete from viewed_payment_receipts (if it exists)
DELETE FROM public.viewed_payment_receipts 
WHERE receipt_id::text IN (
    SELECT id::text FROM public.payment_receipts 
    WHERE email = 'dasoil@gmail.com'
);

-- Step 4: Delete from payment_receipts
DELETE FROM public.payment_receipts 
WHERE email = 'dasoil@gmail.com';

-- Step 5: Verify deletion
SELECT 'Deleted successfully' as status, COUNT(*) as remaining_count
FROM public.payment_receipts 
WHERE email = 'dasoil@gmail.com';
