package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.model.request.QuestionRequest;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private EnglishRepository englishRepository;

    @InjectMocks
    private QuestionService questionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void createQuestion_InvalidQuestionType() {
        QuestionRequest questionRequest = new QuestionRequest();
        questionRequest.setQuestionType("INVALID_TYPE");
        questionRequest.setWord("word");
        questionRequest.setCorrectAnswer("correctAnswer");
        questionRequest.setWrongAnswers(List.of("wrong1", "wrong2", "wrong3"));

        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(questionRequest, 1L));
    }

    @Test
    void createQuestion_MissingWord() {
        QuestionRequest questionRequest = new QuestionRequest();
        questionRequest.setQuestionType("ENGLISH_TO_SENSE");
        questionRequest.setCorrectAnswer("correctAnswer");
        questionRequest.setWrongAnswers(List.of("wrong1", "wrong2", "wrong3"));

        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(questionRequest, 1L));
    }

    @Test
    void createQuestion_MissingCorrectAnswer() {
        QuestionRequest questionRequest = new QuestionRequest();
        questionRequest.setQuestionType("ENGLISH_TO_SENSE");
        questionRequest.setWord("word");
        questionRequest.setWrongAnswers(List.of("wrong1", "wrong2", "wrong3"));

        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(questionRequest, 1L));
    }

    @Test
    void createQuestion_MissingWrongAnswers() {
        QuestionRequest questionRequest = new QuestionRequest();
        questionRequest.setQuestionType("ENGLISH_TO_SENSE");
        questionRequest.setWord("word");
        questionRequest.setCorrectAnswer("correctAnswer");

        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(questionRequest, 1L));
    }
}