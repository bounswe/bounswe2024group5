package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.ProfileRequest;
import com.quizzard.quizzard.model.response.ProfileResponse;
import com.quizzard.quizzard.repository.UserRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    public User getOneUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void updateUserPoint(String username, int point) {
        User user = userRepository.findByUsername(username);
        user.setPoints(point);
        userRepository.save(user);
    }

    public void checkUserEnglishProficieny(String username) {
        User user = userRepository.findByUsername(username);
        if (user.getPoints() < 400) {
            user.setEnglishProficiency("A1");
        } else if (user.getPoints() < 1000) {
            user.setEnglishProficiency("A2");
        } else if (user.getPoints() < 1800) {
            user.setEnglishProficiency("B1");
        } else if (user.getPoints() < 2600) {
            user.setEnglishProficiency("B2");
        } else if (user.getPoints() < 3300) {
            user.setEnglishProficiency("C1");
        } else {
            user.setEnglishProficiency("C2");
        }
        userRepository.save(user);
    }
  
    public ProfileResponse getProfileByJwt(String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userRepository.findByUsername(username);
        return new ProfileResponse(user);
    }

    public ProfileResponse getProfileByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new ResourceNotFoundException("User not found");
        return new ProfileResponse(user);
    }

    public ProfileResponse updateProfileByJwt(String jwtToken, ProfileRequest profileRequest) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userRepository.findByUsername(username);
        if(profileRequest.getName() != null)
            user.setName(profileRequest.getName());
        if(profileRequest.getEmail() != null)
            user.setEmail(profileRequest.getEmail());
        if(profileRequest.getProfilePicture() != null)
            user.setProfilePicture(profileRequest.getProfilePicture());
        userRepository.save(user);
        return new ProfileResponse(user);
    }

}
