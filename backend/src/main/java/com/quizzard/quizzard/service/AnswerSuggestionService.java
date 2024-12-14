package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.TranslateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerSuggestionService {

    @Autowired
    private TranslateRepository translateRepository;

    public List<String> getCorrectAnswers(String word, String questionType) {
        QuestionType questionTypeEnum = QuestionType.valueOf(questionType.toLowerCase());
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
        return correctAnswerSuggestions;
    }

    public List<String> getWrongAnswers(String word, String correctAnswer, String questionType) {
        QuestionType questionTypeEnum = QuestionType.valueOf(questionType.toLowerCase());
        List<String> wrongAnswerSuggestions = List.of();
        switch (questionTypeEnum) {
            case english_to_sense:
                wrongAnswerSuggestions = translateRepository.findSenseByEnglishWord(word);
                break;
            case english_to_turkish:
                wrongAnswerSuggestions = translateRepository.findTurkishByEnglishWord(word);
                break;
            case turkish_to_english:
                wrongAnswerSuggestions = translateRepository.findEnglishByTurkishWord(word);
                break;
        }
        return wrongAnswerSuggestions;
    }
}
