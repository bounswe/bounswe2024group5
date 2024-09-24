package com.melodify.melodify.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wiki_data_entities")
public class WikiDataEntity {

    @Id
    @Column(name = "entity_id", nullable = false, unique = true)
    private String entityId;

    public WikiDataEntity() {
        // Default constructor required for JPA
    }

    public WikiDataEntity(String entityId) {
        this.entityId = entityId;
    }

    public String getEntityId() {
        return entityId;
    }

}
