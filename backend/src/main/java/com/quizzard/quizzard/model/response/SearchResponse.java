package com.quizzard.quizzard.model.response;

import java.util.List;

public class SearchResponse {
    private List<PostResponse> posts;
    private List<WikiResponse> wiki;

    public SearchResponse(List<PostResponse> posts, List<WikiResponse> wiki) {
        this.posts = posts;
        this.wiki = wiki;
    }

    public List<PostResponse> getPosts() {
        return posts;
    }

    public List<WikiResponse> getWiki() {
        return wiki;
    }
}
