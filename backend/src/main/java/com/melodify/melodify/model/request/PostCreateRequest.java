package com.melodify.melodify.model.request;

import lombok.Data;

@Data
public class PostCreateRequest {

    private String tag;
    private String author;
    private String text;
    private String media_url;

}
