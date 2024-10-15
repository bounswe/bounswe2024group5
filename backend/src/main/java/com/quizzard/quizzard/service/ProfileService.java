package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Profile;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.ProfileUpdateRequest;
import com.quizzard.quizzard.model.response.ProfileResponse;
import com.quizzard.quizzard.repository.FollowingRepository;
import com.quizzard.quizzard.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private FollowingService followingService;

    public ProfileResponse getUserByUsername(String username) {
        User user = userService.getOneUserByUsername(username);
        Profile profile = profileRepository.findByUser(user);
        int followers = followingService.getFollowerCount(user);
        int following = followingService.getFollowingCount(user);
        return new ProfileResponse(user.getUsername(), profile.getBio(), profile.getPublicName(),
                profile.getProfilePictureUrl(), profile.getSpotifyAcc(), profile.getInstagramAcc(),
                user.getEmail(), user.getName(), user.getSurname(), followers, following);
    }

    public ProfileResponse updateUserByUsername(String username, ProfileUpdateRequest request) {
        User user = userService.getOneUserByUsername(username);
        Profile profile = profileRepository.findByUser(user);
        profile.setBio(request.getBio());
        profile.setPublicName(request.getPublicName());
        profile.setProfilePictureUrl(request.getProfilePictureUrl());
        profile.setSpotifyAcc(request.getSpotifyAcc());
        profile.setInstagramAcc(request.getInstagramAcc());
        profileRepository.save(profile);
        int followers = followingService.getFollowerCount(user);
        int following = followingService.getFollowingCount(user);
        return new ProfileResponse(user.getUsername(), profile.getBio(), profile.getPublicName(),
                profile.getProfilePictureUrl(), profile.getSpotifyAcc(), profile.getInstagramAcc(),
                user.getEmail(), user.getName(), user.getSurname(), followers, following);
    }

}
