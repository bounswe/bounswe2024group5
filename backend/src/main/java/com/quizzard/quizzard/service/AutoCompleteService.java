package com.quizzard.quizzard.service;


import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.repository.EnglishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutoCompleteService {
    @Autowired
    private QuizService quizService;

//    @Autowired
//    private QuestionService questionService;

    @Autowired
    private EnglishRepository englishRepository;

    public List<English> autoCompleteSuggestions(String prefix) {

        return englishRepository.findTop5ByWordStartingWith(prefix);

    }


}
