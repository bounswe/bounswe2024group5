package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.AccessDeniedException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.FavoriteQuestion;
import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.Quiz;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.*;
import com.quizzard.quizzard.model.response.QuestionResponse;
import com.quizzard.quizzard.model.response.QuizResponse;
import com.quizzard.quizzard.model.response.SolveQuizResponse;
import com.quizzard.quizzard.repository.FavoriteQuestionRepository;
import com.quizzard.quizzard.repository.FavoriteQuizRepository;
import com.quizzard.quizzard.repository.QuestionRepository;
import com.quizzard.quizzard.repository.QuizRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.RequestingUserName;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private FavoriteQuestionRepository favoriteQuestionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private FavoriteQuizRepository favoriteQuizRepository;

    private List<QuestionResponse> mapQuestionsToQuestionResponses(List<Question> questions) {
        return questions.stream().map(QuestionResponse::new).toList();
    }

    private QuizResponse mapQuizToQuizResponse(Quiz quiz) {
        List<Question> questions = questionRepository.findByQuizId(quiz.getId());
        Long numberOfFavorites = favoriteQuizRepository.countByQuizId(quiz.getId());
        return new QuizResponse(quiz, mapQuestionsToQuestionResponses(questions), numberOfFavorites);
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
        if (request.getImage() == null || request.getImage().equals(""))
            quiz.setImage("https://storage.googleapis.com/quizzard-bucket/19042e06-bfff-49c0-adce-49901b6dc726-upload.jpg");
        else {
            quiz.setImage(request.getImage());
        }
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

    public Object getAllQuizzes(Optional<String> username, Optional<Integer> minDifficulty, Optional<Integer> maxDifficulty) {
        if (username.isPresent() && minDifficulty.isPresent() && maxDifficulty.isPresent()) {
            User user = userService.getOneUserByUsername(username.get());
            return mapQuizzesToQuizResponses(quizRepository.findByAuthorAndDifficultyBetween(user, minDifficulty.get().doubleValue(), maxDifficulty.get().doubleValue()));
        } else if (username.isPresent() && minDifficulty.isPresent()) {
            User user = userService.getOneUserByUsername(username.get());
            return mapQuizzesToQuizResponses(quizRepository.findByAuthorAndDifficultyGreaterThanEqual(user, minDifficulty.get().doubleValue()));
        } else if (username.isPresent() && maxDifficulty.isPresent()) {
            User user = userService.getOneUserByUsername(username.get());
            return mapQuizzesToQuizResponses(quizRepository.findByAuthorAndDifficultyLessThanEqual(user, maxDifficulty.get().doubleValue()));
        } else if (minDifficulty.isPresent() && maxDifficulty.isPresent()) {
            return mapQuizzesToQuizResponses(quizRepository.findByDifficultyBetween(minDifficulty.get().doubleValue(), maxDifficulty.get().doubleValue()));
        } else if (username.isPresent()) {
            User user = userService.getOneUserByUsername(username.get());
            return mapQuizzesToQuizResponses(quizRepository.findByAuthor(user));
        } else if (minDifficulty.isPresent()) {
            return mapQuizzesToQuizResponses(quizRepository.findByDifficultyGreaterThanEqual(minDifficulty.get().doubleValue()));
        } else if (maxDifficulty.isPresent()) {
            return mapQuizzesToQuizResponses(quizRepository.findByDifficultyLessThanEqual(maxDifficulty.get().doubleValue()));
        } else {
            return mapQuizzesToQuizResponses(quizRepository.findAll());
        }
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
    public QuizResponse updateQuiz(String username, Long id, UpdateQuizRequest updatedQuiz) {
        Optional<Quiz> quizOptional = quizRepository.findById(id);
        if (quizOptional.isEmpty())
            throw new ResourceNotFoundException("Quiz not found with id " + id);
        Quiz quiz = quizOptional.get();
        User user = userService.getOneUserByUsername(username);
        if (quiz.getAuthor().getId() != user.getId())
            throw new AccessDeniedException("You are not the author of this quiz");
        if(updatedQuiz.getTitle() != null)
            quiz.setTitle(updatedQuiz.getTitle());
        if(updatedQuiz.getDescription() != null)
            quiz.setDescription(updatedQuiz.getDescription());
        if(updatedQuiz.getImage() != null)
            quiz.setImage(updatedQuiz.getImage());
        quizRepository.save(quiz);
        return mapQuizToQuizResponse(quiz);
    }

    // Delete a quiz
    public void deleteQuiz(String username ,Long id) {
        User user = userService.getOneUserByUsername(username);
        Optional<Quiz> quiz = quizRepository.findById(id);
        if (quiz.isEmpty())
            throw new ResourceNotFoundException("Quiz not found with id " + id);
        if (quiz.get().getAuthor().getId() != user.getId())
            throw new AccessDeniedException("You are not the author of this quiz");
        quizRepository.deleteById(id);
    }

    public List<QuizResponse> getRecommendedQuizzes(String username, Long givenQuizId) {
        Pageable pageable = PageRequest.of(0, 5);
        Optional<Quiz> quiz = quizRepository.findById(givenQuizId);
        if (quiz.isEmpty())
            throw new ResourceNotFoundException("Quiz not found with id " + givenQuizId);
        return mapQuizzesToQuizResponses(quizRepository.findRecommendedQuizzes(givenQuizId, username, pageable));
    }

    @Transactional
    public QuizResponse createQuizFromFavorites(String authorUsername, CreateFromFavQuestionToQuizRequest request) {
        User author = userService.getOneUserByUsername(authorUsername);
        List<FavoriteQuestion> favoriteQuestions = favoriteQuestionRepository.findAllByUserId(author.getId());
        String title = request.getTitle();
        Integer count = request.getCount();
        Collections.shuffle(favoriteQuestions);
        if (favoriteQuestions.size() < count)
            throw new ResourceNotFoundException("You don't have enough favorite questions");

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setAuthor(author);

        if (request.getDescription() == null || request.getDescription().equals(""))
            quiz.setDescription("This quiz is created from " + authorUsername + "'s favorite questions");
        else {
            quiz.setDescription(request.getDescription());
        }


        if (request.getImage() == null || request.getImage().equals(""))
            quiz.setImage("https://storage.googleapis.com/quizzard-bucket/19042e06-bfff-49c0-adce-49901b6dc726-upload.jpg");
        else {
            quiz.setImage(request.getImage());
        }
        quizRepository.save(quiz);

        for (int i = 0; i < count; i++) {
            Question question = new Question();
            question.setQuizId(quiz.getId());
            question.setQuestionType(favoriteQuestions.get(i).getQuestion().getQuestionType());
            question.setDifficulty(favoriteQuestions.get(i).getQuestion().getDifficulty());
            question.setWord(favoriteQuestions.get(i).getQuestion().getWord());
            question.setCorrectAnswer(favoriteQuestions.get(i).getQuestion().getCorrectAnswer());
            question.setWrongAnswer1(favoriteQuestions.get(i).getQuestion().getWrongAnswer1());
            question.setWrongAnswer2(favoriteQuestions.get(i).getQuestion().getWrongAnswer2());
            question.setWrongAnswer3(favoriteQuestions.get(i).getQuestion().getWrongAnswer3());
            question.setQuizId(quiz.getId());
            questionRepository.save(question);
        }
        quiz.setDifficulty(calculateQuizDifficulty(quiz));
        quizRepository.save(quiz);
        return mapQuizToQuizResponse(quiz);
    }



}
