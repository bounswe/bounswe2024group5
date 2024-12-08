package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.service.WikidataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/hint")
public class WikidataController {

    private final WikidataService wikidataService;

    public WikidataController(WikidataService wikidataService) {
        this.wikidataService = wikidataService;
    }

    @GetMapping
    public List<String> getImages(@RequestParam String word) {
        return wikidataService.getImages(word);
    }
}