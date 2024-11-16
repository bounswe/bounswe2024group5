package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class QuizAttemptRequest {
    @NotNull
    private Long quizId;

}
