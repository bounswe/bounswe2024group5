package com.quizzard.quizzard.model.response;

public class SolveQuizResponse {

    private int score;
    private int correctAnswers;
    private int totalQuestions;
    private int pointsAwarded;

    // Constructors
    public SolveQuizResponse(int score, int correctAnswers, int totalQuestions, int pointsAwarded) {
        this.score = score;
        this.correctAnswers = correctAnswers;
        this.totalQuestions = totalQuestions;
        this.pointsAwarded = pointsAwarded;
    }

    // Getters
    public int getScore() {
        return score;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public int getPointsAwarded() {
        return pointsAwarded;
    }

    // Setters
    public void setScore(int score) {
        this.score = score;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public void setPointsAwarded(int pointsAwarded) {
        this.pointsAwarded = pointsAwarded;
    }

    // toString
    @Override
    public String toString() {
        return "SolveQuizResponse{" +
                "score=" + score +
                ", correctAnswers=" + correctAnswers +
                ", totalQuestions=" + totalQuestions +
                ", pointsAwarded=" + pointsAwarded +
                '}';
    }
}
