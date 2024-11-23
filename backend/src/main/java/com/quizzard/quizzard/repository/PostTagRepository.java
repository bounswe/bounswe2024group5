package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.PostTag;
import com.quizzard.quizzard.model.QuestionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Long> {
    List<PostTag> findByPostId(Long postId);

    @Query("""
        SELECT pt FROM PostTag pt
        JOIN English e ON pt.english.id = e.id
        WHERE e.word = :word
    """)
    List<PostTag> findAllByTagWord(@Param("word") String tagWord);

    long countByPostId(Long postId);
}
