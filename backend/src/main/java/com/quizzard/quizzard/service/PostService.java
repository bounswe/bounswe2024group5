package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.AccessDeniedException;
import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.PostTag;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.repository.*;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Autowired
    private PostTagRepository postTagRepository;

    @Autowired
    private EnglishRepository englishRepository;


    private PostResponse mapToPostResponse(Post post){
        int noUpvote = (int) upvoteRepository.countByPostId(post.getId());
        int NoReplies = (int) replyRepository.countByPostId(post.getId());
        List<PostTag> postTags = postTagRepository.findByPostId(post.getId());
        return new PostResponse(post, postTags, noUpvote, NoReplies);
    }

    private List<PostResponse> mapToPostResponse(List<Post> posts){
        return posts.stream().map(this::mapToPostResponse).toList();
    }

    // they can set tags twice
    private boolean setPostTags(Post post, List<String> tags){
        ArrayList<PostTag> postTags = new java.util.ArrayList<>(List.of());
        for(String tag: tags){
            if(!englishRepository.existsByWord(tag))
                return false;
            English english = englishRepository.findByWord(tag);
            PostTag postTag = new PostTag();
            postTag.setPost(post);
            postTag.setEnglish(english);
            postTags.add(postTag);
        }
        for(PostTag postTag: postTags){
            postTagRepository.save(postTag);
        }
        return true;
    }

    private boolean updatePostTags(Post post, List<String> tags){
        List<PostTag> postTags = postTagRepository.findByPostId(post.getId());
        if(setPostTags(post, tags)){
            for(PostTag postTag: postTags){
                postTagRepository.delete(postTag);
            }
            return true;
        }
        return false;
    }

    public PostResponse createPost(String jwtToken, PostRequest postRequest){
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        if(postRequest.getTitle() == null || postRequest.getContent() == null || postRequest.getTags() == null)
            throw new InvalidRequestException("Title, content and tags are required");
        if(postRequest.getTags().isEmpty())
            throw new InvalidRequestException("At least one tag is required");
        Post post = postRequest.toPost();
        post.setUser(user);
        postRepository.save(post);
        if(!setPostTags(post, postRequest.getTags())){
            postRepository.delete(post);
            throw new InvalidRequestException("Invalid tag");
        }
        return mapToPostResponse(post);
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

    public List<PostResponse> getAllPosts(Optional<String> word, Optional<String> username) {
        if (word.isPresent() && username.isPresent())
            return mapToPostResponse(postRepository.findAllByTagWordAndUsername(word.get(), username.get()));
        else if (word.isPresent())
            return mapToPostResponse(postRepository.findAllByTagWord(word.get()));
        else if (username.isPresent()){
            User user = userService.getOneUserByUsername(username.get());
            if (user == null)
                throw new ResourceNotFoundException("User not found");
            return mapToPostResponse(postRepository.findByUserId(user.getId()));
        }
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
        if (postRequest.getTags() != null)
            if(postRequest.getTags().isEmpty())
                throw new InvalidRequestException("At least one tag is required");
            else{
                if(!updatePostTags(post, postRequest.getTags()))
                    throw new InvalidRequestException("Invalid tag");
            }
        postRepository.save(post);
        return mapToPostResponse(post);
    }

    public List<PostResponse> getRelatedPosts(Long postId){
        return mapToPostResponse(postRepository.findRelatedPosts(postId));
    }
    
}
