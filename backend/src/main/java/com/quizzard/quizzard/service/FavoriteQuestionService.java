package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.FavoriteQuestion;
import com.quizzard.quizzard.model.FavoriteQuiz;
import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.FavoriteQuestionRequest;
import com.quizzard.quizzard.model.response.FavoriteQuestionResponse;
import com.quizzard.quizzard.model.response.FavoriteQuizResponse;
import com.quizzard.quizzard.repository.FavoriteQuestionRepository;
import com.quizzard.quizzard.repository.FavoriteQuizRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FavoriteQuestionService {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private final FavoriteQuestionRepository favoriteQuestionRepository;

    @Autowired
    private final QuestionRepository questionRepository;

    public FavoriteQuestionService(FavoriteQuestionRepository favoriteQuestionRepository, QuestionRepository questionRepository) {
        this.favoriteQuestionRepository = favoriteQuestionRepository;
        this.questionRepository = questionRepository;
    }

    private FavoriteQuestionResponse mapToFavoriteQuestionResponse(FavoriteQuestion favoriteQuestion) {
        return new FavoriteQuestionResponse(favoriteQuestion);
    }

    public FavoriteQuestionResponse addFavoriteQuestion(String jwtToken, FavoriteQuestionRequest favoriteQuestionRequest) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);

        FavoriteQuestion favoriteQuestion = favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), favoriteQuestionRequest.getQuestionId())
                .orElse(null);

        if (favoriteQuestion != null) {
            throw new RuntimeException("You have already added this question to favorites.");
        }

        Question question = questionRepository.findById(favoriteQuestionRequest.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + favoriteQuestionRequest.getQuestionId()));

        FavoriteQuestion favoriteQuestion2 = new FavoriteQuestion();

        favoriteQuestion2.setUser(user);
        favoriteQuestion2.setQuestion(question);
        favoriteQuestion2.setCreatedAt(new Date());
        favoriteQuestionRepository.save(favoriteQuestion2);
        return new FavoriteQuestionResponse(favoriteQuestion2);
    }


    public List<FavoriteQuestionResponse> getAllFavoriteQuestions(String jwtToken) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        List<FavoriteQuestion> favoriteQuestions = favoriteQuestionRepository.findAllByUser(user);
        return favoriteQuestions.stream().map(this::mapToFavoriteQuestionResponse).toList();
    }

    public void deleteFavoriteQuestion(String jwtToken, Long id) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        FavoriteQuestion favoriteQuestion = favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), id)
                .orElseThrow(() -> new RuntimeException("Favorite question not found with id: " + id));
        if (!favoriteQuestion.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to delete this favorite question.");
        }
        favoriteQuestionRepository.delete(favoriteQuestion);
    }

    public FavoriteQuestionResponse getFavoriteQuestion(String jwtToken, Long id) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        FavoriteQuestion favoriteQuestion = favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), id)
                .orElseThrow(() -> new RuntimeException("Favorite question not found with id: " + id));
        if (!favoriteQuestion.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to view this favorite question.");
        }
        return new FavoriteQuestionResponse(favoriteQuestion);
    }



}
