package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Question;
import com.quizzard.quizzard.model.QuestionType;
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

    @Transactional
    public QuizResponse createQuiz(String authorUsername, CreateQuizRequest request) {
        User author = userService.getOneUserByUsername(authorUsername);
        // 1. Quiz oluştur
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setImage(request.getImage());
        quiz.setAuthor(author);
        quizRepository.save(quiz);

        // 2. Soruları oluştur ve quiz'e ekle
        List<QuestionRequest> questionRequests = request.getQuestions();
        for (QuestionRequest questionRequest : questionRequests) {
            Question question = new Question();
            question.setQuizId(quiz.getId()); // quiz_id ile ilişkilendir
            question.setQuestionType(QuestionType.valueOf(questionRequest.getQuestionType().toString().toLowerCase()));
            question.setWord(questionRequest.getWord());
            question.setCorrectAnswer(questionRequest.getCorrectAnswer());
            question.setWrongAnswer1(questionRequest.getWrongAnswers().get(0));
            question.setWrongAnswer2(questionRequest.getWrongAnswers().get(1));
            question.setWrongAnswer3(questionRequest.getWrongAnswers().get(2));
            questionRepository.save(question);
        }
        return mapQuizToQuizResponse(quiz);
    }

    // Tüm quizleri listeleme
    public List<QuizResponse> getAllQuizzes() {
        return mapQuizzesToQuizResponses(quizRepository.findAll());
    }

    // ID ile quiz bulma
    public QuizResponse getQuizById(Long id) {
        if(quizRepository.existsById(id)) {
            Quiz quiz = quizRepository.findById(id).get();
            return mapQuizToQuizResponse(quiz);
        }
        return null;
    }

    // Kullanıcı ID'sine göre quizleri listeleme
//    public List<Quiz> getQuizzesByUserId(Long userId) {
//        return quizRepository.findByUserId(userId);
//    }


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
