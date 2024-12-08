package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.QuizAttempt;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizAttemptResponse {
    private Long id;
    private Long userId;
    private Long quizId;
    private int score;
    private boolean isCompleted;
    private String completedAt;
    private String updatedAt;
    private boolean isGraded;

    public QuizAttemptResponse(QuizAttempt quizAttempt) {
        this.id = quizAttempt.getId();
        this.userId = quizAttempt.getUser().getId();
        this.quizId = quizAttempt.getQuiz().getId();
        this.score = quizAttempt.getScore();
        this.isCompleted = quizAttempt.getIsCompleted();
        if (quizAttempt.getCompletedAt() != null)
            this.completedAt = quizAttempt.getCompletedAt().toString();
        else
            this.completedAt = null;
        this.updatedAt = quizAttempt.getUpdatedAt().toString();
    }

    public QuizAttemptResponse(QuizAttempt quizAttempt, boolean isGraded) {
        this.id = quizAttempt.getId();
        this.userId = quizAttempt.getUser().getId();
        this.quizId = quizAttempt.getQuiz().getId();
        this.score = quizAttempt.getScore();
        this.isCompleted = quizAttempt.getIsCompleted();
        if (quizAttempt.getCompletedAt() != null)
            this.completedAt = quizAttempt.getCompletedAt().toString();
        else
            this.completedAt = null;
        this.updatedAt = quizAttempt.getUpdatedAt().toString();
        this.isGraded = isGraded;
    }

}
