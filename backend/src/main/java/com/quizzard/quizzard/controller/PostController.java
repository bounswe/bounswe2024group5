package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.request.ReplyRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.model.response.ReplyResponse;
import com.quizzard.quizzard.service.PostService;
import com.quizzard.quizzard.service.ReplyService;
import com.quizzard.quizzard.service.UpvoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

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

    @Autowired
    private ReplyService replyService;

    @PostMapping
    ResponseEntity<PostResponse> createPost(@RequestHeader("Authorization") String jwtToken, @RequestBody @Valid PostRequest postRequest){
        PostResponse createdPost = postService.createPost(jwtToken, postRequest);
        URI location = URI.create("/posts/" + createdPost.getId());
        return ResponseEntity.created(location).body(createdPost);
    }

    @GetMapping
    ResponseEntity<List<PostResponse>> getAllPosts(@RequestParam(required = false) Optional<String> tag,
                                                   @RequestParam(required = false) Optional<String> username){
        return ResponseEntity.ok(postService.getAllPosts(tag, username));
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
    ResponseEntity<?> getUpvotes(@PathVariable Long postId, @RequestParam(required = false) Optional<String> username){
        return ResponseEntity.ok(upvoteService.getUpvotes(username, Optional.ofNullable(postId)));
    }

    @GetMapping("/upvotes")
    ResponseEntity<?> getUpvotedPosts(@RequestParam(required = false) Optional<String> username, @RequestParam(required = false) Optional<Long> postId){
        return ResponseEntity.ok(upvoteService.getUpvotes(username, postId));
    }

    @GetMapping("/upvotes/{upvoteId}")
    ResponseEntity<?> getUpvoteById(@PathVariable Long upvoteId){
        return ResponseEntity.ok(upvoteService.getUpvoteById(upvoteId));
    }

    @PostMapping("/{postId}/replies")
    ResponseEntity<?> createReply(@RequestHeader("Authorization") String jwtToken, @PathVariable Long postId, @RequestBody @Valid ReplyRequest replyRequest){
        ReplyResponse createdResponse = replyService.createReply(jwtToken, postId, replyRequest);
        URI location = URI.create("/posts/" + postId + "/replies/" + createdResponse.getId());
        return ResponseEntity.created(location).body(createdResponse);
    }

    @GetMapping("/{postId}/replies")
    ResponseEntity<?> getReplies(@PathVariable Long postId){
        return ResponseEntity.ok(replyService.getRepliesByPostId(postId));
    }

    @GetMapping("/replies")
    ResponseEntity<?> getRepliesByUser(@RequestParam(required = false) Optional<String> username){
        return ResponseEntity.ok(replyService.getRepliesByUsername(username));
    }

    @GetMapping("/replies/{replyId}")
    ResponseEntity<?> getReplyById(@PathVariable Long replyId){
        return ResponseEntity.ok(replyService.getReplyById(replyId));
    }

    @DeleteMapping("/replies/{replyId}")
    ResponseEntity<?> deleteReplyById(@RequestHeader("Authorization") String jwtToken, @PathVariable Long replyId){
        replyService.deleteReplyById(jwtToken, replyId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/replies/{replyId}")
    ResponseEntity<?> updateReply(@RequestHeader("Authorization") String jwtToken, @PathVariable Long replyId, @RequestBody ReplyRequest replyRequest){
        return ResponseEntity.ok(replyService.updateReply(jwtToken, replyId, replyRequest));
    }

    @GetMapping("/{postId}/related")
    ResponseEntity<?> getRelatedPosts(@PathVariable Long postId, Pageable page){
        return ResponseEntity.ok(postService.getRelatedPosts(postId, page));
    }

    @GetMapping("/search")
    ResponseEntity<?> searchPost(@RequestParam(required = true) String keyword, Pageable page) {
        return ResponseEntity.ok(postService.searchPost(keyword, page));
    }
}
