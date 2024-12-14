package com.quizzard.quizzard.repository;


import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.LeaderboardResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
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


    @Query(
            "SELECT q " +
                    "FROM Quiz q " +
                    "WHERE q.id != :givenQuizId " +
                    "AND q.id NOT IN (" +
                    "    SELECT qa.quiz.id " +
                    "    FROM QuizAttempt qa " +
                    "    JOIN qa.user u " +
                    "    WHERE u.username = :username" +
                    ") " +
                    "ORDER BY ABS((SELECT q2.difficulty FROM Quiz q2 WHERE q2.id = :givenQuizId) - q.difficulty) ASC"
    )
    List<Quiz> findRecommendedQuizzes(
            @Param("givenQuizId") Long givenQuizId,
            @Param("username") String username,
            Pageable pageable
    );

    @Query("""
        SELECT new com.quizzard.quizzard.model.response.LeaderboardResponse$QuizCreated(u.username, COUNT(q.id))
        FROM Quiz q
        JOIN q.author u
        WHERE q.createdAt >= :timestamp
        GROUP BY u.username
        ORDER BY COUNT(q.id) DESC
        """)
    List<LeaderboardResponse.QuizCreated> getLeaderboardQuizCreated(@Param("timestamp") Timestamp timestamp);
}
