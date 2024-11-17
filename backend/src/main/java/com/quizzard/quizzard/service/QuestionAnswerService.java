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
import java.util.stream.Collectors;

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
        List<QuestionAnswer> questionAnswers;
        // Step 3: Handle different filtering scenarios
        if (quizAttemptId.isEmpty() && questionId.isEmpty()) {
            // No filters: Fetch all question answers for the user's quiz attempts
            questionAnswers = questionAnswerRepository.findAllByUserId(user.getId());
        } else if (quizAttemptId.isPresent() && questionId.isEmpty()) {
            // Filter by quiz attempt ID
            questionAnswers = questionAnswerRepository.findAllByQuizAttemptIdAndUserId(quizAttemptId.get(), user.getId());
        } else if (questionId.isPresent() && quizAttemptId.isEmpty()) {
            // Filter by question ID
            questionAnswers = questionAnswerRepository.findAllByQuestionIdAndUserId(questionId.get(), user.getId());
        } else {
            // Filter by both quiz attempt ID and question ID
            questionAnswers = questionAnswerRepository.findAllByQuizAttemptIdAndQuestionIdAndUserId(
                    quizAttemptId.get(), questionId.get(), user.getId());
        }

        // Step 4: Convert the result to a list of QuestionAnswerResponse objects
        return questionAnswers.stream().map(QuestionAnswerResponse::new).collect(Collectors.toList());
    }

    public QuestionAnswerResponse getQuestionAnswer(String jwtToken, Long id) {
        User user = getUserFromJwtToken(jwtToken);
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question answer not found with id: " + id));
        if (!questionAnswer.getQuizAttempt().getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to view this question answer.");
        }
        return new QuestionAnswerResponse(questionAnswer);
    }

    public void deleteQuestionAnswer(String jwtToken, Long id) {
        User user = getUserFromJwtToken(jwtToken);
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question answer not found with id: " + id));
        if (!questionAnswer.getQuizAttempt().getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to delete this question answer.");
        }
        questionAnswerRepository.delete(questionAnswer);
    }

    public QuestionAnswerResponse updateQuestionAnswer(String jwtToken, Long id, QuestionAnswerRequest questionAnswerRequest) {
        User user = getUserFromJwtToken(jwtToken);
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question answer not found with id: " + id));
        if (!questionAnswer.getQuizAttempt().getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to update this question answer.");
        }
        if(questionAnswer.getQuizAttempt().getIsCompleted())
            throw new RuntimeException("Quiz attempt is already completed");
        if(questionAnswerRepository.existsByQuizAttemptIdAndQuestionId(questionAnswer.getQuizAttempt().getId(), questionAnswerRequest.getQuestionId())){
            // maybe update the answer instead of throwing an exception
            throw new RuntimeException("Question already answered");
        }
        Question question = questionRepository.findById(questionAnswerRequest.getQuestionId()).orElse(null);
        if(!questionRepository.existsByIdAndQuizId(questionAnswerRequest.getQuestionId(), questionAnswer.getQuizAttempt().getQuiz().getId()))
            throw new RuntimeException("Question not found in the quiz");
        if(!questionAnswerRequest.getAnswer().equals(question.getCorrectAnswer()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer1()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer2()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer3()))  {   // answer not from the options
            throw new RuntimeException("Invalid answer");
        }
        questionAnswer.setQuestion(question);
        questionAnswer.setAnswer(questionAnswerRequest.getAnswer());
        questionAnswer.setIsCorrect(questionAnswerRequest.getAnswer().equals(question.getCorrectAnswer()));
        questionAnswerRepository.save(questionAnswer);
        return new QuestionAnswerResponse(questionAnswer);
    }
}
