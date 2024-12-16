package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.repository.TranslateRepository;
import com.quizzard.quizzard.repository.WordToSenseRepository;
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

    @Mock
    private WordToSenseRepository senseRepository;

    @Test
    public void testGetAnswerSuggestion_EnglishToSense() {
        // Arrange
        String word = "happy";
        String questionType = "english_to_turkish";
        List<String> expectedSuggestions = Arrays.asList("an expression of greeting");

        when(senseRepository.findSenseByEnglishWord(word)).thenReturn(expectedSuggestions);

        // Act
        List<String> response = answerSuggestionService.getCorrectAnswers(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response);
        verify(senseRepository).findSenseByEnglishWord(word);
    }

    @Test
    public void testGetAnswerSuggestion_EnglishToTurkish() {
        // Arrange
        String word = "hello";
        String questionType = "english_to_turkish";
        List<String> expectedSuggestions = Arrays.asList("merhabalar");

        when(translateRepository.findTurkishByEnglishWord(word)).thenReturn(expectedSuggestions);

        // Act
        List<String> response = answerSuggestionService.getCorrectAnswers(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response);
        verify(translateRepository).findTurkishByEnglishWord(word);
    }

    @Test
    public void testGetAnswerSuggestion_TurkishToEnglish() {
        // Arrange
        String word = "merhabalar";
        String questionType = "turkish_to_english";
        List<String> expectedSuggestions = Arrays.asList("hello");

        when(translateRepository.findEnglishByTurkishWord(word)).thenReturn(expectedSuggestions);

        // Act
        List<String> response = answerSuggestionService.getCorrectAnswers(word, questionType);

        // Assert
        assertNotNull(response);
        assertEquals(expectedSuggestions, response);
        verify(translateRepository).findTurkishByEnglishWord(word);
    }
}