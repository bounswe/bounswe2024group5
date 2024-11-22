package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.service.PostService;
import com.quizzard.quizzard.service.UpvoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private UpvoteService upvoteService;

    @PostMapping
    ResponseEntity<PostResponse> createPost(@RequestHeader("Authorization") String jwtToken, @RequestBody @Valid PostRequest postRequest){
        PostResponse createdPost = postService.createPost(jwtToken, postRequest);
        URI location = URI.create("/posts/" + createdPost.getId());
        return ResponseEntity.created(location).body(createdPost);
    }

    @GetMapping
    ResponseEntity<List<PostResponse>> getAllPosts(@RequestParam(required = false) Optional<String> word,
                                                   @RequestParam(required = false) Optional<String> userId){
        return ResponseEntity.ok(postService.getAllPosts(word, userId));
    }

    @GetMapping("/{postId}")
    ResponseEntity<PostResponse> getPostById(@PathVariable Long postId){
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @DeleteMapping("/{postId}")
    ResponseEntity<?> deletePostById(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId){
        postService.deletePostById(jwtToken, postId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{postId}")
    ResponseEntity<PostResponse> updatePost(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId, @RequestBody PostRequest postRequest){
        return ResponseEntity.ok(postService.updatePost(jwtToken, postId, postRequest));
    }

    @PostMapping("/{postId}/upvote")
    ResponseEntity<?> upvotePost(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId){
        return ResponseEntity.ok(upvoteService.upvotePost(jwtToken, postId));
    }

    @DeleteMapping("/{postId}/upvote")
    ResponseEntity<?> removeUpvote(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId){
        upvoteService.removeUpvote(jwtToken, postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{postId}/upvotes")
    ResponseEntity<?> getUpvotes(@PathVariable Long postId, @RequestParam(required = false) Optional<Long> userId){
        return ResponseEntity.ok(upvoteService.getUpvotes(userId, Optional.ofNullable(postId)));
    }

    @GetMapping("/upvotes")
    ResponseEntity<?> getUpvotedPosts(@RequestParam(required = false) Optional<Long> userId, @RequestParam(required = false) Optional<Long> postId){
        return ResponseEntity.ok(upvoteService.getUpvotes(userId, postId));
    }



}
