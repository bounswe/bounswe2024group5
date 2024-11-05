package com.quizzard.quizzard.repository;


import com.quizzard.quizzard.model.English;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnglishRepository extends JpaRepository<English, Long> {

    boolean existsByWord(String word);
}
