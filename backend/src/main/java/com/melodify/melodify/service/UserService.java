package com.melodify.melodify.service;

import com.melodify.melodify.model.User;
import com.melodify.melodify.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getOneUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
