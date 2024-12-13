package com.quizzard.quizzard.model.response;

import com.quizzard.quizzard.model.User;
import lombok.Data;

@Data
public class ProfileResponse {

    private String username;
    private String email;
    private String name;
    private String profilePicture;
    private float score;
    private String englishProficiency;
    private int noCreatedQuizzes;
    private Long noFollowers;
    private Long noFollowing;

    public ProfileResponse(){

    }

    public ProfileResponse profileResponseByUser(User user){
        ProfileResponse profileResponse = new ProfileResponse();
        profileResponse.setUsername(user.getUsername());
        profileResponse.setEmail(user.getEmail());
        profileResponse.setName(user.getName());
        profileResponse.setProfilePicture(user.getProfilePicture());
        profileResponse.setScore(user.getPoints());
        profileResponse.setNoCreatedQuizzes(user.getCreatedQuizzes());
        if (profileResponse.getScore() < 500)
            profileResponse.setEnglishProficiency("A1");
        else if(profileResponse.getScore() < 1000)
            profileResponse.setEnglishProficiency("A2");
        else if(profileResponse.getScore() < 1500)
            profileResponse.setEnglishProficiency("B1");
        else if(profileResponse.getScore() < 2000)
            profileResponse.setEnglishProficiency("B2");
        else if(profileResponse.getScore() < 2500)
            profileResponse.setEnglishProficiency("C1");
        else
            profileResponse.setEnglishProficiency("C2");
        return profileResponse;
    }

    public ProfileResponse profileResponseByUserAndNoFollowersAndNoFollowing(User user, Long noFollowers, Long noFollowing){
       ProfileResponse profileResponse = profileResponseByUser(user);
       profileResponse.setNoFollowers(noFollowers);
       profileResponse.setNoFollowing(noFollowing);
       return profileResponse;
    }

}
