package com.melodify.melodify.repository;

import com.melodify.melodify.model.Profile;
import com.melodify.melodify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByUser(User user);
}
