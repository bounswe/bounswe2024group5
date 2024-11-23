package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
    private Quiz quiz;

    @Column(name = "score")
    private int score;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Column(name = "completed_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    // Constructors

    public QuizAttempt() {
        this.updatedAt = new Date();
    }

    public QuizAttempt(User user, Quiz quiz) {
        this.user = user;
        this.quiz = quiz;
        this.isCompleted = false;
        this.score = 0;
        this.updatedAt = new Date();
    }

    public QuizAttempt(User user, Quiz quiz, boolean isCompleted) {
        this.user = user;
        this.quiz = quiz;
        this.isCompleted = isCompleted;
        score = 0;
        this.updatedAt = new Date();
    }

}
