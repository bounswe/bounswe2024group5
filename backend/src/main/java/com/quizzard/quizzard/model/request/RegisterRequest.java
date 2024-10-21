package com.quizzard.quizzard.model.request;


public class RegisterRequest {

    private String username;
    private String password;
    private String email;
    private String name;
    private int english_proficiency;

    public RegisterRequest(String username, String password, String email, String name, int english_proficiency) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.english_proficiency = english_proficiency;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public int getEnglish_proficiency() {
        return english_proficiency;
    }
}
