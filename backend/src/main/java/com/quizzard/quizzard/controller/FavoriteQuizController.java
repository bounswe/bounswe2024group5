package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.model.FavoriteQuiz;
import com.quizzard.quizzard.model.request.FavoriteQuizRequest;
import com.quizzard.quizzard.model.response.FavoriteQuizResponse;
import com.quizzard.quizzard.service.FavoriteQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/favorite-quiz")
public class FavoriteQuizController {

    @Autowired
    private final FavoriteQuizService favoriteQuizService;

    @PostMapping
    public ResponseEntity<FavoriteQuizResponse> addFavoriteQuiz(@RequestHeader("Authorization") String jwtToken,
                                                        @RequestBody FavoriteQuizRequest favoriteQuizRequest) {

        FavoriteQuizResponse favoriteQuiz = favoriteQuizService.addFavoriteQuiz(jwtToken, favoriteQuizRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(favoriteQuiz.getId())
                .toUri();
        return ResponseEntity.created(location).body(favoriteQuiz);
    }

    @GetMapping
    public ResponseEntity<?> getAllFavoriteQuizzes(@RequestHeader("Authorization") String jwtToken) {
        return ResponseEntity.ok(favoriteQuizService.getAllFavoriteQuizzes(jwtToken));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFavoriteQuiz(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        favoriteQuizService.deleteFavoriteQuiz(jwtToken, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFavoriteQuiz(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        return ResponseEntity.ok(favoriteQuizService.getFavoriteQuiz(jwtToken, id));
    }

    public FavoriteQuizController(FavoriteQuizService favoriteQuizService) {
        this.favoriteQuizService = favoriteQuizService;
    }
}
