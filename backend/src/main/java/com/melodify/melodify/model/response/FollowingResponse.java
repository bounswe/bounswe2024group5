package com.melodify.melodify.model.response;

import java.util.Date;

public class FollowingResponse {

    private Integer id;
    private String followerUsername;
    private String followingUsername;
    private Date follewedAt;

    public FollowingResponse(Integer id, String followerUsername, String followingUsername, Date follewedAt) {
        this.id = id;
        this.followerUsername = followerUsername;
        this.followingUsername = followingUsername;
        this.follewedAt = follewedAt;
    }

    public Integer getId() {
        return id;
    }

    public String getFollowerUsername() {
        return followerUsername;
    }

    public String getFollowingUsername() {
        return followingUsername;
    }
    public Date getFollewedAt() {
        return follewedAt;
    }
}
