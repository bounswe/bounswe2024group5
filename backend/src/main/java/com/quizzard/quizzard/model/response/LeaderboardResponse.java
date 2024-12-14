package com.quizzard.quizzard.model.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class LeaderboardResponse {
    
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuizSolved {
        public String username;
        public long solved;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuizCreated {
        public String username;
        public Long created;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PointsEarned {
        public String username;
        public long points;
    }

    public class LeaderboardLists {
        public List<QuizSolved> quizSolved;
        public List<QuizCreated> quizCreated;
        public List<PointsEarned> pointsEarned;

        public void setQuizSolved(List<QuizSolved> quizSolved) {
            this.quizSolved = quizSolved;
        }

        public void setQuizCreated(List<QuizCreated> quizCreated) {
            this.quizCreated = quizCreated;
        }

        public void setPointsEarned(List<PointsEarned> pointsEarned) {
            this.pointsEarned = pointsEarned;
        }
    }

    public LeaderboardLists weekly;
    public LeaderboardLists monthly;

    public LeaderboardResponse() {
        this.weekly = new LeaderboardLists();
        this.monthly = new LeaderboardLists();
    }

    public LeaderboardResponse(LeaderboardLists weekly, LeaderboardLists monthly) {
        this.weekly = weekly;
        this.monthly = monthly;
    }
}
