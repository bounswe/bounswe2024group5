package com.quizzard.quizzard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.Arrays;
import java.util.List;

import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AutoCompleteController.class)
public class AutoCompleteTest {

    @MockBean
    private AutoCompleteController autoCompleteController;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void testGetAutoCompleteSuggestions() throws Exception {
        String query = "ne";
        List<String> expectedSuggestions = Arrays.asList("new", "need", "never", "news", "needs", "near", "network", "nearly", "necessary");

        when(autoCompleteController.autoCompleteSuggestions(query, "english")).thenReturn(expectedSuggestions);

        List<String> actualSuggestions = autoCompleteController.autoCompleteSuggestions(query,"english");
        mockMvc.perform(get("/autocomplete?prefix=ne&language=english")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"prefix\":\"ne\",\"language\":\"english\"}"));
        assertEquals(expectedSuggestions, actualSuggestions);
    }
}


