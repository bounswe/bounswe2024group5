package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Turkish;
import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.TurkishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/autocomplete")
public class AutoCompleteController {

    @Autowired
    private TurkishRepository turkishRepository;

    @Autowired
    private EnglishRepository englishRepository;

    @GetMapping
    public List<String> autoCompleteSuggestions(@RequestParam String prefix, @RequestParam String language) {

        if (language.equals("turkish")) {
            return turkishRepository.findTop5ByWordStartingWith(prefix)
                    .stream()
                    .toList();
        } else if (language.equals("english")) {
            return englishRepository.findTop5ByWordStartingWith(prefix)
                    .stream()
                    .toList();
        } else {
            return List.of();
        }
    }

}
