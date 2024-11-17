package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class QuestionAnswerRequest {
    @NotNull
    private Long quizAttemptId;
    @NotNull
    private Long questionId;
    @NotNull
    private String answer;
}
