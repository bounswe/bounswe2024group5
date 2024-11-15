package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "quiz_attempts")
public class QuizAttempts {

    @Id
    @GeneratedValue
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
    private boolean is_completed;

    @Column(name = "completed_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    // Constructors

    public QuizAttempts() {
        this.updatedAt = new Date();
    }

    public QuizAttempts(User user, Quiz quiz) {
        this.user = user;
        this.quiz = quiz;
        this.updatedAt = new Date();
    }
}
