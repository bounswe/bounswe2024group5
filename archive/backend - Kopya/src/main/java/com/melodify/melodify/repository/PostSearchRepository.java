package com.melodify.melodify.repository;

import com.melodify.melodify.model.PostSearch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.elasticsearch.annotations.Query;

@Repository
public interface PostSearchRepository extends ElasticsearchRepository<PostSearch,Integer> {

    // Semantic search for text
    @Query("""
            {
                "multi_match": {
                    "query": "?0",
                    "fields": ["text", "author"],
                    "fuzziness": "2"
                }
            }
            """)
    Iterable<PostSearch> searchByText(String text);
}
