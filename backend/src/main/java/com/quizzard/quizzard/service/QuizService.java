package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.QuestionType;
import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.request.CreateQuizRequest;
import com.quizzard.quizzard.model.request.SolveQuizRequest;
import com.quizzard.quizzard.model.response.SolveQuizResponse;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Transactional
    public Quiz createQuiz(CreateQuizRequest request) {
        // 1. Quiz oluştur
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setImage(request.getImage());
        quiz.setUserId(request.getUserId());
        quizRepository.save(quiz);

        // 2. Soruları oluştur ve quiz'e ekle
        List<Question> questions = request.getQuestions();
        for (Question questionRequest : questions) {
            Question question = new Question();
            question.setQuizId(quiz.getId()); // quiz_id ile ilişkilendir
            question.setQuestionType(QuestionType.valueOf(questionRequest.getQuestionType().toString()));
            question.setWord(questionRequest.getWord());
            question.setCorrectAnswer(questionRequest.getCorrectAnswer());
            question.setWrongAnswer1(questionRequest.getWrongAnswer1());
            question.setWrongAnswer2(questionRequest.getWrongAnswer2());
            question.setWrongAnswer3(questionRequest.getWrongAnswer3());
            questionRepository.save(question);
        }
        return quiz;
    }

    // Tüm quizleri listeleme
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // ID ile quiz bulma
    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    // Kullanıcı ID'sine göre quizleri listeleme
    public List<Quiz> getQuizzesByUserId(Long userId) {
        return quizRepository.findByUserId(userId);
    }


    // Quiz güncelleme
    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        Optional<Quiz> quizOptional = quizRepository.findById(id);
        if (quizOptional.isPresent()) {
            Quiz existingQuiz = quizOptional.get();
            existingQuiz.setTitle(updatedQuiz.getTitle());
            existingQuiz.setDescription(updatedQuiz.getDescription());
            existingQuiz.setImage(updatedQuiz.getImage());
            existingQuiz.setDifficulty(updatedQuiz.getDifficulty());
            existingQuiz.setUpdatedAt(new java.util.Date());
            return quizRepository.save(existingQuiz);
        } else {
            return null;  // Or handle the case where the quiz doesn't exist
        }
    }

    // Quiz silme
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    public SolveQuizResponse solveQuiz(Long quizId, SolveQuizRequest request, Long userId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isEmpty()) {
            // Handle the case where the quiz doesn't exist
            return null;
        }

        List<Question> questions = questionRepository.findByQuizId(quizId);
        int correctAnswers = 0;
        int totalQuestions = questions.size();

        for (SolveQuizRequest.Answer answer : request.getAnswers()) {
            for (Question question : questions) {
                if (question.getId().equals(answer.getQuestionId())) {
                    if (question.getCorrectAnswer().equals(answer.getSelectedAnswer())) {
                        correctAnswers++;
                    }
                }
            }
        }

        int score = correctAnswers * 100 / totalQuestions;
        int pointsAwarded = correctAnswers * 10;

        return new SolveQuizResponse(score, correctAnswers, totalQuestions, pointsAwarded);
    }


}
