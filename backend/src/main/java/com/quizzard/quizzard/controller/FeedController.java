package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import com.quizzard.quizzard.service.FeedService;
import com.quizzard.quizzard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;

import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

import com.quizzard.quizzard.model.response.PostResponse;

@RestController
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<PostResponse> getFeed(@RequestHeader("Authorization") String jwtToken, Pageable pageable) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        return feedService.getFeed(username, pageable);
    }

}
