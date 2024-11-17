package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.QuestionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long> {
    List<QuestionAnswer> findAllByQuizAttemptId(Long quizAttemptId);
    QuestionAnswer findByQuizAttemptIdAndQuestionId(Long quizAttemptId, Long questionId);
    boolean existsByQuizAttemptIdAndQuestionId(Long quizAttemptId, Long questionId);
}
