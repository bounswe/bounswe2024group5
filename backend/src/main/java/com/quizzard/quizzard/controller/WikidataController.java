package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.service.WikidataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/hint")
public class WikidataController {


    @Autowired
    WikidataService wikidataService;

    @GetMapping()
    public ResponseEntity<?> search(@RequestParam String word) throws IOException {
        List<String> imageUrls = wikidataService.searchWikiImages(word);
        return ResponseEntity.ok(imageUrls);
    }
}