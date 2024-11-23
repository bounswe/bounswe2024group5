package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.CreateQuizRequest;
import com.quizzard.quizzard.model.request.QuestionRequest;
import com.quizzard.quizzard.model.request.SolveQuizRequest;
import com.quizzard.quizzard.model.response.QuestionResponse;
import com.quizzard.quizzard.model.response.QuizResponse;
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

    @Autowired
    private UserService userService;

    @Autowired
    private QuestionService questionService;

    private List<QuestionResponse> mapQuestionsToQuestionResponses(List<Question> questions) {
        return questions.stream().map(QuestionResponse::new).toList();
    }

    private QuizResponse mapQuizToQuizResponse(Quiz quiz) {
        List<Question> questions = questionRepository.findByQuizId(quiz.getId());
        return new QuizResponse(quiz, mapQuestionsToQuestionResponses(questions));
    }

    private List<QuizResponse> mapQuizzesToQuizResponses(List<Quiz> quizzes) {
        return quizzes.stream().map(quiz -> mapQuizToQuizResponse(quiz)).toList();
    }

    private double calculateQuizDifficulty(Quiz quiz) {
        List<Question> questions = questionRepository.findByQuizId(quiz.getId());
        double totalDifficulty = 0;
        for (Question question : questions) {
            totalDifficulty += question.getDifficulty();
        }
        return totalDifficulty / questions.size();
    }

    @Transactional
    public QuizResponse createQuiz(String authorUsername, CreateQuizRequest request) {
        User author = userService.getOneUserByUsername(authorUsername);
        // 1. Create Quiz
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setImage(request.getImage());
        quiz.setAuthor(author);
        quizRepository.save(quiz);

        // 2. Create questions and add them to quiz
        List<QuestionRequest> questionRequests = request.getQuestions();
        for (QuestionRequest questionRequest : questionRequests) {
            questionService.createQuestion(questionRequest, quiz.getId());
        }
        quiz.setDifficulty(calculateQuizDifficulty(quiz));
        return mapQuizToQuizResponse(quiz);
    }

    // List all quizzes
    public List<QuizResponse> getAllQuizzes() {
        return mapQuizzesToQuizResponses(quizRepository.findAll());
    }

    // Find specific quiz with its ID
    public QuizResponse getQuizById(Long id) {
        if(quizRepository.existsById(id)) {
            Quiz quiz = quizRepository.findById(id).get();
            return mapQuizToQuizResponse(quiz);
        }
        return null;
    }

    // Update quiz
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

    // Delete a quiz
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }



}
