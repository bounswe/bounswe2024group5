package com.melodify.melodify.model;

import com.melodify.melodify.model.User;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author", referencedColumnName = "username", nullable = false)
    private User author;

    @Column(name = "media_url")
    private String media_url;

    @Column(name = "edited_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date editedAt;

    // Constructors
    public Post() {
        // Default constructor required for JPA
    }

    public Post(String text, User author, String media_url) {
        this.text = text;
        this.author = author;
        this.media_url = media_url;
        this.createdAt = new Date();
        this.editedAt = new Date();
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public User getAuthor() {
        return author;
    }

    public String getMedia_url() {
        return media_url;
    }

    public Date getEditedAt() {
        return editedAt;
    }

    // Setters

    public void setText(String text) {
        this.text = text;
    }

    public void setMedia_url(String media_url) {
        this.media_url = media_url;
    }


    public void setAuthor(User author) {
        this.author = author;
    }

}