package com.melodify.melodify.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;

import com.melodify.melodify.repository.WikiDataRepository;
import com.melodify.melodify.model.WikiDataEntity;


@Configuration
public class WikiDataConfig {
    
    @Autowired
    WikiDataRepository wikiDataRepository;

    @Autowired
    private final RestTemplate restTemplate;

    private final String regexString = "(?<=<uri>http:\\/\\/www\\.wikidata\\.org\\/entity\\/)((Q[0-9]*)(?=<\\/uri>)|(?=<\\/uri>))";

    @PostConstruct
    public void createAllEntities() {
        wikiDataRepository.deleteAll();
        createMusicRelatedEntities();
    }

    private void createMusicRelatedEntities() {
        // https://query.wikidata.org/sparql?query=SELECT%20*%20WHERE%20{?work%20wdt:P31/wdt:P279*%20wd:Q115484611.%20SERVICE%20wikibase:label%20{bd:serviceParam%20wikibase:language%20"[en]".%20}}
        String url = "https://query.wikidata.org/sparql";
        String query = "SELECT * WHERE {?work wdt:P31/wdt:P279* wd:Q115484611. SERVICE wikibase:label {bd:serviceParam wikibase:language \"[en]\".}}";
        String result = restTemplate.getForObject(url + "?query=" + query, String.class);
        String[] entityIds = result.split(regexString);
        for(int i = 0; i < 10; i++) {
            System.out.println(entityIds[i]);
        }
        for(String entityId : entityIds) {
            wikiDataRepository.save(new WikiDataEntity(entityId));
        }
    }



}
