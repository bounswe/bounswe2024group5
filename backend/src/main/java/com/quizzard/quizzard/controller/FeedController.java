package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.service.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    public FeedController() {

    }

    @GetMapping()
    public List<PostResponse> getFeed(@RequestParam(required = true) int page, @RequestParam(required = true) int limit) {
        return feedService.getFeed(page, limit);
    }

}
