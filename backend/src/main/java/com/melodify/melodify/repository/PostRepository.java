package com.melodify.melodify.repository;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

    List<Post> findByAuthor(User author);

    Page<Post> findAll(Pageable pageable);

}
