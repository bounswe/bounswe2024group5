package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.FavoriteQuestion;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.FavoriteQuestionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteQuestionRepository extends JpaRepository<FavoriteQuestion, Long> {

    List<FavoriteQuestion> findAllByUserId(Long userId);

    Optional<FavoriteQuestion> findByUserIdAndQuestionId(Long userId, Long questionId);

    boolean existsByUserIdAndQuestionId(Long userId, Long questionId);

    void deleteByUserIdAndQuestionId(Long userId, Long questionId);

    List<FavoriteQuestion> findAllByUser(User user);

}
