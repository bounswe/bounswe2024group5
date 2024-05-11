package com.melodify.melodify.model.response;

import com.melodify.melodify.model.Post;

public class PostResponse {
    private Long id;
    private String text;
    private String author;
    private String media_url;
    private String tag;
    private String createdAt;
    private String editedAt;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.text = post.getText();
        this.author = post.getAuthor().getUsername();
        this.media_url = post.getMedia_url();
        this.tag = post.getTag();
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

    public String getTag() {
        return tag;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getEditedAt() {
        return editedAt;
    }
}
