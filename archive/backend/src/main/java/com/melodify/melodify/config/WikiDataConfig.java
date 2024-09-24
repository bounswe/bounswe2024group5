package com.melodify.melodify.config;

import java.util.List;
import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

import jakarta.annotation.PostConstruct;

import com.melodify.melodify.repository.WikiDataRepository;
import com.melodify.melodify.model.WikiDataEntity;


@Configuration
public class WikiDataConfig {
    
    @Autowired
    WikiDataRepository wikiDataRepository;

    private final String regexString = "(?<=<uri>http:\\/\\/www\\.wikidata\\.org\\/entity\\/)((Q[0-9]*)(?=<\\/uri>)|(?=<\\/uri>))";

    @PostConstruct
    public void createAllEntities() {
        System.out.println("Creating all entities");
        wikiDataRepository.deleteAll();
        String[] wikidataUrls = {
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31)%20wd%3AQ482994.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31)%20wd%3AQ7366.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106)%20wd%3AQ177220.%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106)%20wd%3AQ36834.%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106)%20wd%3AQ639669.%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31%2F(wdt%3AP279*))%20wd%3AQ215380.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31)%20wd%3AQ34379.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31%2F(wdt%3AP279*))%20wd%3AQ188451.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106%2F(wdt%3AP279*))%20wd%3AQ3153559.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
            "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31%2F(wdt%3AP279*))%20wd%3AQ134556.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
        };
        try {
            for (String url : wikidataUrls) {
                String entities = findRelatedEntities(url);
                parseAndSaveEntities(entities);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String findRelatedEntities(String url) throws Exception {
        HttpResponse<String> response = Unirest.get(url)
            .header("Accept", "*/*")
            .header("Host", "query.wikidata.org")
            .header("User-Agent", "Melodify/1.0 (https://melodify.com)")
            .header("Connection", "keep-alive")
            .asObject(String.class);
        return response.getBody();
    }

    private void parseAndSaveEntities(String entities) {
        Pattern pattern = Pattern.compile(regexString);
        Matcher matcher = pattern.matcher(entities);
        List<WikiDataEntity> entitiesList = new ArrayList<>();
        while (matcher.find()) {
            entitiesList.add(new WikiDataEntity(matcher.group()));
        }
        System.out.println("Saving " + entitiesList.size() + " entities");
        wikiDataRepository.saveAll(entitiesList);
        System.out.println("Saved " + entitiesList.size() + " entities");
    }
}

// instance of song
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31)%20wd%3AQ7366.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// instance of album
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31)%20wd%3AQ482994.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// occupation singer
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106)%20wd%3AQ177220.%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// occupation composer
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106)%20wd%3AQ36834.%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// occupation musician
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106)%20wd%3AQ639669.%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// instance of musical group
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31%2F(wdt%3AP279*))%20wd%3AQ215380.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// instace of instrument
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31)%20wd%3AQ34379.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// instance of music genre
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31%2F(wdt%3AP279*))%20wd%3AQ188451.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// occupation music performer
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP106%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP106%2F(wdt%3AP279*))%20wd%3AQ3153559.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D

// instance of single
// https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP31%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20(ps%3AP31%2F(wdt%3AP279*))%20wd%3AQ134556.%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D