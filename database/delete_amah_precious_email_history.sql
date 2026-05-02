-- Delete all email followup records for Amah Precious (amahchiibu@gmail.com)
-- This will remove records #1 through #13 as listed

DELETE FROM public.email_followups 
WHERE student_id IN (
    SELECT id FROM public.students 
    WHERE email = 'amahchiibu@gmail.com' AND name = 'Amah Precious'
);

-- Alternative approach if student_id relationship is different:
-- DELETE FROM public.email_followups 
-- WHERE EXISTS (
--     SELECT 1 FROM public.students 
--     WHERE students.id = email_followups.student_id 
--     AND students.email = 'amahchiibu@gmail.com' 
--     AND students.name = 'Amah Precious'
-- );

-- Verify deletion (optional - run this to check what was deleted)
-- SELECT COUNT(*) as deleted_count FROM public.email_followups 
-- WHERE student_id IN (
--     SELECT id FROM public.students 
--     WHERE email = 'amahchiibu@gmail.com' AND name = 'Amah Precious'
-- );
