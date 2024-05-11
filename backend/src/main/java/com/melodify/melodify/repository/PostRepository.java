package com.melodify.melodify.repository;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

    boolean existsbyAuthor(User author);

    List<Post> findByAuthor(User author);

    List<Post> findByTag(String tag);

}
