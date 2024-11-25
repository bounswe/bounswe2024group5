package com.quizzard.quizzard.repository;


import com.quizzard.quizzard.model.English;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnglishRepository extends JpaRepository<English, Long> {

    boolean existsByWord(String word);
    English findByWord(String word);

    @Query("SELECT e.word FROM English e WHERE e.word LIKE :prefix% AND e.score != 2000 ORDER BY e.score LIMIT 10")
    List<String> findTop5ByWordStartingWith(@Param("prefix") String prefix);
}
