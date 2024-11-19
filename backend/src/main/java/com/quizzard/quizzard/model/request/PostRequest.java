package com.quizzard.quizzard.model.request;

import com.quizzard.quizzard.model.Post;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PostRequest {
    @NotNull
    private String content;
    @NotNull
    private String title;
    private String wordnetId;

    public Post toPost(){
        Post post = new Post();
        post.setContent(content);
        post.setTitle(title);
        if(wordnetId != null)
            post.setWordnetId(wordnetId);
        return post;
    }

}
