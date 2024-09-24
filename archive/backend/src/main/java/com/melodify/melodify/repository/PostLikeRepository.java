package com.melodify.melodify.repository;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.PostLike;
import com.melodify.melodify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    List<PostLike> findByPost(Post post);
    List<PostLike> findByUser(User user);
    PostLike findByPostAndUser(Post post, User user);
    boolean existsByPostAndUser(Post post, User user);
}
