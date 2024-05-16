package com.melodify.melodify.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "followings")
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "follower", nullable = false)
    private String followerUsername;

    @Column(name = "followed", nullable = false)
    private String followingUsername;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date followedAt;

    public Following() {
        // Default constructor required for JPA
    }

    public Following(String followerUsername, String followingUsername) {
        this.followerUsername = followerUsername;
        this.followingUsername = followingUsername;
        this.followedAt = new Date();
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

    public Date getFollowedAt() {
        return followedAt;
    }

    public void setFollowedAt(Date followedAt) {
        this.followedAt = followedAt;
    }



}
