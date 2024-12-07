package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.ProfileRequest;
import com.quizzard.quizzard.model.response.ProfileResponse;
import com.quizzard.quizzard.repository.FollowingRepository;
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

    @Autowired
    private FollowingRepository followingRepository;

    public ProfileResponse getProfile(User user) {
        return new ProfileResponse().profileResponseByUserAndNoFollowersAndNoFollowing(user, followingRepository.countByFollowed(user), followingRepository.countByFollower(user));
    }

    public User getOneUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void updateUserPoint(User user, int point) {
        user.setPoints(point);
        userRepository.save(user);
    }
  
    public ProfileResponse getProfileByJwt(String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userRepository.findByUsername(username);
        return getProfile(user);
    }

    public ProfileResponse getProfileByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new ResourceNotFoundException("User not found");
        return getProfile(user);
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
        return getProfile(user);
    }

}
