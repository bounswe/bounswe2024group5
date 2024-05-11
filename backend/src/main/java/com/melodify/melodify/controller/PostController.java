package com.melodify.melodify.controller;


import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping()
    public List<PostResponse> getPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public ResponseEntity<String> createOnePost(@RequestBody PostCreateRequest newPostRequest) {
        try {
            postService.createOnePost(newPostRequest);
        } catch (Exception e) {
            System.out.println("Error creating post: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
        }
        return ResponseEntity.ok("Post created successfully!");
    }

}
