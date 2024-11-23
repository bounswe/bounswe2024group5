package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByWordnetIdAndUserId(String s, long l);

    List<Post> findByWordnetId(String s);

    List<Post> findByUserId(long l);
}
