package com.quizzard.quizzard.service;

import com.quizzard.quizzard.service.*;
import com.quizzard.quizzard.model.FavoriteQuestion;
import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.FavoriteQuestionRequest;
import com.quizzard.quizzard.model.response.FavoriteQuestionResponse;
import com.quizzard.quizzard.repository.FavoriteQuestionRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class FavoriteQuestionServiceTest {

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    @Mock
    private FavoriteQuestionRepository favoriteQuestionRepository;

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private FavoriteQuestionService favoriteQuestionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    public void addFavoriteQuestion_ShouldReturnFavoriteQuestionResponse() {
        // Test verilerini ayarlama
        String jwtToken = "Bearer token";
        FavoriteQuestionRequest favoriteQuestionRequest = new FavoriteQuestionRequest();
        favoriteQuestionRequest.setQuestionId(1L);

        User user = new User();
        user.setId(1L);

        Question question = new Question();
        question.setId(1L);

        // Mock'lama işlemleri
        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));
        when(favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), favoriteQuestionRequest.getQuestionId()))
                .thenReturn(Optional.empty()); // Bu soruya favori eklenmemiş

        // Favori soruyu ekleyerek testi çalıştırma
        FavoriteQuestionResponse response = favoriteQuestionService.addFavoriteQuestion(jwtToken, favoriteQuestionRequest);

        // Yanıtın null olmaması gerektiğini doğrulama
        assertNotNull(response);

        // Favori sorunun repository'ye kaydedildiğini doğrulama
        verify(favoriteQuestionRepository, times(1)).save(any(FavoriteQuestion.class));
    }

    @Test
    void addFavoriteQuestion_ShouldThrowExceptionIfAlreadyAdded() {
        // Arrange
        String jwtToken = "Bearer token";
        Long questionId = 1L;
        String username = "user1";
        FavoriteQuestionRequest request = new FavoriteQuestionRequest();
        request.setQuestionId(questionId);

        User user = new User();
        user.setId(1L);
        user.setUsername(username);

        Question question = new Question();
        question.setId(questionId);

        // Mock methods
        when(jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7))).thenReturn(username);
        when(userService.getOneUserByUsername(username)).thenReturn(user);
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question));
        when(favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), questionId)).thenReturn(Optional.of(new FavoriteQuestion()));

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () ->
                favoriteQuestionService.addFavoriteQuestion(jwtToken, request)
        );
        assertEquals("You have already added this question to favorites.", thrown.getMessage());
    }

    @Test
    void getFavoriteQuestion_ShouldReturnFavoriteQuestionResponse() {
        // Arrange
        String jwtToken = "Bearer token";
        Long questionId = 1L;
        String username = "user1";

        User user = new User();
        user.setId(1L);
        user.setUsername(username);

        Question question = new Question();
        question.setId(questionId);

        FavoriteQuestion favoriteQuestion = new FavoriteQuestion();
        favoriteQuestion.setUser(user);
        favoriteQuestion.setQuestion(question);

        // Mock methods
        when(jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7))).thenReturn(username);
        when(userService.getOneUserByUsername(username)).thenReturn(user);
        when(favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), questionId)).thenReturn(Optional.of(favoriteQuestion));

        // Act
        FavoriteQuestionResponse response = favoriteQuestionService.getFavoriteQuestion(jwtToken, questionId);

        // Assert
        assertNotNull(response);
        assertEquals(questionId, response.getQuestionId());
    }

    @Test
    void getFavoriteQuestion_ShouldThrowExceptionIfNotFound() {
        // Arrange
        String jwtToken = "Bearer token";
        Long questionId = 1L;
        String username = "user1";

        User user = new User();
        user.setId(1L);
        user.setUsername(username);

        // Mock methods
        when(jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7))).thenReturn(username);
        when(userService.getOneUserByUsername(username)).thenReturn(user);
        when(favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), questionId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () ->
                favoriteQuestionService.getFavoriteQuestion(jwtToken, questionId)
        );
        assertEquals("Favorite question not found with id: " + questionId, thrown.getMessage());
    }

    @Test
    void deleteFavoriteQuestion_ShouldDeleteFavorite() {
        // Arrange
        String jwtToken = "Bearer token";
        Long questionId = 1L;
        String username = "user1";

        User user = new User();
        user.setId(1L);
        user.setUsername(username);

        FavoriteQuestion favoriteQuestion = new FavoriteQuestion();
        favoriteQuestion.setUser(user);

        // Mock methods
        when(jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7))).thenReturn(username);
        when(userService.getOneUserByUsername(username)).thenReturn(user);
        when(favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), questionId)).thenReturn(Optional.of(favoriteQuestion));

        // Act
        favoriteQuestionService.deleteFavoriteQuestion(jwtToken, questionId);

        // Assert
        verify(favoriteQuestionRepository, times(1)).delete(favoriteQuestion);
    }

    @Test
    void deleteFavoriteQuestion_ShouldThrowExceptionIfNotAuthorized() {
        // Arrange
        String jwtToken = "Bearer token";
        Long questionId = 1L;
        String username = "user1";

        User user = new User();
        user.setId(1L);
        user.setUsername(username);

        FavoriteQuestion favoriteQuestion = new FavoriteQuestion();
        favoriteQuestion.setUser(new User()); // Different user

        // Mock methods
        when(jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7))).thenReturn(username);
        when(userService.getOneUserByUsername(username)).thenReturn(user);
        when(favoriteQuestionRepository.findByUserIdAndQuestionId(user.getId(), questionId)).thenReturn(Optional.of(favoriteQuestion));

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () ->
                favoriteQuestionService.deleteFavoriteQuestion(jwtToken, questionId)
        );
        assertEquals("You are not authorized to delete this favorite question.", thrown.getMessage());
    }
}
