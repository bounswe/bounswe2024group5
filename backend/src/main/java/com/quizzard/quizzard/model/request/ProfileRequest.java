package com.quizzard.quizzard.model.request;

import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Getter;

@Data
public class ProfileRequest {
    private String name;
    @Email
    private String email;
    private String profilePicture;
}
