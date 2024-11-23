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

    public ProfileResponse(User user){
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.name = user.getName();
        this.profilePicture = user.getProfilePicture();
        this.score = user.getPoints();
        this.noCreatedQuizzes = user.getCreatedQuizzes();
        if (score < 400)
            englishProficiency = "A1";
        else if(score < 1000)
            englishProficiency = "A2";
        else if(score < 1800)
            englishProficiency = "B1";
        else if(score < 2600)
            englishProficiency = "B2";
        else if(score < 3300)
            englishProficiency = "C1";
        else
            englishProficiency = "C2";
    }

}
