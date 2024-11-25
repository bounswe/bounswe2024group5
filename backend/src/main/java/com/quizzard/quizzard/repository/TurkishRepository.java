package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Turkish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurkishRepository extends JpaRepository<Turkish, Long> {
    boolean existsByWord(String word);
    Turkish findByWord(String word);
    List<Turkish> findTop5ByWordStartingWith(String prefix);
}
