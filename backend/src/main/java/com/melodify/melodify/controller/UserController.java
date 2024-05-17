package com.melodify.melodify.controller;

import com.melodify.melodify.model.request.ProfileUpdateRequest;
import com.melodify.melodify.security.jwt.JwtUtils;
import com.melodify.melodify.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private ProfileService profileService;

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

}
