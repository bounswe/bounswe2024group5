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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FavoriteQuizServiceTest {

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    @Mock
    private FavoriteQuizRepository favoriteQuizRepository;

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private FavoriteQuizService favoriteQuizService;

    private User mockUser;
    private Quiz mockQuiz;
    private FavoriteQuiz mockFavoriteQuiz;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

//        mockUser = new User();
//        mockUser.setId(1L);
//        mockUser.setUsername("testUser");
//
//        mockQuiz = new Quiz();
//        mockQuiz.setId(1L);
//
//        mockFavoriteQuiz = new FavoriteQuiz();
//        mockFavoriteQuiz.setId(1L);
//        mockFavoriteQuiz.setUser(mockUser);
//        mockFavoriteQuiz.setQuiz(mockQuiz);
//        mockFavoriteQuiz.setCreatedAt(new Date());
    }

    @Test
    void testAddFavoriteQuiz_Success() {
        String jwtToken = "Bearer token";
        FavoriteQuizRequest request = new FavoriteQuizRequest();
        request.setQuizId(1L);

        User user = new User();
        user.setUsername("username");

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("username");
        when(userService.getOneUserByUsername(anyString())).thenReturn(user);
        when(favoriteQuizRepository.existsByUserIdAndQuizId(user.getId(), request.getQuizId())).thenReturn(true);
        when(favoriteQuizRepository.findByUserIdAndQuizId(user.getId(), request.getQuizId())).thenReturn(Optional.empty());
        when(favoriteQuizRepository.save(any(FavoriteQuiz.class))).thenReturn(mockFavoriteQuiz);

        FavoriteQuizResponse response = favoriteQuizService.addFavoriteQuiz(jwtToken, request);

        assertNotNull(response);
        assertEquals(mockQuiz.getId(), response.getQuizId());
        verify(favoriteQuizRepository, times(1)).save(any(FavoriteQuiz.class));

    }

    @Test
    void testAddFavoriteQuiz_AlreadyExists() {
        String jwtToken = "Bearer mockToken";
        FavoriteQuizRequest request = new FavoriteQuizRequest();
        request.setQuizId(1L);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("testUser");
        when(userService.getOneUserByUsername("testUser")).thenReturn(mockUser);
        when(favoriteQuizRepository.findByUserIdAndQuizId(mockUser.getId(), request.getQuizId())).thenReturn(Optional.of(mockFavoriteQuiz));

        assertThrows(RuntimeException.class, () -> favoriteQuizService.addFavoriteQuiz(jwtToken, request));
    }

    @Test
    void testGetAllFavoriteQuizzes() {
        String jwtToken = "Bearer mockToken";

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("testUser");
        when(userService.getOneUserByUsername("testUser")).thenReturn(mockUser);
        when(favoriteQuizRepository.findAllByUser(mockUser)).thenReturn(List.of(mockFavoriteQuiz));

        List<FavoriteQuizResponse> favoriteQuizzes = favoriteQuizService.getAllFavoriteQuizzes(jwtToken);

        assertNotNull(favoriteQuizzes);
        assertEquals(1, favoriteQuizzes.size());
    }

    @Test
    void testDeleteFavoriteQuiz_Success() {
        String jwtToken = "Bearer mockToken";
        Long quizId = 1L;

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("testUser");
        when(userService.getOneUserByUsername("testUser")).thenReturn(mockUser);
        when(favoriteQuizRepository.findByUserIdAndQuizId(mockUser.getId(), quizId)).thenReturn(Optional.of(mockFavoriteQuiz));

        favoriteQuizService.deleteFavoriteQuiz(jwtToken, quizId);

        verify(favoriteQuizRepository, times(1)).delete(mockFavoriteQuiz);
    }

    @Test
    void testDeleteFavoriteQuiz_NotAuthorized() {
        String jwtToken = "Bearer mockToken";
        Long quizId = 1L;

        User anotherUser = new User();
        anotherUser.setId(2L);
        mockFavoriteQuiz.setUser(anotherUser);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("testUser");
        when(userService.getOneUserByUsername("testUser")).thenReturn(mockUser);
        when(favoriteQuizRepository.findByUserIdAndQuizId(mockUser.getId(), quizId)).thenReturn(Optional.of(mockFavoriteQuiz));

        assertThrows(RuntimeException.class, () -> favoriteQuizService.deleteFavoriteQuiz(jwtToken, quizId));
    }

    @Test
    void testGetFavoriteQuiz_Success() {
        String jwtToken = "Bearer mockToken";
        Long quizId = 1L;

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("testUser");
        when(userService.getOneUserByUsername("testUser")).thenReturn(mockUser);
        when(favoriteQuizRepository.findByUserIdAndQuizId(mockUser.getId(), quizId)).thenReturn(Optional.of(mockFavoriteQuiz));

        FavoriteQuizResponse response = favoriteQuizService.getFavoriteQuiz(jwtToken, quizId);

        assertNotNull(response);
        assertEquals(mockQuiz.getId(), response.getQuizId());
    }

    @Test
    void testGetFavoriteQuiz_NotAuthorized() {
        String jwtToken = "Bearer mockToken";
        Long quizId = 1L;

        User anotherUser = new User();
        anotherUser.setId(2L);
        mockFavoriteQuiz.setUser(anotherUser);

        when(jwtUtils.getUserNameFromJwtToken(anyString())).thenReturn("testUser");
        when(userService.getOneUserByUsername("testUser")).thenReturn(mockUser);
        when(favoriteQuizRepository.findByUserIdAndQuizId(mockUser.getId(), quizId)).thenReturn(Optional.of(mockFavoriteQuiz));

        assertThrows(RuntimeException.class, () -> favoriteQuizService.getFavoriteQuiz(jwtToken, quizId));
    }
}
