package com.quizzard.quizzard.controller;

import com.google.rpc.context.AttributeContext.Response;
import com.quizzard.quizzard.service.AnswerSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class AnswerSuggestionController {

    @Autowired
    private AnswerSuggestionService answerSuggestionService;

    @GetMapping("/get-correct-answers")
    public ResponseEntity<List<String>> getCorrectAnswers(@RequestParam String word,
                                                                        @RequestParam String questionType) {
        return ResponseEntity.ok(answerSuggestionService.getCorrectAnswers(word, questionType));
    }

    @GetMapping("/get-wrong-answers")
    public ResponseEntity<List<String>> getWrongAnswers(@RequestParam String word, @RequestParam String correctAnswer,
                                                  @RequestParam String questionType) {
        return ResponseEntity.ok(answerSuggestionService.getWrongAnswers(word, correctAnswer, questionType));
    }
    

}
