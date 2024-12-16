package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Optional<Question> findById(Long id);

    List<Question> findByQuizId(Long quizId);

    boolean existsByIdAndQuizId(Long questionId, Long id);

    List<Question> findByQuestionTypeAndWordAndCorrectAnswer(QuestionType questionType, String word, String correctAnswer);
}
