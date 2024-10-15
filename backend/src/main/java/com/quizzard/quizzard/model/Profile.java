package com.quizzard.quizzard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "profiles")
@Getter
@Setter
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", referencedColumnName = "username", nullable = false)
    private User user;

    @Getter
    @Column(name = "bio")
    private String bio;

    @Column(name = "public_name")
    private String publicName;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(name = "spotify_acc")
    private String spotifyAcc;

    @Column(name = "instagram_acc")
    private String instagramAcc;

    @Column(name = "is_Private")
    private boolean isPrivate;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Profile() {
        // Default constructor required for JPA
    }

    public Profile(User user, String bio, String publicName, String profilePictureUrl, String spotifyAcc, String instagramAcc) {
        this.user = user;
        this.bio = bio;
        this.publicName = publicName;
        this.profilePictureUrl = profilePictureUrl;
        this.spotifyAcc = spotifyAcc;
        this.instagramAcc = instagramAcc;
        this.isPrivate = false;
        this.createdAt = new Date();
    }

    public Profile(User user){
        this.user = user;
        this.publicName = user.getUsername();
        this.isPrivate = false;
        this.createdAt = new Date();
    }

    public boolean isPrivate() {
        return isPrivate;
    }





}
