package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.ProfileRequest;
import com.quizzard.quizzard.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {


    @Autowired
    private UserService userService;

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

}
