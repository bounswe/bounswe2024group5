package com.melodify.melodify.model.request;

import lombok.Data;

@Data
public class CommentCreateRequest {

    private String text;

    public CommentCreateRequest( String text) {
        this.text = text;
    }

    public CommentCreateRequest() {
    }



}
