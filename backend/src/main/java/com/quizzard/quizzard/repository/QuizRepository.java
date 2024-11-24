package com.quizzard.quizzard.repository;


import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository <Quiz, Long> {


    List<Quiz> findByAuthorAndDifficultyBetween(User user, Double integer, Double integer1);

    List<Quiz> findByAuthorAndDifficultyGreaterThanEqual(User user, double v);

    List<Quiz> findByAuthorAndDifficultyLessThanEqual(User user, double v);

    List<Quiz> findByDifficultyBetween(double v, double v2);

    List<Quiz> findByAuthor(User user);

    List<Quiz> findByDifficultyGreaterThanEqual(double v);

    List<Quiz> findByDifficultyLessThanEqual(double v);
}
