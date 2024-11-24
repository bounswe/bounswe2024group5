package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.model.request.QuestionRequest;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private EnglishRepository englishRepository;


    public void createQuestion(QuestionRequest questionRequest, Long quizId) {
        Question question = new Question();
        question.setQuizId(quizId);
        QuestionType questionType = QuestionType.valueOf(questionRequest.getQuestionType().toString().toLowerCase());
        question.setQuestionType(questionType);
        int difficulty =0;
        if((questionType == QuestionType.english_to_sense) || (questionType == QuestionType.english_to_turkish)){
            difficulty = englishRepository.findByWord(questionRequest.getWord()).getScore();
        }
        else if(questionType == QuestionType.turkish_to_english){
            difficulty = englishRepository.findByWord(questionRequest.getCorrectAnswer()).getScore();
        }
        question.setDifficulty(difficulty);
        question.setWord(questionRequest.getWord());
        question.setCorrectAnswer(questionRequest.getCorrectAnswer());
        question.setWrongAnswer1(questionRequest.getWrongAnswers().get(0));
        question.setWrongAnswer2(questionRequest.getWrongAnswers().get(1));
        question.setWrongAnswer3(questionRequest.getWrongAnswers().get(2));
        questionRepository.save(question);
    }


}
