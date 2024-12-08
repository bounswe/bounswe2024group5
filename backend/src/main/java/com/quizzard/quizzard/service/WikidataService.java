package com.quizzard.quizzard.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Service
public class WikidataService {

    private static final String SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";
    private final RestTemplate restTemplate;

    public WikidataService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<String> getImages(String word) {
        String sparqlQuery = String.format("""
                SELECT ?image WHERE {
                  ?entity rdfs:label "%s"@en.
                  ?entity wdt:P18 ?image.
                } LIMIT 2
                """, word);

        String queryUrl = SPARQL_ENDPOINT + "?query=" + sparqlQuery + "&format=json";

        ResponseEntity<String> response = restTemplate.getForEntity(queryUrl, String.class);

        return extractImageUrls(response.getBody());
    }

    private List<String> extractImageUrls(String jsonResponse) {
        List<String> imageUrls = new ArrayList<>();
        try {
            // Parse JSON and extract URLs
            var jsonNode = new ObjectMapper().readTree(jsonResponse);
            var bindings = jsonNode.at("/results/bindings");
            for (var binding : bindings) {
                imageUrls.add(binding.at("/image/value").asText());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (imageUrls.isEmpty()) {
            throw new RuntimeException("No images found for the given word");
        }
        return imageUrls;
    }
}
