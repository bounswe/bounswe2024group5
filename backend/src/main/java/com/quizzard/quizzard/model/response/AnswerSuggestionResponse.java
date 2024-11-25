package com.quizzard.quizzard.model.response;

import lombok.Data;

import java.util.List;

@Data
public class AnswerSuggestionResponse {

    private List<String> correctAnswerSuggestions;
    private List<String> wrongAnswerSuggestions;

}
