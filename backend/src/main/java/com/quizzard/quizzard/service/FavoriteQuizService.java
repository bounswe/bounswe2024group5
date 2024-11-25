package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.FavoriteQuiz;
import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.FavoriteQuizRequest;
import com.quizzard.quizzard.model.response.FavoriteQuizResponse;
import com.quizzard.quizzard.repository.FavoriteQuizRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;

@Service
public class FavoriteQuizService {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private final FavoriteQuizRepository favoriteQuizRepository;

    @Autowired
    private final QuizRepository quizRepository;

    public FavoriteQuizService(FavoriteQuizRepository favoriteQuizRepository, QuizRepository quizRepository) {
        this.favoriteQuizRepository = favoriteQuizRepository;
        this.quizRepository = quizRepository;
    }


    public FavoriteQuizResponse addFavoriteQuiz(String jwtToken, FavoriteQuizRequest favoriteQuizRequest) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);

        FavoriteQuiz favoriteQuiz = favoriteQuizRepository.findByUserIdAndQuizId(user.getId(), favoriteQuizRequest.getQuizId())
                .orElse(null);
        if (favoriteQuiz != null) {
            throw new RuntimeException("You have already added this quiz to favorites.");
        }
        Quiz quiz = quizRepository.findById(favoriteQuizRequest.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + favoriteQuizRequest.getQuizId()));
        FavoriteQuiz favoriteQuiz2 = new FavoriteQuiz();
        favoriteQuiz2.setUser(user);
        favoriteQuiz2.setQuiz(quiz);
        favoriteQuiz2.setCreatedAt(new Date());
        favoriteQuizRepository.save(favoriteQuiz2);
        return new FavoriteQuizResponse(favoriteQuiz2);
    }

    public List<FavoriteQuiz> getAllFavoriteQuizzes(String jwtToken) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        return favoriteQuizRepository.findAllByUser(user);
    }

    public void deleteFavoriteQuiz(String jwtToken, Long id) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        FavoriteQuiz favoriteQuiz = favoriteQuizRepository.findByUserIdAndQuizId(user.getId(), id)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite quiz not found with id: " + id));
        if (!favoriteQuiz.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to delete this favorite quiz.");
        }
        favoriteQuizRepository.delete(favoriteQuiz);
    }

    public FavoriteQuizResponse getFavoriteQuiz(String jwtToken, Long id) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        FavoriteQuiz favoriteQuiz = favoriteQuizRepository.findByUserIdAndQuizId(user.getId(), id)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite quiz not found with id: " + id));
        if (!favoriteQuiz.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to view this quiz attempt.");
        }
        return new FavoriteQuizResponse(favoriteQuiz);
    }
}
