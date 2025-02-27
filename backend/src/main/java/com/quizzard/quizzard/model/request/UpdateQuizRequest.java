package com.quizzard.quizzard.model.request;

import lombok.Data;
import lombok.Getter;

@Data
public class UpdateQuizRequest {
    private String title;
    private String description;
    private String image;

    public UpdateQuizRequest(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public UpdateQuizRequest() {
    }
}
