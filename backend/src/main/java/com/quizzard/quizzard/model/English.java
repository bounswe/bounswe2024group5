package com.quizzard.quizzard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "english")
public class English {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "word", nullable = false)
    private String word;


    public Long getId() {
        return id;
    }

    public String getWord() {
        return word;
    }
}
