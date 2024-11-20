package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    ResponseEntity<PostResponse> createPost(@RequestHeader("Authorization") String jwtToken, @RequestBody @Valid PostRequest postRequest){
        return ResponseEntity.ok(postService.createPost(jwtToken, postRequest));
    }

    @GetMapping
    ResponseEntity<List<PostResponse>> getAllPosts(@RequestParam(required = false) Optional<String> wordnetId,
                                                   @RequestParam(required = false) Optional<String> userId){
        return ResponseEntity.ok(postService.getAllPosts(wordnetId, userId));
    }

    @GetMapping("/{postId}")
    ResponseEntity<PostResponse> getPostById(@PathVariable Long postId){
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @DeleteMapping("/{postId}")
    ResponseEntity<?> deletePostById(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId){
        postService.deletePostById(jwtToken, postId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{postId}")
    ResponseEntity<PostResponse> updatePost(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId, @RequestBody PostRequest postRequest){
        return ResponseEntity.ok(postService.updatePost(jwtToken, postId, postRequest));
    }

}
