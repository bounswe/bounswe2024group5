package com.quizzard.quizzard.controller;


import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.service.AutoCompleteService;
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
    private AutoCompleteService autoCompleteService;



    @GetMapping()
    public List<String> autoCompleteSuggestions(@RequestParam String prefix) {
        return autoCompleteService.autoCompleteSuggestions(prefix)
                .stream()
                .map(English::getWord)
                .toList();
    }

}
