package com.melodify.melodify.model;

public class RegisterResponse {
    private String userID;
    private String token;

    public RegisterResponse(String userID, String token) {
        this.userID = userID;
        this.token = token;
    }

    public String getUserID() {
        return userID;
    }

    public String getToken() {
        return token;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setToken(String token) {
        this.token = token;
    }
}