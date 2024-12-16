package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.response.WikidataResponse;
import com.quizzard.quizzard.model.response.WikidataResponse.SearchItem;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class WikidataServiceTest {

    @InjectMocks
    private WikidataService wikidataService;

    @Mock
    private RestTemplate restTemplate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSearchWikiImages() throws IOException {
        // Mock response from RestTemplate
        WikidataResponse mockResponse = new WikidataResponse();
        WikidataResponse.SearchItem item1 = new WikidataResponse.SearchItem();
        item1.setConcepturi("https://www.wikidata.org/entity/Q12345");
        item1.setLabel("Entity 1");

        WikidataResponse.SearchItem item2 = new WikidataResponse.SearchItem();
        item2.setConcepturi("https://www.wikidata.org/entity/Q67890");
        item2.setLabel("Entity 2");

        mockResponse.setSearch(Arrays.asList(item1, item2));

        // Define behavior for RestTemplate mock
        when(restTemplate.getForObject(
                eq("https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=test"),
                eq(WikidataResponse.class))
        ).thenReturn(mockResponse);

        // Call the method to test
        List<String> result = wikidataService.searchWikiImages("test");

        // Validate the result
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }


    @Test
    void testExtractQNumberValidUri() {
        String validUri = "https://www.wikidata.org/entity/Q12345";
        int qNumber = wikidataService.extractQNumber(validUri);
        assertEquals(12345, qNumber);
    }

    @Test
    void testExtractQNumberInvalidUri() {
        String invalidUri = "https://www.wikidata.org/entity/InvalidQ";
        int qNumber = wikidataService.extractQNumber(invalidUri);
        assertEquals(Integer.MAX_VALUE, qNumber);
    }
}