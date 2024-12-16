package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Following;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.ProfileResponse;
import com.quizzard.quizzard.repository.FollowingRepository;
import com.quizzard.quizzard.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FollowingServiceTest {

    @Mock
    private FollowingRepository followingRepository;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FollowingService followingService;

    private User follower;
    private User followed;

    @BeforeEach
    void setUp() {
        follower = new User();
        follower.setUsername("followerUser");

        followed = new User();
        followed.setUsername("followedUser");
    }

    @Test
    void testFollow_Success() {
        // Arrange
        when(userService.getOneUserByUsername("followerUser")).thenReturn(follower);
        when(userService.getOneUserByUsername("followedUser")).thenReturn(followed);
        when(followingRepository.findByFollowerAndFollowed(follower, followed)).thenReturn(null);

        // Act
        followingService.follow("followerUser", "followedUser");

        // Assert
        verify(followingRepository).save(any(Following.class));
    }

    @Test
    void testFollow_SelfFollow() {
        // Act & Assert
        assertThrows(InvalidRequestException.class, () ->
                followingService.follow("testUser", "testUser")
        );
    }

    @Test
    void testFollow_AlreadyFollowing() {
        // Arrange
        when(userService.getOneUserByUsername("followerUser")).thenReturn(follower);
        when(userService.getOneUserByUsername("followedUser")).thenReturn(followed);
        when(followingRepository.findByFollowerAndFollowed(follower, followed))
                .thenReturn(new Following(follower, followed));

        // Act & Assert
        assertThrows(InvalidRequestException.class, () ->
                followingService.follow("followerUser", "followedUser")
        );
    }

    @Test
    void testUnfollow_Success() {
        // Arrange
        Following following = new Following(follower, followed);
        when(userService.getOneUserByUsername("followerUser")).thenReturn(follower);
        when(userService.getOneUserByUsername("followedUser")).thenReturn(followed);
        when(followingRepository.findByFollowerAndFollowed(follower, followed))
                .thenReturn(following);

        // Act
        followingService.unfollow("followerUser", "followedUser");

        // Assert
        verify(followingRepository).delete(following);
    }

    @Test
    void testUnfollow_NotFollowing() {
        // Arrange
        when(userService.getOneUserByUsername("followerUser")).thenReturn(follower);
        when(userService.getOneUserByUsername("followedUser")).thenReturn(followed);
        when(followingRepository.findByFollowerAndFollowed(follower, followed))
                .thenReturn(null);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () ->
                followingService.unfollow("followerUser", "followedUser")
        );
    }

    @Test
    void testGetFollowerCount() {
        // Arrange
        when(followingRepository.countByFollowed(followed)).thenReturn(5L);

        // Act
        Long count = followingService.getFollowerCount(followed);

        // Assert
        assertEquals(5L, count);
    }

    @Test
    void testGetFollowingCount() {
        // Arrange
        when(followingRepository.countByFollower(follower)).thenReturn(3L);

        // Act
        Long count = followingService.getFollowingCount(follower);

        // Assert
        assertEquals(3L, count);
    }

    @Test
    void testGetFollowers() {
        // Arrange
        when(userService.getOneUserByUsername("testUser")).thenReturn(followed);

        Following follow1 = new Following();
        follow1.setFollower(new User());
        Following follow2 = new Following();
        follow2.setFollower(new User());

        List<Following> followings = Arrays.asList(follow1, follow2);

        when(followingRepository.findByFollowed(followed)).thenReturn(followings);

        ProfileResponse profileResponse1 = new ProfileResponse();
        ProfileResponse profileResponse2 = new ProfileResponse();

        when(userService.getProfile(any(User.class)))
                .thenReturn(profileResponse1)
                .thenReturn(profileResponse2);

        // Act
        List<ProfileResponse> result = followingService.getFollowers("testUser");

        // Assert
        assertEquals(2, result.size());
        verify(userService, times(2)).getProfile(any(User.class));
    }

    @Test
    void testGetFollowings() {
        // Arrange
        when(userService.getOneUserByUsername("testUser")).thenReturn(follower);

        Following follow1 = new Following();
        follow1.setFollowed(new User());
        Following follow2 = new Following();
        follow2.setFollowed(new User());

        List<Following> followings = Arrays.asList(follow1, follow2);

        when(followingRepository.findByFollower(follower)).thenReturn(followings);

        ProfileResponse profileResponse1 = new ProfileResponse();
        ProfileResponse profileResponse2 = new ProfileResponse();

        when(userService.getProfile(any(User.class)))
                .thenReturn(profileResponse1)
                .thenReturn(profileResponse2);

        // Act
        List<ProfileResponse> result = followingService.getFollowings("testUser");

        // Assert
        assertEquals(2, result.size());
        verify(userService, times(2)).getProfile(any(User.class));
    }

    @Test
    void testIsFollowing_True() {
        // Arrange
        Following following = new Following(follower, followed);
        when(followingRepository.findByFollowerAndFollowed(follower, followed))
                .thenReturn(following);

        // Act
        boolean result = followingService.isFollowing(follower, followed);

        // Assert
        assertTrue(result);
    }

    @Test
    void testIsFollowing_False() {
        // Arrange
        when(followingRepository.findByFollowerAndFollowed(follower, followed))
                .thenReturn(null);

        // Act
        boolean result = followingService.isFollowing(follower, followed);

        // Assert
        assertFalse(result);
    }
}