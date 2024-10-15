package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByPost (Post post);

    List<Tag> findByTag (String tag);
}
