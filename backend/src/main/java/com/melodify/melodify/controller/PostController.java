package com.melodify.melodify.controller;


import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.request.PostUpdateRequest;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.security.jwt.JwtUtils;
import com.melodify.melodify.service.PostService;
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

}
