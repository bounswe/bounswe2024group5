package com.melodify.melodify.model.response;

import lombok.Data;

@Data
public class UserResponse {
    private String username;

    public UserResponse(String username) {
        this.username = username;
    }
}
