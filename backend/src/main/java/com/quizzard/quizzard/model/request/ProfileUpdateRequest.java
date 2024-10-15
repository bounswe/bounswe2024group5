package com.quizzard.quizzard.model.request;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String bio;
    private String publicName;
    private String profilePictureUrl;
    private String spotifyAcc;
    private String instagramAcc;
}
