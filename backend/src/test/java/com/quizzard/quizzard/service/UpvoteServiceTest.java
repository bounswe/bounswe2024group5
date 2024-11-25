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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UpvoteServiceTest {

    @Mock
    private UpvoteRepository upvoteRepository;

    @Mock
    private UserService userService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UpvoteService upvoteService;

    private User mockUser;
    private Post mockPost;
    private Upvote mockUpvote;
    private String mockJwtToken;

    @BeforeEach
    public void setUp() {
        // Create mock user
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");

        // Create mock post
        mockPost = new Post();
        mockPost.setId(1L);

        // Create mock upvote
        mockUpvote = new Upvote();
        mockUpvote.setId(1L);
        mockUpvote.setUser(mockUser);
        mockUpvote.setPost(mockPost);

        // Mock JWT token
        mockJwtToken = "Bearer mockToken123";
    }

    @Test
    public void testUpvotePost_Success() {
        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(mockPost));
        when(upvoteRepository.existsByPostIdAndUserId(1L, 1L)).thenReturn(false);
        when(upvoteRepository.save(any(Upvote.class))).thenReturn(mockUpvote);

        // Perform test
        UpvoteResponse response = upvoteService.upvotePost(mockJwtToken, 1L);

        // Verify
        assertNotNull(response);
        verify(upvoteRepository).save(any(Upvote.class));
    }

    @Test
    public void testUpvotePost_AlreadyUpvoted() {
        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(mockPost));
        when(upvoteRepository.existsByPostIdAndUserId(1L, 1L)).thenReturn(true);

        // Verify exception
        assertThrows(InvalidRequestException.class,
                () -> upvoteService.upvotePost(mockJwtToken, 1L));
    }

    @Test
    public void testRemoveUpvote_Success() {
        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(mockPost));
        when(upvoteRepository.findByPostIdAndUserId(1L, 1L))
                .thenReturn(Arrays.asList(mockUpvote));

        // Perform test
        upvoteService.removeUpvote(mockJwtToken, 1L);

        // Verify
        verify(upvoteRepository).delete(mockUpvote);
    }

    @Test
    public void testRemoveUpvote_UpvoteNotFound() {
        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(mockPost));
        when(upvoteRepository.findByPostIdAndUserId(1L, 1L))
                .thenReturn(Arrays.asList());

        // Verify exception
        assertThrows(ResourceNotFoundException.class,
                () -> upvoteService.removeUpvote(mockJwtToken, 1L));
    }

    @Test
    public void testGetUpvotes_ByUsernameAndPostId() {
        // Mock dependencies
        when(userRepository.existsByUsername("testuser")).thenReturn(true);
        when(postRepository.existsById(1L)).thenReturn(true);
        when(userRepository.findByUsername("testuser")).thenReturn(mockUser);
        when(upvoteRepository.findByPostIdAndUserId(1L, 1L))
                .thenReturn(Arrays.asList(mockUpvote));

        // Perform test
        List<UpvoteResponse> responses = upvoteService.getUpvotes(
                Optional.of("testuser"), Optional.of(1L));

        // Verify
        assertNotNull(responses);
        assertFalse(responses.isEmpty());
    }

    @Test
    public void testGetUpvotes_ByUsername() {
        // Mock dependencies
        when(userRepository.existsByUsername("testuser")).thenReturn(true);
        when(userRepository.findByUsername("testuser")).thenReturn(mockUser);
        when(upvoteRepository.findByUserId(1L))
                .thenReturn(Arrays.asList(mockUpvote));

        // Perform test
        List<UpvoteResponse> responses = upvoteService.getUpvotes(
                Optional.of("testuser"), Optional.empty());

        // Verify
        assertNotNull(responses);
        assertFalse(responses.isEmpty());
    }

    @Test
    public void testGetUpvotes_ByPostId() {
        // Mock dependencies
        when(postRepository.existsById(1L)).thenReturn(true);
        when(upvoteRepository.findByPostId(1L))
                .thenReturn(Arrays.asList(mockUpvote));

        // Perform test
        List<UpvoteResponse> responses = upvoteService.getUpvotes(
                Optional.empty(), Optional.of(1L));

        // Verify
        assertNotNull(responses);
        assertFalse(responses.isEmpty());
    }

    @Test
    public void testGetUpvotes_AllUpvotes() {
        // Mock dependencies
        when(upvoteRepository.findAll())
                .thenReturn(Arrays.asList(mockUpvote));

        // Perform test
        List<UpvoteResponse> responses = upvoteService.getUpvotes(
                Optional.empty(), Optional.empty());

        // Verify
        assertNotNull(responses);
        assertFalse(responses.isEmpty());
    }

    @Test
    public void testGetUpvoteById_Success() {
        // Mock dependencies
        when(upvoteRepository.findById(1L))
                .thenReturn(Optional.of(mockUpvote));

        // Perform test
        UpvoteResponse response = upvoteService.getUpvoteById(1L);

        // Verify
        assertNotNull(response);
    }

    @Test
    public void testGetUpvoteById_NotFound() {
        // Mock dependencies
        when(upvoteRepository.findById(1L))
                .thenReturn(Optional.empty());

        // Verify exception
        assertThrows(ResourceNotFoundException.class,
                () -> upvoteService.getUpvoteById(1L));
    }
}