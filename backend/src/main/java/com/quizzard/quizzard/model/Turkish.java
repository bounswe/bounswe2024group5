package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "turkish")
public class Turkish {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "word", nullable = false)
    private String word;


}
