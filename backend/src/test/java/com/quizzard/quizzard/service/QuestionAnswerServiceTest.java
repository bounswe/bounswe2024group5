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
import com.quizzard.quizzard.service.QuestionAnswerService;
import com.quizzard.quizzard.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QuestionAnswerServiceTest {

    @Mock
    private QuestionAnswerRepository questionAnswerRepository;

    @Mock
    private QuizAttemptRepository quizAttemptRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    @InjectMocks
    private QuestionAnswerService questionAnswerService;

    private User testUser;
    private Quiz testQuiz;
    private QuizAttempt testQuizAttempt;
    private Question testQuestion;
    private String testJwtToken;

    @BeforeEach
    public void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");

        testQuiz = new Quiz();
        testQuiz.setId(1L);

        testQuizAttempt = new QuizAttempt();
        testQuizAttempt.setId(1L);
        testQuizAttempt.setUser(testUser);
        testQuizAttempt.setQuiz(testQuiz);
        testQuizAttempt.setIsCompleted(false);

        testQuestion = new Question();
        testQuestion.setId(1L);
        testQuestion.setCorrectAnswer("Correct");
        testQuestion.setWrongAnswer1("Wrong1");
        testQuestion.setWrongAnswer2("Wrong2");
        testQuestion.setWrongAnswer3("Wrong3");

        testJwtToken = "Bearer testToken123";
    }

    @Test
    public void testCreateQuestionAnswer_Success() {
        // Arrange
        QuestionAnswerRequest request = new QuestionAnswerRequest();
        request.setQuizAttemptId(testQuizAttempt.getId());
        request.setQuestionId(testQuestion.getId());
        request.setAnswer("Correct");

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(quizAttemptRepository.findById(testQuizAttempt.getId())).thenReturn(Optional.of(testQuizAttempt));
        when(questionRepository.findById(testQuestion.getId())).thenReturn(Optional.of(testQuestion));
        when(questionRepository.existsByIdAndQuizId(testQuestion.getId(), testQuiz.getId())).thenReturn(true);
        when(questionAnswerRepository.existsByQuizAttemptIdAndQuestionId(anyLong(), anyLong())).thenReturn(false);

        // Act
        QuestionAnswerResponse response = questionAnswerService.createQuestionAnswer(testJwtToken, request);

        // Assert
        assertNotNull(response);
        verify(questionAnswerRepository).save(any(QuestionAnswer.class));
    }

    @Test
    public void testCreateQuestionAnswer_QuizAttemptAlreadyCompleted() {
        // Arrange
        QuestionAnswerRequest request = new QuestionAnswerRequest();
        request.setQuizAttemptId(testQuizAttempt.getId());
        request.setQuestionId(testQuestion.getId());
        request.setAnswer("Correct");

        testQuizAttempt.setIsCompleted(true);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(quizAttemptRepository.findById(testQuizAttempt.getId())).thenReturn(Optional.of(testQuizAttempt));

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () ->
                questionAnswerService.createQuestionAnswer(testJwtToken, request)
        );
    }

    @Test
    public void testCreateQuestionAnswer_DuplicateAnswer() {
        // Arrange
        QuestionAnswerRequest request = new QuestionAnswerRequest();
        request.setQuizAttemptId(testQuizAttempt.getId());
        request.setQuestionId(testQuestion.getId());
        request.setAnswer("Correct");

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(quizAttemptRepository.findById(testQuizAttempt.getId())).thenReturn(Optional.of(testQuizAttempt));
        when(questionRepository.findById(testQuestion.getId())).thenReturn(Optional.of(testQuestion));
        when(questionRepository.existsByIdAndQuizId(testQuestion.getId(), testQuiz.getId())).thenReturn(true);
        when(questionAnswerRepository.existsByQuizAttemptIdAndQuestionId(anyLong(), anyLong())).thenReturn(true);

        // Act & Assert
        assertThrows(DuplicateResourceException.class, () ->
                questionAnswerService.createQuestionAnswer(testJwtToken, request)
        );
    }


    @Test
    public void testGetQuestionAnswer_AccessDenied() {
        // Arrange
        QuestionAnswer questionAnswer = new QuestionAnswer();
        User differentUser = new User();
        differentUser.setId(2L);
        QuizAttempt differentQuizAttempt = new QuizAttempt();
        differentQuizAttempt.setUser(differentUser);
        questionAnswer.setQuizAttempt(differentQuizAttempt);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(questionAnswerRepository.findById(1L)).thenReturn(Optional.of(questionAnswer));

        // Act & Assert
        assertThrows(AccessDeniedException.class, () ->
                questionAnswerService.getQuestionAnswer(testJwtToken, 1L)
        );
    }

    @Test
    public void testUpdateAnswer_Success() {
        // Arrange
        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuizAttempt(testQuizAttempt);
        questionAnswer.setQuestion(testQuestion);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(questionAnswerRepository.findById(1L)).thenReturn(Optional.of(questionAnswer));

        // Act
        QuestionAnswerResponse response = questionAnswerService.updateAnswer(testJwtToken, 1L, "Wrong1");

        // Assert
        assertNotNull(response);
        assertFalse(response.getIsCorrect());
        verify(questionAnswerRepository).save(questionAnswer);
    }

    @Test
    public void testUpdateAnswer_CompletedQuizAttempt() {
        // Arrange
        testQuizAttempt.setIsCompleted(true);
        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuizAttempt(testQuizAttempt);
        questionAnswer.setQuestion(testQuestion);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(questionAnswerRepository.findById(1L)).thenReturn(Optional.of(questionAnswer));

        // Act & Assert
        assertThrows(InvalidRequestException.class, () ->
                questionAnswerService.updateAnswer(testJwtToken, 1L, "Wrong1")
        );
    }

    @Test
    public void testDeleteQuestionAnswer_Success() {
        // Arrange
        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuizAttempt(testQuizAttempt);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn(testUser.getUsername());
        when(userService.getOneUserByUsername(testUser.getUsername())).thenReturn(testUser);
        when(questionAnswerRepository.findById(1L)).thenReturn(Optional.of(questionAnswer));

        // Act
        questionAnswerService.deleteQuestionAnswer(testJwtToken, 1L);

        // Assert
        verify(questionAnswerRepository).delete(questionAnswer);
    }
}