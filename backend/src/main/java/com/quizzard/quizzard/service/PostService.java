package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.AccessDeniedException;
import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.ReplyRepository;
import com.quizzard.quizzard.repository.UpvoteRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private ReplyRepository replyRepository;


    private PostResponse mapToPostResponse(Post post){
        int noUpvote = (int) upvoteRepository.countByPostId(post.getId());
        int NoReplies = (int) replyRepository.countByPostId(post.getId());
        return new PostResponse(post, noUpvote, NoReplies);
    }

    private List<PostResponse> mapToPostResponse(List<Post> posts){
        return posts.stream().map(post -> mapToPostResponse(post)).toList();
    }

    public PostResponse createPost(String jwtToken, PostRequest postRequest){
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        if(postRequest.getTitle() == null || postRequest.getContent() == null || postRequest.getWord() == null)
            throw new InvalidRequestException("Title, content and word are required");
        Post post = postRequest.toPost();
        post.setUser(user);
        postRepository.save(post);
        return new PostResponse(post,0, 0);
    }

    public PostResponse getPostById(Long postId){
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        return mapToPostResponse(post);
    }

    public void deletePostById(String jwtToken, Long postId){
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        // check if the user is the owner of the post
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        if(post.getUser().getId() != user.getId())
            throw new AccessDeniedException("You are not the owner of the post");
        postRepository.deleteById(postId);
    }

    public List<PostResponse> getAllPosts(Optional<String> word, Optional<String> userId) {
        if (word.isPresent() && userId.isPresent())
            return mapToPostResponse(postRepository.findByWordAndUserId(word.get(), Long.parseLong(userId.get())));
        else if (word.isPresent())
            return mapToPostResponse(postRepository.findByWord(word.get()));
        else if (userId.isPresent())
            return mapToPostResponse(postRepository.findByUserId(Long.parseLong(userId.get())));
        else
            return mapToPostResponse(postRepository.findAll());
    }

    public PostResponse updatePost(String jwtToken, Long postId, PostRequest postRequest) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        if(post.getUser().getId() != user.getId())
            throw new AccessDeniedException("You are not the owner of the post");
        if (postRequest.getContent() != null)
            post.setContent(postRequest.getContent());
        if (postRequest.getTitle() != null)
            post.setTitle(postRequest.getTitle());
        if (postRequest.getWord() != null)
            post.setWord(postRequest.getWord());
        postRepository.save(post);
        return mapToPostResponse(post);
    }
}
