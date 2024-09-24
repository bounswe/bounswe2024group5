package com.melodify.melodify.controller;

import com.melodify.melodify.model.request.ProfileUpdateRequest;
import com.melodify.melodify.security.jwt.JwtUtils;
import com.melodify.melodify.service.FollowingService;
import com.melodify.melodify.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private FollowingService followingService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok().body(profileService.getUserByUsername(username));
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> updateUserByUsername(@RequestHeader("Authorization") String jwt, @PathVariable String username, @RequestBody ProfileUpdateRequest request) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        if (!authorUsername.equals(username))
            return ResponseEntity.badRequest().body("You can only update your own profile");
        else
            return ResponseEntity.ok().body(profileService.updateUserByUsername(username, request));
    }

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

    @GetMapping("/{username}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable String username) {
        return ResponseEntity.ok().body(followingService.getFollowers(username));
    }

    @GetMapping("/{username}/following")
    public ResponseEntity<?> getFollowings(@PathVariable String username) {
        return ResponseEntity.ok().body(followingService.getFollowings(username));
    }

}
