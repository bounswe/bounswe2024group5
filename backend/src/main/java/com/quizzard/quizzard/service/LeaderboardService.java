package com.quizzard.quizzard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

import com.quizzard.quizzard.model.response.LeaderboardResponse;
import com.quizzard.quizzard.repository.QuizAttemptRepository;
import com.quizzard.quizzard.repository.QuizRepository;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Service
public class LeaderboardService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    
    public LeaderboardResponse getLeaderboards() {
        LeaderboardResponse response = new LeaderboardResponse();
        Timestamp oneWeekAgo = new Timestamp(System.currentTimeMillis() - 7L * 24L * 60L * 60L * 1000L);
        Timestamp oneMonthAgo = new Timestamp(System.currentTimeMillis() - 30L * 24L * 60L * 60L * 1000L);

        response.getWeekly().setQuizCreated(quizRepository.getLeaderboardQuizCreated(oneWeekAgo));
        response.getMonthly().setQuizCreated(quizRepository.getLeaderboardQuizCreated(oneMonthAgo));
        response.getWeekly().setQuizSolved(quizAttemptRepository.getLeaderboardQuizSolved(oneWeekAgo));
        response.getMonthly().setQuizSolved(quizAttemptRepository.getLeaderboardQuizSolved(oneMonthAgo));
        response.getWeekly().setPointsEarned(quizAttemptRepository.getLeaderboardPointsEarned(oneWeekAgo));
        response.getMonthly().setPointsEarned(quizAttemptRepository.getLeaderboardPointsEarned(oneMonthAgo));

        return response;
    }
}
