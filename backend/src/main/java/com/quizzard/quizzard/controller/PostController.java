package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.request.PostCreateRequest;
import com.quizzard.quizzard.model.request.PostUpdateRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import com.quizzard.quizzard.service.PostLikeService;
import com.quizzard.quizzard.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PostService postService;

    @Autowired
    private PostLikeService postLikeService;

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
    public ResponseEntity<?> createOnePost(@RequestHeader("Authorization") String jwt, @RequestBody PostCreateRequest newPostRequest) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try {
            long id = postService.createOnePost(authorUsername, newPostRequest);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(id)
                    .toUri();
            return ResponseEntity.created(location).body(Map.of("post_id", id));
        } catch (Exception e) {
            System.out.println("Error creating post: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
        }
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
    public ResponseEntity<?> updateOnePost(@RequestHeader("Authorization") String jwt, @PathVariable Long postId, @RequestBody PostUpdateRequest updatePost) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try{
            PostResponse response = postService.updateOnePostById(authorUsername, postId, updatePost);
            return ResponseEntity.ok().body(response);
        }
        catch (ResponseStatusException e){
            if (e.getStatusCode() == HttpStatus.NOT_FOUND)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            else if (e.getStatusCode() == HttpStatus.FORBIDDEN)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the author of this post");
            else if (e.getStatusCode() == HttpStatus.BAD_REQUEST)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            else
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deleteOnePost(@RequestHeader("Authorization") String jwt, @PathVariable Long postId) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try{
            postService.deleteOnePostById(authorUsername, postId);
            return ResponseEntity.ok().body("Post deleted");
        }
        catch (ResponseStatusException e){
            if (e.getStatusCode() == HttpStatus.NOT_FOUND)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the author of this post");
        }
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@RequestHeader("Authorization") String jwt, @PathVariable Long postId) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try {
            postLikeService.likePost(postId, username);
            return ResponseEntity.ok().body("Post liked");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<?> unlikePost(@RequestHeader("Authorization") String jwt, @PathVariable Long postId) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try {
            postLikeService.unlikePost(postId, username);
            return ResponseEntity.ok().body("Post unliked");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }


}
