package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

    List<Post> findByAuthor(User author);

    Optional<Post> findById(Long id);

    Page<Post> findAll(Pageable pageable);

}
