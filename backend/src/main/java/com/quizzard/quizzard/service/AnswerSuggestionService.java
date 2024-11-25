package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.model.response.AnswerSuggestionResponse;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.TranslateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerSuggestionService {

    @Autowired
    private TranslateRepository translateRepository;

    public AnswerSuggestionResponse getAnswerSuggestion(String word, String questionType) {
        QuestionType questionTypeEnum = QuestionType.valueOf(questionType.toLowerCase());
        AnswerSuggestionResponse answerSuggestionResponse = new AnswerSuggestionResponse();
        List<String> correctAnswerSuggestions = List.of();
        switch (questionTypeEnum) {
            case english_to_sense:
                correctAnswerSuggestions = translateRepository.findSenseByEnglishWord(word);
                break;
            case english_to_turkish:
                correctAnswerSuggestions = translateRepository.findTurkishByEnglishWord(word);
                break;
            case turkish_to_english:
                correctAnswerSuggestions = translateRepository.findEnglishByTurkishWord(word);
                break;
        }
        answerSuggestionResponse.setCorrectAnswerSuggestions(correctAnswerSuggestions);
        answerSuggestionResponse.setWrongAnswerSuggestions(List.of());
        return answerSuggestionResponse;
    }
}
