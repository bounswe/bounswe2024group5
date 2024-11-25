package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Translate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TranslateRepository extends JpaRepository<Translate, Long> {
    @Query(value = """
    SELECT DISTINCT tu.word
    FROM translate t
    INNER JOIN english e ON t.english_id = e.id
    INNER JOIN turkish tu ON t.turkish_id = tu.id
    WHERE e.word = :word
    LIMIT 10
    """,
            nativeQuery = true)
    List<String> findTurkishByEnglishWord(@Param("word") String word);

    @Query(value = """

            SELECT DISTINCT word
    FROM (
        SELECT e.word, e.score
        FROM translate tr
        INNER JOIN turkish tu ON tr.turkish_id = tu.id
        INNER JOIN english e ON tr.english_id = e.id
        WHERE tu.word = :word
        ORDER BY e.score
        LIMIT 10
    ) subquery;
    
    """,
            nativeQuery = true)
    List<String> findEnglishByTurkishWord(@Param("word") String word);

    @Query(value = """
    SELECT DISTINCT s.sense
    FROM word_to_sense w
    INNER JOIN sense s ON w.sense_id = s.id
    INNER JOIN english e ON w.english_id = e.id
    WHERE e.word = :word
    LIMIT 10
    """,
            nativeQuery = true)
    List<String> findSenseByEnglishWord(String word);

}
