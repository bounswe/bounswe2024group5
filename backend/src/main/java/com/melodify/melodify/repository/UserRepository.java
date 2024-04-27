package com.melodify.melodify.repository;

import com.melodify.melodify.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    User findByUsername(String username);
    
    User findByEmail(String email);
    
    User findByUsernameAndPassword(String username, String password);
    
    User findByEmailAndPassword(String email, String password);
    
    User findByUsernameOrEmail(String username, String email);
}
