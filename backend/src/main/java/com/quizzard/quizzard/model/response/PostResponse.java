package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Post;
import lombok.Getter;

import java.util.Date;

@Getter
public class PostResponse {

    private Long id;
    private String username;
    private String title;
    private String content;
    private String word;
    private int noUpvote;
    private int noReplies;
    private Date createdAt;
    private Date updatedAt;


    public PostResponse(Post post, int noUpvote, int noReplies){
        this.content = post.getContent();
        this.title = post.getTitle();
        this.username = post.getUser().getUsername();
        this.word = post.getWord();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
        this.id = post.getId();
        this.noUpvote = noUpvote;
        this.noReplies = noReplies;
    }

    public PostResponse(){

    }


}
