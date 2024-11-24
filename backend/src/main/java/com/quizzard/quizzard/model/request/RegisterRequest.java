package com.quizzard.quizzard.model.request;

import lombok.Getter;

@Getter
public class RegisterRequest {

    private String username;
    private String password;
    private String email;
    private String name;
    private String englishProficiency;

    public RegisterRequest(String username, String password, String email, String name, String englishProficiency) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.englishProficiency = englishProficiency;
    }

}
