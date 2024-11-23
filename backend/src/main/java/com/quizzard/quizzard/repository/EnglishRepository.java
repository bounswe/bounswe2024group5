package com.quizzard.quizzard.repository;


import com.quizzard.quizzard.model.English;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnglishRepository extends JpaRepository<English, Long> {

    boolean existsByWord(String word);
    English findByWord(String word);

    List<English> findTop5ByWordStartingWith(String prefix);




}
