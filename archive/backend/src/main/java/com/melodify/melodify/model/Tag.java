package com.melodify.melodify.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tags")
public class Tag {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "tag", nullable = false)
        private String tag;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "post_id", nullable = false,referencedColumnName = "id")
        private Post post;

        // Constructors
        public Tag() {
            // Default constructor required for JPA
        }

        public Tag(String tag, Post post) {
            this.tag = tag;
            this.post = post;
        }

        // Getters
        public Long getId() {
            return id;
        }

        public String getTag() {
            return tag;
        }

        public Post getPost() {
            return post;
        }

        // toString
        @Override
        public String toString() {
            return "Tag{" +
                    "id=" + id +
                    ", tag='" + tag + '\'' +
                    '}';
        }

}
