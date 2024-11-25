package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Turkish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurkishRepository extends JpaRepository<Turkish, Long> {
    boolean existsByWord(String word);
    Turkish findByWord(String word);

    @Query(value = """
    SELECT word FROM (
        SELECT DISTINCT t.word, e.score
        FROM turkish t 
        INNER JOIN translate tr ON t.id = tr.turkish_id 
        INNER JOIN english e ON e.id = tr.english_id 
        WHERE t.word LIKE :prefix% 
        AND e.score != 2000 
    ) AS sub
    ORDER BY score 
    LIMIT 10
    """,
            nativeQuery = true)
    List<String> findTop5ByWordStartingWith(@Param("prefix") String prefix);
}
