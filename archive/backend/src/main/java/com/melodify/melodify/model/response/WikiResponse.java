package com.melodify.melodify.model.response;

public class WikiResponse {
    private String id;
    private String label;
    private String description;
    private String url;

    public WikiResponse(String id, String label, String description, String url) {
        this.id = id;
        this.label = label;
        this.description = description;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }
}
