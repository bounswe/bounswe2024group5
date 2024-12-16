package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.QuizAttempt;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.LeaderboardResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
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

    @Query("""
            SELECT new com.quizzard.quizzard.model.response.LeaderboardResponse$QuizSolved(u.username as username, COUNT(qa.id) as solved)
            FROM QuizAttempt qa
            JOIN qa.user u
            WHERE qa.isCompleted = true
              AND qa.updatedAt >= :timestamp
            GROUP BY u.username
            ORDER BY solved DESC
            LIMIT 10
            """)
    List<LeaderboardResponse.QuizSolved> getLeaderboardQuizSolved(@Param("timestamp") Timestamp timestamp);

    @Query("""
            SELECT new com.quizzard.quizzard.model.response.LeaderboardResponse$PointsEarned(u.username as username, SUM(qa.score) as points)
            FROM QuizAttempt qa
            JOIN qa.user u
            WHERE qa.isCompleted = true
              AND qa.updatedAt >= :timestamp
            GROUP BY u.username
            ORDER BY points DESC
            LIMIT 10
            """)
    List<LeaderboardResponse.PointsEarned> getLeaderboardPointsEarned(@Param("timestamp") Timestamp timestamp);
}
