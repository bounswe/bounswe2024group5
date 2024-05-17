package com.melodify.melodify.repository;

import com.melodify.melodify.model.Comment;
import com.melodify.melodify.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    Comment findById(long id);
    boolean existsById(long id);
}
