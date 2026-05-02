-- SQL Script to Check Which Students Exist in Database
-- Run this in Supabase SQL Editor

-- Create a temporary table with the new student names
CREATE TEMP TABLE new_students_list AS
SELECT unnest(ARRAY[
  'Precious Barong Obi',
  'Ezekiel',
  'Ekemini Akanimo Edet',
  'Adedapo Abayomi Amuda',
  'Osochukwu Sarah Ogechi',
  'AUGUSTINE UWAKWE',
  'Okoye Genevieve Chukwudalu',
  'Oluwatosin Deborah Ajinomisan',
  'Ndukwe Onyinyechi Angela',
  'Innocent Praise jah',
  'Emmanuel Nnamdi',
  'Meseke Naomi Oluwafunmibi',
  'Uzor Stanley Ugochukwu',
  'Simbiyat Mohammed Onize',
  'Adekanbi-Adekoya Basirat Adebisi',
  'Uwakwe Georgeline Enyioma',
  'Emilia Azibator',
  'Adefisayo Catherine Ayomiposi',
  'Fadairo Abiodun Samuel',
  'Boyi victor',
  'Gideon Oluwabusola Ojo',
  'Oyewole Taiwo oluwatoyosi',
  'Abdullahi Quadri Abayomi',
  'kc Kenechukwu emmanuel',
  'Onyia Peter Chimaobi',
  'Azeez Adams Adedeji',
  'Prosper ogodo',
  'Odusina Oluwapelumi',
  'Okere Chukwuma',
  'Emmanuel Anyangbeso',
  'Chigozie Gregory Odoemena',
  'James Chamberlain Omailey',
  'John Oluwatobi Elijah',
  'Ubebe Stephen Akomaye',
  'Abdsalam Oshinibosi',
  'Abdullrahman Alfa sani',
  'Maurice Okeke',
  'Akinwumi Abdulrasaq Owolabi',
  'Solomon John',
  'Joseph Emmanuel',
  'Victoria Popoola',
  'Abdulquadr Ojenike',
  'Oloruntuyi Stephen Ayomide',
  'Okeke Godwin',
  'Maduabuchi Daniel Ikechukwu',
  'Badmus Abdulhameed Olamikun',
  'Chikezie Mark okeke',
  'Enifome Naomi Obi',
  'Godwin Gracious Chinaza',
  'Ifeyinwa Glory Ibekwe',
  'Nwadiaru Gideon ugochukwu',
  'Adeogun Opeyemi Hannah',
  'Nafisa Ahmad',
  'Akukwe Justine',
  'Odunyemi Eniola',
  'Ray Ugwu',
  'Yusuf Idris Adegoke',
  'Celinah Akpan',
  'Motunrayo Adelubi',
  'Ismaheel Oladimeji',
  'Akpama Sunny',
  'Ohakwe Chioma Vivian',
  'Osahon Hope',
  'Akinyemi Gabriel Anuoluwapo',
  'Michael Iweibo',
  'Cynthia Nwokoye',
  'Hikmat Ajoke Abdulwahab',
  'Joy Imarhiagbe',
  'Uba Ehi Maryprosper',
  'Maryam Ismail',
  'Praise Stephen',
  'bal sur',
  'Eniola Abimbola',
  'Osolobugwemado Divine Ofurhie',
  'Euventus Chinweuba',
  'Akhibi Rhoda Idegbua',
  'Nwobu Chinaza Bolatito',
  'Chidi Japhet Ironali',
  'Ndenebari Ledornu Samuel',
  'Igbalajobi Miracle Opeyemi',
  'MANGA SAMUEL',
  'Anderson Chigozie Jedidiah',
  'Ebomuche Almond chukwuka',
  'Eke favour',
  'Nwaihie Israel Agim',
  'Uzor Marvel Chidelumma',
  'Akinrinade Samson Olaoluwa',
  'Luke Nkereawaji',
  'Osamuyi lsiokhere',
  'Bolaji Taiwo',
  'Blossom Ebube',
  'Adegbola Abdulbasit A.',
  'Nabila Hassan Sada',
  'Joseph Justice',
  'Oyeshile Abdullah',
  'ZAINAB YUSRAH SANI',
  'Farhaat Timehin',
  'David Ezekiel',
  'Oladiipo Olabisi',
  'Nafisat Kuforiji Omonike'
]) AS name;

-- Query 1: Students that EXIST in the database
SELECT 
  n.name AS "Student Name",
  s.email,
  s.phone,
  s.course,
  s.payment_plan,
  s.reg_date,
  'EXISTS' AS status
FROM new_students_list n
INNER JOIN public.students s ON LOWER(TRIM(n.name)) = LOWER(TRIM(s.name))
ORDER BY n.name;

-- Query 2: Students that DO NOT EXIST in the database (need to be added)
SELECT 
  n.name AS "Student Name",
  'DOES NOT EXIST - NEEDS TO BE ADDED' AS status
FROM new_students_list n
LEFT JOIN public.students s ON LOWER(TRIM(n.name)) = LOWER(TRIM(s.name))
WHERE s.id IS NULL
ORDER BY n.name;

-- Query 2b: QUICK VIEW - Just the 5 missing students (run this to see exactly who to add)
SELECT n.name AS "MISSING STUDENTS (Add These)"
FROM new_students_list n
LEFT JOIN public.students s ON LOWER(TRIM(n.name)) = LOWER(TRIM(s.name))
WHERE s.id IS NULL
ORDER BY n.name;

-- Query 3: Summary counts
SELECT 
  (SELECT COUNT(*) FROM new_students_list n INNER JOIN public.students s ON LOWER(TRIM(n.name)) = LOWER(TRIM(s.name))) AS "Students Already in DB",
  (SELECT COUNT(*) FROM new_students_list n LEFT JOIN public.students s ON LOWER(TRIM(n.name)) = LOWER(TRIM(s.name)) WHERE s.id IS NULL) AS "Students NOT in DB (need to be added)",
  (SELECT COUNT(*) FROM new_students_list) AS "Total in List";

-- Clean up temp table
DROP TABLE IF EXISTS new_students_list;
