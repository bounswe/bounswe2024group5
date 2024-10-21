package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "english_proficiency")
    private int englishProficiency;

    @Column(name = "points")
    private int points;

    @Column(name = "created_quizzes")
    private int createdQuizzes;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name= "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;


    // Constructors
    public User() {
        // Default constructor required for JPA
    }

    public User(String username, String password, String email, String name) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.createdAt = new Date();
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public int getEnglishProficiency() {
        return englishProficiency;
    }

    public int getPoints() {
        return points;
    }

    public int getCreatedQuizzes() {
        return createdQuizzes;
    }



    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public void setEnglishProficiency(int englishProficiency) {
        this.englishProficiency = englishProficiency;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public void setCreatedQuizzes(int createdQuizzes) {
        this.createdQuizzes = createdQuizzes;
    }
}
