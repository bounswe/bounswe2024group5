package com.quizzard.quizzard.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "difficulty")
    private double difficulty;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User author;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    // Constructors

    public Quiz() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public Quiz(String title, String description, String image, double difficulty) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.difficulty = difficulty;
        this.createdAt = new Date();
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

    public User getAuthor() {
        return author;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }


    // Setters

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setDifficulty(double difficulty) {
        this.difficulty = difficulty;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    // toString

    @Override
    public String toString() {
        return "Quiz{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                ", difficulty=" + difficulty +
                ", userId=" + author.getId() +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }


}
