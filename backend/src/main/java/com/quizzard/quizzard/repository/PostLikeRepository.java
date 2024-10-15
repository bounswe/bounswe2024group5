package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.PostLike;
import com.quizzard.quizzard.model.User;
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
