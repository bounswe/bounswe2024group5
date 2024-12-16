package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.QuestionType;
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

}