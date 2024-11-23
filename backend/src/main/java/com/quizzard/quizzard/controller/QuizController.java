package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.CreateQuizRequest;
import com.quizzard.quizzard.model.request.SolveQuizRequest;
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

    // Tüm quizleri listeleme
    @GetMapping
    public Map<String, Object> getAllQuizzes() {
        return Map.of("quizzes", quizService.getAllQuizzes());
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

    // Yeni quiz oluşturma
    @PostMapping
    public ResponseEntity<QuizResponse> createQuiz(@RequestHeader("Authorization") String jwt, @RequestBody CreateQuizRequest quizRequest) {
        String authorUsername = jwtUtils.getUserNameFromJwtToken(jwt.substring(7));
        QuizResponse createdQuiz = quizService.createQuiz(authorUsername, quizRequest);
        return ResponseEntity.ok(createdQuiz);
    }

    // Quiz güncelleme
    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        Quiz updatedQuiz = quizService.updateQuiz(id, quiz);
        if (updatedQuiz != null) {
            return ResponseEntity.ok(updatedQuiz);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Quiz silme
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

}
