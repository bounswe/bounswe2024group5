package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.AccessDeniedException;
import com.quizzard.quizzard.exception.DuplicateResourceException;
import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
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
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;


    private User getUserFromJwtToken(String jwtToken) {
        String solverUsername = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        return userService.getOneUserByUsername(solverUsername);
    }

    public QuestionAnswerResponse createQuestionAnswer(String jwtToken, QuestionAnswerRequest questionAnswerRequest) {
        User user = getUserFromJwtToken(jwtToken);

        // Fetch the QuizAttempt
        QuizAttempt quizAttempt = quizAttemptRepository.findById(questionAnswerRequest.getQuizAttemptId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found with id: " + questionAnswerRequest.getQuizAttemptId()));

        // Check if the QuizAttempt belongs to the user
        if (!quizAttempt.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("User does not own the quiz attempt.");
        }

        // Fetch the Quiz and Question
        Quiz quiz = quizAttempt.getQuiz();
        Question question = questionRepository.findById(questionAnswerRequest.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionAnswerRequest.getQuestionId()));

        // Verify the Question belongs to the Quiz
        if (!questionRepository.existsByIdAndQuizId(questionAnswerRequest.getQuestionId(), quiz.getId())) {
            throw new InvalidRequestException("The question does not belong to the quiz.");
        }

        // Check if the QuizAttempt is already completed
        if (quizAttempt.getIsCompleted()) {
            throw new InvalidRequestException("Quiz attempt is already completed.");
        }

        // Prevent duplicate answers for the same question
        if (questionAnswerRepository.existsByQuizAttemptIdAndQuestionId(quizAttempt.getId(), questionAnswerRequest.getQuestionId())) {
            throw new DuplicateResourceException("Question already answered in this quiz attempt.");
        }

        // Validate the provided answer
        if (!questionAnswerRequest.getAnswer().equals(question.getCorrectAnswer()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer1()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer2()) &&
                !questionAnswerRequest.getAnswer().equals(question.getWrongAnswer3())) {
            throw new InvalidRequestException("The provided answer is invalid.");
        }

        // Create the QuestionAnswer record
        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuizAttempt(quizAttempt);
        questionAnswer.setQuestion(question);
        questionAnswer.setAnswer(questionAnswerRequest.getAnswer());
        questionAnswer.setIsCorrect(questionAnswerRequest.getAnswer().equals(question.getCorrectAnswer()));

        // Save to the database
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
                .orElseThrow(() -> new ResourceNotFoundException("Question answer not found with id: " + id));
        if (!questionAnswer.getQuizAttempt().getUser().equals(user)) {
            throw new AccessDeniedException("You are not authorized to view this question answer.");
        }
        return new QuestionAnswerResponse(questionAnswer);
    }

    public void deleteQuestionAnswer(String jwtToken, Long id) {
        User user = getUserFromJwtToken(jwtToken);
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question answer not found with id: " + id));
        if (!questionAnswer.getQuizAttempt().getUser().equals(user)) {
            throw new AccessDeniedException("You are not authorized to delete this question answer.");
        }
        questionAnswerRepository.delete(questionAnswer);
    }

    public QuestionAnswerResponse updateAnswer(String jwtToken, Long questionAnswerId, String newAnswer) {
        // Step 1: Authenticate User
        User user = getUserFromJwtToken(jwtToken);

        // Step 2: Fetch the QuestionAnswer and validate existence
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(questionAnswerId)
                .orElseThrow(() -> new ResourceNotFoundException("Question answer not found with id: " + questionAnswerId));

        // Step 3: Verify ownership
        if (!questionAnswer.getQuizAttempt().getUser().equals(user)) {
            throw new AccessDeniedException("You are not authorized to update this question answer.");
        }

        // Step 4: Prevent updates to completed quiz attempts
        if (questionAnswer.getQuizAttempt().getIsCompleted()) {
            throw new InvalidRequestException("Quiz attempt is already completed; cannot update answers.");
        }

        // Step 5: Validate the new answer
        Question question = questionAnswer.getQuestion();
        if (!newAnswer.equals(question.getCorrectAnswer()) &&
                !newAnswer.equals(question.getWrongAnswer1()) &&
                !newAnswer.equals(question.getWrongAnswer2()) &&
                !newAnswer.equals(question.getWrongAnswer3())) {
            throw new InvalidRequestException("Invalid answer; must be one of the predefined options.");
        }

        // Step 6: Update the answer and correctness
        questionAnswer.setAnswer(newAnswer);
        questionAnswer.setIsCorrect(newAnswer.equals(question.getCorrectAnswer()));

        // Step 7: Save the updated QuestionAnswer
        questionAnswerRepository.save(questionAnswer);

        // Step 8: Return a structured response
        return new QuestionAnswerResponse(questionAnswer);
    }

}
