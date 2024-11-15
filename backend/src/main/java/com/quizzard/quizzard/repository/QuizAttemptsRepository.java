package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.QuizAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptsRepository extends JpaRepository<QuizAttempts, Long> {
    boolean existsByUserId(Long userId);
    List<QuizAttempts> findAllByUserId(Long userId);
    boolean existsByQuizId(Long quizId);
    List<QuizAttempts> findAllByQuizId(Long quizId);
    boolean existsByUserIdAndQuizId(Long userId, Long quizId);
    List<QuizAttempts> findByUserIdAndQuizId(Long userId, Long quizId);
    boolean existsByUserIdAndQuizIdAndIsCompleted(Long userId, Long quizId, boolean isCompleted);
    QuizAttempts findByUserIdAndQuizIdAndIsCompleted(Long userId, Long quizId, boolean isCompleted);
}
