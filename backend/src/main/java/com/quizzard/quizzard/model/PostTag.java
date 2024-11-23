package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "post_tags")
public class PostTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "english_id", referencedColumnName = "id", nullable = false)
    private English english;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id", referencedColumnName = "id", nullable = false)
    private Post post;

    public PostTag(English english, Post post) {
        this.english = english;
        this.post = post;
    }

    public PostTag() {

    }

}
