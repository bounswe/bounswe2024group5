package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.model.response.AnswerSuggestionResponse;
import com.quizzard.quizzard.repository.TranslateRepository;
import com.quizzard.quizzard.service.AnswerSuggestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnswerSuggestionServiceTest {

    @Mock
    private TranslateRepository translateRepository;

    @InjectMocks
    private AnswerSuggestionService answerSuggestionService;

    @Test
    public void testGetAnswerSuggestion_EnglishToSense() {
        // Arrange
        String word = "happy";
        String questionType = "ENGLiSH_TO_SENSE";
        List<String> expectedSuggestions = Arrays.asList("Mutlu", "Neşeli");

        when(translateRepository.findSenseByEnglishWord(word)).thenReturn(expectedSuggestions);

        // Act
        AnswerSuggestionResponse response = answerSuggestionService.getAnswerSuggestion(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response.getCorrectAnswerSuggestions());
        assertTrue(response.getWrongAnswerSuggestions().isEmpty());
        verify(translateRepository).findSenseByEnglishWord(word);
    }

    @Test
    public void testGetAnswerSuggestion_EnglishToTurkish() {
        // Arrange
        String word = "hello";
        String questionType = "ENGLiSH_TO_TURKiSH";
        List<String> expectedSuggestions = Arrays.asList("Merhaba", "Selam");

        when(translateRepository.findTurkishByEnglishWord(word)).thenReturn(expectedSuggestions);

        // Act
        AnswerSuggestionResponse response = answerSuggestionService.getAnswerSuggestion(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response.getCorrectAnswerSuggestions());
        assertTrue(response.getWrongAnswerSuggestions().isEmpty());
        verify(translateRepository).findTurkishByEnglishWord(word);
    }

    @Test
    public void testGetAnswerSuggestion_TurkishToEnglish() {
        // Arrange
        String word = "merhaba";
        String questionType = "TURKiSH_TO_ENGLiSH";
        List<String> expectedSuggestions = Arrays.asList("Hello", "Hi");

        when(translateRepository.findEnglishByTurkishWord(word)).thenReturn(expectedSuggestions);

        // Act
        AnswerSuggestionResponse response = answerSuggestionService.getAnswerSuggestion(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response.getCorrectAnswerSuggestions());
        assertTrue(response.getWrongAnswerSuggestions().isEmpty());
        verify(translateRepository).findEnglishByTurkishWord(word);
    }

    @Test
    public void testGetAnswerSuggestion_NoSuggestions() {
        // Arrange
        String word = "nonexistent";
        String questionType = "ENGLiSH_TO_SENSE";
        List<String> expectedSuggestions = List.of();

        when(translateRepository.findSenseByEnglishWord(word)).thenReturn(expectedSuggestions);

        // Act
        AnswerSuggestionResponse response = answerSuggestionService.getAnswerSuggestion(word, questionType);

        // Assert
        assertNotNull(response);
        assertTrue(response.getCorrectAnswerSuggestions().isEmpty());
        assertTrue(response.getWrongAnswerSuggestions().isEmpty());
    }

    @Test
    public void testGetAnswerSuggestion_CaseInsensitiveQuestionType() {
        // Arrange
        String word = "happy";
        String questionType = "english_to_sense";  // lowercase
        List<String> expectedSuggestions = Arrays.asList("Mutlu", "Neşeli");

        when(translateRepository.findSenseByEnglishWord(word)).thenReturn(expectedSuggestions);

        // Act
        AnswerSuggestionResponse response = answerSuggestionService.getAnswerSuggestion(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response.getCorrectAnswerSuggestions());
    }

    @Test
    public void testGetAnswerSuggestion_InvalidQuestionType() {
        // Arrange
        String word = "test";
        String invalidQuestionType = "INVALID_TYPE";

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            answerSuggestionService.getAnswerSuggestion(word, invalidQuestionType);
        });
    }
}