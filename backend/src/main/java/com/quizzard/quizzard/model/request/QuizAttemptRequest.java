package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QuizAttemptRequest {
    @NotNull
    private Long quizId;

}
