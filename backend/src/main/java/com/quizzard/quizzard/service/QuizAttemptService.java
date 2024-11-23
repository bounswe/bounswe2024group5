package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.QuizAttempt;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.QuizAttemptRequest;
import com.quizzard.quizzard.model.response.QuizAttemptResponse;
import com.quizzard.quizzard.repository.QuizAttemptRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuizAttemptService {

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    private List<QuizAttemptResponse> toResponse(List<QuizAttempt> quizAttempts) {
        return quizAttempts.stream().map(QuizAttemptResponse::new).toList();
    }

    public QuizAttemptResponse addQuizAttempt(String jwtToken, QuizAttemptRequest quizAttemptRequest) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        Quiz quiz = quizRepository.findById(quizAttemptRequest.getQuizId()).orElse(null);
        if (quizAttemptRepository.existsByUserIdAndQuizIdAndIsCompleted(user.getId(), quiz.getId(), false)) {
            // already has incomplete quiz attempt
            // return the existing quiz attempt instead of creating a new one
            return new QuizAttemptResponse(quizAttemptRepository.findAllByUserIdAndQuizIdAndIsCompleted(user.getId(), quiz.getId(), false).get(0));
        }
        QuizAttempt quizAttempt = new QuizAttempt(user, quiz, false);
        quizAttemptRepository.save(quizAttempt);
        return new QuizAttemptResponse(quizAttempt);
    }

    public List<QuizAttemptResponse> getAllQuizAttempts(String jwtToken, Optional<Boolean> isCompleted, Optional<Long> quizId) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        List<QuizAttempt> quizAttempts;
        if (isCompleted.isEmpty() && quizId.isEmpty())
            quizAttempts = quizAttemptRepository.findAllByUserId(user.getId());
        else if(!isCompleted.isEmpty() && quizId.isEmpty())
            quizAttempts = quizAttemptRepository.findAllByUserIdAndIsCompleted(user.getId(), isCompleted.get());
        else if(isCompleted.isEmpty() && !quizId.isEmpty())
            quizAttempts = quizAttemptRepository.findAllByUserIdAndQuizId(user.getId(), quizId.get());
        else
            quizAttempts = quizAttemptRepository.findAllByUserIdAndQuizIdAndIsCompleted(user.getId(), quizId.get(), isCompleted.get());
        return toResponse(quizAttempts);
    }

    public QuizAttemptResponse getQuizAttemptWithId(String jwtToken, Long id) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        QuizAttempt quizAttempt = quizAttemptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found with id: " + id));
        if (!quizAttempt.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to view this quiz attempt.");
        }
        return new QuizAttemptResponse(quizAttempt);
    }


    public QuizAttemptResponse deleteQuizAttempt(String jwtToken, Long id) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        QuizAttempt quizAttempt = quizAttemptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found with id: " + id));
        if (!quizAttempt.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to delete this quiz attempt.");
        }
        quizAttemptRepository.delete(quizAttempt);
        return new QuizAttemptResponse(quizAttempt);
    }

    public QuizAttemptResponse updateQuizAttempt(String jwtToken, Long id, Map<String, Object> quizAttemptUpdateRequest) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(solverUsername);
        QuizAttempt quizAttempt = quizAttemptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found with id: " + id));
        if (!quizAttempt.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to update this quiz attempt.");
        }
        if (quizAttemptUpdateRequest.get("completed") == null)
            throw new RuntimeException("completed field is required.");
        else{
            if (quizAttempt.getIsCompleted())
                throw new RuntimeException("Quiz attempt is already completed.");
            else if ((boolean) quizAttemptUpdateRequest.get("completed")){
                //quizAttempt.setScore(quizAttempt.getQuiz().getQuestions().size());
                quizAttempt.setCompletedAt(new Date());
                quizAttempt.setIsCompleted(true);
                quizAttemptRepository.save(quizAttempt);
            }
            else {
                quizAttempt.setIsCompleted(false);
                quizAttemptRepository.save(quizAttempt);
            }
            return new QuizAttemptResponse(quizAttempt);
        }
    }

}
