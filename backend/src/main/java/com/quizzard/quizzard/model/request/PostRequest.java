package com.quizzard.quizzard.model.request;

import com.quizzard.quizzard.model.Post;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PostRequest {

    @NotNull(message = "Content cannot be null")
    private String content;

    @NotNull(message = "Title cannot be null")
    private String title;

    private String word;

    public Post toPost(){
        Post post = new Post();
        post.setContent(content);
        post.setTitle(title);
        if(word != null)
            post.setWord(word);
        return post;
    }

}
