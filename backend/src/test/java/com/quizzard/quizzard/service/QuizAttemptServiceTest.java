package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.*;
import com.quizzard.quizzard.model.request.QuizAttemptRequest;
import com.quizzard.quizzard.model.response.QuizAttemptResponse;
import com.quizzard.quizzard.repository.QuestionAnswerRepository;
import com.quizzard.quizzard.repository.QuizAttemptRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class QuizAttemptServiceTest {

    @Mock
    private QuizAttemptRepository quizAttemptRepository;

    @Mock
    private QuestionAnswerRepository questionAnswerRepository;

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    @InjectMocks
    private QuizAttemptService quizAttemptService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addQuizAttempt_Success() {
        String jwtToken = "Bearer token";
        QuizAttemptRequest quizAttemptRequest = new QuizAttemptRequest();
        quizAttemptRequest.setQuizId(1L);
        User user = new User();
        user.setId(1L);
        Quiz quiz = new Quiz();
        quiz.setId(1L);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizAttemptRepository.existsByUserIdAndQuizIdAndIsCompleted(user.getId(), quiz.getId(), false)).thenReturn(false);

        QuizAttemptResponse response = quizAttemptService.addQuizAttempt(jwtToken, quizAttemptRequest);

        assertNotNull(response);
        verify(quizAttemptRepository, times(1)).save(any(QuizAttempt.class));
    }

    @Test
    void addQuizAttempt_QuizNotFound() {
        String jwtToken = "Bearer token";
        QuizAttemptRequest quizAttemptRequest = new QuizAttemptRequest();
        quizAttemptRequest.setQuizId(1L);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(new User());
        when(quizRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> quizAttemptService.addQuizAttempt(jwtToken, quizAttemptRequest));
    }

    @Test
    void addQuizAttempt_IncompleteQuizAttemptExists() {
        String jwtToken = "Bearer token";
        QuizAttemptRequest quizAttemptRequest = new QuizAttemptRequest();
        quizAttemptRequest.setQuizId(1L);
        User user = new User();
        user.setId(1L);
        Quiz quiz = new Quiz();
        quiz.setId(1L);
        QuizAttempt existingQuizAttempt = new QuizAttempt(user, quiz, false);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(quizRepository.findById(1L)).thenReturn(Optional.of(quiz));
        when(quizAttemptRepository.existsByUserIdAndQuizIdAndIsCompleted(user.getId(), quiz.getId(), false)).thenReturn(true);
        when(quizAttemptRepository.findAllByUserIdAndQuizIdAndIsCompleted(user.getId(), quiz.getId(), false)).thenReturn(List.of(existingQuizAttempt));

        QuizAttemptResponse response = quizAttemptService.addQuizAttempt(jwtToken, quizAttemptRequest);

        assertNotNull(response);
        assertEquals(existingQuizAttempt.getId(), response.getId());
        verify(quizAttemptRepository, times(0)).save(any(QuizAttempt.class));
    }

    @Test
    void getAllQuizAttempts_Success() {
        String jwtToken = "Bearer token";
        User user = new User();
        user.setId(1L);
        QuizAttempt quizAttempt = new QuizAttempt(user, new Quiz(), false);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(quizAttemptRepository.findAllByUserId(user.getId())).thenReturn(List.of(quizAttempt));

        List<QuizAttemptResponse> responses = quizAttemptService.getAllQuizAttempts(jwtToken, Optional.empty(), Optional.empty());

        assertNotNull(responses);
        assertEquals(1, responses.size());
    }

    @Test
    void getQuizAttemptWithId_Success() {
        String jwtToken = "Bearer token";
        User user = new User();
        user.setId(1L);
        QuizAttempt quizAttempt = new QuizAttempt(user, new Quiz(), false);
        quizAttempt.setId(1L);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(quizAttemptRepository.findById(1L)).thenReturn(Optional.of(quizAttempt));

        QuizAttemptResponse response = quizAttemptService.getQuizAttemptWithId(jwtToken, 1L);

        assertNotNull(response);
        assertEquals(quizAttempt.getId(), response.getId());
    }

    @Test
    void deleteQuizAttempt_Success() {
        String jwtToken = "Bearer token";
        User user = new User();
        user.setId(1L);
        QuizAttempt quizAttempt = new QuizAttempt(user, new Quiz(), false);
        quizAttempt.setId(1L);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(quizAttemptRepository.findById(1L)).thenReturn(Optional.of(quizAttempt));

        QuizAttemptResponse response = quizAttemptService.deleteQuizAttempt(jwtToken, 1L);

        assertNotNull(response);
        assertEquals(quizAttempt.getId(), response.getId());
        verify(quizAttemptRepository, times(1)).delete(quizAttempt);
    }

    @Test
    void updateQuizAttempt_Success() {
        String jwtToken = "Bearer token";
        User user = new User();
        user.setId(1L);
        QuizAttempt quizAttempt = new QuizAttempt(user, new Quiz(), false);
        quizAttempt.setId(1L);
        Map<String, Object> updateRequest = Map.of("completed", true);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(quizAttemptRepository.findById(1L)).thenReturn(Optional.of(quizAttempt));

        QuizAttemptResponse response = quizAttemptService.updateQuizAttempt(jwtToken, 1L, updateRequest);

        assertNotNull(response);
        assertTrue(response.isCompleted());
        verify(quizAttemptRepository, times(1)).save(quizAttempt);
    }

    @Test
    void calculateQuestionPoint_Success() {
        User user = new User();
        user.setId(1L);
        user.setPoints(1000);
        QuizAttempt quizAttempt = new QuizAttempt(user, new Quiz(), false);
        quizAttempt.setId(1L);
        QuestionAnswer questionAnswer = new QuestionAnswer();
        questionAnswer.setQuestion(new Question());
        questionAnswer.getQuestion().setDifficulty(1200);
        questionAnswer.setIsCorrect(true);

        when(quizAttemptRepository.findById(1L)).thenReturn(Optional.of(quizAttempt));
        when(questionAnswerRepository.findAllByQuizAttemptId(1L)).thenReturn(List.of(questionAnswer));

        quizAttemptService.calculateQuestionPoint(user, 1L);

        verify(userService, times(1)).updateUserPoint(user, 1001);
    }

}