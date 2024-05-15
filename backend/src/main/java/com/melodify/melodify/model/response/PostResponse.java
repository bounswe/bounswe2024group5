package com.melodify.melodify.model.response;

import com.melodify.melodify.model.Post;

import java.util.List;

public class PostResponse {
    private Long id;
    private String text;
    private String author;
    private String media_url;
    private String createdAt;
    private String editedAt;
    private List<String> tags;

    public PostResponse(Post post, List<String> tags) {
        this.id = post.getId();
        this.text = post.getText();
        this.author = post.getAuthor().getUsername();
        this.tags = tags;
        this.media_url = post.getMedia_url();
        this.createdAt = post.getCreatedAt().toString();
        this.editedAt = post.getEditedAt().toString();
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public String getAuthor() {
        return author;
    }

    public String getMedia_url() {
        return media_url;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getEditedAt() {
        return editedAt;
    }

    public List<String> getTags() {
        return tags;
    }
}
