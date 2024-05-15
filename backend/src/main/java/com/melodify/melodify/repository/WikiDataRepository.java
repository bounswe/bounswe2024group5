package com.melodify.melodify.repository;

import com.melodify.melodify.model.WikiDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WikiDataRepository extends JpaRepository<WikiDataEntity, Long>{
    
    public boolean existsByEntityId(String entityId);

    public void deleteAll();
}
