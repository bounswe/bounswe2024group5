package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Turkish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurkishRepository extends JpaRepository<Turkish, Long> {
    boolean existsByWord(String word);
    Turkish findByWord(String word);
}
