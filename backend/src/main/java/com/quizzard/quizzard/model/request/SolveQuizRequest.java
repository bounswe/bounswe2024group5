package com.quizzard.quizzard.model.request;

import java.util.List;

public class SolveQuizRequest {

    private List<Answer> answers;

    // Nested class for Answer
    public static class Answer {
        private Long questionId;
        private String selectedAnswer;

        // Getters and Setters
        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public String getSelectedAnswer() {
            return selectedAnswer;
        }

        public void setSelectedAnswer(String selectedAnswer) {
            this.selectedAnswer = selectedAnswer;
        }
    }

    // Getters and Setters
    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
}
