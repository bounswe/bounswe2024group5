package com.melodify.melodify.model.response;

import lombok.Data;

@Data
public class ProfileResponse {
    private String username;
    private String bio;
    private String publicName;
    private String profilePictureUrl;
    private String spotifyAcc;
    private String instagramAcc;
    private String email;
    private String name;
    private String surname;
    private int followers;
    private int following;

    public ProfileResponse(String username, String bio, String publicName, String profilePictureUrl, String spotifyAcc, String instagramAcc, String email, String name, String surname) {
        this.username = username;
        this.bio = bio;
        this.publicName = publicName;
        this.profilePictureUrl = profilePictureUrl;
        this.spotifyAcc = spotifyAcc;
        this.instagramAcc = instagramAcc;
        this.email = email;
        this.name = name;
        this.surname = surname;
    }

    public ProfileResponse(String username, String bio, String publicName, String profilePictureUrl, String spotifyAcc, String instagramAcc, String email, String name, String surname, int followers, int following) {
        this.username = username;
        this.bio = bio;
        this.publicName = publicName;
        this.profilePictureUrl = profilePictureUrl;
        this.spotifyAcc = spotifyAcc;
        this.instagramAcc = instagramAcc;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.followers = followers;
        this.following = following;
    }

}
