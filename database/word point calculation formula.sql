UPDATE englishWords
SET word_point = 
    CASE 
        WHEN score IS NULL THEN 2000  -- For NULL medium level
        ELSE ROUND(
            LEAST(  -- Max 4000
                CASE
                    -- Score between 0-1 (very easy Words)
                    WHEN score <= 1 THEN 
                        score * 400  -- between 0-400 point
                    
                    -- score between 1-3 (easy-medium words)
                    WHEN score <= 3 THEN 
                        400 + ((score - 1) * 800)  -- between 400-2000 point
                    
                    -- Score between 3-5 (medium-hard words)
                    WHEN score <= 5 THEN 
                        2000 + ((score - 3) * 500)  -- between 2000-3000 point
                    
                    -- Score higher than 5 (very hard words)
                    ELSE 
                        3000 + ((score - 5) * 500)  -- between 3000-4000 point
                END,
                4000  -- Max level border
            ), 
            0
        )
    END;