package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "english")
public class English {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "word", nullable = false)
    private String word;

    @Column(name = "score")
    private int score;

}
