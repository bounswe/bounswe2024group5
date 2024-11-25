package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;


@Data
@Entity
@Table(name = "translate")
public class Translate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "english_id", referencedColumnName = "id", nullable = false)
    private English english;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "turkish_id", referencedColumnName = "id", nullable = false)
    private Turkish turkish;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id", referencedColumnName = "id", nullable = false)
    private Type type;


}
