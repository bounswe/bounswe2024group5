package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(long l);
    @Query("SELECT fp FROM Post fp " +
            "JOIN PostTag pt ON fp.id = pt.post.id " +
            "JOIN English e ON pt.english.id = e.id " +
            "WHERE e.word = :word")
    List<Post> findAllByTagWord(@Param("word") String word);


    @Query("SELECT p FROM Post p " +
            "JOIN PostTag pt ON p.id = pt.post.id " +
            "JOIN English e ON pt.english.id = e.id " +
            "JOIN User u ON p.user.id = u.id " +
            "WHERE e.word = :word AND u.username = :username")
    List<Post> findAllByTagWordAndUsername(@Param("word") String word, @Param("username") String username);

}
