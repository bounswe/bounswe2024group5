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
    private String word;
    private int noUpvote;
    private Date createdAt;
    private Date updatedAt;


    public PostResponse(Post post, int noUpvote){
        this.content = post.getContent();
        this.title = post.getTitle();
        this.userId = post.getUser().getId();
        this.word = post.getWord();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
        this.id = post.getId();
        this.noUpvote = noUpvote;
    }

    public PostResponse(){

    }


}
