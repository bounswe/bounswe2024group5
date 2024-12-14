package com.quizzard.quizzard.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizzard.quizzard.model.response.LeaderboardResponse;
import com.quizzard.quizzard.service.LeaderboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;
    
    @GetMapping()
    public ResponseEntity<LeaderboardResponse> getLeaderboards() {
        return ResponseEntity.ok(leaderboardService.getLeaderboards());
    }
    
}
