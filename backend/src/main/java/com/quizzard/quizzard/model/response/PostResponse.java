package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Post;
import lombok.Getter;

import java.util.Date;

@Getter
public class PostResponse {

    private String content;
    private String title;
    private Long userId;
    private String wordnetId;
    private Date createdAt;
    private Date updatedAt;
    private Long id;
    private int noUpvote;

    public PostResponse(Post post){
        this.content = post.getContent();
        this.title = post.getTitle();
        this.userId = post.getUser().getId();
        this.wordnetId = post.getWordnetId();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
        this.id = post.getId();
        this.noUpvote = 0;
    }


}
