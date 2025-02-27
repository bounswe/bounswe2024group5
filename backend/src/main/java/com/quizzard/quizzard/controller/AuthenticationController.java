package com.quizzard.quizzard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.AuthenticationException;

import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.LoginRequest;
import com.quizzard.quizzard.model.request.RegisterRequest;
import com.quizzard.quizzard.model.response.LoginResponse;
import com.quizzard.quizzard.model.response.RegisterResponse;
import com.quizzard.quizzard.repository.UserRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import com.quizzard.quizzard.model.response.ErrorResponse;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Username is already taken!"));
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Email is already in use!"));
        }

        String proficiency = request.getEnglishProficiency().toUpperCase();
        if(!proficiency.equals("A1") && !proficiency.equals("A2") && !proficiency.equals("B1") && !proficiency.equals("B2") && !proficiency.equals("C1") && !proficiency.equals("C2")) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid English proficiency level!"));
        }
        int score;
        if(proficiency.equals("A1"))
            score = 250;
        else if(proficiency.equals("A2"))
            score = 750;
        else if(proficiency.equals("B1"))
            score = 1250;
        else if(proficiency.equals("B2"))
            score = 1750;
        else if(proficiency.equals("C1"))
            score = 2250;
        else
            score = 3000;

        User user = new User(request.getUsername(), 
                             encoder.encode(request.getPassword()), 
                             request.getEmail(), 
                             request.getName(),score);
        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new RegisterResponse(jwt, "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean userExists = userRepository.existsByUsername(request.getUsername());
        if(!userExists) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Username does not exist!"));
        }
        try{
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
    
            return ResponseEntity.ok(new LoginResponse(jwt, "Login successful"));
        }
        catch(AuthenticationException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Wrong password!"));
        }
    }
}
