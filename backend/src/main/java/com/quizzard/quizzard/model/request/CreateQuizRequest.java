package com.quizzard.quizzard.model.request;

import com.quizzard.quizzard.model.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CreateQuizRequest {

    private String title;
    private String description;
    private String image;
    private List<QuestionRequest> questions;

    @Override
    public String toString() {
        return "CreateQuizRequest{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}

