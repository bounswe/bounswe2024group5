package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.response.LeaderboardResponse;
import com.quizzard.quizzard.repository.QuizAttemptRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeaderboardServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuizAttemptRepository quizAttemptRepository;

    @InjectMocks
    private LeaderboardService leaderboardService;

    @Test
    void testGetLeaderboards() {
        // Arrange
        List<LeaderboardResponse.QuizCreated> weeklyQuizCreated = new ArrayList<>();
        List<LeaderboardResponse.QuizCreated> monthlyQuizCreated = new ArrayList<>();
        List<LeaderboardResponse.QuizSolved> weeklyQuizSolved = new ArrayList<>();
        List<LeaderboardResponse.QuizSolved> monthlyQuizSolved = new ArrayList<>();
        List<LeaderboardResponse.PointsEarned> weeklyPointsEarned = new ArrayList<>();
        List<LeaderboardResponse.PointsEarned> monthlyPointsEarned = new ArrayList<>();

        // Mock the repository method calls
        when(quizRepository.getLeaderboardQuizCreated(any(Timestamp.class)))
                .thenReturn(weeklyQuizCreated)
                .thenReturn(monthlyQuizCreated);

        when(quizAttemptRepository.getLeaderboardQuizSolved(any(Timestamp.class)))
                .thenReturn(weeklyQuizSolved)
                .thenReturn(monthlyQuizSolved);

        when(quizAttemptRepository.getLeaderboardPointsEarned(any(Timestamp.class)))
                .thenReturn(weeklyPointsEarned)
                .thenReturn(monthlyPointsEarned);

        // Act
        LeaderboardResponse response = leaderboardService.getLeaderboards();

        // Assert
        assertNotNull(response);
        assertNotNull(response.getWeekly());
        assertNotNull(response.getMonthly());

        // Verify repository method calls
        verify(quizRepository, times(2)).getLeaderboardQuizCreated(any(Timestamp.class));
        verify(quizAttemptRepository, times(2)).getLeaderboardQuizSolved(any(Timestamp.class));
        verify(quizAttemptRepository, times(2)).getLeaderboardPointsEarned(any(Timestamp.class));
    }

    @Test
    void testLeaderboardTimestampCalculation() {
        // Arrange
        when(quizRepository.getLeaderboardQuizCreated(any(Timestamp.class)))
                .thenReturn(new ArrayList<>());
        when(quizAttemptRepository.getLeaderboardQuizSolved(any(Timestamp.class)))
                .thenReturn(new ArrayList<>());
        when(quizAttemptRepository.getLeaderboardPointsEarned(any(Timestamp.class)))
                .thenReturn(new ArrayList<>());

        // Act
        LeaderboardResponse response = leaderboardService.getLeaderboards();

        // Assert
        // Verify that the timestamps are correctly calculated
        // This test ensures that the timestamps for one week and one month ago are generated
        verify(quizRepository).getLeaderboardQuizCreated(argThat(timestamp -> {
            long currentTime = System.currentTimeMillis();
            long oneWeekAgo = currentTime - 7L * 24L * 60L * 60L * 1000L;
            return Math.abs(timestamp.getTime() - oneWeekAgo) < 1000; // Allow 1 second difference
        }));

        verify(quizRepository).getLeaderboardQuizCreated(argThat(timestamp -> {
            long currentTime = System.currentTimeMillis();
            long oneMonthAgo = currentTime - 30L * 24L * 60L * 60L * 1000L;
            return Math.abs(timestamp.getTime() - oneMonthAgo) < 1000; // Allow 1 second difference
        }));
    }
}