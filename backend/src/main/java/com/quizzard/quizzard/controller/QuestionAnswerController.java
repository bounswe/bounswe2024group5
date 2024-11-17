package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.QuestionAnswer;
import com.quizzard.quizzard.model.request.QuestionAnswerRequest;
import com.quizzard.quizzard.model.request.QuizAttemptRequest;
import com.quizzard.quizzard.model.response.QuestionAnswerResponse;
import com.quizzard.quizzard.service.QuestionAnswerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/question-answers")
public class QuestionAnswerController {

    @Autowired
    private QuestionAnswerService questionAnswerService;

    @PostMapping
    public ResponseEntity<?> createQuestionAnswer(@RequestHeader("Authorization") String jwtToken,
                                                  @Valid @RequestBody QuestionAnswerRequest questionAnswerRequest) {
        QuestionAnswerResponse questionAnswerResponse = questionAnswerService.createQuestionAnswer(jwtToken, questionAnswerRequest);
        return ResponseEntity.ok(questionAnswerResponse);
    }

    @GetMapping
    public ResponseEntity<?> getAllQuestionAnswers(@RequestHeader("Authorization") String jwtToken,
                                                  @RequestParam(required = false) Optional<Long> quizAttemptId,
                                                  @RequestParam(required = false) Optional<Long> questionId) {
        return ResponseEntity.ok(questionAnswerService.getAllQuestionAnswers(jwtToken, quizAttemptId, questionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionAnswer(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        return ResponseEntity.ok(questionAnswerService.getQuestionAnswer(jwtToken, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestionAnswer(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        questionAnswerService.deleteQuestionAnswer(jwtToken, id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestionAnswer(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id,
                                                  @RequestBody QuestionAnswerRequest questionAnswerRequest) {
        return ResponseEntity.ok(questionAnswerService.updateQuestionAnswer(jwtToken, id, questionAnswerRequest));
    }

}
