package com.melodify.melodify.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "followings")
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "follower", referencedColumnName = "username", nullable = false)
    private User follower;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "followed", referencedColumnName = "username", nullable = false)
    private User followed;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date followedAt;

    public Following() {
        // Default constructor required for JPA
    }

    public Following(User follower, User followed) {
        this.follower = follower;
        this.followed = followed;
        this.followedAt = new Date();
    }


    public Integer getId() {
        return id;
    }

    public User getFollower() {
        return follower;
    }

    public User getFollowed() {
        return followed;
    }

    public Date getFollowedAt() {
        return followedAt;
    }

    public void setFollowedAt(Date followedAt) {
        this.followedAt = followedAt;
    }



}
