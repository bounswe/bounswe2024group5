package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Question;

import java.util.Date;

public class CreateQuizResponse {

    private Long id;
    private String title;
    private String description;
    private String image;
    private double difficulty;
    private Long userId;
    private Date createdAt;

    // Constructors

    public CreateQuizResponse() {
        // Default constructor
    }

    public CreateQuizResponse(Long id, String title, String description, String image, double difficulty, Long userId, Date createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.difficulty = difficulty;
        this.userId = userId;
        this.createdAt = createdAt;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public double getDifficulty() {
        return difficulty;
    }

    public Long getUserId() {
        return userId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "CreateQuizResponse{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                ", difficulty=" + difficulty +
                ", userId=" + userId +
                ", createdAt=" + createdAt +
                '}';
    }
}


class QuestionResponse {
    private Long id;
    private String questionType;
    private String word;
    private String correctAnswer;
    private String wrongAnswer1;
    private String wrongAnswer2;
    private String wrongAnswer3;
    private double difficulty;

    public QuestionResponse(Question question) {
        this.id = question.getId();
        this.questionType = question.getQuestionType().toString();
        this.word = question.getWord();
        this.correctAnswer = question.getCorrectAnswer();
        this.wrongAnswer1 = question.getWrongAnswer1();
        this.wrongAnswer2 = question.getWrongAnswer2();
        this.wrongAnswer3 = question.getWrongAnswer3();
        this.difficulty = question.getDifficulty();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getQuestionType() {
        return questionType;
    }

    public String getWord() {
        return word;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String getWrongAnswer1() {
        return wrongAnswer1;
    }

    public String getWrongAnswer2() {
        return wrongAnswer2;
    }

    public String getWrongAnswer3() {
        return wrongAnswer3;
    }

    public double getDifficulty() {
        return difficulty;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public void setWrongAnswer1(String wrongAnswer1) {
        this.wrongAnswer1 = wrongAnswer1;
    }

    public void setWrongAnswer2(String wrongAnswer2) {
        this.wrongAnswer2 = wrongAnswer2;
    }

    public void setWrongAnswer3(String wrongAnswer3) {
        this.wrongAnswer3 = wrongAnswer3;
    }

    public void setDifficulty(double difficulty) {
        this.difficulty = difficulty;
    }

    @Override
    public String toString() {
        return "QuestionResponse{" +
                "id=" + id +
                ", questionType='" + questionType + '\'' +
                ", word='" + word + '\'' +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", wrongAnswer1='" + wrongAnswer1 + '\'' +
                ", wrongAnswer2='" + wrongAnswer2 + '\'' +
                ", wrongAnswer3='" + wrongAnswer3 + '\'' +
                ", difficulty=" + difficulty +
                '}';
    }
}