package com.quizzard.quizzard.model.response;


import com.quizzard.quizzard.model.FavoriteQuestion;
import com.quizzard.quizzard.model.FavoriteQuiz;
import lombok.Data;

import java.util.Date;

@Data
public class FavoriteQuestionResponse {

    private Long id;
    private Long userId;
    private Long questionId;
    private Date createdAt;
    private Date updatedAt;


    public FavoriteQuestionResponse(FavoriteQuestion favoriteQuestion) {
        this.id = favoriteQuestion.getId();
        this.userId = favoriteQuestion.getUser().getId();
        this.questionId = favoriteQuestion.getId();
        this.createdAt = favoriteQuestion.getCreatedAt();
        this.updatedAt = favoriteQuestion.getUpdatedAt();
    }

    public FavoriteQuestionResponse() {
    }

}
