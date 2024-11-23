package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UpdateAnswerRequest {
    @NotNull
    private String newAnswer;
}
