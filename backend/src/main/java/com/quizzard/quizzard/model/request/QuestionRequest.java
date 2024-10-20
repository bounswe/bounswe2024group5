package com.quizzard.quizzard.model.request;

import lombok.Data;

import java.util.List;

@Data
public class QuestionRequest {
    private String questionType;
    private String word;
    private String correctAnswer;
    private List<String> wrongAnswers;

    @Override
    public String toString() {
        return "QuestionRequest{" +
                "questionType='" + questionType + '\'' +
                ", word='" + word + '\'' +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", wrongAnswer1='" + wrongAnswers.get(0) + '\'' +
                ", wrongAnswer2='" + wrongAnswers.get(1) + '\'' +
                ", wrongAnswer3='" + wrongAnswers.get(2) + '\'' +
                '}';
    }
}
