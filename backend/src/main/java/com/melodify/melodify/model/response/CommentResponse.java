package com.melodify.melodify.model.response;

import com.melodify.melodify.model.Comment;
import lombok.Data;

@Data
public class CommentResponse {
    private Long id;
    private String text;
    private String author;
    private String createdAt;
    private String editedAt;
    private Long postId;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.text = comment.getText();
        this.author = comment.getAuthor().getUsername();
        this.createdAt = comment.getCreatedAt().toString();
        this.editedAt = comment.getEditedAt().toString();
        this.postId = comment.getPost().getId();
    }
}
