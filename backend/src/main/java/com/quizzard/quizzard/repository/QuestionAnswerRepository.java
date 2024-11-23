package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.QuestionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long> {




    QuestionAnswer findByQuizAttemptIdAndQuestionId(Long quizAttemptId, Long questionId);
    boolean existsByQuizAttemptIdAndQuestionId(Long quizAttemptId, Long questionId);

    // Fetch all question answers for all quiz attempts by a specific user
    @Query("""
        SELECT qa FROM QuestionAnswer qa
        JOIN qa.quizAttempt qaQuizAttempt
        WHERE qaQuizAttempt.user.id = :userId
    """)
    List<QuestionAnswer> findAllByUserId(@Param("userId") Long userId);

    // Fetch all question answers for a specific quiz attempt by a specific user
    @Query("""
        SELECT qa FROM QuestionAnswer qa
        JOIN qa.quizAttempt qaQuizAttempt
        WHERE qaQuizAttempt.id = :quizAttemptId AND qaQuizAttempt.user.id = :userId
    """)
    List<QuestionAnswer> findAllByQuizAttemptIdAndUserId(@Param("quizAttemptId") Long quizAttemptId, @Param("userId") Long userId);

    // Fetch all question answers for a specific question by a specific user
    @Query("""
        SELECT qa FROM QuestionAnswer qa
        JOIN qa.quizAttempt qaQuizAttempt
        WHERE qa.question.id = :questionId AND qaQuizAttempt.user.id = :userId
    """)
    List<QuestionAnswer> findAllByQuestionIdAndUserId(@Param("questionId") Long questionId, @Param("userId") Long userId);

    // Fetch all question answers for a specific quiz attempt and question by a specific user
    @Query("""
        SELECT qa FROM QuestionAnswer qa
        JOIN qa.quizAttempt qaQuizAttempt
        WHERE qaQuizAttempt.id = :quizAttemptId AND qa.question.id = :questionId AND qaQuizAttempt.user.id = :userId
    """)
    List<QuestionAnswer> findAllByQuizAttemptIdAndQuestionIdAndUserId(@Param("quizAttemptId") Long quizAttemptId, @Param("questionId") Long questionId, @Param("userId") Long userId);

    // Fetch all question answers for a specific quiz attempt
    @Query("""
        SELECT qa FROM QuestionAnswer qa
        WHERE qa.quizAttempt.id = :quizAttemptId
    """)
    List<QuestionAnswer> findAllByQuizAttemptId(Long quizAttemptId);
}
