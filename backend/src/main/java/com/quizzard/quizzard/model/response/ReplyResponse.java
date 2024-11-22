package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.Reply;
import lombok.Data;

@Data
public class ReplyResponse {
    private Long id;
    private String content;
    private Long postId;
    private Long userId;
    private String createdAt;
    private String updatedAt;

    public ReplyResponse(Reply reply){
        this.id = reply.getId();
        this.content = reply.getContent();
        this.postId = reply.getPost().getId();
        this.userId = reply.getUser().getId();
        this.createdAt = reply.getCreatedAt().toString();
        this.updatedAt = reply.getUpdatedAt().toString();
    }

}
