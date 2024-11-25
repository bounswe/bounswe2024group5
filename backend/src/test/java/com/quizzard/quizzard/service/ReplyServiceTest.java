package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.Reply;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.ReplyRequest;
import com.quizzard.quizzard.model.response.ReplyResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.ReplyRepository;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReplyServiceTest {

    @Mock
    private ReplyRepository replyRepository;

    @Mock
    private UserService userService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReplyService replyService;

    private User mockUser;
    private Post mockPost;
    private Reply mockReply;
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

        // Create mock reply
        mockReply = new Reply();
        mockReply.setId(1L);
        mockReply.setContent("Test Reply");
        mockReply.setUser(mockUser);
        mockReply.setPost(mockPost);

        // Mock JWT token
        mockJwtToken = "Bearer mockToken123";
    }


    @Test
    public void testCreateReply_EmptyContent() {
        // Prepare test data
        ReplyRequest replyRequest = new ReplyRequest();
        replyRequest.setContent("");

        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(mockPost));

        // Verify exception
        assertThrows(InvalidRequestException.class,
                () -> replyService.createReply(mockJwtToken, 1L, replyRequest));
    }

    @Test
    public void testCreateReply_NullContent() {
        // Prepare test data
        ReplyRequest replyRequest = new ReplyRequest();
        replyRequest.setContent(null);

        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(mockPost));

        // Verify exception
        assertThrows(InvalidRequestException.class,
                () -> replyService.createReply(mockJwtToken, 1L, replyRequest));
    }


    @Test
    public void testGetRepliesByUsername_UserNotFound() {
        // Mock dependencies
        when(userRepository.existsByUsername("nonexistentuser")).thenReturn(false);

        // Verify exception
        assertThrows(ResourceNotFoundException.class,
                () -> replyService.getRepliesByUsername(Optional.of("nonexistentuser")));
    }


    @Test
    public void testGetReplyById_NotFound() {
        // Mock dependencies
        when(replyRepository.findById(1L))
                .thenReturn(Optional.empty());

        // Verify exception
        assertThrows(ResourceNotFoundException.class,
                () -> replyService.getReplyById(1L));
    }

    @Test
    public void testDeleteReplyById_Success() {
        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(replyRepository.findById(1L)).thenReturn(Optional.of(mockReply));

        // Perform test
        replyService.deleteReplyById(mockJwtToken, 1L);

        // Verify
        verify(replyRepository).delete(mockReply);
    }

    @Test
    public void testDeleteReplyById_Unauthorized() {
        // Create a different user
        User differentUser = new User();
        differentUser.setId(2L);
        differentUser.setUsername("differentuser");

        // Modify mock reply to belong to different user
        mockReply.setUser(differentUser);

        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(replyRepository.findById(1L)).thenReturn(Optional.of(mockReply));

        // Verify exception
        assertThrows(InvalidRequestException.class,
                () -> replyService.deleteReplyById(mockJwtToken, 1L));
    }


    @Test
    public void testUpdateReply_Unauthorized() {
        // Create a different user
        User differentUser = new User();
        differentUser.setId(2L);
        differentUser.setUsername("differentuser");

        // Prepare test data
        ReplyRequest replyRequest = new ReplyRequest();
        replyRequest.setContent("Updated Reply");

        // Modify mock reply to belong to different user
        mockReply.setUser(differentUser);

        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(replyRepository.findById(1L)).thenReturn(Optional.of(mockReply));

        // Verify exception
        assertThrows(InvalidRequestException.class,
                () -> replyService.updateReply(mockJwtToken, 1L, replyRequest));
    }

    @Test
    public void testUpdateReply_EmptyContent() {
        // Prepare test data
        ReplyRequest replyRequest = new ReplyRequest();
        replyRequest.setContent("");

        // Mock dependencies
        when(jwtUtils.getUserNameFromJwtToken("mockToken123")).thenReturn("testuser");
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(replyRepository.findById(1L)).thenReturn(Optional.of(mockReply));

        // Verify exception
        assertThrows(InvalidRequestException.class,
                () -> replyService.updateReply(mockJwtToken, 1L, replyRequest));
    }
}