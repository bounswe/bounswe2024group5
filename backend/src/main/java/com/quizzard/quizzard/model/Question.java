package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quiz_id", nullable = false)
    private Long quizId;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType;

    @Column(name = "word", nullable = false)
    private String word;

    @Column(name="correct_answer", nullable = false)
    private String correctAnswer;

    @Column(name = "wrong_answer1", nullable = false)
    private String wrongAnswer1;

    @Column(name = "wrong_answer2", nullable = false)
    private String wrongAnswer2;

    @Column(name = "wrong_answer3", nullable = false)
    private String wrongAnswer3;

    @Column(name = "difficulty")
    private double difficulty;

    // Constructors

    public Question() {
        // Default constructor required by JPA
    }

    public Question(Long quizId, QuestionType questionType, String word, String correctAnswer, String wrongAnswer1, String wrongAnswer2, String wrongAnswer3, double difficulty) {
        this.quizId = quizId;
        this.questionType = questionType;
        this.word = word;
        this.correctAnswer = correctAnswer;
        this.wrongAnswer1 = wrongAnswer1;
        this.wrongAnswer2 = wrongAnswer2;
        this.wrongAnswer3 = wrongAnswer3;
    }

    // toString
    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", quizId=" + quizId +
                ", questionType=" + questionType +
                ", word='" + word + '\'' +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", wrongAnswer1='" + wrongAnswer1 + '\'' +
                ", wrongAnswer2='" + wrongAnswer2 + '\'' +
                ", wrongAnswer3='" + wrongAnswer3 + '\'' +
                ", difficulty=" + difficulty +
                '}';
    }
}
