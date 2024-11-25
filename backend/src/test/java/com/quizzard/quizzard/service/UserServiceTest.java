package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.ProfileRequest;
import com.quizzard.quizzard.model.response.ProfileResponse;
import com.quizzard.quizzard.repository.UserRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetOneUserByUsername() {
        String username = "testUser";
        User mockUser = new User();
        mockUser.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        User result = userService.getOneUserByUsername(username);

        assertNotNull(result);
        assertEquals(username, result.getUsername());
        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void testUpdateUserPoint() {
        User mockUser = new User();
        int newPoints = 100;

        userService.updateUserPoint(mockUser, newPoints);

        assertEquals(newPoints, mockUser.getPoints());
        verify(userRepository, times(1)).save(mockUser);
    }

    @Test
    void testGetProfileByJwt() {
        String jwtToken = "Bearer mockToken";
        String username = "testUser";
        User mockUser = new User();
        mockUser.setUsername(username);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        ProfileResponse response = userService.getProfileByJwt(jwtToken);

        assertNotNull(response);
        assertEquals(mockUser.getUsername(), response.getUsername());
        verify(jwtUtils, times(1)).getUserNameFromJwtToken(anyString());
        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void testGetProfileByUsername_Success() {
        String username = "testUser";
        User mockUser = new User();
        mockUser.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        ProfileResponse response = userService.getProfileByUsername(username);

        assertNotNull(response);
        assertEquals(username, response.getUsername());
        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void testGetProfileByUsername_NotFound() {
        String username = "nonExistentUser";

        when(userRepository.findByUsername(username)).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> userService.getProfileByUsername(username));
        verify(userRepository, times(1)).findByUsername(username);
    }

    @Test
    void testUpdateProfileByJwt() {
        String jwtToken = "Bearer mockToken";
        String username = "testUser";
        ProfileRequest profileRequest = new ProfileRequest();
        profileRequest.setName("New Name");
        profileRequest.setEmail("newemail@example.com");
        profileRequest.setProfilePicture("newProfilePicUrl");

        User mockUser = new User();
        mockUser.setUsername(username);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(mockUser);

        ProfileResponse response = userService.updateProfileByJwt(jwtToken, profileRequest);

        assertNotNull(response);
        assertEquals(profileRequest.getName(), mockUser.getName());
        assertEquals(profileRequest.getEmail(), mockUser.getEmail());
        assertEquals(profileRequest.getProfilePicture(), mockUser.getProfilePicture());
        verify(userRepository, times(1)).save(mockUser);
    }
}
