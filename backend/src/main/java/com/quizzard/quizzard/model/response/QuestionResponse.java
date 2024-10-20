package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Question;
import lombok.Data;

import java.util.List;

@Data
public class QuestionResponse {
    private Long id;
    private Long quizId;
    private String questionType;
    private String word;
    private String correctAnswer;
    private List<String> wrongAnswers;
    private double difficulty;

    public QuestionResponse(Question question) {
        this.id = question.getId();
        this.quizId = question.getQuizId();
        this.questionType = question.getQuestionType().toString();
        this.word = question.getWord();
        this.correctAnswer = question.getCorrectAnswer();
        this.wrongAnswers = List.of(question.getWrongAnswer1(), question.getWrongAnswer2(), question.getWrongAnswer3());
        this.difficulty = question.getDifficulty();
    }
}
