package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Profile;
import com.quizzard.quizzard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByUser(User user);
}
