package com.melodify.melodify.controller;

import com.melodify.melodify.model.User;
import com.melodify.melodify.security.jwt.JwtUtils;
import com.melodify.melodify.service.FollowingService;
import com.melodify.melodify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
public class FollowingController {

    @Autowired
    private FollowingService followingService;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/follow/{followingUsername}")
    public ResponseEntity<?> followUser(@RequestHeader("Authorization") String jwt, @PathVariable String followingUsername) {
        String followerUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try{
            followingService.follow(followerUsername , followingUsername);
            return ResponseEntity.ok("Followed user");
        }
        catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }

    }

    @DeleteMapping("/follow/{followingUsername}")
    public ResponseEntity<String> unfollowUser(@RequestHeader("Authorization") String jwt, @PathVariable String followingUsername) {
        String followerUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        try{
            followingService.unfollow(followerUsername, followingUsername);
            return ResponseEntity.ok("Unfollowed user");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

}
