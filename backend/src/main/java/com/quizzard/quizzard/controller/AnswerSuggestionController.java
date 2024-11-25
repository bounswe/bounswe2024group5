package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.response.AnswerSuggestionResponse;
import com.quizzard.quizzard.service.AnswerSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/answer-suggestion")
public class AnswerSuggestionController {

    @Autowired
    private AnswerSuggestionService answerSuggestionService;

    @GetMapping
    public ResponseEntity<AnswerSuggestionResponse> getAnswerSuggestion(@RequestParam String word,
                                                                        @RequestParam String questionType) {
        return ResponseEntity.ok(answerSuggestionService.getAnswerSuggestion(word, questionType));
    }

}
