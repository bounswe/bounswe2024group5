package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.FavoriteQuiz;
import com.quizzard.quizzard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteQuizRepository extends JpaRepository<FavoriteQuiz, Long> {

    List<FavoriteQuiz> findAllByUserId(Long userId);

    Optional<FavoriteQuiz> findByUserIdAndQuizId(Long userId, Long quizId);

    boolean existsByUserIdAndQuizId(Long userId, Long quizId);

    void deleteByUserIdAndQuizId(Long userId, Long quizId);


    List<FavoriteQuiz> findAllByUser(User user);
}
