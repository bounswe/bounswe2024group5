package com.quizzard.quizzard.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.quizzard.quizzard.exception.AccessDeniedException;
import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.PostRequest;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.PostTagRepository;
import com.quizzard.quizzard.repository.UpvoteRepository;
import com.quizzard.quizzard.repository.ReplyRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import com.quizzard.quizzard.service.PostService;
import com.quizzard.quizzard.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    @Mock
    private UpvoteRepository upvoteRepository;

    @Mock
    private ReplyRepository replyRepository;

    @Mock
    private PostTagRepository postTagRepository;

    @Mock
    private EnglishRepository englishRepository;

    @InjectMocks
    private PostService postService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createPost_Success() {
        String jwtToken = "Bearer token";
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Title");
        postRequest.setContent("Content");
        postRequest.setTags(List.of("tag1", "tag2"));

        User user = new User();
        user.setUsername("username");

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(englishRepository.existsByWord(anyString())).thenReturn(true);
        when(englishRepository.findByWord(anyString())).thenReturn(new English());

        PostResponse response = postService.createPost(jwtToken, postRequest);

        assertNotNull(response);
        verify(postRepository, times(1)).save(any(Post.class));
        verify(postTagRepository, times(2)).save(any());
    }

    @Test
    void createPost_MissingTitle() {
        String jwtToken = "Bearer token";
        PostRequest postRequest = new PostRequest();
        postRequest.setContent("Content");
        postRequest.setTags(List.of("tag1", "tag2"));

        assertThrows(InvalidRequestException.class, () -> postService.createPost(jwtToken, postRequest));
    }

    @Test
    void createPost_MissingContent() {
        String jwtToken = "Bearer token";
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Title");
        postRequest.setTags(List.of("tag1", "tag2"));

        assertThrows(InvalidRequestException.class, () -> postService.createPost(jwtToken, postRequest));
    }

    @Test
    void createPost_MissingTags() {
        String jwtToken = "Bearer token";
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Title");
        postRequest.setContent("Content");

        assertThrows(InvalidRequestException.class, () -> postService.createPost(jwtToken, postRequest));
    }

    @Test
    void createPost_EmptyTags() {
        String jwtToken = "Bearer token";
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Title");
        postRequest.setContent("Content");
        postRequest.setTags(List.of());

        assertThrows(InvalidRequestException.class, () -> postService.createPost(jwtToken, postRequest));
    }

    @Test
    void createPost_InvalidTag() {
        String jwtToken = "Bearer token";
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Title");
        postRequest.setContent("Content");
        postRequest.setTags(List.of("invalidTag"));

        User user = new User();
        user.setUsername("username");

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(englishRepository.existsByWord(anyString())).thenReturn(false);

        assertThrows(InvalidRequestException.class, () -> postService.createPost(jwtToken, postRequest));
        verify(postRepository, times(1)).delete(any(Post.class));
    }


    @Test
    void getPostById_PostNotFound() {
        Long postId = 1L;

        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> postService.getPostById(postId));
    }

    @Test
    void deletePostById_Success() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        User user = new User();
        user.setId(1L);
        Post post = new Post();
        post.setId(postId);
        post.setUser(user);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        postService.deletePostById(jwtToken, postId);

        verify(postRepository, times(1)).deleteById(postId);
    }

    @Test
    void deletePostById_AccessDenied() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        User user = new User();
        user.setId(1L);
        User anotherUser = new User();
        anotherUser.setId(2L);
        Post post = new Post();
        post.setId(postId);
        post.setUser(anotherUser);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        assertThrows(AccessDeniedException.class, () -> postService.deletePostById(jwtToken, postId));
    }

    @Test
    void deletePostById_PostNotFound() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        User user = new User();
        user.setId(1L);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> postService.deletePostById(jwtToken, postId));
    }

    @Test
    void updatePost_Success() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Updated Title");
        postRequest.setContent("Updated Content");
        postRequest.setTags(List.of("tag1", "tag2"));

        User user = new User();
        user.setId(1L);
        Post post = new Post();
        post.setId(postId);
        post.setUser(user);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(englishRepository.existsByWord(anyString())).thenReturn(true);
        when(englishRepository.findByWord(anyString())).thenReturn(new English());

        PostResponse response = postService.updatePost(jwtToken, postId, postRequest);

        assertNotNull(response);
        assertEquals("Updated Title", response.getTitle());
        assertEquals("Updated Content", response.getContent());
        verify(postRepository, times(1)).save(post);
    }

    @Test
    void updatePost_AccessDenied() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Updated Title");
        postRequest.setContent("Updated Content");
        postRequest.setTags(List.of("tag1", "tag2"));

        User user = new User();
        user.setId(1L);
        User anotherUser = new User();
        anotherUser.setId(2L);
        Post post = new Post();
        post.setId(postId);
        post.setUser(anotherUser);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        assertThrows(AccessDeniedException.class, () -> postService.updatePost(jwtToken, postId, postRequest));
    }

    @Test
    void updatePost_PostNotFound() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Updated Title");
        postRequest.setContent("Updated Content");
        postRequest.setTags(List.of("tag1", "tag2"));

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(new User());
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> postService.updatePost(jwtToken, postId, postRequest));
    }

    @Test
    void updatePost_InvalidTag() {
        String jwtToken = "Bearer token";
        Long postId = 1L;
        PostRequest postRequest = new PostRequest();
        postRequest.setTitle("Updated Title");
        postRequest.setContent("Updated Content");
        postRequest.setTags(List.of("invalidTag"));

        User user = new User();
        user.setId(1L);
        Post post = new Post();
        post.setId(postId);
        post.setUser(user);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(englishRepository.existsByWord(anyString())).thenReturn(false);

        assertThrows(InvalidRequestException.class, () -> postService.updatePost(jwtToken, postId, postRequest));
    }

}