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

    @Query(value = """
        SELECT turkish.word, t.category_id
        FROM translate t
        JOIN turkish ON t.turkish_id = turkish.id
        LEFT JOIN translate t2 ON t.turkish_id = t2.turkish_id
            AND t2.english_id = (SELECT id FROM english WHERE word = :word)
        WHERE t2.turkish_id IS NULL
        AND t.type_id = (
            SELECT t3.type_id
            FROM translate t3
            JOIN turkish tr ON tr.id = t3.turkish_id
            JOIN english e3 ON e3.id = t3.english_id
            WHERE e3.word = :word AND tr.word = :correctAnswer
            LIMIT 1
        )
        AND t.category_id = (
            SELECT t4.category_id
            FROM translate t4
            JOIN turkish tr2 ON tr2.id = t4.turkish_id
            JOIN english e4 ON e4.id = t4.english_id
            WHERE e4.word = :word AND tr2.word = :correctAnswer
            ORDER BY t4.category_id DESC
            LIMIT 1
        )
        ORDER BY t.category_id DESC
        LIMIT 3
    """, nativeQuery = true)
    List<String> findWrongAnswerSuggestionsForEnToTr(String word, String correctAnswer);


    @Query(value = """
        SELECT english.word, t.category_id
        FROM translate t
        JOIN english ON t.english_id = english.id
        LEFT JOIN translate t2 ON t.english_id = t2.english_id
            AND t2.turkish_id = (SELECT id FROM turkish WHERE word = :word)
        WHERE t2.english_id IS NULL
        AND t.type_id = (
            SELECT t3.type_id
            FROM translate t3
            JOIN english tr ON tr.id = t3.english_id
            JOIN turkish e3 ON e3.id = t3.turkish_id
            WHERE e3.word = :word AND tr.word = :correctAnswer
            LIMIT 1
        )
        AND t.category_id = (
            SELECT t4.category_id
            FROM translate t4
            JOIN english tr2 ON tr2.id = t4.english_id
            JOIN turkish e4 ON e4.id = t4.turkish_id
            WHERE e4.word = :word AND tr2.word = :correctAnswer
            ORDER BY t4.category_id DESC
            LIMIT 1
        )
        ORDER BY t.category_id DESC
        LIMIT 3     
    """, nativeQuery = true)
    List<String> findWrongAnswerSuggestionsForTrToEn(String word, String correctAnswer);
}
