package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.*;
import com.quizzard.quizzard.model.request.QuestionAnswerRequest;
import com.quizzard.quizzard.model.response.QuestionAnswerResponse;
import com.quizzard.quizzard.repository.QuestionAnswerRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.repository.QuizAttemptRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionAnswerService {

    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAttemptService quizAttemptService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;


    private User getUserFromJwtToken(String jwtToken) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        return userService.getOneUserByUsername(solverUsername);
    }

    public QuestionAnswerResponse createQuestionAnswer(String jwtToken, QuestionAnswerRequest questionAnswerRequest) {
        User user = getUserFromJwtToken(jwtToken);
        QuizAttempt quizAttempt = quizAttemptRepository.findById(questionAnswerRequest.getQuizAttemptId()).orElse(null);
        if(quizAttempt == null)
            throw new RuntimeException("Quiz attempt not found");
        if(quizAttempt.getUser().getId() != user.getId())
            throw new RuntimeException("User does not own the quiz attempt");
        Quiz quiz = quizAttempt.getQuiz();
        Question question = questionRepository.findById(questionAnswerRequest.getQuestionId()).orElse(null);
        if(!questionRepository.existsByIdAndQuizId(questionAnswerRequest.getQuestionId(), quiz.getId()))
            throw new RuntimeException("Question not found in the quiz");
        if(quizAttempt.getIsCompleted())
            throw new RuntimeException("Quiz attempt is already completed");
        if(questionAnswerRepository.existsByQuizAttemptIdAndQuestionId(quizAttempt.getId(), questionAnswerRequest.getQuestionId())){
            // maybe update the answer instead of throwing an exception
            throw new RuntimeException("Question already answered");
        }
        if(!questionAnswerRequest.getAnswer().equals(question.getCorrectAnswer()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer1()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer2()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer3()))  {   // answer not from the options
            throw new RuntimeException("Invalid answer");
        }
        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuizAttempt(quizAttempt);
        questionAnswer.setQuestion(questionRepository.findById(questionAnswerRequest.getQuestionId()).get());
        questionAnswer.setAnswer(questionAnswerRequest.getAnswer());
        questionAnswer.setIsCorrect(questionAnswerRequest.getAnswer().equals(question.getCorrectAnswer()));
        questionAnswerRepository.save(questionAnswer);
        return new QuestionAnswerResponse(questionAnswer);
    }

    public List<QuestionAnswerResponse> getAllQuestionAnswers(String jwtToken, Optional<Long> quizAttemptId, Optional<Long> questionId) {
        User user = getUserFromJwtToken(jwtToken);

    }

    public QuestionAnswerResponse getQuestionAnswer(String jwtToken, Long id) {

    }

    public void deleteQuestionAnswer(String jwtToken, Long id) {

    }

    public QuestionAnswerResponse updateQuestionAnswer(String jwtToken, Long id, QuestionAnswerRequest questionAnswerRequest) {
    }
}
