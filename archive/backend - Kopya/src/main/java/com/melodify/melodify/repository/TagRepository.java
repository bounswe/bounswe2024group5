package com.melodify.melodify.repository;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByPost (Post post);

    List<Tag> findByTag (String tag);
}
