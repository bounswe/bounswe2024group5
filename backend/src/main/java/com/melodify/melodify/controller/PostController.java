package com.melodify.melodify.controller;


import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.request.PostUpdateRequest;
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
    public List<PostResponse> getPosts(@RequestParam(required = false) String author, @RequestParam(required = false) String tag) {
        if ((author != null) && (tag != null))
            return postService.getPostsByAuthorAndTag(author, tag);
        else if (author != null)
            return postService.getPostsByAuthor(author);
        else if (tag != null)
            return postService.getPostsByTag(tag);
        else
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

    @GetMapping("/{postId}")
    public ResponseEntity<?> getOnePost(@PathVariable Long postId) {
        try{
            return ResponseEntity.ok(postService.getOnePostById(postId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting post: " + e.getMessage());
        }
    }

    @PutMapping("/{postId}")
    public PostResponse updateOnePost(@PathVariable Long postId, @RequestBody PostUpdateRequest updatePost) {
        return postService.updateOnePostById(postId, updatePost);
    }

    @DeleteMapping("/{postId}")
    public void deleteOnePost(@PathVariable Long postId) {
        postService.deleteOnePostById(postId);
    }

}
