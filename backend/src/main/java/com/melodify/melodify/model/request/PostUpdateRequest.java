package com.melodify.melodify.model.request;


import lombok.Data;

@Data
public class PostUpdateRequest {
    private String text;
    private String media_url;
}
