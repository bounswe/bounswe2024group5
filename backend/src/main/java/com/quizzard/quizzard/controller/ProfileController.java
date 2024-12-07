package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.ProfileRequest;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import com.quizzard.quizzard.service.FollowingService;
import com.quizzard.quizzard.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/profile")
public class ProfileController {


    @Autowired
    private UserService userService;

    @Autowired
    private FollowingService followingService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@RequestHeader("Authorization") String jwtToken){
        return ResponseEntity.ok(userService.getProfileByJwt(jwtToken));
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getProfileByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.getProfileByUsername(username));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(@RequestHeader("Authorization") String jwtToken, @Valid @RequestBody ProfileRequest profileRequest){
        return ResponseEntity.ok(userService.updateProfileByJwt(jwtToken, profileRequest));
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
