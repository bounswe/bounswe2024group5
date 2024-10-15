package com.quizzard.quizzard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.quizzard.quizzard.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController{

    private final RestTemplate restTemplate;

    @Autowired
    SearchService searchService;

    public SearchController(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @GetMapping()
    public ResponseEntity<?> search(@RequestParam String query) {
        return ResponseEntity.ok(searchService.search(query));
    }

}