package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote, Long> {
    List<Upvote> findByPostIdAndUserId(Long postId, Long userId);
    boolean existsByPostIdAndUserId(Long postId, Long userId);
    List<Upvote> findByPostId(Long postId);
    List<Upvote> findByUserId(Long userId);
    long countByPostId(Long postId);
}
