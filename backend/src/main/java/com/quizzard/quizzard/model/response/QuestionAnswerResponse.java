package com.quizzard.quizzard.model.response;


import com.quizzard.quizzard.model.QuestionAnswer;
import lombok.Getter;

@Getter
public class QuestionAnswerResponse {
    private Long id;
    private Long quizAttemptId;
    private Long questionId;
    private String answer;
    private Boolean isCorrect;
    private String updatedAt;

    public QuestionAnswerResponse(QuestionAnswer questionAnswer) {
        this.id = questionAnswer.getId();
        this.quizAttemptId = questionAnswer.getQuizAttempt().getId();
        this.questionId = questionAnswer.getQuestion().getId();
        this.answer = questionAnswer.getAnswer();
        this.isCorrect = questionAnswer.getIsCorrect();
        this.updatedAt = questionAnswer.getUpdatedAt().toString();
    }
}
