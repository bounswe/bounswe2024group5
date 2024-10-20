package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Quiz;
import lombok.Data;

import java.util.List;

@Data
public class QuizResponse {

    private Long id;
    private String title;
    private String description;
    private String image;
    private double difficulty;
    private String username;
    private String createdAt;
    private String updatedAt;
    private List<QuestionResponse> questions;

    public QuizResponse(Quiz quiz, List<QuestionResponse> questions) {
        this.id = quiz.getId();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.image = quiz.getImage();
        this.difficulty = quiz.getDifficulty();
        this.username = quiz.getAuthor().getUsername();
        this.createdAt = quiz.getCreatedAt().toString();
        this.updatedAt = quiz.getUpdatedAt().toString();
        this.questions = questions;
    }
}
