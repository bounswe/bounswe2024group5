package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getOneUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
