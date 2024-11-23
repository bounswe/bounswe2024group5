package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Upvote;
import lombok.Data;

import java.util.Date;

@Data
public class UpvoteResponse {

    private Long id;
    private Long postId;
    private Long userId;
    private Date createdAt;
    private Date updatedAt;

    public UpvoteResponse(Upvote upvote) {
        this.id = upvote.getId();
        this.postId = upvote.getPost().getId();
        this.userId = upvote.getUser().getId();
        this.createdAt = upvote.getCreatedAt();
        this.updatedAt = upvote.getUpdatedAt();
    }

    public UpvoteResponse() {

    }

}
