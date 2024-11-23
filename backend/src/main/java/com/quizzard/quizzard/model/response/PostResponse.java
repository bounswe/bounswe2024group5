package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.PostTag;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
public class PostResponse {

    private Long id;
    private String username;
    private String title;
    private String content;
    private List<String> tags;
    private int noUpvote;
    private int noReplies;
    private Date createdAt;
    private Date updatedAt;


    public PostResponse(Post post, List<PostTag> postTags, int noUpvote, int noReplies){
        this.content = post.getContent();
        this.title = post.getTitle();
        this.username = post.getUser().getUsername();
        this.tags = postTags.stream().map(postTag -> postTag.getEnglish().getWord()).toList();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
        this.id = post.getId();
        this.noUpvote = noUpvote;
        this.noReplies = noReplies;
    }

    public PostResponse(){

    }


}
