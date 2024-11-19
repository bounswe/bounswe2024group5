package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.UserRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    public PostResponse createPost(String jwtToken, PostRequest postRequest){
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Post post = postRequest.toPost();
        System.out.println(post.getContent());
        post.setUser(user);
        postRepository.save(post);
        return new PostResponse(post);
    }

    public PostResponse getPostById(Long postId){
        Post post = postRepository.findById(postId).orElse(null);
        if(post == null)
            return null;
        return new PostResponse(post);
    }

    public void deletePostById(String jwtToken, Long postId){
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        // check if the user is the owner of the post
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        if(post.getUser().getId() != user.getId())
            throw new ResourceNotFoundException("Post not found");
        postRepository.deleteById(postId);
    }

}
