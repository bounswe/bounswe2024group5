package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Following;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.UserResponse;
import com.quizzard.quizzard.repository.FollowingRepository;
import com.quizzard.quizzard.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot follow yourself");
        }
        System.out.println(followerUsername);
        System.out.println(followingUsername);
        User following = userService.getOneUserByUsername(followingUsername);
        User follower =  userService.getOneUserByUsername(followerUsername);
        if (followingRepository.findByFollowerAndFollowed(follower, following) != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are already following this user");
        else
            followingRepository.save(new Following(follower, following));
    }

    public void unfollow(String followerUsername, String followingUsername) {
        User following = userService.getOneUserByUsername(followingUsername);
        User follower =  userService.getOneUserByUsername(followerUsername);
        Following follow = followingRepository.findByFollowerAndFollowed(follower, following);
        if (follow == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "You are not following this user");
        else
            followingRepository.delete(follow);
    }

    public int getFollowerCount(User user) {
        return followingRepository.findByFollowed(user).size();
    }

    public int getFollowingCount(User user) {
        return followingRepository.findByFollower(user).size();
    }

    public List<UserResponse> getFollowers(String username) {
        User user = userService.getOneUserByUsername(username);
        List<Following> followings = followingRepository.findByFollowed(user);
        // map into users
        List<User> users = followings.stream().map(following -> following.getFollower()).collect(Collectors.toList());
        List<UserResponse> userResponses = users.stream().map(user1 -> new UserResponse(user1.getUsername())).collect(Collectors.toList());
        return userResponses;
    }

    public List<UserResponse> getFollowings(String username) {
        User user = userService.getOneUserByUsername(username);
        List<Following> followings = followingRepository.findByFollower(user);
        // map into users
        List<User> users = followings.stream().map(following -> following.getFollowed()).collect(Collectors.toList());
        List<UserResponse> userResponses = users.stream().map(user1 -> new UserResponse(user1.getUsername())).collect(Collectors.toList());
        return userResponses;
    }

    public boolean isFollowing(User follower, User followed) {
        return followingRepository.findByFollowerAndFollowed(follower, followed) != null;
    }




}
