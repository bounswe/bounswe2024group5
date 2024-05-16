package com.melodify.melodify.repository;

import com.melodify.melodify.model.Following;
import com.melodify.melodify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowingRepository extends JpaRepository<Following, Long> {
    List<Following> findByFollower(User follower);
    List<Following> findByFollowed(User followed);
    Following findByFollowerAndFollowed(User follower, User followed);
}
