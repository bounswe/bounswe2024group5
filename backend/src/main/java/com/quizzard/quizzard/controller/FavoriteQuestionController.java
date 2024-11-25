package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.model.request.FavoriteQuestionRequest;
import com.quizzard.quizzard.model.response.FavoriteQuestionResponse;
import com.quizzard.quizzard.service.FavoriteQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/favorite-question")
public class FavoriteQuestionController {
    @Autowired
    private final FavoriteQuestionService favoriteQuestionService;


    public FavoriteQuestionController(FavoriteQuestionService favoriteQuestionService) {
        this.favoriteQuestionService = favoriteQuestionService;
    }


    @PostMapping
    public ResponseEntity<FavoriteQuestionResponse> addFavoriteQuestion(@RequestHeader("Authorization") String jwtToken,
                                                                        @RequestBody FavoriteQuestionRequest favoriteQuestionRequest) {

        FavoriteQuestionResponse favoriteQuestion = favoriteQuestionService.addFavoriteQuestion(jwtToken, favoriteQuestionRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(favoriteQuestion.getId())
                .toUri();
        return ResponseEntity.created(location).body(favoriteQuestion);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFavoriteQuestion(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        return ResponseEntity.ok(favoriteQuestionService.getFavoriteQuestion(jwtToken, id));
    }

    @GetMapping
    public ResponseEntity<?> getAllFavoriteQuestions(@RequestHeader("Authorization") String jwtToken) {
        return ResponseEntity.ok(favoriteQuestionService.getAllFavoriteQuestions(jwtToken));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFavoriteQuestion(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        favoriteQuestionService.deleteFavoriteQuestion(jwtToken, id);
        return ResponseEntity.noContent().build();
    }

}
