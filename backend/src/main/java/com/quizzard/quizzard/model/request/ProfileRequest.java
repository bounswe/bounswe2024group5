package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.Email;
import lombok.Getter;

@Getter
public class ProfileRequest {
    private String name;
    @Email
    private String email;
    private String profilePicture;
}
