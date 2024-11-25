package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.TurkishRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WordCheckerControllerTest {

    @Mock
    private EnglishRepository englishRepository;

    @Mock
    private TurkishRepository turkishRepository;

    @InjectMocks
    private WordCheckerController wordCheckerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCheckTurkishWordValid() {
        // Arrange
        String word = "test";
        when(turkishRepository.existsByWord(word)).thenReturn(true);

        // Act
        ResponseEntity<Map<String, Object>> response = wordCheckerController.checkWord(word, "turkish");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("isValid"));
        verify(turkishRepository).existsByWord(word);
    }

    @Test
    void testCheckTurkishWordInvalid() {
        // Arrange
        String word = "invalidword";
        when(turkishRepository.existsByWord(word)).thenReturn(false);

        // Act
        ResponseEntity<Map<String, Object>> response = wordCheckerController.checkWord(word, "turkish");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertFalse((Boolean) response.getBody().get("isValid"));
        verify(turkishRepository).existsByWord(word);
    }

    @Test
    void testCheckEnglishWordValid() {
        // Arrange
        String word = "hello";
        when(englishRepository.existsByWord(word)).thenReturn(true);

        // Act
        ResponseEntity<Map<String, Object>> response = wordCheckerController.checkWord(word, "english");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("isValid"));
        verify(englishRepository).existsByWord(word);
    }

    @Test
    void testCheckEnglishWordInvalid() {
        // Arrange
        String word = "invalidword";
        when(englishRepository.existsByWord(word)).thenReturn(false);

        // Act
        ResponseEntity<Map<String, Object>> response = wordCheckerController.checkWord(word, "english");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertFalse((Boolean) response.getBody().get("isValid"));
        verify(englishRepository).existsByWord(word);
    }

    @Test
    void testCheckWordInvalidLanguage() {
        // Arrange
        String word = "test";

        // Act
        ResponseEntity<Map<String, Object>> response = wordCheckerController.checkWord(word, "german");

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid type", response.getBody().get("error"));
    }
}