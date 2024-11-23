package com.quizzard.quizzard.controller;

import com.quizzard.quizzard.repository.EnglishRepository;
import com.quizzard.quizzard.repository.TurkishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/word-checker")
public class WordCheckerController {

    @Autowired
    private EnglishRepository englishRepository;

    @Autowired
    private TurkishRepository turkishRepository;

    @GetMapping()
    public ResponseEntity<Map<String, Object>> checkWord(@RequestParam String word, @RequestParam String language) {
        if(language.equals("turkish")) {
            if (turkishRepository.existsByWord(word))
                return ResponseEntity.ok(Map.of("isValid", true));
            else
                return ResponseEntity.ok(Map.of("isValid", false));
        }
        else if(language.equals("english")) {
            if (englishRepository.existsByWord(word))
                return ResponseEntity.ok(Map.of("isValid", true));
            else
                return ResponseEntity.ok(Map.of("isValid", false));
        }
        else {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid type"));
        }
    }

}
