package com.melodify.melodify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.melodify.melodify.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
    
    User findByUsername(String username);
    
    User findByEmail(String email);
    
    User findByUsernameAndPassword(String username, String password);
    
    User findByEmailAndPassword(String email, String password);
    
    User findByUsernameOrEmail(String username, String email);
}
