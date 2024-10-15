package com.quizzard.quizzard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.quizzard.quizzard.model.Tag;
import com.quizzard.quizzard.model.WikiDataSearchResponse;
import com.quizzard.quizzard.repository.TagRepository;
import com.quizzard.quizzard.repository.WikiDataRepository;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.PostSearchRepository;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.PostSearch;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.model.response.SearchResponse;
import com.quizzard.quizzard.model.response.WikiResponse;

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
