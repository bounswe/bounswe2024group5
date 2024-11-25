package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.AccessDeniedException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.CreateQuizRequest;
import com.quizzard.quizzard.model.request.QuestionRequest;
import com.quizzard.quizzard.model.request.UpdateQuizRequest;
import com.quizzard.quizzard.model.response.QuizResponse;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private UserService userService;

    @Mock
    private QuestionService questionService;

    @InjectMocks
    private QuizService quizService;

    private User mockUser;
    private Quiz mockQuiz;

    @BeforeEach
    public void setUp() {
        // Create mock user
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");

        // Create mock quiz
        mockQuiz = new Quiz();
        mockQuiz.setId(1L);
        mockQuiz.setTitle("Test Quiz");
        mockQuiz.setAuthor(mockUser);
    }

    @Test
    public void testCreateQuiz_Success() {
        // Prepare test data
        CreateQuizRequest createQuizRequest = new CreateQuizRequest();
        createQuizRequest.setTitle("New Quiz");
        createQuizRequest.setDescription("Quiz Description");

        List<QuestionRequest> questionRequests = new ArrayList<>();
        QuestionRequest questionRequest = new QuestionRequest();
        questionRequests.add(questionRequest);
        createQuizRequest.setQuestions(questionRequests);

        // Mock dependencies
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(quizRepository.save(any(Quiz.class))).thenAnswer(invocation -> {
            Quiz savedQuiz = invocation.getArgument(0);
            savedQuiz.setId(1L);
            return savedQuiz;
        });
        when(questionRepository.findByQuizId(any())).thenReturn(new ArrayList<>());

        // Perform test
        QuizResponse quizResponse = quizService.createQuiz("testuser", createQuizRequest);

        // Verify
        assertNotNull(quizResponse);
        verify(quizRepository).save(any(Quiz.class));
        verify(questionService).createQuestion(any(QuestionRequest.class), any());
    }

    @Test
    public void testGetQuizById_Exists() {
        // Mock dependencies
        when(quizRepository.existsById(1L)).thenReturn(true);
        when(quizRepository.findById(1L)).thenReturn(Optional.of(mockQuiz));
        when(questionRepository.findByQuizId(1L)).thenReturn(new ArrayList<>());

        // Perform test
        QuizResponse quizResponse = quizService.getQuizById(1L);

        // Verify
        assertNotNull(quizResponse);
        assertEquals("Test Quiz", quizResponse.getTitle());
    }

    @Test
    public void testGetQuizById_NotExists() {
        // Mock dependencies
        when(quizRepository.existsById(1L)).thenReturn(false);

        // Perform test
        QuizResponse quizResponse = quizService.getQuizById(1L);

        // Verify
        assertNull(quizResponse);
    }

    @Test
    public void testUpdateQuiz_Success() {
        // Prepare test data
        UpdateQuizRequest updateQuizRequest = new UpdateQuizRequest();
        updateQuizRequest.setTitle("Updated Quiz");

        // Mock dependencies
        when(quizRepository.findById(1L)).thenReturn(Optional.of(mockQuiz));
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);
        when(questionRepository.findByQuizId(1L)).thenReturn(new ArrayList<>());

        // Perform test
        QuizResponse updatedQuiz = quizService.updateQuiz("testuser", 1L, updateQuizRequest);

        // Verify
        assertNotNull(updatedQuiz);
        verify(quizRepository).save(mockQuiz);
    }

    @Test
    public void testUpdateQuiz_AccessDenied() {
        // Prepare test data
        UpdateQuizRequest updateQuizRequest = new UpdateQuizRequest();
        updateQuizRequest.setTitle("Updated Quiz");

        // Create a different user
        User differentUser = new User();
        differentUser.setId(2L);
        differentUser.setUsername("differentuser");

        // Mock dependencies
        Quiz existingQuiz = new Quiz();
        existingQuiz.setId(1L);
        existingQuiz.setAuthor(differentUser);

        when(quizRepository.findById(1L)).thenReturn(Optional.of(existingQuiz));
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);

        // Perform test and verify
        assertThrows(AccessDeniedException.class,
                () -> quizService.updateQuiz("testuser", 1L, updateQuizRequest));
    }

    @Test
    public void testDeleteQuiz_Success() {
        // Mock dependencies
        when(quizRepository.findById(1L)).thenReturn(Optional.of(mockQuiz));
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);

        // Perform test
        quizService.deleteQuiz("testuser", 1L);

        // Verify
        verify(quizRepository).deleteById(1L);
    }

    @Test
    public void testDeleteQuiz_AccessDenied() {
        // Create a different user
        User differentUser = new User();
        differentUser.setId(2L);
        differentUser.setUsername("differentuser");

        // Mock dependencies
        Quiz existingQuiz = new Quiz();
        existingQuiz.setId(1L);
        existingQuiz.setAuthor(differentUser);

        when(quizRepository.findById(1L)).thenReturn(Optional.of(existingQuiz));
        when(userService.getOneUserByUsername("testuser")).thenReturn(mockUser);

        // Perform test and verify
        assertThrows(AccessDeniedException.class,
                () -> quizService.deleteQuiz("testuser", 1L));
    }

    @Test
    public void testGetAllQuizzes_NoFilters() {
        // Mock dependencies
        List<Quiz> quizzes = new ArrayList<>();
        quizzes.add(mockQuiz);
        when(quizRepository.findAll()).thenReturn(quizzes);
        when(questionRepository.findByQuizId(1L)).thenReturn(new ArrayList<>());

        // Perform test
        Object result = quizService.getAllQuizzes(Optional.empty(), Optional.empty(), Optional.empty());

        // Verify
        assertNotNull(result);
        assertTrue(result instanceof List);
    }
}