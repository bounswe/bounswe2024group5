package com.melodify.melodify.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WikiDataSearchResponse {
    @JsonProperty("searchinfo")
    private SearchInfo searchinfo;
    @JsonProperty("search")
    private List<SearchItem> search;
    @JsonProperty("search-continue")
    private int searchContinue;
    @JsonProperty("success")
    private int success;

    public SearchInfo getSearchinfo() {
        return searchinfo;
    }

    public List<SearchItem> getSearch() {
        return search;
    }

    public int getSearchContinue() {
        return searchContinue;
    }

    public int getSuccess() {
        return success;
    }

    public static class SearchInfo {
        private String search;

        public String getSearch() {
            return search;
        }
    }

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

        public String getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public int getPageid() {
            return pageid;
        }

        public Display getDisplay() {
            return display;
        }

        public String getRepository() {
            return repository;
        }

        public String getUrl() {
            return url;
        }

        public String getConcepturi() {
            return concepturi;
        }

        public String getLabel() {
            return label;
        }

        public String getDescription() {
            return description;
        }

        public Match getMatch() {
            return match;
        }
    }

    public static class Display {
        @JsonProperty("label")
        private Label label;
        @JsonProperty("description")
        private Description description;

        public Label getLabel() {
            return label;
        }

        public Description getDescription() {
            return description;
        }
    }

    public static class Label {
        @JsonProperty("value")
        private String value;
        @JsonProperty("language")
        private String language;

        public String getValue() {
            return value;
        }

        public String getLanguage() {
            return language;
        }
    }

    public static class Description {
        @JsonProperty("value")
        private String value;
        @JsonProperty("language")
        private String language;

        public String getValue() {
            return value;
        }

        public String getLanguage() {
            return language;
        }
    }

    public static class Match {
        @JsonProperty("type")
        private String type;
        @JsonProperty("language")
        private String language;
        @JsonProperty("text")
        private String text;

        public String getType() {
            return type;
        }

        public String getLanguage() {
            return language;
        }

        public String getText() {
            return text;
        }
    }
}
