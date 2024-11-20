package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Post;
import lombok.Getter;

import java.util.Date;

@Getter
public class PostResponse {

    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String wordId;
    private int noUpvote;
    private Date createdAt;
    private Date updatedAt;


    public PostResponse(Post post){
        this.content = post.getContent();
        this.title = post.getTitle();
        this.userId = post.getUser().getId();
        this.wordId = post.getWordnetId();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
        this.id = post.getId();
        this.noUpvote = 0;
    }

    public PostResponse(){

    }


}
