package com.quizzard.quizzard.repository;


import com.quizzard.quizzard.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository <Quiz, Long> {

    boolean existsByTitle(String title);

    boolean existsById(Long id);

    Quiz findByTitle(String title);
}
