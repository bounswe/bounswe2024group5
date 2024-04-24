package com.melodify.melodify.controller;

import com.melodify.melodify.model.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class AuthenticationController {
    
    @PostMapping("/auth/register")
    public ResponseEntity<RegisterResponse> register() {
        return ResponseEntity.created(null).body(new RegisterResponse("userID", "token"));
    }
}
