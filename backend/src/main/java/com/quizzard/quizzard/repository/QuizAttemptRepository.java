package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.QuizAttempt;
import com.quizzard.quizzard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    boolean existsByUserId(Long userId);
    List<QuizAttempt> findAllByUserId(Long userId);
    List<QuizAttempt> findAllByUser(User user);
    boolean existsByQuizId(Long quizId);
    List<QuizAttempt> findAllByQuizId(Long quizId);
    boolean existsByUserIdAndQuizId(Long userId, Long quizId);
    List<QuizAttempt> findAllByUserIdAndQuizId(Long userId, Long quizId);
    List<QuizAttempt> findAllByUserIdAndIsCompleted(Long UserId, boolean isCompleted);
    boolean existsByUserIdAndQuizIdAndIsCompleted(Long userId, Long quizId, boolean isCompleted);
    List<QuizAttempt> findAllByUserIdAndQuizIdAndIsCompleted(Long userId, Long quizId, boolean isCompleted);
}
