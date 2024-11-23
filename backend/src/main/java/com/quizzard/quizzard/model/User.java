package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
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
    private String englishProficiency;

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







}
