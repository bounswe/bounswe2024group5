package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findByPostId(Long postId);
    List<Reply> findByUserId(Long userId);
    List<Reply> findByPostIdAndUserId(Long postId, Long userId);
    long countByPostId(Long postId);
}
