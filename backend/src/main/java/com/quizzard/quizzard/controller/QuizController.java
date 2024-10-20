package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.CreateQuizRequest;
import com.quizzard.quizzard.model.request.SolveQuizRequest;
import com.quizzard.quizzard.model.response.SolveQuizResponse;
import com.quizzard.quizzard.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Tüm quizleri listeleme
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    // ID'ye göre quiz getirme
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Optional<Quiz> quizOptional = quizService.getQuizById(id);
        return quizOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Yeni quiz oluşturma
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody CreateQuizRequest quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
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

    @PostMapping("/{id}/solve")
    public ResponseEntity<SolveQuizResponse> solveQuiz(
            @PathVariable Long id,
            @RequestBody SolveQuizRequest solveQuizRequest,
            @AuthenticationPrincipal User user) {
        SolveQuizResponse response = quizService.solveQuiz(id, solveQuizRequest, user.getId());
        return ResponseEntity.ok(response);
    }


}
