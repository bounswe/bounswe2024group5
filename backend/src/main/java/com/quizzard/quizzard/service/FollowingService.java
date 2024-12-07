package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Following;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.ProfileResponse;
import com.quizzard.quizzard.repository.FollowingRepository;
import com.quizzard.quizzard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowingService {

    private final FollowingRepository followingRepository;

    private final UserService userService;
    private final UserRepository userRepository;

    public FollowingService(FollowingRepository followingRepository, UserService userService, UserRepository userRepository) {
        this.followingRepository = followingRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public void follow(String followerUsername, String followingUsername) {
        if (followerUsername.equals(followingUsername)) {
            throw new InvalidRequestException("You cannot follow yourself");
        }
        System.out.println(followerUsername);
        System.out.println(followingUsername);
        User following = userService.getOneUserByUsername(followingUsername);
        User follower =  userService.getOneUserByUsername(followerUsername);
        if (followingRepository.findByFollowerAndFollowed(follower, following) != null)
            throw new InvalidRequestException("You are already following this user");
        else
            followingRepository.save(new Following(follower, following));
    }

    public void unfollow(String followerUsername, String followingUsername) {
        User following = userService.getOneUserByUsername(followingUsername);
        User follower =  userService.getOneUserByUsername(followerUsername);
        Following follow = followingRepository.findByFollowerAndFollowed(follower, following);
        if (follow == null)
            throw new ResourceNotFoundException("You are not following this user");
        else
            followingRepository.delete(follow);
    }

    public Long getFollowerCount(User user) {
        return followingRepository.countByFollowed(user);
    }

    public Long getFollowingCount(User user) {
        return followingRepository.countByFollower(user);
    }

    public List<ProfileResponse> getFollowers(String username) {
        User user = userService.getOneUserByUsername(username);
        List<Following> followings = followingRepository.findByFollowed(user);
        // map into users
        List<User> users = followings.stream().map(Following::getFollower).toList();
        List<ProfileResponse> userResponses = users.stream().map(ProfileResponse::new).collect(Collectors.toList());
        return userResponses;
    }

    public List<ProfileResponse> getFollowings(String username) {
        User user = userService.getOneUserByUsername(username);
        List<Following> followings = followingRepository.findByFollower(user);
        // map into users
        List<User> users = followings.stream().map(Following::getFollowed).toList();
        return users.stream().map(ProfileResponse::new).collect(Collectors.toList());
    }

    public boolean isFollowing(User follower, User followed) {
        return followingRepository.findByFollowerAndFollowed(follower, followed) != null;
    }

}
