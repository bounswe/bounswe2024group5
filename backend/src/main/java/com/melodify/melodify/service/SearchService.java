package com.melodify.melodify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.melodify.melodify.model.Tag;
import com.melodify.melodify.repository.TagRepository;
import com.melodify.melodify.repository.PostRepository;
import com.melodify.melodify.repository.PostSearchRepository;
import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.PostSearch;
import com.melodify.melodify.model.response.PostResponse;

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

    public List<PostResponse> search(String text) {
        Iterable<PostSearch> postSearchs = postSearchRepository.searchByText(text);
        List<PostResponse> posts = new ArrayList<>();
        for (PostSearch postSearch : postSearchs) {
            Post post = postRepository.findById((long)postSearch.getId()).get();
            List<String> tags = new ArrayList<>();
            for (Tag tag : tagRepository.findByPost(post)) {
                tags.add(tag.getTag());
            }
            posts.add(new PostResponse(post, tags));
        }
        return posts;
    }
}
