package com.melodify.melodify.service;

import com.melodify.melodify.model.LoginResponse;
import com.melodify.melodify.model.RegisterRequest;
import com.melodify.melodify.model.RegisterResponse;
import com.melodify.melodify.repository.UserRepository;
import com.melodify.melodify.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByUsernameOrEmail(request.getUsername(), request.getEmail()) != null) {
            return new RegisterResponse(null, "User already exists");
        }
        // hash password
        String hashedPassword = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt());
        User user = new User(request.getUsername(), hashedPassword, request.getEmail(), request.getName(), request.getSurname());
        userRepository.save(user);
        return new RegisterResponse("token", "User registered successfully");
    }

    public LoginResponse login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new LoginResponse(null, "User not found");
        }
        if(BCrypt.checkpw(password, user.getPassword())){
            return new LoginResponse("token", "Login successful");
        } else {
            return new LoginResponse(null, "Invalid password");
        }
    }
}
