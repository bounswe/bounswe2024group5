package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Data
public class QuestionAnswerRequest {
    @NotNull
    private Long quizAttemptId;
    @NotNull
    private Long questionId;
    @NotNull
    private String answer;
}
