package com.melodify.melodify.service;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.PostLike;
import com.melodify.melodify.model.User;
import com.melodify.melodify.repository.PostLikeRepository;
import com.melodify.melodify.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PostLikeService {

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepository;

    public void likePost(Long postId, String username) {
        User user = userService.getOneUserByUsername(username);
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
        PostLike postLike = new PostLike(post, user);
        if (postLikeRepository.existsByPostAndUser(post, user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have already liked this post");
        }
        postLikeRepository.save(postLike);
    }

    public void unlikePost(Long postId, String username) {
        User user = userService.getOneUserByUsername(username);
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
        PostLike postLike = postLikeRepository.findByPostAndUser(post, user);
        if (postLike == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "You have not liked this post");
        }
        postLikeRepository.delete(postLike);
    }

}
