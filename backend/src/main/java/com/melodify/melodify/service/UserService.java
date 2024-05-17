package com.melodify.melodify.service;

import com.melodify.melodify.model.User;
import com.melodify.melodify.repository.UserRepository;
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
