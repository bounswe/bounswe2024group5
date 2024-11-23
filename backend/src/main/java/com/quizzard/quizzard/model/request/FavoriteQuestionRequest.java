package com.quizzard.quizzard.model.request;


import lombok.Data;

@Data
public class FavoriteQuestionRequest {

    private Long userId;

    private Long questionId;


}
