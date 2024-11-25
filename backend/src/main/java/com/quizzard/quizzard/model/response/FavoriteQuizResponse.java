package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.FavoriteQuiz;
import lombok.Data;
import java.util.Date;

@Data
public class FavoriteQuizResponse {
    private Long id;
    private Long userId;
    private Long quizId;
    private Date createdAt;
    private Date updatedAt;

    public FavoriteQuizResponse(FavoriteQuiz favoriteQuiz) {
        this.id = favoriteQuiz.getId();
        this.userId = favoriteQuiz.getUser().getId();
        this.quizId = favoriteQuiz.getQuiz().getId();
        this.createdAt = favoriteQuiz.getCreatedAt();
        this.updatedAt = favoriteQuiz.getUpdatedAt();
    }

    public FavoriteQuizResponse() {

    }


    public FavoriteQuizResponse toFavoriteQuizResponse(FavoriteQuiz favoriteQuiz) {
        FavoriteQuizResponse response = new FavoriteQuizResponse();
        response.setId(favoriteQuiz.getId());
        response.setUserId(favoriteQuiz.getUser().getId());
        response.setQuizId(favoriteQuiz.getQuiz().getId());
        response.setCreatedAt(favoriteQuiz.getCreatedAt());
        response.setUpdatedAt(favoriteQuiz.getUpdatedAt());
        return response;
    }
}
