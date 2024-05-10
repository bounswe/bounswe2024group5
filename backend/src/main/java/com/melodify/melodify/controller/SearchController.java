package com.melodify.melodify.controller;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/search")
public class SearchController{

private final RestTemplate restTemplate;

public SearchController(RestTemplateBuilder restTemplateBuilder) {
    this.restTemplate = restTemplateBuilder.build();
}

@GetMapping()
public ResponseEntity<?> search(@RequestParam String query) {
    String url = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&limit=1&search=" + query;
    return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
}

}