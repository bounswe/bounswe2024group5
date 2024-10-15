package com.quizzard.quizzard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.service.UserService;
import com.quizzard.quizzard.service.TagService;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.Tag;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedService {

    @Autowired
    private final PostRepository postRepository;
    
    @Autowired
    private final TagService tagService;
    @Autowired
    private PostService postService;

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
            return postService.convertToResponse(post);
        }).collect(Collectors.toList());
        return postResponses;
    }

}
