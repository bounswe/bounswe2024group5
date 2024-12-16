package com.quizzard.quizzard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "word_to_sense")
public class WordToSense {
    
    @Id
    private Long id;
    private Long english_id;
    private Long sense_id;
    private Long type_id;
}
