package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<PostResponse> getFeed(Pageable pageable) {
        return feedService.getFeed(pageable);
    }

}
