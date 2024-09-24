package com.melodify.melodify.model;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(indexName = "post_index")
public class PostSearch {

    private int id;
    private String text;
    private String author;

    // Getters
    public int getId() {
        return id;
    }
    
}
