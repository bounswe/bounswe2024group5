package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.request.QuizAttemptRequest;
import com.quizzard.quizzard.model.response.QuizAttemptResponse;
import com.quizzard.quizzard.service.QuizAttemptService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/quiz-attempts")
public class QuizAttemptController {

    @Autowired
    private QuizAttemptService quizAttemptService;

    // it might return existing quiz attempt if there is an incomplete one
    @PostMapping
    public ResponseEntity<QuizAttemptResponse> addQuizAttempt(@RequestHeader("Authorization") String jwtToken,
                                                              @Valid @RequestBody QuizAttemptRequest quizAttemptRequest) {
        QuizAttemptResponse createdAttempt = quizAttemptService.addQuizAttempt(jwtToken, quizAttemptRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdAttempt.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdAttempt);
    }

    @GetMapping
    public ResponseEntity<?> getAllQuizAttempts(@RequestHeader("Authorization") String jwtToken,
                                                @RequestParam(required = false) Optional<Boolean> isCompleted,
                                                @RequestParam(required = false) Optional<Long> quizId) {
        return ResponseEntity.ok(quizAttemptService.getAllQuizAttempts(jwtToken, isCompleted, quizId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuizAttempt(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        return ResponseEntity.ok(quizAttemptService.getQuizAttemptWithId(jwtToken, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuizAttempt(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id) {
        quizAttemptService.deleteQuizAttempt(jwtToken, id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuizAttempt(@RequestHeader("Authorization") String jwtToken, @PathVariable Long id,
                                               @RequestBody Map<String, Object> quizAttemptUpdateRequest) {
        return ResponseEntity.ok(quizAttemptService.updateQuizAttempt(jwtToken, id, quizAttemptUpdateRequest));
    }


}
