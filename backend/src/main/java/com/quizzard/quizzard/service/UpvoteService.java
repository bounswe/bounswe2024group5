package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.Upvote;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.UpvoteResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.UpvoteRepository;
import com.quizzard.quizzard.repository.UserRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UpvoteService {

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;

    private List<UpvoteResponse> mapToUpvoteResponse(List<Upvote> upvotes){
        return upvotes.stream().map(UpvoteResponse::new).toList();
    }

    public UpvoteResponse upvotePost(String jwtToken, Long postId) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        if(upvoteRepository.existsByPostIdAndUserId(postId, user.getId()))
            throw new InvalidRequestException("You have already upvoted this post");
        Upvote upvote = new Upvote();
        upvote.setPost(post);
        upvote.setUser(user);
        upvoteRepository.save(upvote);
        return new UpvoteResponse(upvote);
    }

    public void removeUpvote(String jwtToken, Long postId) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        Upvote upvote = upvoteRepository.findByPostIdAndUserId(postId, user.getId()).stream().findFirst().orElseThrow( () -> new ResourceNotFoundException("Upvote not found"));
        upvoteRepository.delete(upvote);
    }

    public List<UpvoteResponse> getUpvotes(Optional<String> username, Optional<Long> postId) {
        if (username.isPresent() && postId.isPresent()){
            if (!userRepository.existsByUsername(username.get()))
                throw new ResourceNotFoundException("User not found");
            if (!postRepository.existsById(postId.get()))
                throw new ResourceNotFoundException("Post not found");
            return mapToUpvoteResponse(upvoteRepository.findByPostIdAndUserId(postId.get(), userRepository.findByUsername(username.get()).getId()));
        }
        if (username.isPresent()){
            if (!userRepository.existsByUsername(username.get()))
                throw new ResourceNotFoundException("User not found");
            return mapToUpvoteResponse(upvoteRepository.findByUserId(userRepository.findByUsername(username.get()).getId()));
        }
        if (postId.isPresent())
            return mapToUpvoteResponse(upvoteRepository.findByPostId(postId.get()));
        return mapToUpvoteResponse(upvoteRepository.findAll());
    }

    public UpvoteResponse getUpvoteById(Long upvoteId) {
        Upvote upvote = upvoteRepository.findById(upvoteId).orElseThrow( () -> new ResourceNotFoundException("Upvote not found"));
        return new UpvoteResponse(upvote);
    }
}

