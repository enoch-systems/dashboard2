-- Delete ALL email history for Amah Precious (amahchibu@gmail.com)
-- This will remove all email_followups records for this student

-- First, verify the student exists and check what will be deleted
-- SELECT s.id, s.name, s.email, COUNT(ef.id) as email_count
-- FROM public.students s
-- LEFT JOIN public.email_followups ef ON s.id = ef.student_id
-- WHERE s.email = 'amahchibu@gmail.com' AND s.name = 'Amah Precious'
-- GROUP BY s.id, s.name, s.email;

-- Delete ALL email followups for Amah Precious
DELETE FROM public.email_followups 
WHERE student_id = (
    SELECT id FROM public.students 
    WHERE email = 'amahchibu@gmail.com' 
    AND name = 'Amah Precious'
);

-- Alternative: Delete by joining with students table
-- DELETE FROM public.email_followups ef
-- USING public.students s
-- WHERE ef.student_id = s.id
--   AND s.email = 'amahchibu@gmail.com'
--   AND s.name = 'Amah Precious';

-- Verify deletion - should return 0 rows
-- SELECT COUNT(*) as remaining_emails
-- FROM public.email_followups ef
-- JOIN public.students s ON ef.student_id = s.id
-- WHERE s.email = 'amahchibu@gmail.com'
--   AND s.name = 'Amah Precious';
