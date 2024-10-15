package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Post;
import lombok.Data;

import java.util.List;

@Data
public class PostResponse {
    private Long id;
    private String text;
    private String author;
    private String media_url;
    private String createdAt;
    private String editedAt;
    private int likes;
    private List<String> tags;

    public PostResponse(Post post, List<String> tags, int likes) {
        this.id = post.getId();
        this.text = post.getText();
        this.author = post.getAuthor().getUsername();
        this.tags = tags;
        this.media_url = post.getMedia_url();
        this.createdAt = post.getCreatedAt().toString();
        this.editedAt = post.getEditedAt().toString();
        this.likes = likes;
    }


}
