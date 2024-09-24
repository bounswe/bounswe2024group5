package com.melodify.melodify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.melodify.melodify.model.Tag;
import com.melodify.melodify.model.WikiDataSearchResponse;
import com.melodify.melodify.repository.TagRepository;
import com.melodify.melodify.repository.WikiDataRepository;
import com.melodify.melodify.repository.PostRepository;
import com.melodify.melodify.repository.PostSearchRepository;
import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.PostSearch;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.model.response.SearchResponse;
import com.melodify.melodify.model.response.WikiResponse;

import java.util.List;
import java.util.ArrayList;

@Service
public class SearchService {
    
    @Autowired
    private PostSearchRepository postSearchRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private WikiDataRepository wikiDataRepository;

    @Autowired
    private PostService postService;

    private final String WIKIDATA_URL = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=";

    public SearchResponse search(String text) {
        Iterable<PostSearch> postSearchs = postSearchRepository.searchByText(text);
        List<PostResponse> posts = new ArrayList<>();
        for (PostSearch postSearch : postSearchs) {
            Post post = postRepository.findById((long)postSearch.getId()).get();
            PostResponse postResponse = postService.convertToResponse(post);
            posts.add(postResponse);
        }
        List<WikiResponse> wiki = searchWikiData(text);
        return new SearchResponse(posts, wiki);
    }

    private List<WikiResponse> searchWikiData(String text) {
        RestTemplate restTemplate = new RestTemplate();
        WikiDataSearchResponse wikiDataSearchResponse = restTemplate.getForObject(WIKIDATA_URL + text, WikiDataSearchResponse.class);
        List<WikiResponse> wiki = new ArrayList<>();
        for (WikiDataSearchResponse.SearchItem searchItem : wikiDataSearchResponse.getSearch()) {
            if(wikiDataRepository.existsById(searchItem.getId())) {
                wiki.add(new WikiResponse(searchItem.getId(), searchItem.getLabel(), searchItem.getDescription(), searchItem.getConcepturi()));
            }
        }
        return wiki;
    }
}
