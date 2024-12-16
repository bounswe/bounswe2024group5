package com.quizzard.quizzard.service;

import com.google.j2objc.annotations.AutoreleasePool;
import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.repository.TranslateRepository;
import com.quizzard.quizzard.repository.WordToSenseRepository;
import com.quizzard.quizzard.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerSuggestionService {

    @Autowired
    private TranslateRepository translateRepository;

    @Autowired
    private WordToSenseRepository wordToSenseRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public List<String> getCorrectAnswers(String word, String questionType) {
        QuestionType questionTypeEnum = QuestionType.valueOf(questionType.toLowerCase());
        List<String> correctAnswerSuggestions = List.of();
        switch (questionTypeEnum) {
            case english_to_sense:
                correctAnswerSuggestions = wordToSenseRepository.findSenseByEnglishWord(word);
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
        List<Question> questions = questionRepository.findByQuestionTypeAndWordAndCorrectAnswer(questionTypeEnum, word, correctAnswer);
        if(questions.size() > 0) {
            return List.of(questions.get(0).getWrongAnswer1(), questions.get(0).getWrongAnswer2(), questions.get(0).getWrongAnswer3());
        }
        switch (questionTypeEnum) {
            case english_to_sense:
                wrongAnswerSuggestions = wordToSenseRepository.findWrongAnswerSuggestions(word, correctAnswer);
                break;
            case english_to_turkish:
                wrongAnswerSuggestions = translateRepository.findWrongAnswerSuggestionsForEnToTr(word, correctAnswer);
                break;
            case turkish_to_english:
                wrongAnswerSuggestions = translateRepository.findWrongAnswerSuggestionsForTrToEn(word, correctAnswer);
                break;
        }
        return wrongAnswerSuggestions;
    }
}
