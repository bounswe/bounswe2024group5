package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Optional<Question> findById(Long id);

    List<Question> findByQuizId(Long quizId);


}
