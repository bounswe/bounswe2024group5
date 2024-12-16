package com.quizzard.quizzard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.quizzard.quizzard.model.WordToSense;

public interface WordToSenseRepository extends JpaRepository<WordToSense, Long> {

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
        SELECT sense.sense
        FROM word_to_sense
        LEFT JOIN sense ON word_to_sense.sense_id = sense.id
        LEFT JOIN english ON word_to_sense.english_id = english.id
        WHERE english.word <> :word
        AND word_to_sense.type_id = (
            SELECT word_to_sense.type_id
            FROM word_to_sense
            LEFT JOIN english ON english.id = word_to_sense.english_id
            LEFT JOIN sense ON sense.id = word_to_sense.sense_id
            WHERE english.word = :word
            AND sense.sense = :correctAnswer
            LIMIT 1
        )
        LIMIT 3
    """, nativeQuery = true)
    List<String> findWrongAnswerSuggestions(String word, String correctAnswer);
    
}
