package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.WikiDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WikiDataRepository extends JpaRepository<WikiDataEntity, String>{
    
    public boolean existsByEntityId(String entityId);

    public void deleteAll();
}
