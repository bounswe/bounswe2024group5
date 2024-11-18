-- 0 < x < 400  ---> A1
-- 400 < x < 1000  ---> A2
-- 1000 < x < 1800  ---> B1
-- 1800 < x < 2600  ---> B2
-- 2600 < x < 3300  ---> C1
-- 3300 < x  ---> C2

UPDATE User
SET english_proficiency = CASE
    WHEN points > 0 AND points <= 400 THEN 'A1'
    WHEN points > 400 AND points <= 1000 THEN 'A2'
    WHEN points > 1000 AND points <= 1800 THEN 'B1'
    WHEN points > 1800 AND points <= 2600 THEN 'B2'
    WHEN points > 2600 AND points <= 3300 THEN 'C1'
    WHEN points > 3300 THEN 'C2'
    ELSE NULL -- If there is a mistake then make it NULL
END;