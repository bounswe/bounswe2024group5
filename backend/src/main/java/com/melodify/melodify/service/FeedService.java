package com.melodify.melodify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.melodify.melodify.repository.PostRepository;
import com.melodify.melodify.service.UserService;
import com.melodify.melodify.service.TagService;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.Tag;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedService {

    @Autowired
    private final PostRepository postRepository;
    
    @Autowired
    private final TagService tagService;

    public FeedService(PostRepository postRepository, TagService tagService) {
        this.postRepository = postRepository;
        this.tagService = tagService;
    }

    public List<PostResponse> getFeed(int page, int limit) {
        if(page < 0 || limit < 0) {
            throw new IllegalArgumentException("Invalid page or limit");
        }
        Pageable pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        List<Post> posts = postRepository.findAll(pageable).getContent();
        List<PostResponse> postResponses = posts.stream().map(post -> {
            List<String> tags = tagService.getTagsByPost(post).stream().map(Tag::getTag).collect(Collectors.toList());
            return new PostResponse(post, tags);
        }).collect(Collectors.toList());
        return postResponses;
    }

}
