package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    ResponseEntity<PostResponse> createPost(@RequestHeader("Authorization") String jwtToken,
                                            @RequestBody PostRequest postRequest){
        return ResponseEntity.ok(postService.createPost(jwtToken, postRequest));
    }

    @GetMapping("/{postId}")
    ResponseEntity<PostResponse> getPostById(@PathVariable Long postId){
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @DeleteMapping("/{postId}")
    ResponseEntity<?> deletePostById(@RequestHeader("Authorization") String jwtToken,
                                    @PathVariable Long postId){
        postService.deletePostById(jwtToken, postId);
        return ResponseEntity.ok().build();
    }

}
