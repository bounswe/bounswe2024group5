package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.CreateQuizRequest;
import com.quizzard.quizzard.model.request.SolveQuizRequest;
import com.quizzard.quizzard.model.request.UpdateQuizRequest;
import com.quizzard.quizzard.model.response.QuizResponse;
import com.quizzard.quizzard.model.response.SolveQuizResponse;
import com.quizzard.quizzard.service.QuizService;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public Map<String, Object> getAllQuizzes(@RequestParam Optional<String> username,
                                             @RequestParam Optional<Integer> minDifficulty,
                                             @RequestParam Optional<Integer> maxDifficulty) {
        return Map.of("quizzes", quizService.getAllQuizzes(username, minDifficulty, maxDifficulty));
    }

    // ID'ye göre quiz getirme
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getQuizById(@PathVariable Long id) {
        QuizResponse quiz = quizService.getQuizById(id);
        if (quiz != null) {
            return ResponseEntity.ok(Map.of("quiz", quiz));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<QuizResponse> createQuiz(@RequestHeader("Authorization") String jwt, @RequestBody CreateQuizRequest quizRequest) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        QuizResponse createdQuiz = quizService.createQuiz(authorUsername, quizRequest);
        return ResponseEntity.ok(createdQuiz);
    }


    @PutMapping("/{id}")
    public ResponseEntity<QuizResponse> updateQuiz(@RequestHeader("Authorization") String jwt, @PathVariable Long id,
                                           @RequestBody UpdateQuizRequest request) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        QuizResponse updatedQuiz = quizService.updateQuiz(username, id, request);
        return ResponseEntity.ok(updatedQuiz);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@RequestHeader("Authorization") String jwt, @PathVariable Long id) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        quizService.deleteQuiz(authorUsername, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/recommended")
    public ResponseEntity<List<QuizResponse>> getRecommendedQuizzes(@RequestHeader("Authorization") String jwt, @PathVariable Long id) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        List<QuizResponse> recommendedQuizzes = quizService.getRecommendedQuizzes(username, id);
        return ResponseEntity.ok(recommendedQuizzes);
    }

}
