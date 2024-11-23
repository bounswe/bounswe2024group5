package com.quizzard.quizzard.model.request;

import lombok.Data;

@Data
public class FavoriteQuizRequest {

    private Long userId;
    private Long quizId;
}
