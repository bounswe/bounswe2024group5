package com.melodify.melodify.model.request;

public class FollowingRequest {
    private Integer id;
    private String followerUsername;
    private String followingUsername;

    public FollowingRequest(Integer id, String followerUsername, String followingUsername) {
        this.id = id;
        this.followerUsername = followerUsername;
        this.followingUsername = followingUsername;
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
}
