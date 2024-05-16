package com.melodify.melodify.service;

import com.melodify.melodify.model.Following;
import com.melodify.melodify.repository.FollowingRepository;
import org.springframework.stereotype.Service;

@Service
public class FollowingService {


    private final FollowingRepository followingRepository;

    private final UserService userService;

    public FollowingService(FollowingRepository followingRepository, UserService userService) {
        this.followingRepository = followingRepository;
        this.userService = userService;
    }

    public void follow(String followerUsername, String followingUsername) {
        if (followerUsername.equals(followingUsername)) {
            throw new IllegalArgumentException("You can't follow yourself");
        }
        if (followingRepository.findByFollowerUsernameAndFollowingUsername(followerUsername, followingUsername) != null) {
            throw new IllegalArgumentException("You are already following this user");
        }
        userService.getOneUserByUsername(followingUsername);
        userService.getOneUserByUsername(followerUsername);
        followingRepository.save(new Following(followerUsername, followingUsername));
    }

    public void unfollow(String followerUsername, String followingUsername) {
        Following following = followingRepository.findByFollowerUsernameAndFollowingUsername(followerUsername, followingUsername);
        if (following == null) {
            throw new IllegalArgumentException("You are not following this user");
        }
        followingRepository.delete(following);
    }

    public boolean isFollowing(String followerUsername, String followingUsername) {
        return followingRepository.findByFollowerUsernameAndFollowingUsername(followerUsername, followingUsername) != null;
    }


}
