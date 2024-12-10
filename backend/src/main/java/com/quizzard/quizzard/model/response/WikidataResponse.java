package com.quizzard.quizzard.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class WikidataResponse {
    @JsonProperty("searchinfo")
    private SearchInfo searchinfo;
    @JsonProperty("search")
    private List<SearchItem> search;
    @JsonProperty("search-continue")
    private int searchContinue;
    @JsonProperty("success")
    private int success;

    @Getter
    public static class SearchInfo {
        private String search;

    }

    @Getter
    public static class SearchItem {
        @JsonProperty("id")
        private String id;
        @JsonProperty("title")
        private String title;
        @JsonProperty("pageid")
        private int pageid;
        @JsonProperty("display")
        private Display display;
        @JsonProperty("repository")
        private String repository;
        @JsonProperty("url")
        private String url;
        @JsonProperty("concepturi")
        private String concepturi;
        @JsonProperty("label")
        private String label;
        @JsonProperty("description")
        private String description;
        @JsonProperty("match")
        private Match match;

    }

    @Getter
    public static class Display {
        @JsonProperty("label")
        private Label label;
        @JsonProperty("description")
        private Description description;

    }

    @Getter
    public static class Label {
        @JsonProperty("value")
        private String value;
        @JsonProperty("language")
        private String language;

    }

    @Getter
    public static class Description {
        @JsonProperty("value")
        private String value;
        @JsonProperty("language")
        private String language;

    }

    @Getter
    public static class Match {
        @JsonProperty("type")
        private String type;
        @JsonProperty("language")
        private String language;
        @JsonProperty("text")
        private String text;

    }
}