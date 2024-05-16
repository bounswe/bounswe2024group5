package com.melodify.melodify.controller;

import com.melodify.melodify.service.FollowingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class FollowingController {

    private final FollowingService followingService;

    public FollowingController(FollowingService followingService) {
        this.followingService = followingService;
    }

    @PostMapping("/follow/{username}")
    public void followUser(String username) {
        followingService.follow(username, "username");
    }

    @DeleteMapping("/follow/{username}")
    public void unfollowUser(String username) {
        followingService.unfollow(username, "username");
    }


}
