package com.melodify.melodify.model.request;

import lombok.Data;

import java.util.List;

@Data
public class PostCreateRequest {

    private List<String> tags;
    private String author;
    private String text;
    private String media_url;

}
