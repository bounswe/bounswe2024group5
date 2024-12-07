package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.QuestionAnswer;
import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.QuizAttempt;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.QuizAttemptRequest;
import com.quizzard.quizzard.model.response.QuizAttemptResponse;
import com.quizzard.quizzard.repository.QuestionAnswerRepository;
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
    private QuestionAnswerRepository questionAnswerRepository;

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
        Quiz quiz = quizRepository.findById(quizAttemptRequest.getQuizId()).orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizAttemptRequest.getQuizId()));
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
        else if (!isCompleted.isEmpty() && quizId.isEmpty())
            quizAttempts = quizAttemptRepository.findAllByUserIdAndIsCompleted(user.getId(), isCompleted.get());
        else if (isCompleted.isEmpty() && !quizId.isEmpty())
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
        else {
            boolean isGraded = false;
            if (quizAttempt.getIsCompleted())
                throw new RuntimeException("Quiz attempt is already completed.");
            else if ((boolean) quizAttemptUpdateRequest.get("completed")) {
                if(isUserAbleToGainScore(user, quizAttempt.getQuiz())){
                    quizAttempt.setScore(calculateQuizScore(user, id));
                    isGraded = true;
                } else {
                    quizAttempt.setScore(0);
                }
                quizAttempt.setCompletedAt(new Date());
                quizAttempt.setIsCompleted(true);
                quizAttemptRepository.save(quizAttempt);
            } else {
                quizAttempt.setIsCompleted(false);
                quizAttemptRepository.save(quizAttempt);
            }
            return new QuizAttemptResponse(quizAttempt, isGraded);
        }
    }

    private boolean isUserAbleToGainScore(User user, Quiz quiz) {
        if(quizAttemptRepository.existsByUserIdAndQuizIdAndIsCompleted(user.getId(), quiz.getId(), true))
            return false;
        if(quiz.getAuthor().equals(user))
            return false;
        return true;
    }

    public int calculateQuizScore(User user, Long quizAttemptId) {
        QuizAttempt quizAttempt = quizAttemptRepository.findById(quizAttemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found with id: " + quizAttemptId));

        List<QuestionAnswer> questionAnswers = questionAnswerRepository.findAllByQuizAttemptId(quizAttemptId);

        Long quizId = quizAttempt.getQuiz().getId();
        if(quizAttemptRepository.existsByUserIdAndQuizIdAndIsCompleted(user.getId(), quizId, true)){
            // already has completed quiz attempt so get zero
            return 0;
        }

        if(quizAttempt.getQuiz().getAuthor().equals(user)){
            // author of the quiz cannot get points from their own quiz
            return 0;
        }

        int totalScoreOfQuiz = 0;

        int userScore = user.getPoints();

        double penaltyMultiplier = 0.85;
        double bonusMultiplier = 1.02;

        for (QuestionAnswer questionAnswer : questionAnswers) {
            double wordScore = questionAnswer.getQuestion().getDifficulty();
            double scoreDifference = wordScore - userScore;
            double absDifference = Math.abs(scoreDifference);

            int steps = (int) Math.floor(absDifference / 100.0);

            double multiplier;
            if (scoreDifference < 0) { // If user's level is higher than the word's level
                if (questionAnswer.getIsCorrect()) {
                    multiplier = Math.pow(penaltyMultiplier, steps); // Decrease in score
                } else {
                    multiplier = Math.pow(bonusMultiplier, steps); // Punishment for wrong answer
                }
            } else { // If user's level is lower than the word's level
                if (questionAnswer.getIsCorrect()) {
                    multiplier = Math.pow(bonusMultiplier, steps); // Bonus
                } else {
                    multiplier = Math.pow(penaltyMultiplier, steps); // Lower decrease for wrong answer
                }
            }
            if (questionAnswer.getIsCorrect()) {
                totalScoreOfQuiz += (int) ((wordScore * multiplier) / 1000);
            } else {
                totalScoreOfQuiz -= (int) ((wordScore * multiplier) / 1000);
            }


        }

        int finalScore = userScore + totalScoreOfQuiz;
        if (finalScore < 0) {
            finalScore = 0;
        } // here should be updated if score range changes
        else if (finalScore > 4000) {
            finalScore = 4000;
        }
        userService.updateUserPoint(user, finalScore);

        return totalScoreOfQuiz;
    }


}
