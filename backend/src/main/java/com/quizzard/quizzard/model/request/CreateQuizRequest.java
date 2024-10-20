package com.quizzard.quizzard.model.request;

import com.quizzard.quizzard.model.Question;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class CreateQuizRequest {

    private String title;

    private String description;

    private String image;

    private Long userId;

    private List<Question> questions;

    // Constructors

    public CreateQuizRequest() {
        // Default constructor
    }
    public CreateQuizRequest(String title, String description, Double difficulty, Long userId) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }

    public CreateQuizRequest(String title, String description, String image, Long userId) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.userId = userId;
    }

    // Getters and Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "CreateQuizRequest{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                ", userId=" + userId +
                '}';
    }
}

